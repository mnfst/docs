---
name: docs-sync
description: >
  Audit the gap between the Manifest platform (mnfst/manifest) and this
  documentation, through a multi-agent verification loop, and file ONE
  digest issue with evidence-backed findings and options. Use when the
  user says "/docs-sync", "lance l'audit", "compare la plateforme et la
  doc", or asks whether the docs are up to date with the platform.
---

# Docs Sync

Compare the real platform with the docs and file one digest issue on
mnfst/docs. This harness NEVER edits docs pages and NEVER opens PRs:
findings are options to discuss, PRs happen manually with Seb
afterwards. No findings = no issue = total silence.

Requirements: `gh` authenticated (issues on mnfst/docs, read on
mnfst/manifest), and a local platform clone: `~/codebase/manifest/manifest`
on Seb's Mac, `~/repos/manifest` on the VM (pull it fresh before
auditing; never clone a duplicate if one of these exists). Run
`bash scripts/setup.sh` at session start.

## Two modes

- **Full audit** (`lance l'audit`): everything merged since
  `lastAuditedPr` in `scripts/state.json`.
- **Scoped audit** (`lance l'audit sur <sujet>`): ONE topic, exploited
  in depth. This is the preferred mode: a focused agent beats a broad
  one. The topic maps to its docs pages (find them via `docs.json`
  navigation + Grep across `*.mdx`) and to its platform surface (PRs
  and code touching that feature). Scoped runs do NOT advance
  `lastAuditedPr`; they record themselves in `decisions.md` like any
  run. The digest issue title carries the topic:
  `Docs audit — <topic> — <date>`.

- **Preflight** (`préflight PR #N` / "check cette PR pas encore mergée"):
  audit ONE OPEN platform PR before merge. Same loop, two differences:
  no GitHub issue — findings and options go in the conversation (it is
  interactive); and after Seb picks options, prepare the docs PR with
  him so platform PR and docs PR merge together. Preflight never
  touches `state.json` or the rotation.
- **On-demand full** ("lance l'audit" during the day): identical to the
  cron's full mode, just triggered by Seb without waiting for midnight.

## The loop

### 1 — Scope

Full mode: read `scripts/state.json` (`lastAuditedPr`), list merged
PRs since:
`gh pr list --repo mnfst/manifest --state merged --limit 100 --json number,title,mergedAt`
and keep those with `number > lastAuditedPr`. If none: apply the
**nightly rotation** — read `scripts/topics.json`, pick the topic with
the oldest `lastAuditedAt` (null counts as oldest; tie-break by list
order), run a SCOPED audit on it, and stamp its `lastAuditedAt` with
today's date whether or not findings came out (a clean topic is a
result). One topic per run, never more.

Scoped mode: collect the topic's docs pages, and the topic's merged
PRs over a stated window (default 30 days) via
`gh pr list --repo mnfst/manifest --state merged --search "<topic terms>"`
plus a Grep of the clone for the feature's code paths. State the
window and the page list in the issue.

**Scope is a hard boundary.** Findings may ONLY target the topic's own
pages (stated in the issue's page list). A problem spotted on any
other page while following links is NOT a finding: append one line to
`references/backlog.md` (page, claim, what looks wrong) so the topic
that owns that page picks it up at its next audit. An issue containing
an out-of-scope finding fails verification.

Both modes: `git pull` the platform clone first, so code checks run
against current main.

### 2 — Truth (platform-engineer)

Spawn the `platform-engineer` subagent with the PR list and the clone
path. It returns the state-of-truth report (facts + evidence, no docs
contamination).

### 3 — Findings (docs-auditor)

Spawn the `docs-auditor` subagent with the report. It crosses the
truth with the .mdx pages, the AUDIENCE bans, the CASE-MATRIX grid,
and the past-verdicts memory, and returns categorized findings
(OBSOLETE / INTERNAL-LEAK / WRONG / MISSING-CASE / IMAGE), each with
double evidence and options.

### 4 — Wording (tech-writer)

If any finding is `needs-wording: yes`, spawn the `tech-writer`
subagent for the drafts (stop-slop + humanizer voice, then the
STE-flavored pass of `.claude/skills/asd-ste100/`).

### 5 — Draft + verify (issue-verifier), max 3 iterations

Run `node scripts/check-coherence.mjs` (the machine-checked
invariants); RED blocks filing until resolved or justified in the
script's exemption lists. Assemble the digest issue per
`references/ISSUE-FORMAT.md`. Write the issue's prose for a reader
with no context, in the STE-flavored discipline of
`.claude/skills/asd-ste100/references/writing-rules.md`: subject
first, one fact per sentence, active voice, no fact dropped for
brevity. Seb reads these issues; a finding he has to reread is a
finding he cannot judge. Spawn the `issue-verifier` subagent
(fresh eyes) on the draft. Every FAILed
finding goes back to step 3 (or is dropped if the evidence simply does
not hold). After 3 red rounds, stop and show Seb the blockers instead
of filing a weak issue.

### 6 — File and record

- `gh issue create --repo mnfst/docs --title "Docs audit — <date> (PRs #A–#B)" --label docs-sync --label <categories present> --body-file <tmp>`
- Update `scripts/state.json`: `lastAuditedPr`, `lastRunAt`, issue URL.
- Append one line per finding to `references/decisions.md` with status
  `raised` (create the file if missing). When Seb answers on the issue
  ("N → option 2", "N → reject"), whoever handles that session updates
  the line to `accepted`/`rejected` — this is what prevents re-raising.
- Append process lessons to `references/learnings.md`.
- Give Seb the issue URL and a 3-line summary per category count.

## Working the verdicts (after Seb answers on the issue)

When asked to apply a verdict: re-read the finding, make the PR
together with Seb (manual flow, normal review), run
`node scripts/check-coherence.mjs` and `mint broken-links` on the
result (both must be GREEN before the PR is pushed), and update
`references/decisions.md` (`accepted` → `fixed` with the PR URL).
Rejected findings get `rejected` and are never re-raised (the
issue-verifier enforces it).

## Reversal protocol (anti-oscillation)

Reversing ANY position recorded in `references/decisions.md` — undoing
an applied fix, flipping accepted↔rejected, changing a chosen option —
requires a written derivation, BEFORE acting:

1. Name the invariant(s) that govern the point (AUDIENCE.md, this
   file).
2. Derive the answer from them, in 2-3 sentences.
3. If the derivation contradicts Seb's expressed doubt, DEFEND the
   position with the derivation. Never flip to follow a doubt: doubt
   triggers re-derivation, not reversal.
4. If the derivation does justify the reversal, record the line in
   decisions.md as `revised` with the one-line derivation.

The issue-verifier FAILs any draft or fix that reverses a recorded
decision without its recorded derivation.

## Phase 2 (LIVE since 2026-08-06 — see references/PHASE-2.md)

Cron runs on the VM via `~/docs-harness/run.sh`: watch mode at minute
15 every 2 hours (exits without invoking Claude when no new PR), full
audit at midnight Europe/Paris. Runs are recorded in the VM Supabase
(`docs_harness.runs`); the flat files here remain the skill's working
memory.
