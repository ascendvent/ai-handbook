#!/usr/bin/env node

/**
 * Claude Inheritance Helper
 * A CLI tool to resolve CLAUDE.md inheritance directives
 *
 * This tool addresses the issue where Claude CLI ignores "Inherits:" directives
 * by manually resolving them and setting up the proper .claude/config.json
 */

const { resolveInheritance } = require('../index.js');

function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Claude Inheritance Helper

Usage: npx @ascendvent/ai-handbook claude-inherit [options]

This tool resolves "Inherits:" directives in your CLAUDE.md file and sets up
the proper .claude/config.json for Claude CLI to load inherited configurations.

Options:
  --file=PATH      Path to CLAUDE.md file (default: ./CLAUDE.md)
  --no-config      Don't write .claude/config.json
  --verbose, -v    Show detailed output
  --help, -h       Show this help

Examples:
  npx @ascendvent/ai-handbook claude-inherit
  npx @ascendvent/ai-handbook claude-inherit --verbose
  npx @ascendvent/ai-handbook claude-inherit --file=./custom/CLAUDE.md

This addresses the Claude CLI bug where inheritance directives are ignored.
After running this command, your Claude CLI session should have access to
the inherited handbook content.
`);
    return;
  }

  const options = {
    claudeFile: args.find(arg => arg.startsWith('--file='))?.split('=')[1],
    writeConfig: !args.includes('--no-config'),
    verbose: args.includes('--verbose') || args.includes('-v')
  };

  const result = resolveInheritance(options);

  if (result.success && result.resolvedFiles.length > 0) {
    console.log(`
✅ Inheritance resolved successfully!

Your Claude CLI should now have access to:
- Project memory: CLAUDE.md
- Shared memory: ${result.resolvedFiles.map(f => f.packageName).join(', ')}

You can verify this works by running:
  claude memory list

If the inheritance still doesn't work in Claude CLI, this indicates the
CLI itself needs to be updated to support inheritance resolution.
`);
  } else if (result.success && result.resolvedFiles.length === 0) {
    console.log('ℹ️  No inheritance directives found in CLAUDE.md');
  } else {
    console.error(`❌ Failed to resolve inheritance: ${result.error}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };