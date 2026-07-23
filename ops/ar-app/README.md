# AR APP — Ops notes

> These files are **operational documentation for the AR APP** internal panel,
> whose backend runs on a separate Supabase project (ref `dpxcrdzgouqusvyqjivl`).
> They are **not** part of this marketing website's build/deploy. They live here
> only so the fix is tracked and reviewable. **No client data (names, e-mails,
> billing values) or secrets are stored in this folder** — this repository is public.

---

## Incident: `process-queue` Edge Function returning HTTP 500

**Symptom.** In the admin panel, releasing the send queue ("liberar a fila")
failed with:

```
POST .../functions/v1/process-queue  ->  500
Erro ao processar fila: FunctionsHttpError: Edge Function returned a non-2xx status code
```

The scheduled Google/Meta Ads billing notices ("Aviso de Verba" + fiscal
documents) piled up in the queue instead of being sent.

**Root cause.** The RPC `public.claim_queue_items(batch_size)` atomically claims
due rows with `UPDATE communication_logs SET status = 'PROCESSING' ...`, but the
`communication_logs_status_check` CHECK constraint only allowed
`SENT / FAILED / PENDING / SCHEDULED`. `PROCESSING` was missing, so:

| Queue state    | UPDATE effect            | Result |
| -------------- | ------------------------ | ------ |
| Empty          | 0 rows changed           | 200 ✅ |
| Items waiting  | tries to write PROCESSING | constraint violation → RPC throws → outer `catch` → **500** ❌ |

That is exactly why it only broke once items were scheduled into the queue.

**Fix.** Add `PROCESSING` to the allowed set — see
[`migrations/20260723_allow_processing_status_communication_logs.sql`](migrations/20260723_allow_processing_status_communication_logs.sql).
Safe and reversible: every existing row already holds a value from the previous
(smaller) set, so the new superset constraint validates without touching data.

### How to apply

- **Supabase SQL Editor / MCP:** run the statements in the migration file against
  project `dpxcrdzgouqusvyqjivl`, **or**
- **Supabase CLI:** `supabase db push` after placing the file in `supabase/migrations/`.

### Verification

```sql
-- Constraint now lists PROCESSING:
SELECT pg_get_constraintdef(con.oid)
FROM pg_constraint con
JOIN pg_class rel ON rel.oid = con.conrelid
WHERE rel.relname = 'communication_logs'
  AND con.conname = 'communication_logs_status_check';

-- Watch the queue drain (counts only):
SELECT status, count(*) FROM communication_logs GROUP BY status ORDER BY status;
```

Two hourly `pg_cron` jobs (`process-email-queue`, `process-ads-queue`) call
`process-queue`, so a fixed queue drains automatically at the top of the hour;
the operator can also click **"liberar a fila"** for an immediate run.

### Status of this incident (2026-07-23)

- ✅ Constraint fix **applied** to `dpxcrdzgouqusvyqjivl`.
- ✅ Two queued items whose billing alert had **already been delivered** via the
  immediate-send path were marked `SENT` to prevent a duplicate send when the
  queue resumed.
- ⏳ The remaining genuinely-pending items stay `SCHEDULED` and are sent by the
  normal queue run.

---

## Recommended follow-ups (not yet done)

1. **Idempotency guard in `process-queue`.** Before sending a queued item, skip
   it when its linked `billing_alerts` row is already `SENT`. This removes the
   whole class of "immediate send + scheduled send → duplicate" problem that had
   to be mitigated by hand here.

2. **De-duplicate the cron jobs.** `process-email-queue` and `process-ads-queue`
   both hit `process-queue` every hour on the same schedule — keep one.

3. **Payment method / automatic payment on the client (ClientView).** Clients
   paying Ads by **credit card / automatic charge** currently show up as
   "saldo negativo", because the balance logic ignores payment method. The data
   model already supports it: `clients.payment_method_google` and
   `clients.payment_method_meta` accept `BOLETO` / `CARTAO` (and
   `media_fundings.funding_mode` exists per entry). Recommended:
   - Surface those two fields in ClientView as a per-platform selector
     (Boleto / Cartão-automático).
   - Make the "saldo negativo" / verba-reposition logic treat `CARTAO`
     (automatic) as *"charged automatically → no alert, no top-up due"*.

   This is preferable to maintaining a hard-coded list of card clients: it is
   persistent, self-service, and drives the alert logic directly. Implementing
   the UI + balance logic requires the AR APP application repository (not this
   one).
