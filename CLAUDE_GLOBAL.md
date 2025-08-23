# CLAUDE_GLOBAL.md — Global Policy (Stack-Agnostic)

## 1. Purpose
Universal AI development handbook for projects using Claude Code and AI-assisted development.
Defines constraints, coding standards, SDLC protocols, testing requirements, bug management, documentation rules, agent usage, telemetry, and cost controls.
**Note:** This file provides global policies that can be inherited by projects via `Inherits: @your-org/ai-handbook` pattern.

---

## 2. Anti-Urgency Bias Protocols
**Rule:** Urgency never bypasses process.

**Pre-Action Checklist**
1. STOP — Reference project `CLAUDE.md` before any action.
2. CHECK — If an agent exists, use it.
3. TEST — Run the project's full test checklist.
4. REBUILD — Follow stack-specific rules.
5. VERIFY — Confirm each step passes.

**Forbidden Shortcuts**
* No quick fixes without testing.
* No direct code edits without running the appropriate agent.
* No skipping build/compilation.
* No bypassing systematic debugging.

---

## 3. Mandatory Agent Usage & Critical Rules

### Agent-First (MANDATORY)
- **ALWAYS** check `.claude/agents/` before ANY manual implementation work.
- **REQUIRED** for these task types:
  - Bug analysis and fixes → `quality-agent` 
  - React/Node.js implementation → `development-agent`
  - Test creation → `test-agent`
  - Code quality issues → `quality-agent`
  - Process coordination → `sparc-agent`
  - GitHub workflows → `github-workflow`
  - GitHub issues management → `github-issues`
  - Build and CI/CD → `build-monitor`
  - Security and spend → `security-ops`
  - Releases and deployment → `release-ops`
  - Planning and tracking → `tracking-agent`
  - Blocker Management and escalation → `blocker-escalation-agent`
- **Workflow**: Use `Task` tool with appropriate `subagent_type` BEFORE any manual Read/Write/Edit operations.
- **Exception**: Only skip agents for trivial tasks (single line changes, documentation updates).

### Blocker Management & Escalation
- **MAJOR BLOCKERS** require immediate escalation to user: Authentication failures, API access issues, missing credentials, environment configuration problems that prevent core functionality validation
- **MINOR ISSUES** continue troubleshooting: Code logic bugs, test failures, build issues, TypeScript errors
- **VALIDATION vs IMPLEMENTATION**: Never claim "validation success" without actual successful execution - distinguish between "code written" and "feature validated"
- **STOP AND ASK** when hitting authentication/access blockers - don't create elaborate workarounds and claim success
- **BE HONEST** about limitations - report "implementation complete, validation blocked" instead of false claims

### Authentication/Access Escalation Criteria
- **401/403 errors** preventing API testing → STOP and ask for auth guidance
- **Missing API keys or tokens** → STOP and ask for credentials  
- **Environment setup blockers** → STOP and ask for configuration help
- **Permission issues** preventing file access → STOP and ask for permissions
- **Network/connectivity issues** preventing external API calls → STOP and ask for network guidance
- **Requirement and Tack Clarification** → STOP and ask follow up questions to research and ensure details for verification all asks

**Available Agents**
(Located in `/agents/` directory)
* **Development:** development-agent, quality-agent, test-agent
* **Process Management:** sparc-agent, tracking-agent, blocker-escalation-agent
* **GitHub Integration:** github-workflow, github-issues
* **Operations:** build-monitor, security-ops, release-ops

**Usage Protocol**
1. Identify the task.
2. Check `/agents/` directory for an agent covering it.
3. Use `Task` tool with appropriate `subagent_type` parameter.
4. Only proceed manually if no agent covers the task.

**Available Agent Types:**
- blocker-escalation-agent
- build-monitor  
- development-agent
- github-issues
- github-workflow
- quality-agent
- release-ops
- security-ops
- sparc-agent
- test-agent
- tracking-agent
---

## 4. Testing Protocols (No Exceptions)
Before any code change:

1. Run the full test suite.
2. Block progress if failures occur.
3. Follow clean build rules enforced by local-build agent.

**Universal Testing Standards**
- Coverage target ≥ 80%.
- Add regression tests for every bug fix.
- Route handlers covered with Jest + Supertest (or equivalent).
- PR merges blocked on failing tests, TypeScript errors, or build failures.

**Safety Gates**
- Tests must pass locally before PR.
- TypeScript must compile clean.
- Docker build must succeed if containerized.
- User story reference (US-XXX) required for all feature work.
- **📋 Planning document alignment validated before merge**.
- **📊 User story status updated when features completed**.

Violations = Immediate Stop
---

## 5. Process Compliance
Each action must:

* Reference relevant CLAUDE.md protocol.
* Use agents first.
* Pass all tests.
* Follow rebuild and verification rules.

**Compliance Checklist**
* Protocol check done
* Agent availability verified
* Tests passed
* Docs updated
* Rebuild verified

---

## 6. Development Guidelines
* Strict typing and linting.
* Follow repo-specific formatters.
* Prefer functional patterns.
---

## 7. Testing & Bug Management
**TDD Workflow**
* Unit → Integration → E2E.
* Coverage meets global bar.
* Manual smoke tests before PR.

**Bug Logging**
* Repro steps, environment, severity.
* Include failing test.
* Commit references bug ID.

**Severity Matrix**
* Critical — Immediate fix + regression test.
* High — Fix next sprint.
* Medium — Scheduled fix.
* Low — Backlog.

---

## 8. Performance & Loop Prevention
* Avoid unstable dependencies in hooks.
* Memoize callbacks.
* Monitor console warnings, network activity, and memory usage.

**Performance & Loop Prevention (Frontend)**
- Avoid unstable deps in effects and callbacks.
- Memoize callbacks and derived values where necessary.
- Watch for rapid identical requests and excessive render cycles.

**Refactoring Expectations (Repo-level DRY)**
- Consolidate shared logic into `/shared` when used by both client and server.
- Detect and resolve duplicate or near-duplicate modules, including stale copies in different dirs.
- Identify dangling files not imported anywhere; either delete or merge.
- Preserve behavior; minimal diffs preferred.

---

## 9. Data Verification
* Verify persistence before/after API calls.
* Pair endpoint tests with state inspection.
* If API returns success but data unchanged, block progress until fixed.

**Data Verification (Backend)**
- Verify persistence before/after API calls.
- If API returns success with no state change, treat as a failure and block progress.

**Spend & Secrets**
- Do not hardcode tokens. Use env files and keep them out of VCS.
- Local token budgets enforced by agents where configured.

---

## 10. Change Verification
After changes:

1. Confirm build success.
2. Verify logs.
3. Test feature behavior.
4. Roll back if change not applied.

---

## 11. Feature Development Workflow
**SPEC-FIRST**
* Overview, user stories, acceptance criteria, tech + UX requirements, tests, dependencies, DoD.

**Process**
1. Get spec approval.
2. Implement in phases.
3. Test & document.
4. PR review required before merge.

---

## 12. Git & SDLC Rules
* No commits to main or develop.
* Branch per task.
* Update docs and tests.
* PR stops at review.

---

## 13. Observability & Metrics
* Export agent run metadata.
* Generate weekly performance reports.

---

## 14. Change Control
* policy-change PR label for CLAUDE.md edits.
* PR includes rationale + rollout checklist.

---

## 15. Troubleshooting Quick Reference
**Success Indicators**
* Clean logs.
* Health checks green.
* No loop warnings.

**Common Fixes**
* Hook stabilization (see react-patterns agent).
* Callback memoization (see refactoring-agent).
* Dependency cleanup (see typescript-enforcement).