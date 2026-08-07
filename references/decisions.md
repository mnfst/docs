# Decisions — memory of raised findings and Seb's verdicts

One line per finding: `- <date> · <category> · <doc page> · <one-line claim> · status: raised|accepted|rejected|fixed · <issue/PR url>`
The issue-verifier reads this to never re-raise a rejected finding.
- 2026-08-06 · WRONG · message-recording.mdx · Settings section is "Logs" not "Message recording" · status: fixed (PR #46 merged) · https://github.com/mnfst/docs/issues/45 (finding 1)
- 2026-08-06 · WRONG · message-recording.mdx + reference/telemetry.mdx · "older harnesses keep their setting" · status: fixed (PR #46 merged) · https://github.com/mnfst/docs/issues/45 (finding 2)
- 2026-08-06 · OBSOLETE · message-recording.mdx + observability.mdx · navigation is now Requests → attempts · status: fixed (PR #46 merged) · https://github.com/mnfst/docs/issues/45 (finding 3)
- 2026-08-06 · MISSING-CASE · self-hosted.mdx + message-recording.mdx · pre-July installs need an upgrade step · status: fixed (PR #46 merged) · https://github.com/mnfst/docs/issues/45 (finding 4)
- 2026-08-06 · IMAGE · message-recording.mdx · screenshot of Settings → Logs · status: fixed (image shipped 2026-08-07) · https://github.com/mnfst/docs/issues/45 (finding 5)
- 2026-08-06 · IMAGE · message-recording.mdx · screenshot of the request window · status: fixed (image shipped 2026-08-07) · https://github.com/mnfst/docs/issues/45 (finding 6)
- 2026-08-06 · findings 1-4 applied in https://github.com/mnfst/docs/pull/46 (awaiting review); findings 5-6 await Seb's screenshots.
- 2026-08-07 · WRONG/MISSING-CASE · deploy/heroku.mdx · "one required value" but app.json now marks 4 REQUEST_RECORDING_S3_* required · status: raised · https://github.com/mnfst/docs/issues/48 (finding 1)
- 2026-08-07 · MISSING-CASE · deploy/digitalocean.mdx · template sets STORAGE=s3 but page never asks for a Space + S3 creds · status: raised · https://github.com/mnfst/docs/issues/48 (finding 2)
- 2026-08-07 · MISSING-CASE · deploy/koyeb.mdx · stale deploy link deploys without S3 → logs lost · status: raised · https://github.com/mnfst/docs/issues/48 (finding 3)
- 2026-08-07 · WRONG · deploy/render.mdx · recordings now persist on a mounted 1GB disk (paid Starter, no sleep); doc says ephemeral/needs S3 · status: raised · https://github.com/mnfst/docs/issues/48 (finding 4)
- 2026-08-07 · WRONG · deploy/fly.mdx · deploy.sh auto-provisions Tigris S3; doc says attach a volume · status: raised · https://github.com/mnfst/docs/issues/48 (finding 5)
- 2026-08-07 · WRONG · request-logs.mdx · blanket "Render/Fly/Heroku/Koyeb ephemeral, wire S3 yourself" no longer true · status: raised · https://github.com/mnfst/docs/issues/48 (finding 6)
- 2026-08-07 · MISSING-CASE · deploy/easypanel.mdx · manual-deploy env block omits the recordings volume the template mounts · status: raised · https://github.com/mnfst/docs/issues/48 (finding 7)
- 2026-08-07 · WRONG · reference/environment-variables.mdx · DB_POOL_MAX/AUTH_DB_POOL_MAX defaults are 10/5, doc says 30/10 · status: raised · https://github.com/mnfst/docs/issues/48 (finding 8)
- 2026-08-07 · MISSING-CASE · deploy/aws.mdx · retained S3 recording bucket provisioned; teardown/creation undocumented · status: raised · https://github.com/mnfst/docs/issues/48 (finding 9)
- 2026-08-07 · INTERNAL-LEAK · reference/environment-variables.mdx · lines 32 & 36 name an internal gateway-tester tool + its internal hostname (the *_CORS_ORIGINS var carries the codename) · status: raised · https://github.com/mnfst/docs/issues/48 (finding 10)
- 2026-08-07 · OPEN QUESTION (not a finding, kept out of the public issue) · deploy/railway.mdx + request-logs.mdx · README claims Railway provisions S3-compatible recording storage, but railway.toml has no REQUEST_RECORDING_*/volume/S3 — ask Seb whether Railway auto-provisions; if yes, both pages need the Fly-style correction.
