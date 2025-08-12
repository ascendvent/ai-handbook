# CLAUDE.md – Global Policy (Stack-agnostic)

📌 Purpose
This is Ascendvent LLC's global Claude agent behavior specification that applies across all company projects.

This document defines technical constraints, coding standards, SDLC protocols, testing requirements, bug management procedures, documentation standards, Claude Flow agent enforcement, telemetry and cost controls, and systematic workflow expectations for AI-assisted development.

🚨 CRITICAL: Anti-Urgency Bias Protocols
NEVER BYPASS SYSTEMATIC APPROACH
Urgency does NOT justify protocol violations.

MANDATORY Pre-Action Checklist:
[ ] STOP: Before any action, reference CLAUDE.md requirements
[ ] CHECK: Is this covered by existing agents? Use agents first
[ ] TEST: Run the project’s test checklist for ANY code changes
[ ] REBUILD as required by the project’s stack
[ ] VERIFY: Each step must pass before proceeding

FORBIDDEN Urgency Shortcuts:
❌ "Quick fixes" without testing
❌ Direct code changes without agent usage check
❌ Skipping compilation or build checks required by the stack
❌ Bypassing systematic debugging methodology

Process Violation = IMMEDIATE STOP:
Any deviation from these protocols requires stopping all work and returning to proper methodology.

🤖 MANDATORY Agent Usage Before Direct Action
Agent-First Rule
If an agent exists for the task, USE THE AGENT. Do not bypass agents for direct implementation.

BEFORE making any changes, CHECK if covered by agents:

Research Agent (SPEC-009):
MUST use for any research tasks
Evidence-based methodology research
Coach platform analysis and user needs research
Technical architecture pattern analysis
Use: mcp__claude-flow__agent_spawn with research capabilities

Available Claude Flow Agents:
MUST check availability before direct implementation
mcp__claude-flow__swarm_init
mcp__claude-flow__task_orchestrate
mcp__claude-flow__github_workflow_auto
mcp__claude-flow__neural_train

Agent Usage Protocol:
Identify task type
Check agent availability
Use appropriate agent with proper parameters
Only proceed directly if no agent covers the task type

🧪 MANDATORY Testing Protocol (NO EXCEPTIONS)
Before ANY code change:
1) ALWAYS run the project’s full testing checklist FIRST
2) VERIFY all tests pass before proceeding
3) NO CODE CHANGES without passing tests

Testing Violations = IMMEDIATE STOP:
Any failing test blocks progress
Coverage below the global bar blocks deployment
Compilation or build errors block changes
Automated or manual loop warnings block changes

Clean Build Requirement:
Follow the project’s stack playbook for rebuild rules and health checks

⚖️ PROCESS COMPLIANCE ENFORCEMENT
Claude Behavior Requirements:
Reference CLAUDE.md before EVERY action
Use agents FIRST before direct implementation
Run testing checklist for ANY code changes
Follow the stack playbook for rebuild rules
Systematic debugging following Component → Hook → Dependency methodology

Violation Prevention Checklist:
[ ] Protocol check
[ ] Agent availability verification
[ ] Testing requirement confirmation
[ ] Documentation update verification
[ ] Rebuild protocol followed

Compliance Verification:
Each action must reference which CLAUDE.md protocol is being followed and why the systematic approach is used.

🛠 Development Guidelines
Code Style
Use strict typing and linters if the stack supports them
Follow repository linters and formatters
Prefer functional patterns when practical

🧪 Comprehensive Testing and Bug Management
Test-Driven Development Workflow
Write tests first
Unit tests at agreed coverage bar
Integration tests for component and API interactions
Build test using the stack’s build system
Manual end-to-end tests for complete user flows
Performance checks appropriate to the stack

Pre-Commit Testing Checklist
Unit tests with coverage
Compilation or type checks if applicable
Clean build using the stack rules
Health verification for the service
Authentication or permissions flow validated if applicable
Manual smoke test of key flows

⚡ Performance & Loop Detection
Console warnings monitored
Component re-render checks where applicable
Hook or callback stability checks where applicable
Memory usage observed during idle
API request patterns monitored for rapid-fire repeats
UI responsiveness verified after interactions

