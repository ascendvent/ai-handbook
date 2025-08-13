#!/usr/bin/env node
/**
 * mcp__claude-flow__refactor_analyze
 * Scans repo and emits a markdown report + optional branch plan.
 * NOTE: Replace TODOs with your analyzer(s) (e.g., jscodeshift, ts-morph, madge, eslint plugins).
 */
const fs = require("fs");
const { execSync } = require("child_process");

const REPORT = process.env.REPORT_PATH || "docs/reports/refactor-analysis.md";
const INCLUDE = (process.env.INCLUDE || "client/**,server/**,src/**").split(",");
const EXCLUDE = (process.env.EXCLUDE || "**/node_modules/**,**/dist/**,**/build/**,**/.next/**,**/coverage/**,**/generated/**").split(",");

function run(cmd) {
    return execSync(cmd, { stdio: "pipe" }).toString().trim();
}

function ensureDir(p) {
    fs.mkdirSync(p, { recursive: true });
}

function header() {
    return `# Refactoring Analysis Report

Generated: ${new Date().toISOString()}

> Scope include: ${INCLUDE.join(", ")}
> Scope exclude: ${EXCLUDE.join(", ")}

`;
}

function section(title, body) {
    return `## ${title}\n\n${body}\n\n`;
}

function placeholder(name) {
    return `- [TODO] Hook up ${name} analyzer and list findings here.`;
}

// --- TODO: Wire real analyzers here ---
const dryFindings = placeholder("DRY (duplicate-code)");
const deadCode = placeholder("Dead code (unused exports/imports, orphaned files)");
const arch = placeholder("Architecture (circular deps, cohesion)");
const consolidation = placeholder("Consolidation (shared utils/hooks/components)");

const recommended = `1. Create branch \`refactor/focus-area\`.
2. Remove dead code and unused exports.
3. Extract shared utilities/components.
4. Add/adjust tests to keep coverage bar green.
`;

const md =
    header() +
    section("DRY Violations Found", dryFindings) +
    section("Dead Code Identified", deadCode) +
    section("Architecture Quality Notes", arch) +
    section("Consolidation Opportunities", consolidation) +
    section("Recommended Actions (Prioritized)", recommended);

ensureDir("docs/reports");
fs.writeFileSync(REPORT, md, "utf8");

// Emit minimal machine-readable summary to stdout if desired
console.log(JSON.stringify({ report: REPORT, status: "ok" }));
