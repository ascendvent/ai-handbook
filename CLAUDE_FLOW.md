# Claude Flow Best Practices

## Setup
- Always run `npx claude-flow init` before first use to create memory and coordination directories.
- Keep a `CLAUDE.md` in the repo root with coding standards, workflow patterns, and context for the project.
- Install `@anthropic-ai/claude-code` globally for CLI access.

## Usage Patterns
- **Swarm**: Default choice for ~80% of tasks (quick, one-off work).
- **Hive-Mind**: Use for multi-step or collaborative flows that need persistence, context, or multiple agents.
- **Model Choice**:
  - `opus-4` → deep reasoning, complex builds, high-quality alpha.
  - `sonnet-4` → faster, cheaper iteration or lightweight tasks.

## Prompting
- Treat Claude like a sharp but forgetful new teammate: be explicit, structured, and provide examples.
- Use role prompting (“act as a reviewer,” “act as a planner”) for clarity.
- Break down big tasks into phases (`/plan → /implement → /test → /review`).
- Encourage Claude to explain reasoning, admit uncertainty, and suggest alternatives.

## Collaboration
- Use `CLAUDE.md` as a shared knowledge base for style guides, branch naming, test conventions, and workflows.
- Hold regular reviews of Flow usage to align on practices across the team.
- For sensitive integrations, use MCP servers instead of direct CLI access for security.

## Hive-Mind Optimization
- Pick the right topology:
  - Mesh → flexible collaboration
  - Hierarchical → structured builds
  - Ring → sequential pipelines
  - Star → centralized control
- Scale agent count by complexity:  
  - 2–3 (small tasks)  
  - 4–6 (medium)  
  - 7–12 (large)
- Use namespaces for memory and clean out stale state regularly.
- Export reusable flows as patterns for consistency.

## Workflow Habits
- Use spec files (`spec.md`) with `swarm "$(cat spec.md)"` for long prompts.
- Commit frequently with clear messages; checkpointing is key.
- Expect to refine or reroll complex tasks rather than one-shot them.
- For pull requests, configure `claude-code-review.yml` to focus on bugs, security, and logic, not verbosity.

## Troubleshooting
- Error: “missing memory/coordination” → re-run `npx claude-flow init`.
- Flow stalls → confirm global install of `@anthropic-ai/claude-code`.
- Use `--verbose` to debug Claude’s planning and task splits.

---

# Claude Flow Cheat Sheet

### Core Commands
- `npx claude-flow init` → initialize required directories  
- `npx claude-flow swarm "task description"` → run quick one-off task  
- `npx claude-flow hive-mind spawn "objective"` → start multi-agent flow  
- `npx claude-flow hive-mind status` → check hive state  
- `npx claude-flow hive-mind resume` → resume a paused session  
- `npx claude-flow hive-mind stop` → stop a running hive  

### Do’s
- Do use `spec.md` for long tasks.  
- Do checkpoint often with commits.  
- Do pick models by task type (`opus-4` for reasoning, `sonnet-4` for speed).  
- Do keep `CLAUDE.md` updated with conventions.  

### Don’ts
- Don’t skip `init` (most common setup failure).  
- Don’t overload a swarm — use hive-mind for multi-step flows.  
- Don’t expect one-shot perfection — iteration is the workflow.  
- Don’t leave stale memory/coordination directories — clean regularly.  