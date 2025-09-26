#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Resolve inheritance directives in CLAUDE.md files
 * This addresses the issue where Claude CLI ignores "Inherits:" directives
 */

/**
 * Parse inheritance directive from a CLAUDE.md file
 * @param {string} claudeContent - Content of CLAUDE.md file
 * @returns {string[]} Array of package names to inherit from
 */
function parseInheritanceDirectives(claudeContent) {
  const lines = claudeContent.split('\n');
  const inheritDirectives = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('Inherits:')) {
      const packageName = trimmed.replace('Inherits:', '').trim();
      if (packageName) {
        inheritDirectives.push(packageName);
      }
    }
  }

  return inheritDirectives;
}

/**
 * Resolve a package name to its installed location
 * @param {string} packageName - NPM package name (e.g., "@ascendvent/ai-handbook")
 * @param {string} startDir - Directory to start resolving from (defaults to cwd)
 * @returns {string|null} Path to the package or null if not found
 */
function resolvePackagePath(packageName, startDir = process.cwd()) {
  try {
    // First try to resolve the package.json if it's exported
    try {
      const packageJsonPath = require.resolve(`${packageName}/package.json`, {
        paths: [startDir]
      });
      return path.dirname(packageJsonPath);
    } catch (exportError) {
      // If package.json is not exported, try to resolve the main entry
      const mainPath = require.resolve(packageName, {
        paths: [startDir]
      });

      // Walk up the directory tree to find package.json
      let currentDir = path.dirname(mainPath);
      while (currentDir !== path.dirname(currentDir)) {
        const packageJsonPath = path.join(currentDir, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
          if (packageJson.name === packageName) {
            return currentDir;
          }
        }
        currentDir = path.dirname(currentDir);
      }

      return null;
    }
  } catch (error) {
    return null;
  }
}

/**
 * Find the CLAUDE configuration file in a package
 * @param {string} packagePath - Path to the package directory
 * @returns {string|null} Path to the CLAUDE file or null if not found
 */
function findClaudeFile(packagePath) {
  const possibleFiles = [
    'CLAUDE_GLOBAL.md',
    'CLAUDE.md',
    'claude-global.md',
    'claude.md'
  ];

  for (const fileName of possibleFiles) {
    const filePath = path.join(packagePath, fileName);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }

  return null;
}

/**
 * Load and resolve inheritance for a CLAUDE.md file
 * @param {string} claudeFilePath - Path to the main CLAUDE.md file
 * @returns {object} Result with resolved content and metadata
 */
function resolveInheritance(claudeFilePath = null) {
  const projectRoot = process.cwd();
  const claudePath = claudeFilePath || path.join(projectRoot, 'CLAUDE.md');

  if (!fs.existsSync(claudePath)) {
    return {
      success: false,
      error: `CLAUDE.md not found at ${claudePath}`,
      resolvedFiles: [],
      warnings: []
    };
  }

  const claudeContent = fs.readFileSync(claudePath, 'utf8');
  const inheritDirectives = parseInheritanceDirectives(claudeContent);

  const result = {
    success: true,
    projectFile: claudePath,
    inheritDirectives,
    resolvedFiles: [],
    warnings: [],
    resolvedContent: claudeContent
  };

  for (const packageName of inheritDirectives) {
    const packagePath = resolvePackagePath(packageName, projectRoot);

    if (!packagePath) {
      result.warnings.push(`Could not resolve package: ${packageName}. Make sure it's installed via npm.`);
      continue;
    }

    const claudeFile = findClaudeFile(packagePath);

    if (!claudeFile) {
      result.warnings.push(`No CLAUDE configuration file found in package: ${packageName}`);
      continue;
    }

    try {
      const inheritedContent = fs.readFileSync(claudeFile, 'utf8');
      result.resolvedFiles.push({
        packageName,
        packagePath,
        claudeFile,
        content: inheritedContent
      });
    } catch (error) {
      result.warnings.push(`Error reading CLAUDE file from ${packageName}: ${error.message}`);
    }
  }

  return result;
}

