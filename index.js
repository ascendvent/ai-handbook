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
function getPolicy(filename = 'POLICY.md') {
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
 * Get a specific playbook
 * @param {string} playbookName - Name of the playbook (e.g., 'REACT-HOOKS.md')
 * @returns {string} Playbook contents
 */
function getPlaybook(playbookName) {
  const filePath = path.join(__dirname, 'playbooks', playbookName);
  return fs.readFileSync(filePath, 'utf8');
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
 * Get all available playbooks
 * @returns {string[]} Array of playbook filenames
 */
function getAvailablePlaybooks() {
  const playbooksDir = path.join(__dirname, 'playbooks');
  return fs.readdirSync(playbooksDir).filter(file => file.endsWith('.md'));
}

/**
 * Validate policy configuration
 * @param {string} projectClaudeConfig - Contents of project's CLAUDE.md
 * @returns {object} Validation result
 */
function validatePolicy(projectClaudeConfig) {
  // Basic validation - check for inheritance declaration
  const hasInheritance = projectClaudeConfig.includes('Inherits:') || 
                        projectClaudeConfig.includes('@ascendvent/ai-handbook');
  
  return {
    valid: hasInheritance,
    message: hasInheritance ? 'Policy inheritance detected' : 'No policy inheritance found'
  };
}

module.exports = {
  getPolicy,
  getClaudeGlobal,
  getPlaybook,
  getTemplate,
  getAvailablePlaybooks,
  validatePolicy,
  version: require('./package.json').version
};