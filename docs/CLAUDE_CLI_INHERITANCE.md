# Claude CLI Inheritance Resolution

This document addresses the issue where Claude CLI ignores `Inherits:` directives in CLAUDE.md files and provides comprehensive solutions.

## Problem Statement

Claude CLI 1.0.126+ loads CLAUDE.md for the current project but ignores inheritance directives like `Inherits: @ascendvent/ai-handbook`. Users have to manually prompt Claude to "execute inherits," which is brittle and not durable across sessions.

## Solution Overview

The AI Handbook package provides multiple tools to resolve inheritance automatically:

1. **Manual Resolution**: `npx @ascendvent/ai-handbook claude-inherit`
2. **Automatic Resolution**: Postinstall hook that runs after `npm install`
3. **Programmatic Resolution**: Node.js API for custom integrations

## Quick Start

### 1. Install the Handbook

```bash
npm install @ascendvent/ai-handbook
```

### 2. Create CLAUDE.md with Inheritance

```bash
# Option A: Use the provided template
npx @ascendvent/ai-handbook init

# Option B: Create manually
echo "Inherits: @ascendvent/ai-handbook" > CLAUDE.md
echo "" >> CLAUDE.md
echo "# Your Project" >> CLAUDE.md
```

### 3. Resolve Inheritance

```bash
# The postinstall hook should have already resolved inheritance
# If not, run manually:
npx @ascendvent/ai-handbook claude-inherit
```

### 4. Verify in Claude CLI

```bash
claude
# In Claude CLI:
# /memory list
# Should show both project and shared memory
```

## Detailed Usage

### Manual Resolution Command

```bash
npx @ascendvent/ai-handbook claude-inherit [options]

Options:
  --file=PATH      Path to CLAUDE.md file (default: ./CLAUDE.md)
  --no-config      Don't write .claude/config.json
  --verbose, -v    Show detailed output
  --help, -h       Show help
```

### What the Resolution Does

1. **Parses CLAUDE.md**: Looks for `Inherits:` directives
2. **Resolves Packages**: Uses npm's module resolution to find installed packages
3. **Finds Configuration**: Locates CLAUDE_GLOBAL.md or CLAUDE.md in the package
4. **Generates Config**: Creates `.claude/config.json` with proper memory paths
5. **Reports Status**: Shows resolved files and any warnings

### Generated Configuration

After resolution, your project will have a `.claude/config.json` file:

```json
{
  "memory": {
    "project": ["CLAUDE.md"],
    "shared": ["node_modules/@ascendvent/ai-handbook/CLAUDE_GLOBAL.md"]
  }
}
```

## Automatic Resolution (Postinstall Hook)

The package includes a postinstall script that automatically resolves inheritance when:

1. The package is installed via npm
2. A CLAUDE.md file exists in the project root
3. The CLAUDE.md contains an inheritance directive

### Postinstall Behavior

- ✅ **Resolves automatically** if inheritance directive found
- ℹ️ **Skips silently** if no CLAUDE.md exists
- ⚠️ **Reports warnings** if directive found but resolution fails
- 📝 **Provides guidance** on how to fix issues

## Programmatic API

For custom integrations:

```javascript
const { resolveInheritance } = require('@ascendvent/ai-handbook');

const result = resolveInheritance({
  claudeFile: './path/to/CLAUDE.md',  // optional, defaults to ./CLAUDE.md
  writeConfig: true,                   // optional, defaults to true
  verbose: false                       // optional, defaults to false
});

if (result.success) {
  console.log('Resolved files:', result.resolvedFiles);
  console.log('Warnings:', result.warnings);
} else {
  console.error('Resolution failed:', result.error);
}
```

## Troubleshooting

### Common Issues

#### 1. Package Not Found

**Error**: `Could not resolve package: @ascendvent/ai-handbook`

**Solution**: Ensure the package is installed:
```bash
npm install @ascendvent/ai-handbook
```

#### 2. No Configuration File Found

**Error**: `No CLAUDE configuration file found in package`

**Cause**: Package doesn't have CLAUDE_GLOBAL.md or CLAUDE.md
**Solution**: This shouldn't happen with official handbook packages. File an issue if encountered.

#### 3. Permission Errors

**Error**: `EACCES: permission denied`

**Solution**: Check directory permissions:
```bash
chmod 755 .claude/
```

#### 4. Claude CLI Still Doesn't See Inheritance

**Possible Causes**:
- Claude CLI version doesn't support `.claude/config.json`
- Config file is malformed
- File paths are incorrect

**Diagnosis**:
```bash
# Check if config exists and is valid
cat .claude/config.json

# Verify file paths exist
ls -la node_modules/@ascendvent/ai-handbook/CLAUDE_GLOBAL.md

# Re-run resolution with verbose output
npx @ascendvent/ai-handbook claude-inherit --verbose
```

### Manual Workarounds

If automatic resolution fails, you can manually configure Claude CLI:

#### Option 1: Manual Memory Add

```bash
claude memory add ./node_modules/@ascendvent/ai-handbook/CLAUDE_GLOBAL.md --shared
```

#### Option 2: Manual Config Creation

