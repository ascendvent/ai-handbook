# Ascendvent AI Handbook - Playbooks

Stack-specific AI development patterns and best practices for Ascendvent LLC projects.

## Available Playbooks

| Playbook | Purpose | When to Use |
|----------|---------|-------------|
| [CLAUDE-FLOW.md](./CLAUDE-FLOW.md) | Claude Flow orchestration patterns and MCP tools | Projects using Claude Flow agents |
| [DOCKER.md](./DOCKER.md) | Docker containerization and deployment patterns | Containerized applications |
| [GITHUB_ACTIONS.md](./GITHUB_ACTIONS.md) | GitHub Actions workflow management | Projects with CI/CD automation |
| [POSTGRES.md](./POSTGRES.md) | PostgreSQL database patterns and operations | Database-driven applications |
| [REACT-HOOKS.md](./REACT-HOOKS.md) | React hooks patterns and best practices | React frontend applications |
| [TYPESCRIPT.md](./TYPESCRIPT.md) | TypeScript development standards | TypeScript projects |

## Usage in Projects

Include relevant playbooks in your project's `CLAUDE.md`:

```yaml
Inherits: ascendvent/ai-handbook@v1.1.0
policy_sources:
  - POLICY.md                    # Always required
  - playbooks/REACT-HOOKS.md     # Only if React project
  - playbooks/DOCKER.md          # Only if containerized
  - playbooks/TYPESCRIPT.md      # Only if TypeScript project
  - playbooks/POSTGRES.md        # Only if using PostgreSQL
  - playbooks/GITHUB_ACTIONS.md  # Only if using GitHub Actions
  - playbooks/CLAUDE-FLOW.md     # Only if using Claude Flow
```

## Playbook Structure Standard

Each playbook follows this format:

1. **Purpose** - Clear statement of what this playbook covers
2. **Core Patterns** - Common use cases and implementation patterns
3. **Best Practices** - DO/DON'T guidelines
4. **Troubleshooting** - Common issues and solutions
5. **Integration** - How this playbook connects with others

## Contributing

When adding new playbooks:
- Follow the standard structure above
- Include practical code examples
- Reference relevant POLICY.md sections
- Update this README with the new playbook entry