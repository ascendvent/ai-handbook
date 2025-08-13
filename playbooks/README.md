# Ascendvent AI Handbook - Playbooks

Stack-specific AI development patterns and best practices for Ascendvent LLC projects.

## Available Playbooks

| Playbook | Purpose | When to Use |
|----------|---------|-------------|
| [CLAUDE-FLOW.md](./CLAUDE-FLOW.md) | Claude Flow orchestration patterns and MCP tools | Projects using Claude Flow agents |
| [DOCKER.md](./DOCKER.md) | Docker containerization and deployment patterns | Containerized applications |
| [FIREBASE.md](./FIREBASE.md) | Firebase Auth integration and storage abstraction | Projects using Firebase services |
| [GITHUB_ACTIONS.md](./GITHUB_ACTIONS.md) | GitHub Actions workflow management | Projects with CI/CD automation |
| [NODE-EXPRESS.md](./NODE-EXPRESS.md) | Node.js Express backend patterns with TypeScript | Express API development |
| [POSTGRES.md](./POSTGRES.md) | PostgreSQL database patterns and operations | Database-driven applications |
| [REACT-HOOKS.md](./REACT-HOOKS.md) | React hooks patterns and best practices | React frontend applications |
| [TAILWIND.md](./TAILWIND.md) | TailwindCSS + Radix UI component patterns | Styled React applications |
| [TESTING.md](./TESTING.md) | Jest unit tests and Playwright E2E testing standards | All projects requiring testing |
| [TYPESCRIPT.md](./TYPESCRIPT.md) | TypeScript development standards | TypeScript projects |
| [VITE.md](./VITE.md) | Vite build configuration and optimization | React + Vite applications |

## Usage in Projects

Include relevant playbooks in your project's `CLAUDE.md`:

```yaml
Inherits: @ascendvent/ai-handbook@v1.2.2
policy_sources:
  - POLICY.md                    # Always required
  - playbooks/REACT-HOOKS.md     # Only if React project
  - playbooks/NODE-EXPRESS.md    # Only if Express backend
  - playbooks/FIREBASE.md        # Only if using Firebase
  - playbooks/TAILWIND.md        # Only if using TailwindCSS
  - playbooks/VITE.md            # Only if using Vite
  - playbooks/TESTING.md         # Recommended for all projects
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