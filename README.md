# Ascendvent AI Handbook

**Global AI Engineering Guardrails for Ascendvent LLC**

This repository serves as the central policy and standards hub that defines how Claude and other AI agents should behave across all Ascendvent projects. It establishes engineering guardrails, testing protocols, and quality gates to ensure consistent, high-quality AI-assisted development.

## Purpose
- **AI Agent Behavior Standards** – Define how Claude operates across company projects
- **Engineering Quality Gates** – Prevent common AI-assisted development pitfalls
- **Systematic Development Protocols** – Enforce methodical approaches over urgency shortcuts
- **Cross-Project Consistency** – Unified standards regardless of specific product or platform

## Structure
- **POLICY.md** – Stack-agnostic global AI behavior rules and protocols
- **CLAUDE_GLOBAL.md** – Comprehensive Claude agent guidelines and enforcement
- **playbooks/** – Stack-specific AI development patterns (React, Docker, TypeScript, etc.)
- **agents/** – Automated enforcement agent configurations and expectations
- **templates/CLAUDE.template.md** – Template for project-specific CLAUDE.md inheritance

## How Ascendvent Projects Use This

### Installation

Add to your `package.json`:
```json
{
  "dependencies": {
    "@ascendvent/ai-handbook": "github:ascendvent/ai-handbook#v1.1.0"
  }
}
```

See [INSTALLATION.md](./INSTALLATION.md) for detailed setup instructions.

### Initial Setup
1. **Install** the package: `npm install @ascendvent/ai-handbook`
2. **Copy** template to your project: `node -e "const h=require('@ascendvent/ai-handbook'); require('fs').writeFileSync('CLAUDE.md', h.getTemplate())"`
3. **Edit** your `CLAUDE.md` to inherit from this handbook version
4. **Include** only relevant playbooks for your tech stack
5. **Validate** policy inheritance: `node -e "const h=require('@ascendvent/ai-handbook'); console.log(h.validatePolicy(require('fs').readFileSync('CLAUDE.md','utf8')))"`

### Usage Example
```javascript
const handbook = require('@ascendvent/ai-handbook');

// Get global policy and Claude config
const policy = handbook.getPolicy();
const claudeConfig = handbook.getClaudeGlobal();

// Get specific playbooks for your stack
const reactHooks = handbook.getPlaybook('REACT-HOOKS.md');
const typescript = handbook.getPlaybook('TYPESCRIPT.md');
```

## Inheritance Pattern
```yaml
# In your project's CLAUDE.md
Inherits: ascendvent/ai-handbook@v1.1.0
policy_sources:
  - POLICY.md                    # Always required
  - PLAYBOOKS/REACT-HOOKS.md     # Only if React project
  - PLAYBOOKS/DOCKER.md          # Only if containerized
  - PLAYBOOKS/TYPESCRIPT.md      # Only if TypeScript project
```

## Versioning & Updates
- Projects pin to specific handbook versions (`v1.0.0`, `v1.1.0`, etc.)
- Version updates require deliberate review of policy changes
- Automated agents enforce compliance across all inherited projects
- Changes to core policies require `policy-change` PR labels and human approval

## Key Features
- **Anti-Urgency Protocols** – Prevent rushed implementations under pressure
- **Agent-First Development** – Use automation before manual intervention
- **Testing-First Methodology** – No code changes without passing tests
- **Infinite Loop Prevention** – Specific patterns for React and callback stability
- **Systematic Debugging** – Component → Hook → Dependency chain analysis