Create `.claude/config.json`:
```json
{
  "memory": {
    "project": ["CLAUDE.md"],
    "shared": ["node_modules/@ascendvent/ai-handbook/CLAUDE_GLOBAL.md"]
  }
}
```

#### Option 3: Symlink Approach

```bash
mkdir -p .claude/shared
ln -s ../../node_modules/@ascendvent/ai-handbook/CLAUDE_GLOBAL.md .claude/shared/
```

## Development Integration

### CI/CD Pipeline

Add inheritance resolution to your CI/CD:

```yaml
# .github/workflows/test.yml
- name: Install dependencies
  run: npm ci

- name: Resolve Claude inheritance
  run: npx @ascendvent/ai-handbook claude-inherit

- name: Verify Claude configuration
  run: |
    test -f .claude/config.json
    cat .claude/config.json
```

### Pre-commit Hook

Add to `.husky/pre-commit` or similar:

```bash
#!/bin/sh
npx @ascendvent/ai-handbook claude-inherit --no-config > /dev/null 2>&1 || echo "Warning: Could not resolve Claude inheritance"
```

### Package.json Scripts

Add convenient scripts:

```json
{
  "scripts": {
    "claude:setup": "npx @ascendvent/ai-handbook claude-inherit",
    "claude:check": "npx @ascendvent/ai-handbook claude-inherit --no-config --verbose"
  }
}
```

## Advanced Configuration

### Multiple Inheritance

CLAUDE.md supports multiple inheritance directives:

```markdown
Inherits: @ascendvent/ai-handbook
Inherits: @company/engineering-standards
Inherits: @team/project-specific-rules

# Project Configuration
...
```

### Custom Package Resolution

For packages with non-standard CLAUDE file names or locations, the resolution system will:

1. Try `CLAUDE_GLOBAL.md` (preferred for handbooks)
2. Try `CLAUDE.md` (fallback)
3. Try lowercase variants
4. Report warnings if none found

### Path Resolution

The system uses Node.js module resolution, so it supports:

- NPM packages: `@scope/package`
- Local packages: `file:../local-handbook`
- Git packages: `git+https://github.com/user/repo`

## Migration Guide

### From Manual Workarounds

If you've been using manual workarounds:

1. Remove manual memory additions:
   ```bash
   claude memory remove ./node_modules/@ascendvent/ai-handbook/CLAUDE_GLOBAL.md
   ```

2. Delete manual config (optional):
   ```bash
   rm .claude/config.json
   ```

3. Run automatic resolution:
   ```bash
   npx @ascendvent/ai-handbook claude-inherit
   ```

### From Legacy Versions

If upgrading from older handbook versions:

1. Update package:
   ```bash
   npm update @ascendvent/ai-handbook
   ```

2. Update CLAUDE.md format (if needed):
   ```bash
   # Ensure first line is inheritance directive
   head -1 CLAUDE.md
   # Should show: Inherits: @ascendvent/ai-handbook
   ```

3. Re-run resolution:
   ```bash
   npx @ascendvent/ai-handbook claude-inherit
   ```

## Security Considerations

### File Path Validation

The resolution system validates file paths to prevent:
- Directory traversal attacks
- Reading unauthorized files
- Writing outside project boundaries

### Package Validation

Only properly installed npm packages are resolved:
- Must be in `node_modules/`
- Must have valid `package.json`
- Package name must match requested name

### Configuration Isolation

Generated configurations only reference:
- Project CLAUDE.md
- Installed package files
- No system or user-level files

## Performance Notes

### Resolution Speed

- **Fast**: Package resolution uses Node.js built-in module resolution
- **Cached**: Repeated resolutions are fast (no network requests)
- **Incremental**: Only processes packages with inheritance directives

### Memory Usage

- **Minimal**: Only loads package.json files for validation
- **Efficient**: Streams large CLAUDE files rather than loading entirely
- **Bounded**: Maximum file size limits prevent memory exhaustion

## Future Enhancements

### Planned Features

1. **Smart Resolution**: Auto-detect inheritance needs and resolve automatically
2. **Configuration Merging**: Support for complex inheritance hierarchies
3. **CLI Integration**: Built-in support in Claude CLI itself
4. **Validation**: Lint inheritance directives and warn about issues
5. **Templates**: Generate project-specific CLAUDE.md with proper inheritance

### Compatibility

This system is designed to be forward-compatible with future Claude CLI versions that may support inheritance natively. When that happens, these tools will gracefully detect native support and defer to the CLI's implementation.

## Support

### Getting Help

1. **Check this documentation** for common issues
2. **Run with verbose output**: `npx @ascendvent/ai-handbook claude-inherit --verbose`
3. **File issues**: [GitHub Issues](https://github.com/ascendvent/ai-handbook/issues)
4. **Check CLI version**: Some features require Claude CLI 1.0.126+

### Reporting Bugs

When reporting issues, include:

- Claude CLI version: `claude --version`
- Node.js version: `node --version`
- Package version: `npm list @ascendvent/ai-handbook`
- Verbose output: `npx @ascendvent/ai-handbook claude-inherit --verbose`
- CLAUDE.md content (sanitized)
- Generated .claude/config.json

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines on improving the inheritance resolution system.

---

This inheritance resolution system provides a robust solution to the Claude CLI inheritance issue while maintaining security, performance, and ease of use.