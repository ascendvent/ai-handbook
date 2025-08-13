#!/usr/bin/env node

const pkg = require('../../package.json');

// Validate package configuration for direct GitHub installation
console.log('Validating Ascendvent AI Handbook package configuration...');

// Check package name
if (!pkg.name.startsWith('@ascendvent/')) {
  console.error('❌ Package name must start with @ascendvent/');
  process.exit(1);
}

// Check that package is marked private (no accidental publishing)
if (!pkg.private) {
  console.error('❌ Package must be private to prevent accidental publishing');
  process.exit(1);
}

// Check license for proprietary content
if (pkg.license !== 'UNLICENSED') {
  console.error('❌ Package must be UNLICENSED for proprietary content');
  process.exit(1);
}

// Validate files array for proper distribution
const requiredFiles = ['index.js', 'POLICY.md', 'CLAUDE_GLOBAL.md', 'playbooks/', 'agents/', 'templates/', 'scripts/'];
const missingFiles = requiredFiles.filter(file => !pkg.files.includes(file));
if (missingFiles.length > 0) {
  console.error(`❌ Missing required files in package.json: ${missingFiles.join(', ')}`);
  process.exit(1);
}

console.log('✅ Package configuration validation passed');
console.log(`✅ ${pkg.name}@${pkg.version} ready for direct GitHub installation`);
console.log('✅ Install via: "github:ascendvent/ai-handbook#v1.1.0"');
console.log('✅ Secure access - requires GitHub repo permissions');