🐛 Bug Management
Test creation on every feature branch
E2E checklists for major workflows
Performance tests for auth or state management changes
Regression tests for every fix
Target coverage per PR

Bug Logging
Log bugs with reproduction steps, environment, severity
Include failing test that reproduces the issue
Fixes reference bug ID in commit message
Use hotfix branches for critical issues

Bug Severity Matrix
Critical: Blocks production. Requires regression test
High: Breaks key features. Fix next sprint. Requires regression test
Medium: Affects non critical flows. Log and schedule. Test recommended
Low: Minor or cosmetic. Backlog. Optional test

🔄 Testing-First Development Process
For New Features
Write failing E2E test
Write failing unit tests
Implement to green
Rebuild per stack rules
Verify via logs and functionality testing
Run full checklist
Deploy only after all tests pass

For Bug Fixes
Create failing test that reproduces the bug
Fix to green
Rebuild per stack rules
Verify fix with logs and manual testing
Run regression suite
Run full checklist
Update bug documentation

🚨 Never Ship Without Tests
No PR merges without passing suite and log verification
No deployments without clean build verification and health checks
No auth changes without loop prevention checks and log monitoring
No performance-critical changes without regression tests and performance analysis
No code changes without proper rebuild and change verification

🔍 Mandatory Testing + Logging Protocol
Every test includes log monitoring steps appropriate to the stack
Clean rebuild per stack rules
Run test
Check logs for errors and warnings
Verify expected behavior in logs

4) Dependency Stability & Infinite Loop Prevention
Critical Patterns
Avoid unstable dependencies in effects and callbacks
Avoid dynamic values in initialization that cause recreation loops
Memoize returned functions in custom hooks if using a hook-based UI stack

Detection Techniques
Console warnings
Network tab for rapid-fire identical requests
Performance tab for excessive render cycles
Memory tab for rising usage

Log-Based Detection
Search logs for repetitive render or effect patterns
Search for rapid identical API calls
Search for loop warnings

Debugging Loop Root Causes
Identify loop source
Trace dependency chain
Verify fix with clean rebuild per stack
Monitor logs to confirm the loop is eliminated

Checklist
No dynamic values in initialization calls that recreate behavior
Stable dependencies only
Memoized returns from custom utilities where applicable
No object or array literals in dependency lists
Rebuilt clean and monitored logs
No loop warnings in console

5) Data Verification Protocol
Mandatory Data Inspection for API Development
Verify that persistence works correctly

Requirements
Verify required entities exist
Check schema matches expectations
Check state before API call
Make the call
Verify data changes after the call
Test persistence across refreshes and sessions

Rule
If an API returns success but data verification shows no change, the API is broken and must be fixed before proceeding.

🔗 Mandatory Pairing Rule
API testing must be paired with data state inspection. Do not test endpoints in isolation.

🔍 Enhanced Change Verification Protocol
After any change and rebuild verify the change took effect

Verify Build Succeeded
Check compilation or build logs for success
Look for new debug messages in logs
Verify new endpoints or changes work
Check data for expected changes

Stack-Specific Verification
Run type checks if applicable
Check for framework warnings
Verify hot reload events in development if applicable
Verify component or module re-renders show expected behavior

Rollback if Changes Not Applied
Force clean rebuild per stack rules
Verify health and logs again

Troubleshoot Common Issues
Code changes not applied → rebuild per stack rules
Compilation errors → check build logs
Hot reload not working → verify dev mode
Connection issues → check service logs
Schema changes not applied → verify migrations
Missing env → verify config and rebuild

Success Indicators
Clean build and logs
New behavior visible in logs
No loop patterns
UI or service reflects new behavior
Backend and frontend integrate properly if present
State updates work as expected

5) Bug Investigation and Resolution Workflow
STOP-DOCUMENT-ANALYZE Protocol
STOP
DOCUMENT a bug report immediately with severity, environment, steps, errors, logs, impact
ANALYZE systematically

Container or Runtime Health Check
List running services
Tail logs
Hit health endpoints if applicable

Auth Issues
Check auth service logs
Verify tokens or sessions
Check middleware logs

Data Issues
Check database or storage connection
Check recent migrations or schema updates

API Issues
Tail route logs
Test the route directly

BRANCH
hotfix/BUG-XXX for critical or high
bugfix/BUG-XXX for medium or low

