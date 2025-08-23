#!/usr/bin/env node

const pkg = require('../../package.json');
const fs = require('fs');
const path = require('path');

console.log('Validating Universal AI Engineering Handbook package...');

// Check package name
if (!pkg.name.startsWith('@ascendvent/')) {
  console.error('❌ Package name must start with @ascendvent/');
  process.exit(1);
}

// Check open source configuration
if (!pkg.publishConfig || pkg.publishConfig.registry !== 'https://registry.npmjs.org/') {
  console.error('❌ Package must be configured for public NPM registry');
  process.exit(1);
}

if (!pkg.publishConfig.access || pkg.publishConfig.access !== 'public') {
  console.error('❌ Package access must be public for open source');
  process.exit(1);
}

// Check Apache 2.0 license
if (pkg.license !== 'Apache-2.0') {
  console.error('❌ Package must use Apache-2.0 license for open source');
  process.exit(1);
}

// Validate required files exist
const requiredFiles = [
  'index.js',
  'CLAUDE_GLOBAL.md', 
  'LICENSE',
  'CONTRIBUTING.md',
  'agents/',
  'templates/'
];

for (const file of requiredFiles) {
  const filePath = path.join(__dirname, '../../', file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Required file missing: ${file}`);
    process.exit(1);
  }
}

// Validate agents directory has content
const agentsDir = path.join(__dirname, '../../agents');
const agentFiles = fs.readdirSync(agentsDir).filter(f => f.endsWith('.md') && f !== 'README.md');
if (agentFiles.length === 0) {
  console.error('❌ Agents directory must contain at least one .md agent file');
  process.exit(1);
}

// Validate templates directory
const templatesDir = path.join(__dirname, '../../templates'); 
const templateFiles = fs.readdirSync(templatesDir);
if (!templateFiles.includes('CLAUDE.template.md')) {
  console.error('❌ Templates directory must contain CLAUDE.template.md');
  process.exit(1);
}

console.log('✅ Package configuration validation passed');
console.log(`✅ ${pkg.name}@${pkg.version} ready for public NPM registry`);
console.log(`✅ Found ${agentFiles.length} agent files`);
console.log('✅ Apache 2.0 licensed open source project');
console.log('✅ Install via: npm install @ascendvent/ai-handbook');