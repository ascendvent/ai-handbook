---
name: review
description: This skill should be used when the user asks to "review my code", "do a code review", "review the changes", "check code quality", "look for issues in my code", "review this PR", "review what I changed", "find code smells", or wants systematic quality feedback before merging or submitting code.
version: 1.0.0
---

# Code Review

Perform a systematic quality review of changed or specified code.

## Determine Scope

Identify what to review:

```bash
# Changed code on current branch
git diff develop..HEAD --stat
git diff develop..HEAD

# Or for a specific PR
gh pr diff <number>
```

If the user named specific files, read those directly. If no scope is given, default to `git diff develop..HEAD`.

## Review Checklist

Work through each category. Flag real issues only — avoid style nitpicking if a linter handles it.

### 1. Correctness
- Logic errors, off-by-one, missing null checks
- Unhandled async errors or race conditions
- Error paths that silently swallow exceptions

### 2. Duplication (DRY)
- Identical or near-identical blocks that could be extracted
- Same validation logic repeated across files
- Utility functions reinvented inline

Detect with: `npx jscpd src/ --min-lines=5 --silent`

### 3. Complexity
- Functions over 50 lines — candidate for extraction
- Cyclomatic complexity over 10 (deep nesting, many branches)
- Variable names that require comments to understand

### 4. TypeScript / Type Safety
- `any` types: `grep -r ": any" src/ --include="*.ts"`
- Missing return types on exported functions
- Type assertions (`as X`) masking real type errors

### 5. Test Coverage
- New logic paths without corresponding tests
- Happy path only — missing error/edge case tests
- Tests that assert nothing meaningful (`expect(true).toBe(true)`)

### 6. Security
- User input used in queries without sanitization
- Secrets or credentials hardcoded or logged
- Auth checks missing on new endpoints

### 7. Architecture
- Concerns mixed in wrong layer (e.g. DB logic in a UI component)
- Breaking encapsulation (reaching into internals of another module)
- New dependency that duplicates something already in the project

## Output Format

```markdown
## Code Review — <branch or file scope>

### Summary
- **Score**: X/10
- **Blocking issues**: N
- **Suggestions**: N

### Blocking Issues (must fix before merge)
1. **[Category]** `path/to/file.ts:line` — [what the problem is and how to fix it]

### Suggestions (non-blocking)
1. **[Category]** `path/to/file.ts:line` — [description]

### Looks Good
- [Specific things done well — always include at least one]
```

Mark as **blocking** only issues that could cause bugs, security problems, or break the build. Everything else is a suggestion.
