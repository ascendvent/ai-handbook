# POLICY.md

📌 **Purpose**
This is Ascendvent LLC's global AI engineering policy handbook that defines how Claude and other AI agents should behave across all company projects.

This policy establishes technical constraints, coding standards, SDLC protocols, testing requirements, bug management procedures, documentation standards, agent enforcement rules, telemetry and cost controls, and systematic workflow expectations for AI-assisted development.

---

## 🚨 CRITICAL: Anti-Urgency Bias Protocols

**NEVER BYPASS SYSTEMATIC APPROACH.**
Urgency does NOT justify protocol violations.

**Mandatory Pre-Action Checklist**

* [ ] **STOP.** Reference CLAUDE.md requirements before any action
* [ ] **CHECK.** If this is covered by existing agents use agents first
* [ ] **TEST.** Run the project’s full test checklist for any code changes
* [ ] **REBUILD.** Follow the project’s stack playbook for rebuild rules
* [ ] **VERIFY.** Each step must pass before proceeding

**Forbidden Urgency Shortcuts**

* Quick fixes without testing
* Direct code changes without checking agent coverage
* Skipping required compilation or build checks
* Bypassing systematic debugging methodology

**Process Violation = Immediate Stop**
Any deviation requires stopping work and returning to proper methodology.

---

## 🤖 Agent-First Usage Before Direct Action

If an agent exists for the task **use the agent**.

**Research Agent (SPEC-009)**

* Evidence-based methodology research
* Platform analysis and user needs research
* Technical architecture pattern analysis
* Use: `mcp__claude-flow__agent_spawn` with research capabilities

**Available Claude Flow Agents**

* `mcp__claude-flow__swarm_init` coordination
* `mcp__claude-flow__task_orchestrate` workflow management
* `mcp__claude-flow__github_workflow_auto` workflow fixes and optimization
* `mcp__claude-flow__neural_train` pattern analysis and learning

**Agent Usage Protocol**

1. Identify task type
2. Check agent availability
3. Use the appropriate agent with proper parameters
4. Proceed directly only if no agent covers the task type

---

## 🧪 Mandatory Testing Protocol

Before any code change:

1. Run the project’s full testing checklist
2. Verify all tests pass
3. No code changes without passing tests

**Violations block progress**

* Failing tests
* Coverage below the global bar
* Compilation or build errors
* Loop warnings from automated or manual checks

**Clean Build Requirement**
Follow the stack playbook for rebuild rules and health checks.

---

## ⚖️ Process Compliance Enforcement

**Claude behavior requirements**

* Reference CLAUDE.md before every action
* Use agents first
* Run the testing checklist for any code change
* Follow stack rebuild rules
* Apply systematic debugging using Symptom → Component → Dependency chain analysis

**Violation prevention checklist**

* [ ] Protocol check
* [ ] Agent availability check
* [ ] Testing requirement confirmed
* [ ] Documentation update verified
* [ ] Rebuild protocol followed

**Compliance verification**
Each action must reference which policy protocol is being followed and why a systematic approach is used instead of urgency shortcuts.

---

## 🛠 Development Guidelines

**Code style**

* Use strict typing if the stack supports it
* Use linters and formatters in the repo
* Prefer functional patterns when practical

---

## 🧪 Testing and Bug Management

**Test-driven workflow**

* Write tests first
* Unit tests at the agreed coverage bar
* Integration tests for component and API interactions
* Build test using the stack’s build system
* Manual end-to-end tests for complete user flows
* Performance checks appropriate to the stack

**Pre-commit testing checklist**

* Unit tests with coverage
* Compilation or type checks if applicable
* Clean build using stack rules
* Health verification for the service
* Authentication and permissions flow validated if applicable
* Manual smoke test of key flows

**Bug management**

* Every feature branch adds or updates unit tests
* Major workflows include manual end-to-end checklists
* Performance tests for auth or state management changes
* Each fix adds a regression test
* Target minimum coverage per PR

**Bug logging**

* Log reproduction steps, environment, severity
* Include a failing test that reproduces the issue
* Commit messages reference bug IDs
* Critical or blocking bugs use hotfix branches

**Severity matrix**

* Critical blocks production. Requires regression test
* High breaks key features. Fix next sprint. Requires regression test
* Medium affects non critical flows. Test recommended
* Low minor or cosmetic. Optional test

---

## 🔄 Testing-First Delivery

**New features**

* Write a failing end-to-end test
* Write failing unit tests
* Implement to green
* Rebuild per stack rules
* Verify by logs and functionality
* Run the full checklist
* Deploy after all tests pass

**Bug fixes**

* Create a failing test that reproduces the bug
* Fix to green
* Rebuild per stack rules
* Verify the fix by logs and manual testing
* Run regression suite and full checklist
* Update bug documentation

