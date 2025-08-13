#!/usr/bin/env node
/**
 * mcp__claude-flow__refactor_branch
 * Creates a refactor branch and commits staged changes, ready for PR.
 */
const { execSync } = require("child_process");

function run(cmd) {
    return execSync(cmd, { stdio: "inherit" });
}

const scope = process.env.SCOPE || "general-cleanup";
const branch = `refactor/${scope}`;

run(`git checkout -b ${branch}`);
run(`git add -A`);
run(`git commit -m "refactor: ${scope} (automated branch creation)" || true`);
console.log(branch);
