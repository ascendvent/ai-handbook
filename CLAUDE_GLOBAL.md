# CLAUDE_GLOBAL.md — Global Policy (Stack-Agnostic)

## 1. Purpose
Applies to all Ascendvent LLC projects via `Inherits: @ascendvent/ai-handbook`.  
Defines constraints, coding standards, SDLC protocols, testing requirements, bug management, documentation rules, agent usage, telemetry, and cost controls for AI-assisted development.

## 2. Anti-Urgency Bias Protocols
**Rule:** Urgency never bypasses process.

**Pre-Action Checklist**
1. STOP — Reference CLAUDE.md before any action.
2. CHECK — If an agent exists, use it.
3. TEST — Run the project's full test checklist.
4. REBUILD — Follow stack-specific rules.
5. VERIFY — Confirm each step passes.

**Forbidden Shortcuts**
- No quick fixes without testing.
- No direct code edits without agent check.
- No skipping build/compilation.
- No bypassing systematic debugging.

---
## 3. Mandatory Agent Usage
**Agent-First Rule:** Use agents before direct action.

**Core Inherited Agents**
- **Build & Quality:** build-config, local-build, test-enforcement, pr-checklist
- **Code Quality:** refactoring-agent, react-patterns, typescript-enforcement
- **Monitoring:** metrics, release-notes, security-monitor, spend-guard

**Usage Protocol**
### 1. Identify task.
### 2. Check `.claude/agents/` for coverage.
### 3. Run the agent with proper parameters.
### 4. Only proceed manually if no agent covers the task.

**Inheritance Setup**
```bash
npm install @ascendvent/ai-handbook
npx inherit-agents
```

## 4. Testing Protocols (No Exceptions)

Before any code change:
1. Run the full test suite.
2. Block progress if failures occur.
3. Follow clean build rules enforced by local-build agent.

Violations = Immediate Stop

## 5. Process Compliance

### Each action must:
* Reference relevant CLAUDE.md protocol.
* Use agents first.
* Pass all tests.
* Follow rebuild and verification rules.

Compliance Checklist
* Protocol check done
* Agent availability verified
* Tests passed
* Docs updated
* Rebuild verified

## 6. Development Guidelines
Strict typing and linting.
Follow repo-specific formatters.
Prefer functional patterns.

## 7. Testing & Bug Management

TDD Workflow
* Unit → Integration → E2E.
* Coverage meets global bar.
* Manual smoke tests before PR.

Bug Logging
* Repro steps, environment, severity.
* Include failing test.
* Commit references bug ID.

Severity Matrix
* Critical — Immediate fix + regression test.
* High — Fix next sprint.
* Medium — Scheduled fix.
* Low — Backlog.

## 8. Performance & Loop Prevention
* Avoid unstable dependencies in hooks.
* Memoize callbacks.
* Monitor console warnings, network activity, and memory usage.

## 9. Data Verification
* Verify persistence before/after API calls.
* Pair endpoint tests with state inspection.
* If API returns success but data unchanged, block progress until fixed.

## 10. Change Verification

After changes:
1. Confirm build success.
2. Verify logs.
3. Test feature behavior.
4. Roll back if change not applied.

## 11. Feature Development Workflow

SPEC-FIRST:
* Overview, user stories, acceptance criteria, tech + UX requirements, tests, dependencies, DoD.

Process
1. Get spec approval.
2. Implement in phases.
3. Test & document.
4. PR review required before merge.

## 12. Git & SDLC Rules
* No commits to main or develop.
* Branch per task.
* Update docs and tests.
* PR stops at review.

## 13. Observability & Metrics
* Export agent run metadata.
* Generate weekly performance reports.

## 14. Change Control
* policy-change PR label for CLAUDE.md edits.
* PR includes rationale + rollout checklist.

## 15. Troubleshooting Quick Reference

Success Indicators
* Clean logs.
* Health checks green.
* No loop warnings.

Common Fixes
* Hook stabilization.
* Callback memoization.
* Dependency cleanup.