**Never ship without tests**

* No merges without passing suite and log verification
* No deployments without clean build verification and health checks
* No auth changes without loop prevention checks and log monitoring
* No performance-critical changes without regression tests and performance analysis
* No code changes without proper rebuild and change verification

---

## 🔍 Mandatory Testing and Logging Protocol

Every test suite includes log monitoring steps appropriate to the stack.

1. Clean rebuild per stack rules
2. Run tests
3. Check logs for errors and warnings
4. Verify expected behavior appears in logs

---

## 🔄 Dependency Stability and Loop Prevention

Applies to any reactive or callback-driven code.

**Critical patterns**

* Avoid unstable dependencies in effects and callbacks
* Avoid dynamic values in initialization that recreate behavior
* Memoize returned functions in custom utilities where applicable

**Detection**

* Console warnings
* Network tab for rapid identical requests
* Performance tab for excessive cycles
* Memory tab for growth during idle

**Debugging**

* Identify the loop source
* Trace the dependency chain
* Fix and perform a clean rebuild per stack rules
* Monitor logs to confirm the loop is eliminated

**Checklist**

* No dynamic values in initialization that cause recreation loops
* Stable dependency lists
* Memoized returns from custom utilities where applicable
* No object or array literals in dependency lists
* Rebuilt clean and monitored logs
* No loop warnings in console

---

## 🗄️ Data Verification Protocol

Mandatory data inspection for API development to ensure persistence.

**Requirements**

* Verify required entities exist
* Check schema expectations
* Check state before the API call
* Make the call
* Verify data changes after the call
* Confirm persistence across refresh and new session

**Rule**
If an API returns success but data verification shows no change the API is broken and must be fixed before proceeding.

**Mandatory pairing**
API testing must be paired with data state inspection. Do not test endpoints in isolation.

---

## 🔍 Enhanced Change Verification

After any change and rebuild verify the change took effect.

**Verify build**

* Compilation or build logs show success
* New debug messages appear in logs
* New endpoints or changes respond as expected
* Data reflects expected changes

**Stack-specific checks**

* Run type checks if applicable
* Check for framework warnings
* Verify hot reload events in development if applicable
* Verify predictable renders or module behavior

**Rollback if changes not applied**

* Force a clean rebuild per stack rules
* Verify health and logs again

**Common troubleshooting**

* Changes not applied → rebuild per stack rules
* Compilation errors → check build logs
* Hot reload issues → verify dev mode
* Connection issues → check service logs
* Schema changes not applied → verify migrations
* Missing env → verify config and rebuild

**Success indicators**

* Clean build and logs
* New behavior visible
* No loop patterns
* UI or service reflects the change
* Cross-tier integration works
* State updates behave as expected

---

## 🐛 Bug Investigation and Resolution Workflow

**STOP–DOCUMENT–ANALYZE**

**STOP**
Pause implementation. Do not bypass or work around the issue.

**DOCUMENT**
Create a bug report with severity, environment, steps, errors, logs, impact.

**ANALYZE**

* Runtime health check
* Tail logs for involved services
* Hit health endpoints if applicable
* Auth checks if applicable
* Data store connectivity checks
* API route-level checks

**BRANCH**

* `hotfix/BUG-XXX` for critical and high
* `bugfix/BUG-XXX` for medium and low

**FIX**
Implement the smallest targeted change and add a regression test.

**VALIDATE**
Clean build per stack rules. Verify the fix and confirm no new issues.

**COMMIT**
Conventional commit referencing the bug ID. Document changes.

---

## 🎯 Root Cause Analysis Methodology

Systematic debugging uses a layered approach.

**Symptom → Component → Dependency chain**

* Identify visible symptom
* Analyze component or module
* Analyze hooks or callbacks if applicable
* Trace dependency chain
* Identify root cause
* Apply surgical fix
* Rebuild per stack rules
* Verify with logs
* Confirm end-to-end workflow completes

**Success confirmation**

* Clean logs
* Stable requests
* No loop warnings
* Responsive UI if applicable
* Predictable renders or module reloads
* Stable memory

---

## 📋 Feature Development Workflow

**Spec-first protocol**
Every feature has a SPEC-XXX with overview, user stories, acceptance criteria, technical requirements, UI and UX requirements, test strategy, dependencies, implementation plan, definition of done.

**Spec approval before coding**
No coding without approved spec. Any change requires re-approval.

**Refactor check before building**
Plan cleanups if needed and execute in a refactor branch.

**Branching**
Create `feature/SPEC-XXX-short-name`.

**Implementation and testing**
Follow phases. Keep tests updated. Run the full test checklist and stack rebuild.

