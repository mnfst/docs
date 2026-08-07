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

## The loop

### 1 — Scope

Full mode: read `scripts/state.json` (`lastAuditedPr`), list merged
PRs since:
`gh pr list --repo mnfst/manifest --state merged --limit 100 --json number,title,mergedAt`
and keep those with `number > lastAuditedPr`. If none: report "nothing
new", update nothing, stop.

Scoped mode: collect the topic's docs pages, and the topic's merged
PRs over a stated window (default 30 days) via
`gh pr list --repo mnfst/manifest --state merged --search "<topic terms>"`
plus a Grep of the clone for the feature's code paths. State the
window and the page list in the issue.

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
subagent for the drafts (stop-slop + humanizer voice).

### 5 — Draft + verify (issue-verifier), max 3 iterations

Assemble the digest issue per `references/ISSUE-FORMAT.md`. Spawn the
`issue-verifier` subagent (fresh eyes) on the draft. Every FAILed
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
together with Seb (manual flow, normal review), and update
`references/decisions.md` (`accepted` → `fixed` with the PR URL).
Rejected findings get `rejected` and are never re-raised (the
issue-verifier enforces it).

## Phase 2 (LIVE since 2026-08-06 — see references/PHASE-2.md)

Cron runs on the VM via `~/docs-harness/run.sh`: watch mode at minute
15 every 2 hours (exits without invoking Claude when no new PR), full
audit at midnight Europe/Paris. Runs are recorded in the VM Supabase
(`docs_harness.runs`); the flat files here remain the skill's working
memory.
