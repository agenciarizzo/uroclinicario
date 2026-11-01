#!/usr/bin/env node
/**
 * Hook PreToolUse (matcher: `mcp__.*__execute_zapier_(read|write)_action`) — trava de custo do Zapier MCP
 * (cliente, 2026-10-28).
 *
 * Cada ação executada pelo conector do Zapier é cobrada como tarefa (~US$ 0,09 por chamada). Em 27/10 uma limpeza
 * de e-mail pelo conector gastou 2.098 tarefas além do plano = R$ 493,29 (docs/REGRAS_CASOS_MAPA.md §56). A regra
 * (volume vai por conector nativo; Zapier só pro que não tem; o custo vai antes de qualquer lote) mora em
 * docs/ZAPIER_SAIDA_MAPA.md §14. Aqui a trava é técnica: conta as chamadas da sessão e NEGA o que passa do teto,
 * com o pedido de ok do Raphael.
 *
 * Teto 0 desde 30/10/2026 (era 25): o Raphael decidiu sair do Zapier, e a trava deixou passar o que ele achava
 * travado — o nome do servidor (§16.4, curado acima no FERRAMENTA) e o teto por conversa (§17). Agora nenhuma chamada
 * passa sem liberação, com qualquer nome de servidor; o conector nativo é o caminho (ZAPIER_SAIDA_MAPA.md §16–§17).
 *
 * Contador: 1 arquivo por chamada (`<raiz>/<sessão>/0001`…), criado com `wx` — atômico, então chamadas em paralelo
 * não furam o teto. A chamada negada devolve a vaga. Container novo (sessão retomada noutro dia) começa a pasta
 * com as chamadas que o transcript já registra (o principal + os subagentes).
 *
 * Liberação: `node <este arquivo> --liberar <sessão> <quantas>` grava `liberacao.json` com o novo teto (o que já
 * passou + quantas). Só depois do ok do Raphael num AskUserQuestion com a estimativa — a negativa diz isso.
 *
 * Roda também copiado LITERAL nos repos de site (`.claude/hooks/travaCustoZapier.mjs`, ver
 * docs/templates/settings_site_cliente.json): só módulos do Node, nada do rizzo-os.
 *
 * I15: FALHA ABERTO — qualquer erro aqui deixa a chamada passar.
 */
import { closeSync, existsSync, mkdirSync, openSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const TETO = 0;
// Qualquer nome de servidor: o conector do claude.ai entra como `mcp__<uuid>__…`, não `mcp__Zapier__…`, e com o nome
// fixo a trava deixou passar 959 chamadas em 30/10 (docs/ZAPIER_SAIDA_MAPA.md §16.4).
const FERRAMENTA = /^mcp__.+__execute_zapier_(read|write)_action$/;
// Só o bloco tool_use de verdade: o registro de ferramentas adiadas também traz o nome, mas não o par type+id.
const CHAMADA_NO_TRANSCRIPT = /"type":"tool_use","id":"([^"]+)","name":"mcp__[^"]+__execute_zapier_(?:read|write)_action"/g;

const raiz = () => process.env.RIZZO_TRAVA_ZAPIER_DIR || join(tmpdir(), 'rizzo-trava-zapier');
const pastaDa = (sessao) => join(raiz(), String(sessao).replace(/[^\w.-]/g, '_'));
const vaga = (n) => String(n).padStart(4, '0');
const usadas = (pasta) => readdirSync(pasta).filter((f) => /^\d+$/.test(f)).length;

function tetoDa(pasta) {
  try {
    return Math.max(TETO, Number(JSON.parse(readFileSync(join(pasta, 'liberacao.json'), 'utf8')).teto) || 0);
  } catch {
    return TETO;
  }
}

/** Chamadas que o transcript já registra (principal + subagentes), menos a atual, contadas pelo id do tool_use. */
export function chamadasNoTranscript(transcript, atual) {
  if (!transcript) return 0;
  const arquivos = [transcript];
  const sub = join(transcript.replace(/\.jsonl$/, ''), 'subagents');
  try {
    for (const f of readdirSync(sub)) if (f.endsWith('.jsonl')) arquivos.push(join(sub, f));
  } catch { /* sem subagentes */ }
  const ids = new Set();
  for (const a of arquivos) {
    try {
      for (const m of readFileSync(a, 'utf8').matchAll(CHAMADA_NO_TRANSCRIPT)) ids.add(m[1]);
    } catch { /* transcript ilegível conta zero */ }
  }
  ids.delete(atual);
  return ids.size;
}

export function decidir(entrada) {
  if (!FERRAMENTA.test(entrada?.tool_name ?? '')) return null;
  const sessao = entrada.session_id;
  if (!sessao) return null;
  const pasta = pastaDa(sessao);
  if (!existsSync(pasta)) {
    mkdirSync(pasta, { recursive: true });
    const ja = chamadasNoTranscript(entrada.transcript_path, entrada.tool_use_id);
    for (let n = 1; n <= ja; n++) closeSync(openSync(join(pasta, vaga(n)), 'a'));
  }
  let n = usadas(pasta);
  for (;;) {
    n += 1;
    try {
      closeSync(openSync(join(pasta, vaga(n)), 'wx'));
      break;
    } catch (e) {
      if (e.code !== 'EEXIST') throw e;
    }
  }
  if (n <= tetoDa(pasta)) return null;
  unlinkSync(join(pasta, vaga(n)));
  const feitas = n - 1;
  return 'Zapier fechado (Raphael, 30/10/2026: sair do Zapier; a fatura estourou com chamadas de agente). ' +
    `Liberadas e usadas nesta conversa: ${feitas}; esta foi negada (~US$ 0,09 cada). ` +
    'Use o conector nativo, que não cobra por chamada: Google Docs, Google Drive, Gmail, Google Calendar, ' +
    'Google Sheets, Trello, Supabase, mLabs. ' +
    'Só se não houver nativo e for indispensável: 1 AskUserQuestion com quantas chamadas e o custo (quantas × US$ 0,09). ' +
    `Só se ele escolher liberar: node "${fileURLToPath(import.meta.url)}" --liberar ${sessao} <quantas ele aprovou>. ` +
    'Sem o ok, não siga pelo Zapier. Regra: docs/ZAPIER_SAIDA_MAPA.md §17 (rizzo-os).';
}

/** Grava a liberação da sessão: o teto passa a ser o que já foi usado + `quantas`. Devolve o novo teto. */
export function liberar(sessao, quantas) {
  const mais = Number.parseInt(quantas, 10);
  if (!sessao || !(mais > 0)) throw new Error('uso: --liberar <sessão> <quantas>');
  const pasta = pastaDa(sessao);
  mkdirSync(pasta, { recursive: true });
  const teto = Math.max(usadas(pasta) + mais, tetoDa(pasta));
  writeFileSync(join(pasta, 'liberacao.json'), JSON.stringify({ teto, em: new Date().toISOString() }));
  return teto;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv[2] === '--liberar') {
    try {
      const teto = liberar(process.argv[3], process.argv[4]);
      process.stdout.write(`Trava de custo Zapier liberada: o teto desta conversa passa a ${teto} chamadas.\n`);
      process.exit(0);
    } catch (e) {
      process.stderr.write(`${e.message}\n`);
      process.exit(1);
    }
  }
  try {
    const motivo = decidir(JSON.parse(readFileSync(0, 'utf8')));
    if (motivo) {
      process.stdout.write(JSON.stringify({
        hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: motivo },
      }));
    }
  } catch { /* I15 */ }
  process.exit(0);
}
