---
name: release
description: This skill should be used when the user asks to "prepare a release", "create a release", "bump the version", "generate a changelog", "cut a release", "release v1.x", "what goes in the next release", "tag a release", or wants to prepare code for deployment with proper versioning and release notes.
version: 1.0.0
---

# Release Preparation

Prepare a release: determine the version bump, generate changelog, and validate readiness.

## Step 1: Determine Version Bump

Analyze commits since the last tag:

```bash
# Find last release tag
git describe --tags --abbrev=0

# Commits since last tag
git log $(git describe --tags --abbrev=0)..HEAD --oneline
```

**Semver bump rules (conventional commits):**
- Any `feat!:` or `BREAKING CHANGE:` in commit body → **major**
- Any `feat:` (no breaking changes) → **minor**
- Only `fix:`, `docs:`, `chore:`, `ci:`, `refactor:`, etc. → **patch**

Check current version:
```bash
node -p "require('./package.json').version"
```

## Step 2: Apply the Bump

```bash
npm version <patch|minor|major> --no-git-tag-version
```

This updates `package.json` only. Do not commit or tag — present to user for confirmation first.

## Step 3: Generate Changelog Entry

Group commits by type and format as a new changelog section:

```markdown
## [X.Y.Z] — YYYY-MM-DD

### Features
- Description of feature ([abc1234](commit-link))

### Bug Fixes
- Description of fix ([abc1234](commit-link))

### Breaking Changes
- What changed and migration steps required

### Other
- Notable docs, chore, or ci changes (skip trivial ones)
```

Skip trivial `chore` and `ci` commits unless they affect users directly.

## Step 4: Pre-Release Validation

Run each check and report pass/fail:

```bash
npm test --passWithNoTests           # All tests pass
git status --porcelain               # Clean working directory (empty = clean)
npm audit --audit-level=moderate     # No critical vulnerabilities
git fetch origin && git diff HEAD origin/main --stat  # In sync with main
```

If any check fails, stop and report what needs fixing before proceeding.

## Step 5: Output

Present:
1. **Recommended version bump** with reasoning (which commits drove it)
2. **New version number**
3. **Changelog entry** ready to prepend to CHANGELOG.md
4. **Validation status** — pass/fail for each pre-release check
5. **Confirmation prompt** — ask before committing version bump or creating tag

Do not commit, tag, or push anything without explicit user confirmation.
