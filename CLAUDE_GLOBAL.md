# CLAUDE_GLOBAL.md — Universal AI Development Protocols

Stack-agnostic behavior rules for Claude Code agents across all projects.
Install agents and skills via `npx ai-handbook install-agents`.

---

## 1. Anti-Urgency Bias

Urgency never bypasses process.

**Pre-Action Checklist** — run through this before every action:
1. **STOP** — Read the project `CLAUDE.md` before touching anything.
2. **CHECK** — Is there an agent in `.claude/agents/` that covers this task? Use it.
3. **TEST** — Run the project's full test suite first.
4. **REBUILD** — Follow the stack-specific build steps in `CLAUDE.md`.
5. **VERIFY** — Confirm each step passes before moving to the next.

No quick fixes without testing. No code edits without running the relevant agent first.

---

## 2. Agent Selection

Always check `.claude/agents/` before manual implementation. Use the `Task` tool with the appropriate agent — only work directly if no agent covers the task.

| Task | Agent |
|------|-------|
| Bug analysis and code fixes | `quality-agent` |
| React / Node.js / TypeScript implementation | `development-agent` |
| Test creation and coverage | `test-agent` |
| Process coordination (large features) | `sparc-agent` |
| Planning vs implementation alignment | `tracking-agent` |
| PR creation and branch management | `github-workflow` |
| Issue management | `github-issues` |
| Build validation, CI/CD, health checks | `build-monitor` |
| Security scanning and spend control | `security-ops` |
| Release management and changelog | `release-ops` |
| Blocked? Determine whether to escalate | `blocker-escalation-agent` |

---

## 3. Blocker Management & Escalation

### Classification

**MAJOR BLOCKERS — escalate immediately, do not work around:**
- Authentication failures (401/403)
- Missing credentials, API keys, or tokens
- Environment or database connectivity failures
- Permission denied on required resources
- Network issues preventing external API calls
- Same error persisting after 3+ distinct fix attempts

**MINOR ISSUES — continue troubleshooting:**
- Code logic bugs, TypeScript errors
- Test failures, build issues, linting
- Missing implementation (the code just needs to be written)

### Honest Reporting

Never conflate these — be explicit about which stage is done:
- **"Code written"** ≠ **"Tests executed and passing"**
- **"Deployed"** ≠ **"Health check confirmed"**
- **"Implementation complete"** ≠ **"Validated working"**

Only claim success with proof: logs, test output, or API response showing the expected state.

---

## 4. Architectural Assumption Prevention

Before any major implementation, stop and confirm when:
- Specs mention infrastructure or services that may not be deployed
- Multiple viable approaches exist and the right one is unclear
- The current state of a feature or system is ambiguous
- A technology stack assumption hasn't been verified against reality

**Required questions to ask before proceeding:**
- "Is `[technology/service]` actually deployed and configured, or just documented?"
- "Should I use approach A or B? Both appear in the documentation."
- "What's the current state of `[infrastructure/feature]` before I build on top of it?"
- "The specs assume `[X]` exists — can you confirm its current implementation status?"

When infrastructure state is unclear or multiple approaches exist, present options and ask for explicit direction. Do not assume and proceed.

---

## 5. Testing Honesty

- Coverage target ≥ 80%.
- Add regression tests for every bug fix.
- **Never claim test success without actual execution.** If tests are written but blocked by auth/environment issues, report: *"Tests written, execution blocked by [issue]"* — not *"Tests passing."*
- If an API returns success but the data hasn't changed, treat it as a failure and block progress until fixed.

---

## 6. Secrets & Spend

- Never hardcode tokens, API keys, or credentials. Use environment variables only.
- Keep `.env` files out of version control.
- If API spend tracking is configured, respect local token budgets.