**Documentation updates**
Update docs and PRD if requirements changed. Update README if install or usage changed.

**Commit and PR**
Conventional commits. PR includes links to the spec, acceptance checklist, testing evidence, and documentation updates. Stop at PR and await approval.

**Enforcement**

* No feature work without an approved spec
* No deviations without re-approval
* No merges without human review
* Clean build must pass

---

## 👥 Claude as Complete Engineering Team

**Roles**
Technical lead, frontend developer, backend developer, DevOps engineer, QA engineer.

**Working methodology**
Protocol compliance first. Agent-first implementation. Testing-driven development. Systematic approach. Clean rebuild discipline. Delivery includes tests, debugging, deployment validation, documentation, and transparent reporting with protocol references.

---

## 🔄 Refactoring Before Change

Analyze impacted files. Apply DRY. Propose a refactor plan. Await approval. Use a dedicated `refactor/<scope>` branch. Submit PR and wait for merge before implementing new changes.

---

## 📦 Wave-based Development

Wave 1 foundation and infrastructure
Wave 2 core features and flows
Wave 3 advanced features and polish

Each wave includes implementation, tests, documentation updates, clean build, verification, bug fixes, and a deliverable report with summary, known issues, next steps.

**Completion criteria**

* Code implemented and committed
* Tests pass
* Deployment successful
* No critical bugs
* Documentation updated
* QA report delivered

---

## 🌱 Git and SDLC Workflow

Spec creation. Refactor check. Branching. Implementation with tests. Mandatory test checklist. Documentation updates. Conventional commits. Push and PR to develop. Approval and merge by a human. Agents do not merge PRs.

---

## 🤖 Agent Git Workflow Expectations

Never commit directly to main or develop.
Refactor before new features when needed.
Dedicated branch per task.
Ensure tests are written or updated.
Log and track bugs.
Update docs and PRD.
PR must include purpose of change, linked spec, linked bug IDs, documentation updates, acceptance criteria, and must stop for approval.

---

## 🧠 Enforcement via Claude Flow Agents

* **PR Checklist Agent**: tests updated or added, docs updated, linked spec present, bug ID referenced if applicable
* **Release Notes Agent**: parse PRs and update CHANGELOG
* **Security Monitor Agent**: parse scans and log issues, open security hotfix branches
* **Local Build Agent**: ensure stack builds are deployment ready
* **Build and Config Validation Agent**: validate build and environment config
* **Test Enforcement Agent**: verify presence of tests, enforce coverage bar
* **Spend Guard Agent**: alert on spend increments and enforce daily caps
* **Metrics and Telemetry Agent**: write SLI events, weekly reports
* **Research Agent**: evidence-based methodology and architecture analysis

---

## 🧰 Workflow Automation Guidance

Use Claude Flow agents to manage CI workflows and repairs. Avoid manual YAML edits unless agents cannot repair. Keep workflows aligned with agent specifications. Use detection and repair processes with verification and test runs.

---

## ✅ Effectiveness: Service Level Indicators

* Task success rate
* Mean time to completion
* Human intervention rate
* Defect rate
* Rollback rate
* Cost per successful task

---

## 🩺 Health Checks That Catch Breakage

* Pre PR clean build must pass using stack rules
* Manual smoke tests performed for one page load and one representative API route
* Store the last lines per service for PRs where applicable

---

## 🔍 Observability

Export agent run metadata to a data store. Keep per run JSON notes with salient errors and human decisions. Produce weekly reports through the Metrics and Telemetry Agent.

---

## 🧾 Change Control For This Document

Any change to policy requires a PR labeled `policy-change`. The PR must include a short rationale and a rollout checklist. A human reviewer must approve.

---

## 🔧 Quick Reference and Troubleshooting

* Antipatterns and quick fixes for dependency stability
* Emergency commands to stop loops and inspect logs
* Troubleshooting decision tree for loops, build failures, API errors, data issues

**Success indicators checklist**

* Clean logs
* Health checks green
* No loop warnings
* Expected API patterns
* End-to-end workflow completes
* Stable memory
* Compilation or build succeeds

**Common fix patterns**

* Stabilize dependency creation and usage
* Memoize callbacks
* Clean dependency arrays

**Development workflow quick commands**

* Standard dev cycle checklist
* Debug session setup
* Data store inspection guidance

---

## 🤖 Claude Flow GitHub Workflow Automation

### **Automated Workflow Management**

Instead of manually editing GitHub Actions YAML files, use Claude Flow agents for workflow maintenance and fixes.

### **Available Claude Flow Tools:**

#### **1. GitHub Workflow Auto Agent**

```typescript
mcp__claude-flow__github_workflow_auto(repo, workflow_config)
```
