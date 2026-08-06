# Decisions — memory of raised findings and Seb's verdicts

One line per finding: `- <date> · <category> · <doc page> · <one-line claim> · status: raised|accepted|rejected|fixed · <issue/PR url>`
The issue-verifier reads this to never re-raise a rejected finding.
- 2026-08-06 · WRONG · message-recording.mdx · Settings section is "Logs" not "Message recording" · status: raised · https://github.com/mnfst/docs/issues/45 (finding 1)
- 2026-08-06 · WRONG · message-recording.mdx + reference/telemetry.mdx · "older harnesses keep their setting" is false, upgrade set all to off · status: raised · https://github.com/mnfst/docs/issues/45 (finding 2)
- 2026-08-06 · OBSOLETE · message-recording.mdx + observability.mdx · drawer navigation is Attempts sidebar + per-attempt tabs, not "Messages next to Attempts" · status: raised · https://github.com/mnfst/docs/issues/45 (finding 3)
- 2026-08-06 · MISSING-CASE · self-hosted.mdx + message-recording.mdx · pre-July installs need install.sh --upgrade or recordings are lost on container recreation · status: raised · https://github.com/mnfst/docs/issues/45 (finding 4)
- 2026-08-06 · IMAGE · message-recording.mdx · screenshot of Settings → Logs · status: raised · https://github.com/mnfst/docs/issues/45 (finding 5)
- 2026-08-06 · IMAGE · message-recording.mdx · screenshot of Attempts sidebar + Messages tab · status: raised · https://github.com/mnfst/docs/issues/45 (finding 6)
