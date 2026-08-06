#!/usr/bin/env bash
# Environment check for the docs-sync harness.
set -u
FAIL=0
if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
  echo "  ok        gh authenticated ($(gh api user -q .login))"
else
  echo "  MISSING   gh CLI authenticated (gh auth login)"; FAIL=1
fi
gh repo view mnfst/docs >/dev/null 2>&1 && echo "  ok        access to mnfst/docs" || { echo "  MISSING   access to mnfst/docs"; FAIL=1; }
gh repo view mnfst/manifest >/dev/null 2>&1 && echo "  ok        access to mnfst/manifest" || { echo "  MISSING   access to mnfst/manifest"; FAIL=1; }
CLONE="$HOME/codebase/manifest/manifest"
[ -d "$CLONE/.git" ] && echo "  ok        platform clone at $CLONE" || { echo "  MISSING   platform clone at $CLONE"; FAIL=1; }
[ "$FAIL" = 0 ] && echo "Ready to audit." || { echo "Fix MISSING items before auditing."; exit 1; }
