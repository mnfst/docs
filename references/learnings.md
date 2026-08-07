# Learnings — append-only memory of the docs-sync harness

- 2026-08-06 · harness created; state seeded at mnfst/manifest PR #2691 (last merged before the harness existed).
- 2026-08-06 · run 1 (message recording): the auditor inverted the REQUEST_RECORDING_STORAGE auto rule (claimed filesystem fallback on partial S3; code returns a null backend). The verifier's code re-read killed it before publication. Lesson: auditors must quote the exact decision line, not summarize control flow.
- 2026-08-06 · run 1: the platform-engineer's report propagated the same misreading — verification must re-read code even when the report cites file:line.
- 2026-08-06 · run 1: never name internal tools in the issue itself, even in the "clean" summary (public repo).
- 2026-08-06 · run 1: keep the "Questions for Seb" section OUT of the public issue; deliver it privately.
- 2026-08-06 · run 1 verdicts: findings must be written in PLAIN language — no UI-component jargon (no "drawer", "Frame", CSS/file names in the finding body; code refs stay in the evidence lines only). Seb could not understand the IMAGE findings as written. An IMAGE finding is one simple sentence: where in the doc, what photo to take.
- 2026-08-06 · editorial: when history is convoluted (feature added/removed/re-added), docs say the simple useful thing, not the history. Recorded in AUDIENCE.md.
- 2026-08-06 · terminology: "logs", "request", "attempt"; the platform will rename the /messages URL later.
- 2026-08-06 · full audit (cron, autonomous, no human): 0 PRs merged on mnfst/manifest since baseline #2691 (max merged PR = #2691). Nothing to compare → no findings → no issue (silence is a valid outcome). lastAuditedPr left at 2691; lastRunAt bumped as a run heartbeat.
- 2026-08-07 · full audit (cron, autonomous, no human): still 0 PRs merged since baseline #2691 (origin/main @ 47d35fa, 2026-08-05, contains merge of #2691; max merged PR = #2691). Nothing new → no findings → no issue. lastAuditedPr unchanged; lastRunAt bumped as heartbeat.
