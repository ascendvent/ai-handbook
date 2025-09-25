# Troubleshooting Guide

Common issues and solutions when using the Universal AI Engineering Handbook.

## 📋 Table of Contents

- [Installation Issues](#installation-issues)
- [Agent Behavior Problems](#agent-behavior-problems)
- [Claude Code Integration](#claude-code-integration)
- [Performance Issues](#performance-issues)
- [Configuration Problems](#configuration-problems)
- [Development Workflow Issues](#development-workflow-issues)
- [Getting Help](#getting-help)

---

## Installation Issues

### Problem: Package Installation Fails

**Symptoms:**
- `npm install @ascendvent/ai-handbook` fails
- Permission errors during installation
- Network timeout errors

**Solutions:**

```bash
# Clear npm cache
npm cache clean --force

# Update npm to latest version
npm install -g npm@latest

# Try with different registry
npm install @ascendvent/ai-handbook --registry https://registry.npmjs.org/

# Install with exact version
npm install @ascendvent/ai-handbook@2.1.0

# Fix permissions (macOS/Linux)
sudo chown -R $(whoami) ~/.npm
```

### Problem: Template Copy Fails

**Symptoms:**
- `cp node_modules/@ascendvent/ai-handbook/templates/CLAUDE.template.md ./CLAUDE.md` fails
- "No such file or directory" error

**Solutions:**

```bash
# Check if package is installed correctly
npm list @ascendvent/ai-handbook

# Alternative copy methods
npx @ascendvent/ai-handbook init
# or
curl -o CLAUDE.md https://raw.githubusercontent.com/ascendvent/ai-handbook/main/templates/CLAUDE.template.md

# Verify template exists
ls node_modules/@ascendvent/ai-handbook/templates/
```

---

## Agent Behavior Problems

### Problem: Agents Not Following Project Standards

**Symptoms:**
- Claude Code not using educational communication style
- Agents not following testing protocols
- Quality gates not being enforced

**Diagnosis:**

```bash
# Check CLAUDE.md inheritance
head -1 CLAUDE.md
# Should show: Inherits: @ascendvent/ai-handbook

# Validate package configuration
npm run test  # If available
# or
node -e "console.log(require('@ascendvent/ai-handbook').validatePolicy(require('fs').readFileSync('CLAUDE.md', 'utf8')))"
```

**Solutions:**

1. **Fix Inheritance Declaration:**
```bash
# Ensure first line of CLAUDE.md is:
echo "Inherits: @ascendvent/ai-handbook" > temp.md
cat CLAUDE.md >> temp.md
mv temp.md CLAUDE.md
```

2. **Update Package Version:**
```bash
npm update @ascendvent/ai-handbook
```

3. **Verify Claude Code Integration:**
- Restart Claude Code
- Clear Claude Code cache if available
- Check Claude Code logs for inheritance errors

### Problem: Loop Detection Not Working

**Symptoms:**
- Agents repeating same failed attempts
- No research phase activation after errors
- Infinite troubleshooting cycles

**Solutions:**

```bash
# Check for recent agent optimizations
npm list @ascendvent/ai-handbook
# Should be version 2.1.0 or later

# Manually trigger loop detection
claude: "I've tried the same fix 3 times and it's not working. Use blocker-escalation-agent to analyze this pattern and recommend next steps."

# Verify loop detection test
npm test  # Run package tests if available
```

### Problem: Wrong Agent Selected

**Symptoms:**
- Claude Code using wrong agent for task
- Agent capabilities don't match need
- Unexpected agent behavior

**Quick Reference:**

| Task Type | Correct Agent | Wrong Agent (Avoid) |
|-----------|---------------|---------------------|
| React/TypeScript implementation | `development-agent` | `quality-agent` |
| Code review & refactoring | `quality-agent` | `development-agent` |
| Testing & TDD | `test-agent` | `development-agent` |
| PR creation & branch management | `github-workflow` | `github-issues` |
| Process coordination | `sparc-agent` | `tracking-agent` |
| Security & spend monitoring | `security-ops` | `build-monitor` |

**Solution:**
```bash
# Explicitly specify agent
claude: "Use quality-agent to analyze this code for duplication and refactoring opportunities."

# Check agent selection guide
cat node_modules/@ascendvent/ai-handbook/agents/README.md | grep -A 20 "Agent Overview"
```

---

## Claude Code Integration

### Problem: Claude Code Not Recognizing Agents

**Symptoms:**
- Claude Code shows generic responses
- No specialized agent behavior
- "Agent not found" errors

**Diagnosis Steps:**

1. **Check Claude Code Version:**
```bash
claude --version
# Ensure you're using compatible Claude Code version
```

2. **Verify File Structure:**
```bash
ls -la | grep CLAUDE.md
ls node_modules/@ascendvent/ai-handbook/agents/
```

3. **Test Inheritance:**
```bash
# Create test message
claude: "Use development-agent to explain React hooks best practices."
# Should get specialized agent response
```

**Solutions:**

```bash
# Reinstall ai-handbook
npm uninstall @ascendvent/ai-handbook
npm install @ascendvent/ai-handbook

# Reset CLAUDE.md
cp node_modules/@ascendvent/ai-handbook/templates/CLAUDE.template.md ./CLAUDE.md
# Customize with your project details

# Restart development environment
# Close and reopen Claude Code
```

### Problem: Inheritance Not Working

**Symptoms:**
- Agents not following global policies
- Missing loop detection protocols
- Standard responses instead of specialized behavior

**Debug Checklist:**

```bash
# 1. Verify inheritance syntax
head -1 CLAUDE.md
# Must be: Inherits: @ascendvent/ai-handbook

# 2. Check for syntax errors in CLAUDE.md
# Look for special characters, encoding issues

# 3. Validate package integrity
npm run validate  # If script exists
# or
node scripts/validator/validate-policy.cjs  # If available

# 4. Test with minimal CLAUDE.md
echo "Inherits: @ascendvent/ai-handbook" > CLAUDE.md
echo "" >> CLAUDE.md
echo "# Test Project" >> CLAUDE.md
```

---

## Performance Issues

### Problem: Slow Agent Responses

**Symptoms:**
- Long delays before agent responses
- Timeout errors
- Sluggish development workflow

**Solutions:**

1. **Check Network Connection:**
```bash
# Test connectivity
ping registry.npmjs.org
curl -I https://registry.npmjs.org/
```

2. **Optimize Agent Usage:**
```bash
# Use specific agents instead of general requests
# SLOW: "Help me fix this React component"
# FAST: "Use development-agent to fix React hook stability in this component"
```

3. **Monitor Resource Usage:**
```bash
# Check system resources
top
# or
htop

# Monitor disk space
df -h
```

### Problem: High API Costs

**Symptoms:**
- Unexpected Claude API charges
- Rapid token consumption
- Budget alerts

**Solutions:**

```bash
# Use security-ops agent for monitoring
claude: "Use security-ops to analyze my current API spend and recommend optimization strategies."

# Optimize agent requests
# Be specific about what you need
# Use shorter context when possible
# Batch related requests together
```

---

## Configuration Problems

### Problem: Environment Variables Not Working

**Symptoms:**
- "Missing environment variable" errors
- Authentication failures in agents
- Build failures related to configuration

**Solutions:**

```bash
# Check environment files exist
ls -la .env*

# Validate required variables
cat .env | grep -E "(API_KEY|DATABASE_URL|JWT_SECRET)"

# Test environment loading
node -e "require('dotenv').config(); console.log(process.env.NODE_ENV);"

# Use security-ops agent for validation
claude: "Use security-ops to validate my environment configuration and check for missing required variables."
```

### Problem: Docker Integration Issues

**Symptoms:**
- Build-monitor agent can't connect to Docker
- Container health checks failing
- Docker commands not found

**Solutions:**

```bash
# Check Docker installation
docker --version
docker-compose --version

# Test Docker connectivity
docker ps
docker-compose ps

# Fix common Docker issues
# Start Docker daemon
sudo systemctl start docker  # Linux
# or restart Docker Desktop

# Check build-monitor agent
claude: "Use build-monitor to diagnose Docker connectivity issues and validate container health."
```

---

## Development Workflow Issues

### Problem: Git Workflow Problems

**Symptoms:**
- github-workflow agent creates wrong branch names
- PR validation failures
- Merge conflicts

**Solutions:**

```bash
# Check git configuration
git config --list | grep user
git remote -v

# Fix branch naming
# Use github-workflow agent for standardization
claude: "Use github-workflow to create feature branch for user authentication implementation following project conventions."

# Resolve merge conflicts
claude: "Use quality-agent to analyze merge conflicts in authentication feature and recommend resolution strategy."
```

### Problem: Testing Issues

**Symptoms:**
- test-agent not finding test files
- Coverage reports incorrect
- Tests failing in CI but passing locally

**Solutions:**

```bash
# Check test configuration
cat package.json | grep -A 10 "scripts"
ls -la | grep -E "(jest|vitest|cypress)"

# Validate test setup
npm test -- --verbose
npm run test:coverage  # If available

# Use test-agent for diagnosis
claude: "Use test-agent to analyze why tests are passing locally but failing in CI environment."
```

---

## Common Error Messages

### "Agent not found"
**Cause:** Claude Code can't locate specified agent
**Fix:** Check agent name spelling, ensure package is installed

### "Inheritance loop detected"
**Cause:** Circular inheritance in CLAUDE.md
**Fix:** Remove circular references, use simple inheritance

### "Policy validation failed"
**Cause:** CLAUDE.md format issues
**Fix:** Check first line inheritance syntax, validate markdown

### "Loop detection engaged"
**Cause:** Agent attempted same fix >3 times (this is expected!)
**Action:** Review agent suggestions, provide clarification, or escalate

### "Access denied" / "Authentication failed"
**Cause:** Missing or invalid credentials
**Fix:** Check environment variables, API keys, permissions

---

## Emergency Procedures

### Complete Reset (Nuclear Option)

If nothing else works:

```bash
# 1. Backup your project
cp CLAUDE.md CLAUDE.md.backup
cp package.json package.json.backup

# 2. Clean slate
rm -rf node_modules/
npm cache clean --force

# 3. Reinstall
npm install
npm install @ascendvent/ai-handbook

# 4. Reset configuration
cp node_modules/@ascendvent/ai-handbook/templates/CLAUDE.template.md ./CLAUDE.md

# 5. Test basic functionality
claude: "Use development-agent to explain TypeScript best practices."

# 6. Gradually restore customizations
```

### Rollback to Previous Version

```bash
# Install specific working version
npm install @ascendvent/ai-handbook@2.0.0

# Or check what version was working
npm list @ascendvent/ai-handbook
git log --oneline | grep "ai-handbook"
```

---

## Getting Help

### Self-Diagnosis Checklist

Before seeking help, try:

- [ ] Package installed correctly (`npm list @ascendvent/ai-handbook`)
- [ ] CLAUDE.md has correct inheritance syntax
- [ ] Claude Code restarted after changes
- [ ] No syntax errors in configuration files
- [ ] Network connectivity working
- [ ] Environment variables properly set
- [ ] Using correct agent names for tasks

### Reporting Issues

When reporting problems:

1. **Include System Information:**
```bash
node --version
npm --version
claude --version  # If available
cat package.json | grep ai-handbook
```

2. **Provide Configuration:**
```bash
# Sanitized CLAUDE.md (remove secrets)
head -20 CLAUDE.md

# Package.json dependencies
cat package.json | grep -A 10 -B 10 ai-handbook
```

3. **Include Error Messages:**
- Copy exact error messages
- Include stack traces if available
- Note when the problem started

4. **Steps to Reproduce:**
- Exact commands that cause the issue
- Expected vs. actual behavior
- Workarounds you've tried

### Where to Get Help

- **GitHub Issues:** [Report bugs](https://github.com/ascendvent/ai-handbook/issues)
- **GitHub Discussions:** [Ask questions](https://github.com/ascendvent/ai-handbook/discussions)
- **Documentation:** [Browse guides](https://github.com/ascendvent/ai-handbook)
- **Examples:** [Real-world usage](docs/EXAMPLES.md)

### Community Support

- Check existing issues for similar problems
- Search discussions for solutions
- Contribute solutions back to help others
- Update this troubleshooting guide with new findings

---

## Prevention Tips

### Best Practices

1. **Keep Package Updated:**
```bash
npm update @ascendvent/ai-handbook
# Check for updates weekly
```

2. **Monitor Agent Performance:**
```bash
# Track token usage
# Use specific agent requests
# Batch similar operations
```

3. **Maintain Clean Configuration:**
```bash
# Regularly validate CLAUDE.md
# Keep environment variables organized
# Document project-specific customizations
```

4. **Test Changes:**
```bash
# Test agent behavior after updates
# Verify inheritance works correctly
# Check all workflows still function
```

### Early Warning Signs

Watch for these indicators of potential problems:

- Agent responses becoming generic
- Increased API costs without increased usage
- Slower response times
- Inconsistent behavior between team members
- Test failures after package updates

By following this troubleshooting guide, most common issues can be resolved quickly. For complex problems, don't hesitate to reach out to the community or report issues on GitHub.

---

*Last Updated: January 2025*
*For the most current troubleshooting information, check the [GitHub repository](https://github.com/ascendvent/ai-handbook).*