-- ============================================================================
-- Migration: allow 'PROCESSING' status on communication_logs
-- Target:    AR APP  (Supabase project ref: dpxcrdzgouqusvyqjivl)
-- Date:       2026-07-23
-- ============================================================================
--
-- INCIDENT
--   The `process-queue` Edge Function returned HTTP 500 whenever the send queue
--   had pending items ("Erro ao processar fila / Edge Function returned a
--   non-2xx status code"). When the queue was empty it returned 200.
--
-- ROOT CAUSE
--   The RPC public.claim_queue_items(batch_size) atomically claims due rows with:
--       UPDATE communication_logs SET status = 'PROCESSING' ...
--   but the CHECK constraint communication_logs_status_check only permitted:
--       ('SENT', 'FAILED', 'PENDING', 'SCHEDULED')
--   'PROCESSING' was missing. So:
--     * Empty queue  -> UPDATE touches 0 rows -> no violation -> 200
--     * Items waiting -> UPDATE tries to write 'PROCESSING' -> constraint
--                        violation -> the RPC throws -> process-queue's outer
--                        catch returns 500.
--   This is why the failure only appeared once items were scheduled into the queue.
--
-- FIX
--   Add 'PROCESSING' to the allowed set. Safe & reversible: every existing row
--   already holds a value from the previous (smaller) set, so the new (superset)
--   CHECK validates without touching data.
-- ============================================================================

BEGIN;

ALTER TABLE public.communication_logs
  DROP CONSTRAINT IF EXISTS communication_logs_status_check;

ALTER TABLE public.communication_logs
  ADD CONSTRAINT communication_logs_status_check
  CHECK (status = ANY (ARRAY['SENT'::text, 'FAILED'::text, 'PENDING'::text, 'SCHEDULED'::text, 'PROCESSING'::text]));

COMMIT;

-- ----------------------------------------------------------------------------
-- ROLLBACK (only if needed; note: this reintroduces the bug)
-- ----------------------------------------------------------------------------
-- ALTER TABLE public.communication_logs
--   DROP CONSTRAINT IF EXISTS communication_logs_status_check;
-- ALTER TABLE public.communication_logs
--   ADD CONSTRAINT communication_logs_status_check
--   CHECK (status = ANY (ARRAY['SENT'::text, 'FAILED'::text, 'PENDING'::text, 'SCHEDULED'::text]));
