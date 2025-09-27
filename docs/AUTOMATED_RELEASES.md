# Automated Release System

This document explains the automated release system implemented to eliminate merge conflicts and ensure every main branch merge creates a proper release.

## Overview

The repository now uses **semantic-release** to automatically:
- Determine the next version number based on commit messages
- Generate changelog entries
- Update version files (package.json, VERSION.md)
- Create GitHub releases
- Publish packages
- Sync the develop branch

## Conventional Commits

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types

| Type | Description | Version Bump |
|------|-------------|--------------|
| `feat` | New feature | Minor (1.0.0 → 1.1.0) |
| `fix` | Bug fix | Patch (1.0.0 → 1.0.1) |
| `feat!` or `BREAKING CHANGE:` | Breaking change | Major (1.0.0 → 2.0.0) |
| `docs` | Documentation only | No release |
| `style` | Code style changes | No release |
| `refactor` | Code refactoring | No release |
| `perf` | Performance improvements | Patch |
| `test` | Adding tests | No release |
| `chore` | Maintenance tasks | No release |
| `ci` | CI/CD changes | No release |
| `build` | Build system changes | No release |

### Examples

```bash
# Feature (minor version bump)
feat: add inheritance resolution for Claude CLI

# Bug fix (patch version bump)
fix: resolve package path resolution on Windows

# Breaking change (major version bump)
feat!: change API structure for handbook exports

# Multiple types in one commit
feat: add postinstall script

BREAKING CHANGE: The inheritance resolution now runs automatically
```

## Automated Release Workflow

### Trigger
- **Push to main branch** (typically PR merges)
- **Manual workflow dispatch** (emergency releases)

### Process
1. **Analyze commits** since last release using conventional commit messages
2. **Determine version bump** (major/minor/patch or no release)
3. **Run tests** to ensure code quality
4. **Update version files**:
   - `package.json`
   - `VERSION.md`
   - `CHANGELOG.md`
5. **Create Git tag** with new version
6. **Publish to npm/GitHub packages**
7. **Create GitHub release** with generated notes
8. **Sync develop branch** with new changes

### Branch Synchronization
After each release, the workflow automatically:
- Merges main back into develop
- Ensures develop has the latest version numbers
- Prevents future merge conflicts

## Commit Message Validation

### Pull Request Validation
- PR titles must follow conventional commit format
- All commit messages in PR are validated
- CI blocks merge if commits don't follow conventions

### Local Development
Install commitlint for local validation:
```bash
npm install -g @commitlint/cli @commitlint/config-conventional

# Validate a commit message
echo "feat: add new feature" | commitlint
```

## Benefits

### ✅ **Eliminates Version Conflicts**
- No manual version management
- Automatic version synchronization across branches
- Consistent versioning based on actual changes

### ✅ **Automated Releases**
- Every meaningful main merge creates a release
- Generated changelogs from commit messages
- Proper semantic versioning

### ✅ **Improved Code Quality**
- Enforced commit message standards
- Clear change documentation
- Traceable feature and fix history

### ✅ **Reduced Manual Work**
- No manual version bumps
- No manual changelog updates
- No manual release creation

## Migration from Manual Process

### Old Process Issues
- Manual version conflicts (VERSION.md, package.json, package-lock.json)
- Inconsistent versioning across branches
- Manual release creation prone to errors
- Branch synchronization problems

### New Process Solutions
- Automatic version management
- Branch synchronization after releases
- Standardized commit messages
- Consistent release workflow

## Troubleshooting

### Common Issues

#### No Release Created
**Cause**: No feat/fix commits since last release
**Solution**: Ensure commits use proper conventional format

#### Version Conflicts During Development
**Cause**: Working on outdated branch
**Solution**: Always branch from latest develop, not main

#### Failed Release
**Cause**: Test failures or invalid tokens
**Solution**: Check GitHub Actions logs, verify NPM_TOKEN secret

#### Commit Message Validation Fails
**Cause**: Non-conventional commit messages
**Solution**: Amend commits to follow conventional format

### Emergency Manual Release
If automation fails:
```bash
# Install semantic-release locally
npm install -g semantic-release

# Run release manually (from main branch)
npx semantic-release --no-ci
```

## Configuration Files

### `.releaserc.json`
Semantic-release configuration defining:
- Release branches (main only)
- Plugins for changelog, git, npm, GitHub
- Asset handling and commit message templates

### `.commitlintrc.json`
Commit message validation rules:
- Conventional commit types
- Message length limits
- Case sensitivity rules

### `.github/workflows/semantic-release.yml`
Main release workflow:
- Triggers on main branch pushes
- Runs tests before release
- Handles package publishing
- Syncs develop branch

### `.github/workflows/commit-validation.yml`
PR validation workflow:
- Validates PR titles
- Checks all commit messages in PR
- Blocks merge if validation fails

## Best Practices

### For Developers
1. **Use conventional commits** for all changes
2. **Branch from develop**, not main
3. **Keep commits atomic** (one logical change per commit)
4. **Use descriptive commit messages**
5. **Test locally** before pushing

### For Maintainers
1. **Review PR titles** before merging
2. **Squash and merge** with conventional title
3. **Monitor release workflow** after main merges
4. **Verify develop sync** completed successfully

### For Features
1. **Start with `feat:`** for new functionality
2. **Use `fix:`** for bug fixes
3. **Use `BREAKING CHANGE:`** for API changes
4. **Include scope** when applicable (e.g., `feat(cli):`)

## Security

### Token Requirements
- **GITHUB_TOKEN**: Automatic (provided by GitHub Actions)
- **NPM_TOKEN**: Manual setup required for npm publishing

### Branch Protection
Recommended branch protection rules:
- Require PR for main branch
- Require status checks to pass
- Require branches to be up to date
- Restrict pushes to main branch

This automated system ensures consistent, predictable releases while eliminating the recurring merge conflicts between develop and main branches.