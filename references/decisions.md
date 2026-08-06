# Decisions — memory of raised findings and Seb's verdicts

One line per finding: `- <date> · <category> · <doc page> · <one-line claim> · status: raised|accepted|rejected|fixed · <issue/PR url>`
The issue-verifier reads this to never re-raise a rejected finding.
- 2026-08-06 · WRONG · message-recording.mdx · Settings section is "Logs" not "Message recording" · status: accepted (option 1) · https://github.com/mnfst/docs/issues/45 (finding 1)
- 2026-08-06 · WRONG · message-recording.mdx + reference/telemetry.mdx · "older harnesses keep their setting" · status: accepted (custom: do NOT narrate the add/remove/re-add history; just say "check Settings → Logs to make sure logs are on") · https://github.com/mnfst/docs/issues/45 (finding 2)
- 2026-08-06 · OBSOLETE · message-recording.mdx + observability.mdx · navigation is now Requests → attempts · status: accepted (option 1 + use request/attempt vocabulary + ADD glossary entries: request, attempt, Autofix scope) · https://github.com/mnfst/docs/issues/45 (finding 3)
- 2026-08-06 · MISSING-CASE · self-hosted.mdx + message-recording.mdx · pre-July installs need an upgrade step · status: accepted (custom: cloud/self-hosted toggle on the section; self-hosted side says logs were reintroduced in v6.18.0, link to self-hosted Upgrading) · https://github.com/mnfst/docs/issues/45 (finding 4)
- 2026-08-06 · IMAGE · message-recording.mdx · screenshot of Settings → Logs · status: accepted (Seb makes the image) · https://github.com/mnfst/docs/issues/45 (finding 5)
- 2026-08-06 · IMAGE · message-recording.mdx · screenshot of the request window (attempts list + Messages tab) · status: accepted (Seb makes the image) · https://github.com/mnfst/docs/issues/45 (finding 6)
- 2026-08-06 · findings 1-4 applied in https://github.com/mnfst/docs/pull/46 (awaiting review); findings 5-6 await Seb's screenshots.