/**
 * Generate a .claude/config.json file with resolved inheritance
 * @param {object} resolutionResult - Result from resolveInheritance
 * @returns {object} Config object for Claude CLI
 */
function generateClaudeConfig(resolutionResult) {
  const config = {
    memory: {
      project: ['CLAUDE.md'],
      shared: []
    }
  };

  for (const resolved of resolutionResult.resolvedFiles) {
    const relativePath = path.relative(process.cwd(), resolved.claudeFile);
    config.memory.shared.push(relativePath);
  }

  return config;
}

/**
 * Write resolved configuration to .claude/config.json
 * @param {object} resolutionResult - Result from resolveInheritance
 * @returns {string} Path to the config file
 */
function writeClaudeConfig(resolutionResult) {
  const claudeDir = path.join(process.cwd(), '.claude');

  if (!fs.existsSync(claudeDir)) {
    fs.mkdirSync(claudeDir, { recursive: true });
  }

  const config = generateClaudeConfig(resolutionResult);
  const configPath = path.join(claudeDir, 'config.json');

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  return configPath;
}

/**
 * Main function to resolve inheritance and setup Claude CLI configuration
 * @param {object} options - Configuration options
 * @returns {object} Resolution result
 */
function executeInheritance(options = {}) {
  const { claudeFile = null, writeConfig = true, verbose = false } = options;

  console.log('🔍 Resolving CLAUDE.md inheritance...');

  const result = resolveInheritance(claudeFile);

  if (!result.success) {
    console.error(`❌ ${result.error}`);
    return result;
  }

  console.log(`📄 Project file: ${result.projectFile}`);

  if (result.inheritDirectives.length === 0) {
    console.log('ℹ️  No inheritance directives found');
    return result;
  }

  console.log(`🔗 Found ${result.inheritDirectives.length} inheritance directive(s):`);
  for (const directive of result.inheritDirectives) {
    console.log(`   - Inherits: ${directive}`);
  }

  console.log(`✅ Resolved ${result.resolvedFiles.length} inherited file(s):`);
  for (const resolved of result.resolvedFiles) {
    console.log(`   - ${resolved.packageName}: ${resolved.claudeFile}`);
  }

  if (result.warnings.length > 0) {
    console.log('⚠️  Warnings:');
    for (const warning of result.warnings) {
      console.log(`   - ${warning}`);
    }
  }

  if (writeConfig) {
    const configPath = writeClaudeConfig(result);
    console.log(`📝 Updated Claude configuration: ${configPath}`);
  }

  if (verbose) {
    console.log('\n📋 Resolved memory configuration:');
    const config = generateClaudeConfig(result);
    console.log(JSON.stringify(config, null, 2));
  }

  return result;
}

module.exports = {
  parseInheritanceDirectives,
  resolvePackagePath,
  findClaudeFile,
  resolveInheritance,
  generateClaudeConfig,
  writeClaudeConfig,
  executeInheritance
};

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    claudeFile: args.find(arg => arg.startsWith('--file='))?.split('=')[1],
    writeConfig: !args.includes('--no-config'),
    verbose: args.includes('--verbose') || args.includes('-v')
  };

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: node resolve-inheritance.js [options]

Options:
  --file=PATH      Path to CLAUDE.md file (default: ./CLAUDE.md)
  --no-config      Don't write .claude/config.json
  --verbose, -v    Show detailed output
  --help, -h       Show this help

Examples:
  node resolve-inheritance.js
  node resolve-inheritance.js --verbose
  node resolve-inheritance.js --file=./custom/CLAUDE.md
  node resolve-inheritance.js --no-config
`);
    process.exit(0);
  }

  const result = executeInheritance(options);
  process.exit(result.success ? 0 : 1);
}