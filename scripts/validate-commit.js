#!/usr/bin/env node

/**
 * Commit message validation script
 * Validates that commit messages follow conventional commit format
 */

const conventionalCommitRegex = /^(feat|fix|docs|style|refactor|perf|test|chore|ci|build|revert)(\(.+\))?(!)?: .{1,50}/;

function validateCommitMessage(message) {
  const lines = message.trim().split('\n');
  const header = lines[0];

  if (!conventionalCommitRegex.test(header)) {
    return {
      valid: false,
      error: `Invalid commit message format: "${header}"\n\nExpected format: type(scope): description\n\nValid types: feat, fix, docs, style, refactor, perf, test, chore, ci, build, revert\n\nExamples:\n- feat: add new feature\n- fix: resolve bug in authentication\n- docs: update README with new instructions\n- feat!: breaking change in API`
    };
  }

  return { valid: true };
}

// If running as CLI tool
if (require.main === module) {
  const message = process.argv[2] || process.env.COMMIT_MESSAGE;

  if (!message) {
    console.error('Usage: node validate-commit.js "commit message"');
    console.error('   or: COMMIT_MESSAGE="commit message" node validate-commit.js');
    process.exit(1);
  }

  const result = validateCommitMessage(message);

  if (!result.valid) {
    console.error(result.error);
    process.exit(1);
  }

  console.log('✅ Commit message is valid');
  process.exit(0);
}

module.exports = { validateCommitMessage };