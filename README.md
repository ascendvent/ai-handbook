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

### Initial Setup
1. **Copy** `templates/CLAUDE.template.md` into your project repo as `CLAUDE.md`
2. **Inherit** from this handbook with version pinning: `ascendvent/ai-handbook@v1.0.0`
3. **Include** only relevant playbooks for your tech stack
4. **Add** project-specific rules while maintaining global compliance
5. **Validate** policy inheritance through automated CI checks

### Node.js Project Integration
For Node.js projects, add this to your `package.json`:

```json
{
  "scripts": {
    "policy:validate": "node scripts/validate-claude-policy.js",
    "policy:update": "git submodule update --remote ai-handbook"
  },
  "devDependencies": {
    "@ascendvent/policy-validator": "^1.0.0"
  }
}
```

Then add the handbook as a git submodule:
```bash
# Add handbook as submodule for policy inheritance
git submodule add https://github.com/ascendvent/ai-handbook.git .ai-handbook

# Install policy validation tools
npm install --save-dev @ascendvent/policy-validator

# Validate your CLAUDE.md inherits correctly
npm run policy:validate
```

## Inheritance Pattern
```yaml
# In your project's CLAUDE.md
Inherits: ascendvent/ai-handbook@v1.0.0
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

