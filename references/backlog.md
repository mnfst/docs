# Backlog — out-of-scope observations parked for their own topic

One line each: `- <date> · <page> · <what looks wrong> · spotted during <topic> audit`. The owning topic's next audit consumes and clears these.

- 2026-08-07 · self-hosted.mdx · "first account becomes admin" wording vs the /setup screen; "unknown model falls back to routing" vs M302; fresh-install table swaps M100/M101 · spotted during getting-started audit (already raised in issue #49, do not re-raise)
- 2026-08-07 · deploy/aws,render,easypanel,koyeb · instance-mode env var documented in guides but absent from the reference · spotted during getting-started audit (already raised in issue #49, do not re-raise)
- 2026-08-07 · errors/M201.mdx, M202.mdx, M203.mdx · docs tell users to raise rate/concurrency limits by editing source files (code constants presented as configurable) · spotted by check-coherence.mjs, owner: error catalog topic
