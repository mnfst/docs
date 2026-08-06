# Learnings — append-only memory of the docs-sync harness

- 2026-08-06 · harness created; state seeded at mnfst/manifest PR #2691 (last merged before the harness existed).
- 2026-08-06 · run 1 (message recording): the auditor inverted the REQUEST_RECORDING_STORAGE auto rule (claimed filesystem fallback on partial S3; code returns a null backend). The verifier's code re-read killed it before publication. Lesson: auditors must quote the exact decision line, not summarize control flow.
- 2026-08-06 · run 1: the platform-engineer's report propagated the same misreading — verification must re-read code even when the report cites file:line.
- 2026-08-06 · run 1: never name internal tools in the issue itself, even in the "clean" summary (public repo).
- 2026-08-06 · run 1: keep the "Questions for Seb" section OUT of the public issue; deliver it privately.
