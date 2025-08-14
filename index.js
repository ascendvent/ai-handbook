/**
 * @ascendvent/ai-handbook
 * Global AI Engineering Guardrails for Ascendvent LLC
 */

const fs = require('fs');
const path = require('path');

/**
 * Get the contents of a policy file
 * @param {string} filename - The filename to read
 * @returns {string} File contents
 */
function getPolicy(filename = 'CLAUDE_GLOBAL.md') {
  const filePath = path.join(__dirname, filename);
  return fs.readFileSync(filePath, 'utf8');
}

/**
 * Get the contents of the global Claude configuration
 * @returns {string} CLAUDE_GLOBAL.md contents
 */
function getClaudeGlobal() {
  return getPolicy('CLAUDE_GLOBAL.md');
}

/**
 * Get the Claude template
 * @returns {string} CLAUDE.template.md contents
 */
function getTemplate() {
  const filePath = path.join(__dirname, 'templates', 'CLAUDE.template.md');
  return fs.readFileSync(filePath, 'utf8');
}

/**
 * Get agent file contents
 * @param {string} agentName - Name of the agent (without .md extension)
 * @returns {string} Agent file contents
 */
function getAgent(agentName) {
  const fileName = agentName.endsWith('.md') ? agentName : `${agentName}.md`;
  const filePath = path.join(__dirname, 'agents', fileName);
  return fs.readFileSync(filePath, 'utf8');
}

/**
 * Get all available agents
 * @returns {string[]} Array of agent filenames
 */
function getAvailableAgents() {
  const agentsDir = path.join(__dirname, 'agents');
  return fs.readdirSync(agentsDir).filter(file => 
    file.endsWith('.md') && file !== 'README.md'
  );
}

/**
 * Inherit agents to .claude/agents directory
 * @param {string} targetDir - Target directory (defaults to .claude/agents in cwd)
 * @returns {object} Result with count and status
 */
function inheritAgents(targetDir = null) {
  const { inheritAgents: inherit } = require('./scripts/inherit-agents.js');
  try {
    inherit();
    return { success: true, message: 'Agents inherited successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

/**
 * Validate policy configuration
 * @param {string} projectClaudeConfig - Contents of project's CLAUDE.md
 * @returns {object} Validation result
 */
function validatePolicy(projectClaudeConfig) {
  // Check for inheritance declaration as first line
  const lines = projectClaudeConfig.trim().split('\n');
  const firstLine = lines[0] || '';
  const hasFirstLineInheritance = firstLine.includes('Inherits: @ascendvent/ai-handbook');
  
  // Also check for inheritance anywhere in the document (backward compatibility)
  const hasAnyInheritance = projectClaudeConfig.includes('Inherits:') || 
                           projectClaudeConfig.includes('@ascendvent/ai-handbook');
  
  if (hasFirstLineInheritance) {
    return {
      valid: true,
      message: 'Policy inheritance correctly declared on first line'
    };
  } else if (hasAnyInheritance) {
    return {
      valid: true,
      warning: true,
      message: 'Policy inheritance found but should be on first line of CLAUDE.md'
    };
  }
  
  return {
    valid: false,
    message: 'No policy inheritance found. Add "Inherits: @ascendvent/ai-handbook" as first line'
  };
}

module.exports = {
  getPolicy,
  getClaudeGlobal,
  getTemplate,
  getAgent,
  getAvailableAgents,
  inheritAgents,
  validatePolicy,
  version: require('./package.json').version
};