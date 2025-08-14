# Claude Flow Agent and Policy Inheritance

This package provides a set of reusable Claude Flow agents and global policies that can be inherited by sub-projects.

## Quick Setup

After installing the package:

```bash
# Install the package
npm install @ascendvent/ai-handbook

# Inherit the agents to your .claude/agents directory
npx inherit-agents
```

This will copy all agents from the package to your local `.claude/agents` directory where Claude Flow can discover them.

## **REQUIRED**: Policy Inheritance

**You MUST add this as the FIRST LINE of your project's `CLAUDE.md` file:**

```markdown
Inherits: @ascendvent/ai-handbook
```

This line tells Claude that your project inherits the global policies and standards from this package. The inheritance system automatically applies:

- Global behavior protocols from `CLAUDE_GLOBAL.md`
- All Claude Flow agents with their embedded technical knowledge
- Agent enforcement rules and patterns
- Testing and quality standards

### Example Project CLAUDE.md Structure

```markdown
Inherits: @ascendvent/ai-handbook

# Project Name - Claude Configuration

## Project-Specific Rules
[Your project-specific overrides and additions here]

## Tech Stack
- React (react-patterns agent will activate)
- TypeScript (typescript-enforcement agent will activate)
- Docker (local-build agent will handle builds)
- PostgreSQL

## Custom Agents
[Any project-specific agent configurations]
```

The inheritance system applies policies and agents automatically:
1. **Global policies** from `CLAUDE_GLOBAL.md` 
2. **All inherited agents** determine applicability based on codebase analysis
3. **Project-specific rules** take precedence for conflicts

## Available Agents

The following agents are available for inheritance:

**Build & Quality Agents:**
- **build-config** - Validates Docker configurations and build requirements
- **local-build** - Docker builds with rebuild/restart decision matrix
- **test-enforcement** - Test coverage enforcement with Jest patterns
- **pr-checklist** - Pull request validation and requirements

**Code Quality & Analysis Agents:**
- **refactoring-agent** - Code analysis and refactoring recommendations
- **react-patterns** - React hook stability and infinite loop prevention
- **typescript-enforcement** - Strict TypeScript typing and compilation validation

**Monitoring & Management Agents:**
- **metrics** - Effectiveness metrics and reporting
- **release-notes** - Automated release note generation
- **security-monitor** - Security scan monitoring
- **spend-guard** - API cost monitoring and budget enforcement

## Programmatic Usage

You can also work with agents and policies programmatically:

```javascript
const handbook = require('@ascendvent/ai-handbook');

// Get global Claude policy
const globalPolicy = handbook.getClaudeGlobal();

// Validate policy inheritance in project CLAUDE.md
const projectConfig = fs.readFileSync('CLAUDE.md', 'utf8');
const validation = handbook.validatePolicy(projectConfig);
console.log(validation);

// Get list of available agents
const agents = handbook.getAvailableAgents();
console.log('Available agents:', agents);

// Get specific agent content
const reactAgent = handbook.getAgent('react-patterns');
const buildConfig = handbook.getAgent('build-config');

// Inherit all agents to .claude/agents
const result = handbook.inheritAgents();
if (result.success) {
  console.log('Agents inherited successfully!');
}
```

## Agent Structure

Each agent is a Markdown file with YAML frontmatter:

```markdown
---
name: agent-name
description: Agent description
tools: Bash,Read,Grep,Glob
model: sonnet
---

Agent prompt and instructions...
```

## Integration with Claude Flow

Once inherited, agents appear in your `.claude/agents` directory and are automatically discovered by Claude Flow. You can:

1. Use them in Hive Mind workflows
2. Reference them in flows
3. Customize them by editing the local copies
4. Create new agents following the same pattern

## Updating Agents

To get the latest agent updates:

```bash
# Update the package
npm update @ascendvent/ai-handbook

# Re-inherit the agents
npx inherit-agents
```

**Note**: This will overwrite any local modifications to inherited agents.

## Local Customization

After inheritance, you can:

- Modify agents in `.claude/agents/` for project-specific needs
- Add your own custom agents to the same directory
- Mix inherited and custom agents in your workflows

The inheritance system provides a foundation while allowing full customization for your specific project requirements.