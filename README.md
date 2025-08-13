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

### Developer Setup

**Option A: Project-Level Configuration (Recommended)**

1. **Create `.npmrc` in your project directory**:
   ```bash
   # In your project root
   echo "@ascendvent:registry=https://npm.pkg.github.com/" > .npmrc
   echo "//npm.pkg.github.com/:_authToken=\${NPM_TOKEN}" >> .npmrc
   ```

2. **Set environment variable** (secure, doesn't persist token):
   ```bash
   export NPM_TOKEN="your_github_token_here"
   npm install
   ```

3. **Add to your `package.json`**:
   ```json
   {
     "dependencies": {
       "@ascendvent/ai-handbook": "^1.1.0"
     }
   }
   ```

**Option B: Global Configuration** (less secure, but convenient):
```bash
echo "@ascendvent:registry=https://npm.pkg.github.com/" >> ~/.npmrc
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> ~/.npmrc
npm install
```

### Security Best Practices

**GitHub Token Setup:**
1. Create token at: https://github.com/settings/tokens
2. **Minimum Required Permissions:** `read:packages`
3. **Expiration:** Set reasonable expiry (90 days recommended)
4. **Scope:** Only grant access to necessary orgs

**🔒 Security Recommendations:**
- ✅ Use project-level `.npmrc` with environment variables
- ✅ Add `.npmrc` to `.gitignore` (never commit tokens)
- ✅ Use token rotation policy
- ✅ Audit token access regularly
- ❌ Don't store tokens in plain text globally
- ❌ Don't commit `.npmrc` with tokens to repositories

**Current Approach:** GitHub Package Registry with restricted access - only Ascendvent GitHub org members can install.

**Enterprise Scaling Note:** For larger teams or enhanced security requirements, consider migrating to:
- **Artifactory/Nexus** - Enterprise npm registries with advanced security scanning
- **AWS CodeArtifact** - Managed registry with IAM integration  
- **Verdaccio** - Self-hosted lightweight registry

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

