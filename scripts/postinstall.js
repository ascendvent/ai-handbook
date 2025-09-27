#!/usr/bin/env node

/**
 * Post-install script for @ascendvent/ai-handbook
 * Automatically resolves inheritance if CLAUDE.md exists in the project root
 */

const fs = require('fs');
const path = require('path');
const { resolveInheritance } = require('../index.js');

function main() {
  // Check if we're in a project that has a CLAUDE.md file
  const projectRoot = process.cwd();
  const claudeFile = path.join(projectRoot, 'CLAUDE.md');

  if (!fs.existsSync(claudeFile)) {
    console.log('📝 No CLAUDE.md found in project root. Skipping inheritance resolution.');
    console.log('   To create one: npx @ascendvent/ai-handbook init');
    return;
  }

  try {
    const claudeContent = fs.readFileSync(claudeFile, 'utf8');

    // Check if it contains inheritance directive
    if (!claudeContent.includes('Inherits: @ascendvent/ai-handbook')) {
      console.log('📝 CLAUDE.md found but no inheritance directive detected.');
      console.log('   Add "Inherits: @ascendvent/ai-handbook" to the first line to enable inheritance.');
      return;
    }

    console.log('🔍 CLAUDE.md with inheritance detected. Resolving inheritance...');

    const result = resolveInheritance({ claudeFile, writeConfig: true, verbose: false });

    if (result.success && result.resolvedFiles.length > 0) {
      console.log('✅ Inheritance resolved automatically!');
      console.log(`   Inherited: ${result.resolvedFiles.map(f => f.packageName).join(', ')}`);
      console.log('   Your Claude CLI should now have access to the handbook.');
    } else if (result.success && result.resolvedFiles.length === 0) {
      console.log('ℹ️  No inheritance directives found to resolve.');
    } else {
      console.log('⚠️  Could not resolve inheritance automatically.');
      console.log('   Run: npx @ascendvent/ai-handbook claude-inherit');
    }
  } catch (error) {
    console.log('⚠️  Error during automatic inheritance resolution:', error.message);
    console.log('   Run: npx @ascendvent/ai-handbook claude-inherit');
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };