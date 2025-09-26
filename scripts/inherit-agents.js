#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Inherit agents from the handbook to .claude/agents directory
 * This is the script referenced in index.js
 */
function inheritAgents(targetDir = null) {
  const agentsSourceDir = path.join(__dirname, '../agents');
  const defaultTargetDir = path.join(process.cwd(), '.claude', 'agents');
  const agentsTargetDir = targetDir || defaultTargetDir;

  // Create target directory if it doesn't exist
  if (!fs.existsSync(agentsTargetDir)) {
    fs.mkdirSync(agentsTargetDir, { recursive: true });
  }

  // Copy all agent files
  const agentFiles = fs.readdirSync(agentsSourceDir).filter(file =>
    file.endsWith('.md') && file !== 'README.md'
  );

  let copiedCount = 0;
  for (const file of agentFiles) {
    const sourcePath = path.join(agentsSourceDir, file);
    const targetPath = path.join(agentsTargetDir, file);

    fs.copyFileSync(sourcePath, targetPath);
    copiedCount++;
  }

  console.log(`✅ Inherited ${copiedCount} agent files to ${agentsTargetDir}`);
  return { count: copiedCount, directory: agentsTargetDir };
}

module.exports = { inheritAgents };

// Run if called directly
if (require.main === module) {
  inheritAgents();
}