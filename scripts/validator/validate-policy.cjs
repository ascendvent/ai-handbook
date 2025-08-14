#!/usr/bin/env node

const pkg = require('../../package.json');

// Validate package configuration for direct GitHub installation
console.log('Validating Ascendvent AI Handbook package configuration...');

// Check package name
if (!pkg.name.startsWith('@ascendvent/')) {
  console.error('❌ Package name must start with @ascendvent/');
  process.exit(1);
}

// Check GitHub Package Registry configuration
if (!pkg.publishConfig || pkg.publishConfig.registry !== 'https://npm.pkg.github.com/') {
  console.error('❌ Package must be configured for GitHub Package Registry');
  process.exit(1);
}

if (!pkg.publishConfig.access || pkg.publishConfig.access !== 'restricted') {
  console.error('❌ Package access must be restricted');
  process.exit(1);
}

// Check that private is NOT set (GitHub Package Registry doesn't use private: true)
if (pkg.private === true) {
  console.error('❌ Remove "private": true for GitHub Package Registry');
  process.exit(1);
}

// Check license for proprietary content
if (pkg.license !== 'UNLICENSED') {
  console.error('❌ Package must be UNLICENSED for proprietary content');
  process.exit(1);
}

// Validate files array for proper distribution
const requiredFiles = ['index.js', 'CLAUDE_GLOBAL.md', 'agents/', 'templates/', 'scripts/'];
const missingFiles = requiredFiles.filter(file => !pkg.files.includes(file));
if (missingFiles.length > 0) {
  console.error(`❌ Missing required files in package.json: ${missingFiles.join(', ')}`);
  process.exit(1);
}

console.log('✅ Package configuration validation passed');
console.log(`✅ ${pkg.name}@${pkg.version} ready for GitHub Package Registry`);
console.log('✅ Publishes to: https://npm.pkg.github.com/');
console.log('✅ Install via: npm install @ascendvent/ai-handbook');
console.log('✅ Secure access - requires GitHub org permissions');