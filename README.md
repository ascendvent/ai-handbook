# Ascendvent AI Handbook

**Global AI Engineering Guardrails for Ascendvent LLC**

This repository serves as the central policy and standards hub that defines how Claude and other AI agents should behave across all Ascendvent projects. It establishes engineering guardrails, testing protocols, and quality gates to ensure consistent high-quality AI-assisted development.

## Purpose
- **AI Agent Behavior Standards** - Define how Claude operates across company projects
- **Engineering Quality Gates** - Prevent common AI-assisted development pitfalls
- **Systematic Development Protocols** - Enforce methodical approaches over urgency shortcuts
- **Cross-Project Consistency** - Unified standards regardless of specific product or platform

## Structure
- **POLICY.md** - Stack-agnostic global AI behavior rules and protocols
- **CLAUDE_GLOBAL.md** - Comprehensive Claude agent guidelines and enforcement
- **playbooks/** - Stack-specific AI development patterns (React, Docker, TypeScript, etc.)
- **agents/** - Automated enforcement agent configurations and expectations
- **templates/CLAUDE.template.md** - Template for project-specific CLAUDE.md inheritance

## How Ascendvent Projects Use This

### Installation

### Developer Setup

**Option A: Project-Level Configuration (Recommended)**

1. **Create `.npmrc` in your project directory**:
  ```bash
   # In your project root
   echo "@ascendvent:registry=https://npm.pkg.github.com/" > .npmrc
   echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" >> .npmrc
   ```
2. **Set environment variable**:

  ```bash export NPM_TOKEN="your_github_token_here"
   npm install
  ```

3. **Add to your package.json**:

  ```javascript
  {
    "dependencies": {
      "@ascendvent/ai-handbook": "^1.2.2"
    }
  }
  ```

**Option B: Global Configuration**:

```bash
echo "@ascendvent:registry=https://npm.pkg.github.com/" >> ~/.npmrc
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> ~/.npmrc
npm install
```

---
### Security Best Practices

#### GitHub Token Setup:
1. Create token at: https://github.com/settings/tokens
2. Minimum Required Permissions: `read:packages`
3. Expiration: set reasonable expiry (90 days recommended)
4. Scope: only grant access to necessary orgs

#### Security Recommendations:
	*	Use project-level .npmrc with environment variables
	*	Add `.npmrc` to `.gitignore`
	*	Rotate tokens on a schedule
	*	Audit token access regularly
	*	Do not store tokens in plain text globally
	*	Do not commit `.npmrc` with tokens

#### Current Approach: 
GitHub Package Registry with restricted access. Only Ascendvent GitHub org members can install.

```text
Enterprise Scaling Note: 

For larger teams or higher security needs consider:
•	Artifactory/Nexus - enterprise npm registries with advanced security scanning
•	AWS CodeArtifact - managed registry with IAM integration
•	Verdaccio - self-hosted lightweight registry
```

See INSTALLATION.md for detailed setup instructions.

---
### Initial Project Configuration
1.	Install the package:
  ```bash
  npm install @ascendvent/ai-handbook
  ```

2.	Copy template to your project:
```bash
node -e "const h=require('@ascendvent/ai-handbook'); require('fs').writeFileSync('CLAUDE.md', h.getTemplate())"
```

3.	Edit your `CLAUDE.md` to inherit from this handbook version
4.	Include only relevant playbooks for your tech stack
5.	Validate policy inheritance:
```bash
node -e "const h=require('@ascendvent/ai-handbook'); console.log(h.validatePolicy(require('fs').readFileSync('CLAUDE.md','utf8')))"
```

## Usage Example

```javascript
const handbook = require('@ascendvent/ai-handbook');

// Get global policy and Claude config
const policy = handbook.getPolicy();
const claudeConfig = handbook.getClaudeGlobal();

// Get specific playbooks for your stack
const reactHooks = handbook.getPlaybook('REACT-HOOKS.md');
const typescript = handbook.getPlaybook('TYPESCRIPT.md');
```

## Agent Inheritance System

### How Agent Discovery Works

When projects inherit from this handbook, agents are automatically discovered through **convention over configuration**:

#### ✅ Correct Pattern (Automatic Discovery)
```yaml
# In your project's CLAUDE.md
Inherits: @ascendvent/ai-handbook@v1.2.2
policy_sources:
  - POLICY.md                    # Always required
  - playbooks/REACT-HOOKS.md     # Only if React project
  - playbooks/DOCKER.md          # Only if containerized
  # etc...
```

**That's it!** Claude Code automatically:
1. Scans your CLAUDE.md for inheritance declarations
2. Discovers agents in `node_modules/@ascendvent/ai-handbook/.claude-flow/agents/`
3. Merges with any local project-specific agents in `.claude-flow/agents/`
4. Makes all agents available via Task tool

#### ❌ Incorrect Patterns (Don't Do This)

- **DON'T add manual path declarations** - All agents are claude-flow and live in the `node_modules/@ascendvent/ai-handbook/.claude-flow/agents/` directory
- **DON'T copy agent files locally** (breaks inheritance)
- **DON'T manually configure paths** in `.claude-flow/claude-flow.config.json`

#### Agent Discovery Troubleshooting

If inherited agents aren't working:

1. **Verify Inheritance Declaration**: Check `CLAUDE.md` has `Inherits: @ascendvent/ai-handbook@vX.X.X`
2. **Remove Manual Path Declarations**: Delete any explicit agent path lines from CLAUDE.md
3. **Check Local Configuration**: Ensure `.claude-flow/claude-flow.config.json` doesn't reference non-existent local agent files
4. **Test Discovery**: Use Task tool to verify both inherited and local agents are accessible

#### Local + Inherited Agent Pattern

Projects can have both inherited and local agents:

```bash
.claude-flow/agents/
  └── research-agent.agent.json          # Project-specific agent

node_modules/@ascendvent/ai-handbook/.claude-flow/agents/
  ├── build-config.agent.json            # Inherited agent
  ├── pr-checklist.agent.json            # Inherited agent  
  ├── test-enforcement.agent.json        # Inherited agent
  └── ... (8 more inherited agents)
```

#### Advanced: Configuration Extension

For projects needing custom agent configurations, create `.claude-flow/config.json`:

```json
{
  "version": "1.0.0",
  "extends": "@ascendvent/ai-handbook/config.json",
  "settings": {
    "agentsDirectory": "./.claude-flow/agents",
    "logLevel": "info"
  },
  "agents": [
    {
      "name": "Custom Project Agent",
      "file": ".claude-flow/agents/custom-project.agent.json",
      "triggers": ["manual"],
      "enabled": true
    }
  ]
}
```

**Override Rules:**
- Same name in consumer config → consumer version replaces shared version
- New name in consumer config → agent is added alongside shared defaults

## Inheritance Pattern

#### In your project's `CLAUDE.md`

```text
Inherits: @ascendvent/ai-handbook@v1.2.2
policy_sources:
  - POLICY.md                    # Always required
  - playbooks/REACT-HOOKS.md     # Only if React project
  - playbooks/DOCKER.md          # Only if containerized
  - playbooks/TYPESCRIPT.md      # Only if TypeScript project
```
### Versioning and Updates
*	Projects pin to specific handbook versions like `v1.0.0`, `v1.2.2`, etc.
*	Version updates require deliberate review of policy changes
*	Automated agents enforce compliance across inherited projects
*	Changes to core policies require policy-change PR labels and human approval

### Key Features
*	Anti-urgency protocols that prevent rushed implementations
*	Agent-first development that favors automation before manual work
*	Testing-first methodology. No code changes without passing tests
*	Automated refactoring detection for DRY violations dead code and architecture quality
*	Infinite loop prevention with patterns for React and callback stability
*	Systematic debugging. Component → Hook → Dependency chain analysis

