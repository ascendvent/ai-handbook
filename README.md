# Ascendvent AI Handbook

**Global AI Engineering Guardrails for Ascendvent LLC**
Central policy and standards hub defining how Claude and other AI agents operate across all Ascendvent projects. Provides engineering guardrails, testing protocols, and quality gates for consistent, high-quality AI-assisted development.

---

## Purpose
* **AI Agent Behavior Standards** — Define how Claude operates across company projects
* **Engineering Quality Gates** — Prevent common AI-assisted development pitfalls
* **Systematic Development Protocols** — Enforce methodical approaches over urgency shortcuts
* **Cross-Project Consistency** — Unified standards regardless of product or platform

---

## Structure

| File / Directory                  | Purpose |
|-----------------------------------|---------|
| **POLICY.md**                     | Stack-agnostic global AI behavior rules |
| **CLAUDE_GLOBAL.md**              | Global master policy (inside this package) — never edited in projects |
| **agents/**                       | Automated enforcement agent configurations |
| **templates/CLAUDE.template.md**  | Template for creating a project-level `CLAUDE.md` that inherits global rules |

---

## How Projects Use This

### Key Files

**CLAUDE_GLOBAL.md**
* Located inside `@ascendvent/ai-handbook`
* Authoritative global AI policy
* Never modified in individual projects

**CLAUDE.md**
* Lives in your project root
* Inherits from `CLAUDE_GLOBAL.md`
* Can override or extend policies for project-specific needs

---

## Installation

**1. Configure NPM registry**
```bash
# In project root, create or update .npmrc
echo "@ascendvent:registry=https://npm.pkg.github.com/" > .npmrc
echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" >> .npmrc
```

**2. Add to package.json**
```json
{
  "devDependencies": {
    "@ascendvent/ai-handbook": "^1.4.0"
  }
}
```

**3. Install the package**
```bash
export NPM_TOKEN="your_github_token_here"
npm install
```

**4. Inherit agents locally**
```bash
npx inherit-agents
```

This copies all global agents into your .claude/agents directory.

**5. Add inheritance to CLAUDE.md**
```
Inherits: @ascendvent/ai-handbook
```

---

## Updating Agents

When the package updates:
```bash
npm update @ascendvent/ai-handbook
npx inherit-agents
```

This overwrites existing inherited agents. Custom agents in .claude/agents remain untouched.

---

## Available Agents

**Build & Quality**
* build-config — Validates Docker configs
* local-build — Docker build orchestration
* test-enforcement — Jest coverage enforcement
* pr-checklist — PR validation

**Code Quality**
* refactoring-agent — Code analysis
* react-patterns — Prevents React hook misusage
* typescript-enforcement — Enforces strict TS typing

**Monitoring**
* metrics — Effectiveness reporting
* release-notes — Auto-generates release notes
* security-monitor — Security scanning
* spend-guard — API cost monitoring

---

## Programmatic Usage

```javascript
const handbook = require('@ascendvent/ai-handbook');

// Get global policy
const globalPolicy = handbook.getClaudeGlobal();

// Validate CLAUDE.md inheritance
const config = fs.readFileSync('CLAUDE.md', 'utf8');
console.log(handbook.validatePolicy(config));

// Get agents
const agents = handbook.getAvailableAgents();
console.log(agents);

// Inherit agents manually
handbook.inheritAgents();
```

---

## Local Customization

* Edit inherited agents in .claude/agents
* Add custom agents alongside them
* Only project-level changes override inherited behavior