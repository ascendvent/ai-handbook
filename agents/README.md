# AI Agent Enforcement Catalog

**Automated guardrail enforcement across all Ascendvent LLC projects**

These agents automatically enforce the policies defined in this handbook across every project that inherits from `@ascendvent/ai-handbook`. They run via Claude Flow and ensure consistent AI-assisted development standards company-wide.

## Agent Discovery & Inheritance

### Automatic Inheritance (Default)
When you install `@ascendvent/ai-handbook`, all agents are automatically available to Claude Code through the inheritance system. No manual configuration required.

```bash
npm install @ascendvent/ai-handbook
```

**How It Works:**
1. Add `Inherits: @ascendvent/ai-handbook@v1.2.2` to your project's CLAUDE.md
2. Claude Code automatically discovers agents from `node_modules/@ascendvent/ai-handbook/.claude-flow/agents/`
3. Agents merge with any local project-specific agents
4. All agents become available via the Task tool

**Agent files are located at:**
- `node_modules/@ascendvent/ai-handbook/.claude-flow/agents/*.agent.json`
- MCP tools: `node_modules/@ascendvent/ai-handbook/tools/mcp/`

## Core Enforcement Agents

| Agent                       | Enforces                                           | Trigger                    |
|-----------------------------|----------------------------------------------------|-----------------------------|
| PR Checklist Agent          | Tests updated, docs updated, linked spec present  | PR creation/update          |
| Test Enforcement Agent      | Coverage bar enforcement, test quality gates      | PR events, manual runs      |
| Build and Config Agent      | Build config validation, Docker health checks     | PR sync, feature pushes     |
| Spend Guard Agent           | AI API cost thresholds and daily budget caps      | Every API call, hourly cron |
| Metrics and Telemetry Agent | SLI events collection and weekly performance reports | Run completion, weekly schedule |
| Research Agent              | Evidence-based methodology and architecture analysis | Manual spawn for research tasks |
| Security Monitor Agent      | Security scan results, critical issue hotfixes    | Security scan completion    |
| Release Notes Agent         | Automated CHANGELOG updates from PR patterns      | Merge to develop/main       |
| **Refactoring Agent**       | **DRY violations, dead code detection, architecture quality** | **Pre-spec implementation, PR sync, monthly cron** |

## Scope & Inheritance
- **Runs automatically** in all repos with `CLAUDE.md` files that inherit from this handbook
- **Version-controlled enforcement** based on the handbook version each project pins to
- **Stack-aware validation** applies only relevant playbook rules (React hooks for React projects, etc.)
- **Cross-project consistency** ensures uniform AI development standards across Ascendvent LLC

### Available Inherited Agents
[Current agent table above shows all available agents]

### Local Project Agents
You can add project-specific agents to `.claude-flow/agents/` that work alongside inherited agents.

### Troubleshooting
If agents aren't working:
1. Verify `Inherits: @ascendvent/ai-handbook@vX.X.X` in CLAUDE.md
2. Remove any manual path declarations from CLAUDE.md
3. Check that `.claude-flow/claude-flow.config.json` doesn't reference deleted local agent files
4. Ensure the package is properly installed: `npm list @ascendvent/ai-handbook`

## Agent Behavior Standards
All agents follow the same systematic protocols defined in `POLICY.md`:
- Anti-urgency bias protocols (no shortcuts under pressure)
- Agent-first usage patterns (use automation before manual intervention)
- Testing-first methodology (no changes without passing tests)
- Comprehensive verification and logging requirements

