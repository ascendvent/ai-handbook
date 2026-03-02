---
name: pr
description: This skill should be used when the user asks to "create a PR", "open a pull request", "draft a PR description", "write a PR body", "make a pull request", "prepare a PR for review", or mentions wanting to submit code changes for review via GitHub.
version: 1.0.0
---

# Pull Request Generator

Generate well-structured pull request titles and bodies from the current branch's git history.

## Step 1: Gather Context

Run these commands to understand what changed:

```bash
# Current branch name
git branch --show-current

# Commits since base branch
git log develop..HEAD --oneline

# Files changed summary
git diff develop..HEAD --stat
```

If the base branch is unclear, check with `git remote show origin | grep "HEAD branch"`. Use `main` as fallback.

## Step 2: Generate PR Title

Construct the title following conventional commit format:

```
<type>(<scope>): <summary> (US-XXX if applicable)
```

**Types:** `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `ci`

**Rules:**
- Under 70 characters
- Imperative mood ("add X" not "added X")
- Include user story reference (US-XXX) if commits reference one
- Append `!` after type for breaking changes (`feat!:`)

## Step 3: Generate PR Body

Use this structure:

```markdown
## Summary
- [What changed and why — 2-4 bullets max]
- [Key implementation decision if notable]
- [Breaking changes or migration notes if any]

## Changes
- `path/to/file.ts` — [what changed]
- `path/to/file.ts` — [what changed]

## Test Plan
- [ ] [Specific thing to test]
- [ ] [Edge case to verify]
- [ ] All existing tests pass

## Checklist
- [ ] Tests added/updated for modified code
- [ ] No debug code left in
- [ ] TypeScript compiles without errors
- [ ] Conventional commit format used
```

## Step 4: Output

Present the title and body ready to copy-paste, then offer to create immediately:

```bash
gh pr create \
  --title "<generated-title>" \
  --body "$(cat <<'EOF'
<generated-body>
EOF
)"
```

Do not push or create the PR without explicit user confirmation.

## Tips

- Keep Summary to 2-4 bullets — enough context, not a novel
- Reference related issues with `Closes #123` or `Relates to US-XXX` in the summary
- For large PRs, group the Changes section by concern (e.g. "API changes", "UI changes")
- If multiple commits exist with different types, use the highest-impact type for the title
