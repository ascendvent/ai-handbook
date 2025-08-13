# Installation Guide

## For Ascendvent Projects

### Method 1: GitHub Package (Recommended)

Add to your `package.json`:

```json
{
  "dependencies": {
    "@ascendvent/ai-handbook": "github:ascendvent/ai-handbook#v1.1.1"
  }
}
```

Then install:
```bash
npm install
```

### Method 2: GitHub Package Registry (For Ascendvent Organization Members)

First, authenticate with GitHub Package Registry:

1. **Create a GitHub Personal Access Token**:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Create token with `packages:read` permission
   - For Ascendvent organization members only

2. **Configure npm**:
```bash
# Set registry for @ascendvent scope
npm config set @ascendvent:registry https://npm.pkg.github.com/

# Authenticate (replace YOUR_TOKEN with your GitHub token)
npm config set //npm.pkg.github.com/:_authToken YOUR_GITHUB_TOKEN
```

3. **Install the package**:
```bash
npm install @ascendvent/ai-handbook@1.0.0
```

## Usage in Your Project

### Basic Usage

```javascript
const handbook = require('@ascendvent/ai-handbook');

// Get global policy
const policy = handbook.getPolicy();

// Get Claude global configuration
const claudeConfig = handbook.getClaudeGlobal();

// Get specific playbook
const reactHooks = handbook.getPlaybook('REACT-HOOKS.md');

// Get template for new projects
const template = handbook.getTemplate();

// List available playbooks
const playbooks = handbook.getAvailablePlaybooks();
console.log(playbooks); // ['DOCKER.md', 'POSTGRES.md', 'REACT-HOOKS.md', 'TYPESCRIPT.md']
```

### Setting Up CLAUDE.md Inheritance

1. Copy the template to your project:
```javascript
const handbook = require('@ascendvent/ai-handbook');
const fs = require('fs');

// Get template and save to your project
const template = handbook.getTemplate();
fs.writeFileSync('./CLAUDE.md', template);
```

2. Edit your `CLAUDE.md` to inherit from this handbook:
```markdown
# Inherits: @ascendvent/ai-handbook@v1.0.0

# Your Project Name

<!-- Add project-specific rules here while maintaining global compliance -->
```

### Validation

Validate your project's policy inheritance:

```javascript
const handbook = require('@ascendvent/ai-handbook');
const fs = require('fs');

const projectClaudeConfig = fs.readFileSync('./CLAUDE.md', 'utf8');
const validation = handbook.validatePolicy(projectClaudeConfig);

if (!validation.valid) {
  console.error('Policy validation failed:', validation.message);
  process.exit(1);
}
```

## Updating Versions

To update to a new version of the handbook:

1. Update your `package.json`:
```json
{
  "dependencies": {
    "@ascendvent/ai-handbook": "github:ascendvent/ai-handbook#v1.1.0"
  }
}
```

2. Run npm install:
```bash
npm install
```

3. Review and update your `CLAUDE.md` inheritance version:
```markdown
# Inherits: @ascendvent/ai-handbook@v1.1.0
```

## Available Exports

The package provides the following exports:

- `@ascendvent/ai-handbook` - Main API
- `@ascendvent/ai-handbook/policy` - Direct access to POLICY.md
- `@ascendvent/ai-handbook/claude-global` - Direct access to CLAUDE_GLOBAL.md
- `@ascendvent/ai-handbook/playbooks/*` - Individual playbooks
- `@ascendvent/ai-handbook/templates/*` - Templates
- `@ascendvent/ai-handbook/scripts/*` - Utility scripts

## Troubleshooting

### Authentication Issues with GitHub Package Registry

If you get authentication errors:

1. Create a GitHub Personal Access Token with `packages:read` permission
2. Configure npm: `npm config set //npm.pkg.github.com/:_authToken YOUR_TOKEN`
3. Or use the direct GitHub method: `"@ascendvent/ai-handbook": "github:ascendvent/ai-handbook#v1.0.0"`

### Package Not Found

Ensure you have access to the `ascendvent/ai-handbook` repository and your GitHub token has the necessary permissions.