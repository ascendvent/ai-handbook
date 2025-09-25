# Real-World Usage Examples

This guide provides practical examples of how to use the Universal AI Engineering Handbook in different development scenarios.

## 📋 Table of Contents

- [Complete Feature Development](#complete-feature-development)
- [Bug Investigation & Fix](#bug-investigation--fix)
- [Code Quality Improvement](#code-quality-improvement)
- [Security & Compliance Review](#security--compliance-review)
- [Release & Deployment](#release--deployment)
- [Team Onboarding](#team-onboarding)
- [Performance Optimization](#performance-optimization)

---

## Complete Feature Development

### Scenario: Implementing User Authentication with Firebase

**Team:** React/TypeScript frontend + Node.js/Express backend
**Goal:** Add Firebase authentication to existing app

#### Step 1: Project Planning
```bash
# Start with SPARC methodology coordination
claude: "Use sparc-agent to coordinate implementing Firebase user authentication. Include user registration, login, logout, and protected routes."
```

**Expected Output:**
- User story creation (US-XXX format)
- Technical requirements specification
- Architecture planning phase
- Implementation timeline

#### Step 2: Implementation
```bash
# Frontend implementation
claude: "Use development-agent to implement Firebase auth in React with TypeScript. Include authentication context, protected routes, and login/register components."

# Backend integration
claude: "Use development-agent to add Firebase admin SDK to Express server for token verification middleware."
```

**Expected Output:**
- Clean TypeScript interfaces for auth state
- React hooks with stable dependencies
- Express middleware with proper error handling
- Environment variable configuration

#### Step 3: Comprehensive Testing
```bash
# Test strategy
claude: "Use test-agent to create comprehensive test suite for Firebase auth system including unit tests for components, integration tests for API endpoints, and E2E tests for user flows."
```

**Expected Output:**
- Component tests with React Testing Library
- API endpoint tests with Supertest
- Mock Firebase services for testing
- E2E authentication flow tests

#### Step 4: Code Review & Quality
```bash
# Security and quality review
claude: "Use quality-agent to review Firebase authentication implementation for security patterns, code duplication, and architectural consistency."
```

**Expected Output:**
- Security best practices validation
- DRY principle enforcement
- TypeScript strict mode compliance
- Performance optimization suggestions

#### Step 5: GitHub Workflow
```bash
# Create PR with proper validation
claude: "Use github-workflow to create PR for Firebase auth implementation with proper validation checklist and documentation updates."
```

**Expected Output:**
- Feature branch creation
- PR with security checklist
- Documentation updates
- Code review requirements

**Result:** Complete, production-ready authentication system with tests, documentation, and proper Git workflow.

---

## Bug Investigation & Fix

### Scenario: React Hook Infinite Loop causing Performance Issues

**Problem:** `useAssessment` hook causing infinite re-renders and API spam

#### Step 1: Systematic Analysis
```bash
claude: "Use quality-agent to analyze infinite loop in React useAssessment hook. Check for unstable dependencies and performance bottlenecks."
```

**Quality Agent Analysis:**
- Identifies unstable dependencies in hook
- Detects excessive API calls pattern
- Provides root cause analysis
- Suggests specific fixes

#### Step 2: Implementation Fix
```bash
claude: "Use development-agent to fix React hook stability issues in useAssessment. Ensure proper useCallback memoization and stable dependencies."
```

**Development Agent Fix:**
```typescript
// BEFORE (Problematic)
const useAssessment = (userId: string) => {
  const [data, setData] = useState(null);

  const fetchAssessment = async () => {
    const result = await api.getAssessment(userId); // Recreated every render!
    setData(result);
  };

  useEffect(() => {
    fetchAssessment();
  }, [fetchAssessment]); // Unstable dependency!
};

// AFTER (Fixed)
const useAssessment = (userId: string) => {
  const [data, setData] = useState(null);

  const fetchAssessment = useCallback(async () => {
    const result = await api.getAssessment(userId);
    setData(result);
  }, [userId]); // Stable dependency

  useEffect(() => {
    fetchAssessment();
  }, [fetchAssessment]); // Now stable!
};
```

#### Step 3: Regression Testing
```bash
claude: "Use test-agent to add regression tests for useAssessment hook stability and performance."
```

**Test Coverage:**
- Hook rendering behavior tests
- API call frequency validation
- Performance benchmarks
- Edge case scenarios

#### Step 4: Verification
```bash
claude: "Use build-monitor to verify performance improvements and validate no infinite loops in staging environment."
```

**Result:** 90% reduction in API calls, stable hook performance, comprehensive regression tests.

---

## Code Quality Improvement

### Scenario: Legacy Codebase Refactoring

**Challenge:** Duplicate validation logic across 8 different controllers

#### Step 1: Analysis & Planning
```bash
claude: "Use quality-agent to analyze entire codebase for code duplication, especially validation logic across controllers."
```

**Quality Analysis:**
```markdown
## Code Quality Report
- **Duplicated validation logic** in 8 controllers (245 lines)
- **Missing error handling** patterns (15 locations)
- **TypeScript `any` types** found (23 instances)
- **Unused imports** detected (34 files)

## Recommendations
1. Create shared validation module
2. Standardize error handling middleware
3. Enforce strict TypeScript mode
4. Clean up unused dependencies
```

#### Step 2: Refactoring Implementation
```bash
claude: "Use development-agent to create shared validation module and refactor all controllers to use centralized validation logic."
```

**Refactoring Results:**
```typescript
// NEW: shared/validators.ts
export const validateEmail = (email: string): ValidationResult => {
  if (!email?.includes('@')) {
    return { valid: false, error: 'Invalid email format' };
  }
  return { valid: true };
};

export const validateUser = (user: CreateUserRequest): ValidationResult => {
  const emailResult = validateEmail(user.email);
  if (!emailResult.valid) return emailResult;

  // Additional validations...
  return { valid: true };
};

// REFACTORED: UserController.ts
import { validateUser } from '../shared/validators';

export class UserController {
  async createUser(req: Request, res: Response) {
    const validation = validateUser(req.body);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }
    // Business logic...
  }
}
```

#### Step 3: Testing & Validation
```bash
claude: "Use test-agent to create comprehensive tests for new shared validation module and verify all controllers work correctly."
```

**Result:** 245 lines of duplicate code eliminated, centralized validation, improved maintainability.

---

## Security & Compliance Review

### Scenario: Pre-Production Security Audit

**Goal:** Complete security review before production deployment

#### Step 1: Vulnerability Scanning
```bash
claude: "Use security-ops to perform comprehensive security audit including dependency vulnerabilities, secret exposure, and access control validation."
```

**Security Report:**
```markdown
## Security Audit Results
### ✅ Passed
- No hardcoded secrets detected
- Environment variables properly configured
- Authentication middleware implemented
- HTTPS enforced in production

### ⚠️ Warnings
- 3 NPM packages with minor vulnerabilities
- Rate limiting not implemented on public APIs
- CORS configuration could be more restrictive

### ❌ Critical Issues
- Database connection not using SSL
- JWT secrets using default values in staging
```

#### Step 2: Issue Resolution
```bash
claude: "Use development-agent to fix critical security issues: enable database SSL and update JWT secret configuration."

claude: "Use quality-agent to implement rate limiting middleware and update CORS configuration for better security."
```

#### Step 3: Compliance Validation
```bash
claude: "Use build-monitor to validate all security fixes are properly deployed and health checks are passing."
```

**Result:** All critical security issues resolved, compliance requirements met, production-ready deployment.

---

## Release & Deployment

### Scenario: Version 2.1.0 Release with New Features

**Features:** User dashboard, enhanced API, performance improvements

#### Step 1: Pre-Release Validation
```bash
claude: "Use release-ops to prepare version 2.1.0 release including changelog generation, version bumping, and deployment validation."
```

**Release Checklist:**
- All tests passing ✅
- Documentation updated ✅
- Breaking changes documented ✅
- Migration guide created ✅
- Changelog generated ✅

#### Step 2: Deployment Pipeline
```bash
# Staging deployment
claude: "Use build-monitor to deploy v2.1.0 to staging and validate all health checks pass."

# Production deployment
claude: "Use release-ops to deploy v2.1.0 to production with blue-green deployment strategy."
```

#### Step 3: Post-Deployment Monitoring
```bash
claude: "Use security-ops to monitor API spend and performance metrics after v2.1.0 deployment."
```

**Result:** Successful zero-downtime deployment with full monitoring and rollback capability.

---

## Team Onboarding

### Scenario: New Developer Joining React/Node.js Project

**Challenge:** Get new team member productive quickly with project standards

#### Step 1: Project Setup
```bash
# New team member runs
npm install @ascendvent/ai-handbook
cp node_modules/@ascendvent/ai-handbook/templates/CLAUDE.template.md ./CLAUDE.md

# Customize CLAUDE.md with project details
```

#### Step 2: Guided Learning
```bash
# Understanding codebase
claude: "Use quality-agent to analyze this codebase architecture and explain the main components, patterns used, and how different parts work together."

# First feature assignment
claude: "Use sparc-agent to guide me through implementing a simple user profile update feature using the established patterns in this codebase."
```

#### Step 3: Best Practices Training
```bash
# Code review learning
claude: "Use development-agent to show me the correct patterns for React hooks in this project and explain why certain approaches are preferred."

# Testing methodology
claude: "Use test-agent to walk me through the testing strategy for this project and help me write tests for my first feature."
```

**Result:** New team member productive in 2 days vs. 2 weeks, following established patterns immediately.

---

## Performance Optimization

### Scenario: App Loading Slowly, Users Complaining

**Problem:** React app taking 8+ seconds to load, poor user experience

#### Step 1: Performance Analysis
```bash
claude: "Use quality-agent to analyze React app performance bottlenecks including bundle size, component rendering, and API call patterns."
```

**Performance Report:**
- Bundle size: 3.2MB (recommendation: <500KB)
- Unused dependencies: 847KB
- Large images not optimized: 1.1MB
- Inefficient component re-renders: 15 components

#### Step 2: Bundle Optimization
```bash
claude: "Use development-agent to implement code splitting, lazy loading for routes, and remove unused dependencies to optimize bundle size."
```

**Optimizations Applied:**
```typescript
// Route-based code splitting
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

// Component lazy loading
const HeavyChart = lazy(() => import('./components/HeavyChart'));

// Bundle analyzer integration
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
```

#### Step 3: Image & Asset Optimization
```bash
claude: "Use build-monitor to implement image optimization pipeline and CDN integration for static assets."
```

#### Step 4: Performance Validation
```bash
claude: "Use test-agent to create performance tests and benchmarks to prevent regression of loading times."
```

**Results:**
- Loading time: 8s → 1.2s (85% improvement)
- Bundle size: 3.2MB → 480KB (85% reduction)
- User satisfaction: Significantly improved
- Lighthouse score: 45 → 95

---

## 🎯 Success Metrics

### Typical Results with AI Handbook

| Metric | Before | After | Improvement |
|--------|---------|--------|-------------|
| Development Speed | Baseline | 60% faster | 🚀 |
| Code Quality Score | 65/100 | 92/100 | 📈 |
| Bug Rate | 15 bugs/sprint | 3 bugs/sprint | 🎯 |
| Test Coverage | 45% | 87% | ✅ |
| Documentation Quality | Inconsistent | Standardized | 📚 |
| Team Onboarding | 2 weeks | 2 days | ⚡ |

### Key Benefits Observed

1. **Consistent Quality:** All team members follow same standards
2. **Faster Debugging:** Systematic approaches vs. random fixes
3. **Better Testing:** TDD enforcement leads to more reliable code
4. **Security Focus:** Built-in security and compliance checking
5. **Documentation:** Automated updates keep docs current
6. **Team Alignment:** Everyone uses same patterns and practices

---

## 💡 Pro Tips

### Agent Selection Strategy
- Start with `sparc-agent` for complex features
- Use `quality-agent` first for bug investigation
- Always follow with `test-agent` for comprehensive coverage
- End with `github-workflow` for proper PR management

### Workflow Optimization
- **Batch similar tasks:** Use same agent for related operations
- **Follow patterns:** Stick to proven agent sequences
- **Document decisions:** Always update CLAUDE.md with project learnings
- **Monitor results:** Track improvements in your specific context

### Common Pitfalls to Avoid
- Don't skip the planning phase (sparc-agent)
- Never bypass testing (test-agent) for "quick fixes"
- Always use quality-agent for refactoring tasks
- Keep CLAUDE.md updated with project evolution

---

*For more advanced usage patterns and customization options, see [Agent Customization Guide](AGENT_CUSTOMIZATION.md).*