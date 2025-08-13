# AI Handbook – Shared Claude Flow Agent Package

## Overview
The **AI Handbook** project provides a canonical set of Claude Flow agents, triggers, and settings that can be consumed and extended by other projects.  
This ensures consistency across all implementations while allowing each project to add its own local agents without duplicating shared defaults.

## Repository Structure

```bash
ai-handbook/
├── config.json                         # Canonical defaults for all consumers
├── .claude-flow/
│   └── agents/                          # Shared agent definitions
│       ├── pr-checklist.agent.json
│       ├── release-notes.agent.json
│       ├── security-monitor.agent.json
│       ├── test-enforcement.agent.json
│       ├── local-build.agent.json
│       └── build-config.agent.json
├── CLAUDE_GLOBAL.md                     # Global AI agent behavior guidelines
├── POLICY.md                            # Organization-wide AI policies
├── docs/
│   ├── bugs/
│   └── specs/
├── package.json
└── README.md
```

## How It Works
- **`config.json`** in this repository defines all shared settings and agent definitions.
- **`.claude-flow/agents/`** contains the default agent JSON files.
- **Consumers** use `extends` in their `.claude-flow/config.json` to inherit from this package.
- Consumers **only** declare agents in their config if they are:
  - Project-specific agents
  - Overrides of an existing shared agent (matching `name`)


## Installation in a Consumer Project

## 1. Install the package:

```bash
npm install --save-dev @your-org/claude-agents
```
## 2.	Create .claude-flow/config.json in the consumer project:

```bash
{
  "version": "1.0.0",
  "extends": "@your-org/claude-agents/config.json",
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

## 3.	Add your local agent in .claude-flow/agents/custom-project.agent.json:

```bash
{
  "version": "1.0.0",
  "name": "Custom Project Agent",
  "description": "Example project-specific agent.",
  "type": "researcher",
  "entrypoint": {
    "mode": "prompt",
    "system": ["You are a project-specific agent."],
    "instructions": ["Perform the required research and output a summary."]
  },
  "triggers": ["manual"],
  "enabled": true
}
```

## Running Claude Flow with Inheritance

From the consumer project root:

#### View merged config (package + local)
```bash
claude-flow hive-mind status --claude-config ./.claude-flow/claude-flow.config.json
```
#### Spawn a task
```bash
claude-flow hive-mind spawn "research topic=Example" \
  --max-workers 1 \
  --claude-config ./.claude-flow/claude-flow.config.json \
  --claude
```
#### Resume a session
```bash
claude-flow hive-mind spawn "resume work from session-XXXX" \
  --max-workers 1 \
  --claude-config ./.claude-flow/claude-flow.config.json \
  --claude
```

#### Override Rules
	•	Same name in the consumer config → consumer version replaces shared version.
	•	New name in the consumer config → agent is added alongside shared defaults.


#### Best Practices for Consumers
*	Keep agent name stable to allow consistent overrides.
*	Avoid duplicating all shared agents — only add or override as needed.
*	Use relative paths in the file property so agents work across environments.
*	Document project-specific agents for maintainability.

### Updating the Shared Package

When modifying or adding agents in ai-handbook:
1.	Update .claude-flow/agents/ with new or revised agent files.
2.	Update config.json to reference the new agents.
3.	Increment the package version in package.json.
4.	Publish the package so consumers can pick up the changes.



## Changelog
All significant changes to agents or configuration should be documented in the CHANGELOG.md file before publishing.