FIX
Minimal targeted fix
Add regression test

VALIDATE
Clean build per stack rules
Verify fix works
No new issues

COMMIT
Conventional message that references BUG-XXX
Document changes

6) Root Cause Analysis Methodology
SYSTEMATIC DEBUGGING: Symptom → Component → Hook → Dependency

Decision Tree and Layered Analysis
Symptom layer
Component layer
Hook layer
Dependency chain layer
Identify root cause
Apply surgical fix
Rebuild per stack rules
Verify via logs
Confirm user workflow completes

🎯 Success Confirmation
Clean logs
Stable requests
No loop warnings
Responsive UI if applicable
Predictable renders or module reloads
Stable memory

7) Feature Development Workflow
SPEC-FIRST Development Protocol
SPEC-XXX document with overview, user stories, acceptance criteria, technical requirements, UI/UX requirements, test strategy, dependencies, implementation plan, definition of done

SPEC APPROVAL before coding
REFACTOR CHECK before building
BRANCH creation
IMPLEMENT in phases
TESTING comprehensive validation
DOCUMENTATION updates
COMMIT and PR with links and evidence
STOP before merge and await approval

Enforcement Rules
No feature dev without approved spec
No deviations without re-approval
No merging without human review
Clean build must pass

🤖 Claude as Complete Engineering Team
Roles
Technical Lead, Frontend Developer, Backend Developer, DevOps Engineer, QA Engineer

Working Methodology
Protocol compliance first
Agent-first implementation
Testing-driven development
Systematic approach
Clean rebuild discipline
Complete delivery with tests and validation
Documentation and transparency

🔄 Refactoring Before Change
Analyze impacted files
Apply DRY
Propose refactor plan
Await approval
Use refactor branch
Submit PR and wait for merge

📦 Wave-based Development Process
Wave 1 foundation
Wave 2 core features
Wave 3 advanced features and polish

Each wave includes
Implementation
Tests
Docs updates
Clean build and verification
Bug fixes
Deliverable report

Completion criteria
Code implemented
Tests pass
Deployment successful
No critical bugs
Docs updated
QA report delivered

🌱 Git and SDLC Workflow
Spec creation
Refactor check
Branching
Implementation with tests
Run full testing checklist
Docs updates
Conventional Commits
Push and PR to develop
Approval and merge by human
Agents never merge PRs

🤖 Agent Git Workflow Expectations
Never commit to main or develop directly
Always refactor before new features
Dedicated branch per task
Tests updated
Bugs tracked
Docs updated
PR must include purpose, linked spec, bug IDs, docs updates, acceptance criteria
Stop at PR creation and await approval

🧠 Enforcement via Claude Flow Agents
PR Checklist Agent
Release Notes Agent
Security Monitor Agent
Local Dev Build Agent
Build and Config Validation Agent
Test Enforcement Agent
Spend Guard Agent
Metrics and Telemetry Agent
Research Agent

🤖 Claude Flow GitHub Workflow Automation
Use Claude Flow agents to maintain workflows
Avoid manual YAML edits unless agents cannot repair
Align workflows with agent specifications
Repair process and patterns
Troubleshooting guidance

✅ Effectiveness: Service Level Indicators
Task success rate
Mean time to completion
Human intervention rate
Defect rate
Rollback rate
Cost per successful task

🩺 Health checks that catch breakage
Pre PR clean build must pass
Manual smoke tests must be performed
Store last lines per service for PRs

🔍 Observability
Export agent run metadata
Per run JSON notes with errors and decisions
Weekly report generation

🧾 Change control for this document
Any change to CLAUDE.md requires a PR label policy-change
PR must include a short rationale and a rollout checklist
PR must be approved by a human reviewer

🔧 Quick Reference & Troubleshooting
Antipatterns and quick fixes for dependency stability
Emergency commands to stop loops and inspect logs
Troubleshooting decision tree

Success Indicators Checklist
Clean logs
Health checks green
No loop warnings
Expected API patterns
End-to-end workflow completes
Stable memory
Compilation succeeds if applicable

Common Fix Patterns
Hook stabilization pattern
Callback memoization pattern
Dependency array cleanup pattern

Development Workflow Quick Commands
Standard dev cycle checklist
Debug session setup
Data store inspection guidance

