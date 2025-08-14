#!/usr/bin/env node
/**
 * Agent Inheritance Script
 * Copies agents from @ascendvent/ai-handbook to .claude/agents directory
 * for Claude Flow integration
 */

const fs = require('fs');
const path = require('path');

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyAgents(sourceDir, targetDir) {
  ensureDirectoryExists(targetDir);
  
  const agentFiles = fs.readdirSync(sourceDir).filter(file => 
    file.endsWith('.md') && file !== 'README.md'
  );
  
  let copiedCount = 0;
  
  for (const agentFile of agentFiles) {
    const sourcePath = path.join(sourceDir, agentFile);
    const targetPath = path.join(targetDir, agentFile);
    
    try {
      const content = fs.readFileSync(sourcePath, 'utf8');
      fs.writeFileSync(targetPath, content);
      console.log(`✓ Inherited agent: ${agentFile}`);
      copiedCount++;
    } catch (error) {
      console.error(`✗ Failed to copy ${agentFile}:`, error.message);
    }
  }
  
  return copiedCount;
}

function inheritAgents() {
  try {
    // Try to find the package in node_modules
    const packagePath = path.join(process.cwd(), 'node_modules', '@ascendvent', 'ai-handbook');
    let sourceAgentsDir;
    
    if (fs.existsSync(packagePath)) {
      sourceAgentsDir = path.join(packagePath, 'agents');
    } else {
      // Fallback: try relative path (for development)
      sourceAgentsDir = path.join(__dirname, '..', 'agents');
    }
    
    if (!fs.existsSync(sourceAgentsDir)) {
      console.error('✗ Could not find agents directory in @ascendvent/ai-handbook package');
      process.exit(1);
    }
    
    const targetAgentsDir = path.join(process.cwd(), '.claude', 'agents');
    
    console.log('🤖 Inheriting Claude Flow agents from @ascendvent/ai-handbook...');
    console.log(`   Source: ${sourceAgentsDir}`);
    console.log(`   Target: ${targetAgentsDir}`);
    console.log('');
    
    const copiedCount = copyAgents(sourceAgentsDir, targetAgentsDir);
    
    console.log('');
    console.log(`🎉 Successfully inherited ${copiedCount} agents!`);
    console.log('');
    console.log('Available agents:');
    
    const inheritedFiles = fs.readdirSync(targetAgentsDir).filter(f => f.endsWith('.md'));
    inheritedFiles.forEach(file => {
      console.log(`   - ${file.replace('.md', '')}`);
    });
    
  } catch (error) {
    console.error('✗ Error inheriting agents:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  inheritAgents();
}

module.exports = { inheritAgents, copyAgents };