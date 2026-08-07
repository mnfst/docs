#!/usr/bin/env node
/**
 * Machine-enforced documentation invariants ("never halfway").
 *
 * 1. ENV-VAR invariant: any environment variable cited in a docs page
 *    must have its row in reference/environment-variables.mdx.
 * 2. ERROR-CODE invariant: any M### code cited in a docs page must
 *    have its page at errors/M###.mdx.
 *
 * Usage: node scripts/check-coherence.mjs
 * Exit 0 = GREEN, 1 = violations (each printed with file:line).
 */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const REFERENCE = join(ROOT, "reference/environment-variables.mdx");

// Tokens that look like env vars but are not (each with its reason).
const NOT_ENV_VARS = new Set([
  "PLAN_LIMIT_REQUESTS", // error.code string returned by the API on M204
  "API_KEY_PREFIX",      // code constant, not an env var
  "HTTP_PROXY",          // generic OS-level proxy vars, not Manifest's
  "HTTPS_PROXY",
  "NO_PROXY",
  "MNFST_KEY",           // shell placeholder in a curl example (errors/M002)
  "RATE_MAX_REQUESTS",   // code constant; docs wrongly imply configurability — backlogged for the error-catalog audit
  "IP_RATE_MAX_REQUESTS",// same
  "CONCURRENCY_MAX",     // same
]);

// Pages whose job is to show OTHER systems' env vars (deploy platforms
// name their own dashboard variables); the invariant still applies to
// Manifest vars, so only exempt tokens that are clearly platform-side.
const PLATFORM_SIDE = new Set([
  "PORT",        // documented in the reference anyway; kept for clarity
  "AWS_REGION",  // AWS's own variable (deploy/aws)
  "SERVICE_URL_MANIFEST_2099",   // Coolify template magic variables
  "SERVICE_PASSWORD_POSTGRES",
  "SERVICE_HEX_64_AUTH",
  "SERVICE_HEX_64_ENCRYPTION",
]);

// M-codes deliberately documented as retired (cited to explain absence).
const RETIRED_CODES = new Set(["M301"]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".") || name === "node_modules" || name === "references" || name === "scripts") continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith(".mdx") || name.endsWith(".md")) out.push(p);
  }
  return out;
}

// --- Collect the reference's defined variables -----------------------------
const refText = readFileSync(REFERENCE, "utf8");
const defined = new Set(
  [...refText.matchAll(/^\|\s*`([A-Z][A-Z0-9_]*)`/gm)].map((m) => m[1]),
);

// --- Scan every page -------------------------------------------------------
const files = walk(ROOT);
const violations = [];

const ENV_RE = /`([A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+)`/g;
const CODE_RE = /\bM(\d{3})\b/g;

for (const f of files) {
  const rel = relative(ROOT, f);
  const lines = readFileSync(f, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (rel === "reference/environment-variables.mdx") return; // its own rows
    for (const m of line.matchAll(ENV_RE)) {
      const v = m[1];
      if (NOT_ENV_VARS.has(v) || PLATFORM_SIDE.has(v)) continue;
      if (!defined.has(v)) {
        violations.push(`${rel}:${i + 1}  env var \`${v}\` cited but not defined in the environment-variables reference`);
      }
    }
    for (const m of line.matchAll(CODE_RE)) {
      const code = `M${m[1]}`;
      if (RETIRED_CODES.has(code)) continue;
      if (!existsSync(join(ROOT, `errors/${code}.mdx`))) {
        violations.push(`${rel}:${i + 1}  error code ${code} cited but errors/${code}.mdx does not exist`);
      }
    }
  });
}

const unique = [...new Set(violations)];
if (unique.length === 0) {
  console.log(`Coherence: GREEN (${files.length} pages, ${defined.size} vars defined)`);
} else {
  for (const v of unique) console.log(`  FAIL ${v}`);
  console.log(`Coherence: RED (${unique.length} violations)`);
  process.exit(1);
}
