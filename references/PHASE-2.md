# PHASE-2 — automation from the VM (defined, to wire after phase 1 runs are validated)

Owner: the Claude Code agent on the Azure VM `manifest-agent` (the one
launched via the `agent` script, repos under `~/repos`).

## Schedules

- **Every 2 hours** — light watch: step 1 of the skill only. If no new
  merged PR on mnfst/manifest since `lastAuditedPr`, exit silently
  (near-zero cost). If there are, run the full loop.
- **00:00 nightly** — full audit regardless, as a safety net (catches
  anything the watch missed, plus docs drift not tied to a PR).

## Memory: Supabase (same local instance already on the VM, new schema `docs_harness`)

Tables:

- `runs` (id, started_at, pr_from, pr_to, findings_count, issue_url)
- `findings` (id, run_id, category, doc_page, doc_quote, evidence,
  status: raised | accepted | rejected | fixed, issue_url, pr_url,
  updated_at)
- `learnings` (id, created_at, lesson)

The flat files `references/decisions.md` and `references/learnings.md`
are the phase-1 equivalents; migration = import then keep Supabase as
the source of truth, with the flat files regenerated as read-only
mirrors so the repo stays self-explanatory.

## VM prerequisites (to install at wiring time — warn Seb before
touching the VM, he may be using it live)

1. Clones of mnfst/docs and mnfst/manifest under `~/repos`, pulled at
   each run.
2. `gh` token: issues:write on mnfst/docs, read on mnfst/manifest.
3. Supabase schema `docs_harness` created on the existing instance.
4. Cron entries for the two schedules, launching the Claude Code agent
   with the `/docs-sync` skill.
5. A ping to Seb (WhatsApp/Discord via Hermes) when an issue is filed.

## Guards carried over from phase 1

No PRs ever. One digest issue max per run. Rejected findings never
re-raised. Silence when there is nothing to say.
