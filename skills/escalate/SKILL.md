---
name: escalate
description: This skill should be used when the user says "I'm blocked", "I can't proceed", "help me escalate this", "document this blocker", "I keep hitting the same error", "should I escalate this?", "write up this blocker", or when stuck on an issue after multiple failed attempts and needing to determine whether to continue troubleshooting or ask for user help.
version: 1.0.0
---

# Blocker Escalation

Classify a blocker and generate a clear escalation message.

## Step 1: Classify the Blocker

**MAJOR — Escalate immediately:**
- Authentication failures (401/403 errors)
- Missing credentials, API keys, or secrets
- Database or service connectivity failures
- Permission denied on required resources
- Network access issues preventing progress
- Same error persisting after 3+ distinct fix attempts

**MINOR — Continue troubleshooting:**
- Code logic bugs or TypeScript errors
- Test failures caused by code (not environment)
- Build issues, linting, dependency conflicts
- Missing implementation (the code just needs to be written)

If **MINOR**: do not escalate. Diagnose root cause and fix it.

If **MAJOR**: generate an escalation message using the appropriate template below.

## Step 2: Generate Escalation Message

### Auth / Credentials Blocker

```
🔴 BLOCKED: Authentication/authorization failure

Attempting: [what task was being performed]
Error: [exact error message or HTTP status]
Tried:
  1. [fix attempt 1]
  2. [fix attempt 2]
Need: [specific credential, permission, or configuration required]
Environment: [local / staging / production]
```

### Missing Access / Resource

```
🔴 BLOCKED: Required resource not accessible

Attempting: [what task was being performed]
Missing: [service, database, API key, file, endpoint, etc.]
Error: [exact error or symptom]
Need: [what access or resource is required to proceed]
```

### Repeated Failure (Loop)

```
🔴 BLOCKED: Same failure after 3+ attempts

Attempting: [what task was being performed]
Error pattern: [description of the recurring error]
Attempts made:
  1. [attempt and result]
  2. [attempt and result]
  3. [attempt and result]
Recommend: [what you think is needed — different approach, user input, external access]
```

## Honest Reporting Rules

Always distinguish clearly:
- "Code written" ≠ "Tests executed and passing" — never conflate these
- "Deployed" ≠ "Health check confirmed" — verify after every deployment
- "Implementation complete" ≠ "Validated working" — only claim success with proof (logs, test output, API response)

When reporting a blocker, include the **actual error message**, not a paraphrase. If the error message is long, include the most relevant portion.

## Output

1. State the classification: **MAJOR BLOCKER** or **MINOR — continue troubleshooting**
2. If MAJOR, produce the filled-in escalation message ready to send
3. If MINOR, suggest the next concrete troubleshooting step to try
