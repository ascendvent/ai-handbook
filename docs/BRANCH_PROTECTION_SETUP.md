# Branch Protection Setup Guide

This document outlines the recommended branch protection settings for the Universal AI Engineering Handbook repository to follow open source best practices.

## Required Settings

### Main Branch Protection

Navigate to: `Settings` → `Branches` → `Add rule` for `main` branch

**Branch name pattern:** `main`

### Protection Rules

✅ **Restrict pushes that create files**
- Prevent direct pushes to main branch

✅ **Require a pull request before merging**
- Required approvals: 1
- Dismiss stale PR approvals when new commits are pushed
- Require review from code owners (if CODEOWNERS file exists)

✅ **Require status checks to pass before merging**
- Require branches to be up to date before merging
- Required status checks:
  - `test (16.x)` - Node.js 16 tests  
  - `test (18.x)` - Node.js 18 tests
  - `test (20.x)` - Node.js 20 tests
  - `lint` - Code linting
  - `security` - Security audit

✅ **Require conversation resolution before merging**
- All PR conversations must be resolved

✅ **Require signed commits**
- Optional but recommended for security

✅ **Require linear history**
- Enforces clean, linear git history

✅ **Include administrators**
- Apply rules to repository administrators

### Additional Repository Settings

**General Settings:**
- ✅ Allow merge commits
- ✅ Allow squash merging  
- ❌ Allow rebase merging (disabled for linear history)
- ✅ Always suggest updating pull request branches
- ✅ Allow auto-merge
- ✅ Automatically delete head branches

**Security Settings:**
- ✅ Enable private vulnerability reporting
- ✅ Enable Dependabot alerts
- ✅ Enable Dependabot security updates
- ✅ Enable Dependabot version updates

## Automated Setup Script

You can use the GitHub CLI to set up branch protection programmatically:

```bash
# Install GitHub CLI if not already installed
# brew install gh

# Authenticate with GitHub
gh auth login

# Set up branch protection for main branch
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"checks":[{"context":"test (16.x)"},{"context":"test (18.x)"},{"context":"test (20.x)"}]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null \
  --field required_linear_history=true \
  --field allow_force_pushes=false \
  --field allow_deletions=false \
  --field required_conversation_resolution=true
```

## Code Owners

Create a `.github/CODEOWNERS` file to automatically request reviews from specific people:

```
# Global owners
* @your-username

# Agent files
/agents/ @agent-maintainers

# Policy files  
CLAUDE_GLOBAL.md @policy-maintainers
*.md @documentation-team
```

## Release Process

For open source releases:

1. **Version Bump:** Use semantic versioning
   ```bash
   npm version patch|minor|major
   ```

2. **Create Release:** Use GitHub Releases with auto-generated release notes

3. **Publish to NPM:** 
   ```bash
   npm publish --access=public
   ```

## Security Considerations

- Enable two-factor authentication for all maintainers
- Use signed commits for all contributions
- Regular security audits via Dependabot
- Monitor for suspicious pull requests
- Review all changes to sensitive files (package.json, workflows, etc.)

## Community Management

- Use issue templates for consistent bug reports and feature requests
- Set up discussions for community questions
- Create contributor guidelines
- Establish a code of conduct
- Regular maintenance and updates to dependencies