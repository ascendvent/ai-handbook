# Agent Customization Guide

Learn how to customize, extend, and create new agents for your specific project needs while maintaining compatibility with the Universal AI Engineering Handbook.

## 📋 Table of Contents

- [Understanding Agent Architecture](#understanding-agent-architecture)
- [Customizing Existing Agents](#customizing-existing-agents)
- [Creating New Agents](#creating-new-agents)
- [Advanced Customization](#advanced-customization)
- [Best Practices](#best-practices)
- [Contributing Back](#contributing-back)

---

## Understanding Agent Architecture

### Agent File Structure

All agents are markdown files with YAML frontmatter:

```markdown
---
name: my-custom-agent
description: Short description of agent purpose
tools: Read,Write,Edit,Bash
model: sonnet
type: development
color: "#FF6B35"
---

# Agent Name
Brief description of what this agent does.

## Core Functions
- Function 1: Description
- Function 2: Description

## Key Operations
[Agent-specific content here]
```

### Agent Metadata Fields

| Field | Required | Description | Examples |
|-------|----------|-------------|----------|
| `name` | ✅ | Unique agent identifier | `my-custom-agent` |
| `description` | ✅ | Brief agent purpose | `Custom React specialist` |
| `tools` | ✅ | Available Claude Code tools | `Read,Write,Edit,Bash` |
| `model` | ✅ | AI model preference | `sonnet`, `haiku` |
| `type` | ✅ | Agent category | `development`, `quality`, `operations` |
| `color` | ⚠️ | UI color (hex) | `"#FF6B35"` |

### Available Tools

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `Read` | Read files | File analysis, code review |
| `Write` | Create new files | New implementations, documentation |
| `Edit` | Modify files | Bug fixes, updates |
| `MultiEdit` | Batch file changes | Refactoring, mass updates |
| `Bash` | Run commands | Testing, building, deployment |
| `Glob` | Find files by pattern | Code discovery, cleanup |
| `Grep` | Search file contents | Bug hunting, pattern analysis |
| `TodoWrite` | Task management | Progress tracking |
| `LS` | List directories | File structure exploration |

---

## Customizing Existing Agents

### Method 1: Project-Specific Override (Recommended)

Create custom agents in your project's `.claude/agents/` directory:

```bash
mkdir -p .claude/agents
cp node_modules/@ascendvent/ai-handbook/agents/development-agent.md .claude/agents/my-dev-agent.md
```

Then customize for your project:

```markdown
---
name: my-dev-agent
description: React/TypeScript specialist for my-project with custom patterns
tools: Read,Write,Edit,MultiEdit,Bash
model: sonnet
type: development
color: "#FF6B35"
---

# My Project Development Specialist
React/TypeScript implementation following my-project specific patterns and conventions.

## Project-Specific Rules
- Always use our custom useApiClient hook instead of fetch
- Follow our specific component naming: ComponentName.component.tsx
- Use our design system components from @mycompany/ui-kit
- Implement analytics tracking on all user interactions

## Tech Stack Requirements
- React 18+ with TypeScript 5.0+
- Vite for bundling
- TanStack Query for state management
- Styled-components for styling
- Jest + Testing Library for testing

[Rest of customized agent content...]
```

### Method 2: CLAUDE.md Agent Overrides

Add agent customizations directly in your `CLAUDE.md`:

```markdown
Inherits: @ascendvent/ai-handbook

# My Project Configuration

## Agent Customizations

### development-agent Overrides
- Use Material-UI components instead of generic HTML
- Always implement accessibility features (WCAG 2.1 AA)
- Follow our TypeScript strict mode configuration
- Use our custom error boundary pattern

### test-agent Overrides
- Minimum coverage: 95% (higher than default 80%)
- Use MSW for API mocking in tests
- Include visual regression tests for components
- Performance budget: <2s load time for all pages
```

### Method 3: Environment-Specific Agents

Create different agent behaviors for different environments:

```markdown
---
name: staging-deployment-agent
description: Deployment specialist for staging environment
tools: Bash,Read,Write
model: sonnet
type: operations
color: "#FFA500"
---

# Staging Deployment Agent
Specialized deployment agent for staging environment with relaxed validation.

## Staging-Specific Protocols
- Allow experimental features
- Skip performance regression tests
- Enable debug logging
- Use test database connections
- Relaxed security checks for development

## Deployment Commands
```bash
# Staging deployment with debug flags
npm run build:staging
docker build -t myapp:staging-$(git rev-parse --short HEAD) .
docker push registry.mycompany.com/myapp:staging-latest
```
```

---

## Creating New Agents

### Step 1: Identify the Need

Good candidates for custom agents:

- **Domain-specific expertise:** Healthcare, finance, gaming, etc.
- **Technology specialization:** GraphQL, WebGL, blockchain
- **Company-specific workflows:** Internal tools, proprietary frameworks
- **Integration specialists:** Specific APIs, third-party services

### Step 2: Design the Agent

Template for new agent creation:

```markdown
---
name: graphql-specialist
description: GraphQL API development and optimization specialist
tools: Read,Write,Edit,Bash,Glob,Grep
model: sonnet
type: development
color: "#E10098"
---

# GraphQL Development Specialist
Expert in GraphQL schema design, resolver implementation, and query optimization.

## Core Functions
- **Schema Design**: Type definitions, interfaces, unions, custom scalars
- **Resolver Implementation**: Efficient data fetching, N+1 problem prevention
- **Performance Optimization**: Query analysis, caching strategies, DataLoader usage
- **Security**: Query depth limiting, cost analysis, authentication integration

## GraphQL Best Practices
### Schema Design Patterns
```graphql
# Use descriptive names and proper nullability
type User {
  id: ID!
  email: String!
  profile: UserProfile  # Nullable for optional data
  posts: [Post!]!       # Non-null array of non-null items
}

# Implement pagination consistently
type Query {
  users(first: Int, after: String): UserConnection!
}
```

### Resolver Patterns
```javascript
// Use DataLoader to prevent N+1 queries
const resolvers = {
  User: {
    posts: async (user, args, { postLoader }) => {
      return postLoader.load(user.id);
    }
  }
};

// Implement proper error handling
const resolvers = {
  Query: {
    user: async (parent, { id }, context) => {
      try {
        return await context.userService.findById(id);
      } catch (error) {
        throw new ApolloError('User not found', 'USER_NOT_FOUND');
      }
    }
  }
};
```

## Integration Commands
```bash
# Schema validation
npx graphql-schema-linter schema.graphql

# Generate TypeScript types
npx graphql-codegen --config codegen.yml

# Performance analysis
npx apollo-engine-schema check
```

Implement GraphQL solutions following Apollo Federation standards, optimize query performance, and ensure type safety across client and server.
```

### Step 3: Test Your Agent

```bash
# Create test project
mkdir test-graphql-agent
cd test-graphql-agent
npm init -y

# Install ai-handbook
npm install @ascendvent/ai-handbook

# Create CLAUDE.md with custom agent
echo "Inherits: @ascendvent/ai-handbook" > CLAUDE.md
mkdir -p .claude/agents
cp /path/to/your/graphql-specialist.md .claude/agents/

# Test the agent
claude: "Use graphql-specialist to design a user management schema with proper type safety and pagination."
```

### Step 4: Validate Agent Behavior

Ensure your agent follows the standards:

- ✅ Provides specific, actionable guidance
- ✅ Includes code examples and patterns
- ✅ Follows educational communication style
- ✅ Integrates with existing agent workflows
- ✅ Includes proper error handling
- ✅ Documents success criteria

---

## Advanced Customization

### Dynamic Agent Selection

Create smart agent routing based on context:

```markdown
# In CLAUDE.md
## Agent Selection Rules

### File Type Routing
- `*.graphql, *.gql` → Use `graphql-specialist`
- `*.test.ts, *.spec.ts` → Use `test-agent`
- `*.tf, *.tfvars` → Use `terraform-agent`
- `docker-compose.yml, Dockerfile` → Use `build-monitor`

### Task Type Routing
- Queries containing "schema", "resolver", "mutation" → Use `graphql-specialist`
- Performance issues → Use `quality-agent` first, then specialist
- Security concerns → Use `security-ops` + relevant specialist
```

### Multi-Agent Workflows

Design coordinated agent sequences:

```markdown
---
name: feature-implementation-coordinator
description: Coordinates multiple agents for complete feature implementation
tools: TodoWrite,Read,Write
model: sonnet
type: coordination
color: "#9333EA"
---

# Feature Implementation Coordinator
Orchestrates multi-agent workflows for complete feature development.

## Workflow Coordination

### Full-Stack Feature Implementation
1. **Planning Phase**: Use `sparc-agent` for specification
2. **API Development**: Use `graphql-specialist` for schema and resolvers
3. **Frontend Development**: Use `development-agent` for React components
4. **Testing**: Use `test-agent` for comprehensive test suite
5. **Quality Review**: Use `quality-agent` for code review
6. **Integration**: Use `build-monitor` for CI/CD validation
7. **Documentation**: Use `tracking-agent` for planning alignment

### Coordination Protocol
- Create TodoWrite tasks for each phase
- Pass context between agents using structured handoffs
- Validate each phase completion before progression
- Maintain traceability from requirements to implementation
```

### Agent Inheritance

Create specialized agents that inherit from base agents:

```markdown
---
name: react-native-agent
description: React Native specialist inheriting from development-agent
extends: development-agent
tools: Read,Write,Edit,Bash,Glob
model: sonnet
type: development
color: "#61DAFB"
---

# React Native Development Specialist
Inherits all development-agent capabilities with React Native specializations.

## Additional React Native Functions
- **Native Module Integration**: Platform-specific code, bridging
- **Performance Optimization**: Bundle size, memory usage, startup time
- **Platform Differences**: iOS vs Android specific implementations
- **Navigation**: React Navigation patterns and optimization
- **State Management**: Redux Toolkit, Zustand for mobile apps

## Platform-Specific Patterns
### iOS Considerations
```typescript
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0, // Status bar
    ...Platform.select({
      ios: { shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 4 }
    })
  }
});
```

Inherits all base development patterns while adding React Native mobile development expertise.
```

---

## Best Practices

### Agent Design Principles

1. **Single Responsibility:** Each agent should have one clear purpose
2. **Composition over Inheritance:** Prefer composing multiple focused agents
3. **Clear Interfaces:** Well-defined inputs, outputs, and expectations
4. **Error Handling:** Graceful degradation and clear error messages
5. **Documentation:** Comprehensive examples and usage patterns

### Naming Conventions

```bash
# Good agent names
database-migration-agent.md
vue3-composition-api-agent.md
aws-lambda-deployment-agent.md
accessibility-compliance-agent.md

# Avoid
helper-agent.md          # Too generic
database-agent.md        # Too broad
my-agent.md             # Not descriptive
complex-system-agent.md  # Unclear scope
```

### Content Structure

```markdown
# Agent Structure Template

## 1. Header Section
- Frontmatter with metadata
- Brief agent description
- Purpose statement

## 2. Core Functions
- Primary capabilities
- Key responsibilities
- Integration points

## 3. Implementation Patterns
- Code examples
- Best practices
- Common scenarios

## 4. Commands & Tools
- CLI commands
- Configuration examples
- Validation scripts

## 5. Success Criteria
- Quality gates
- Performance metrics
- Validation steps

## 6. Integration
- Related agents
- Workflow patterns
- Handoff protocols
```

### Testing Custom Agents

```bash
# Agent validation checklist
test_agent_functionality() {
  echo "Testing custom agent behavior..."

  # 1. Syntax validation
  yamllint .claude/agents/*.md

  # 2. Content validation
  grep -E "^---" .claude/agents/*.md  # Check frontmatter

  # 3. Functional testing
  claude: "Use my-custom-agent to solve a test problem"

  # 4. Integration testing
  claude: "Use my-custom-agent then quality-agent for code review"

  # 5. Performance testing
  time claude: "Use my-custom-agent for complex task"
}
```

---

## Contributing Back

### Sharing Your Agents

If you've created a valuable agent, consider contributing it back:

1. **Generalize the Agent:** Remove project-specific details
2. **Add Comprehensive Documentation:** Include usage examples
3. **Test Thoroughly:** Validate in multiple scenarios
4. **Follow Standards:** Match existing agent patterns

### Contribution Process

```bash
# 1. Fork the repository
git clone https://github.com/your-username/ai-handbook.git
cd ai-handbook

# 2. Create your agent
cp templates/agent-template.md agents/my-new-agent.md
# Customize the agent

# 3. Update documentation
# Add to agents/README.md
# Update main README.md if significant

# 4. Test thoroughly
npm test
npm run validate

# 5. Submit PR
git add agents/my-new-agent.md
git commit -m "feat: add GraphQL specialist agent for schema design and optimization"
git push origin feature/graphql-agent
```

### Agent Quality Standards

For contribution acceptance:

- ✅ **Unique Value:** Solves problems not covered by existing agents
- ✅ **Clear Scope:** Well-defined responsibilities and boundaries
- ✅ **Educational Style:** Explains concepts simply and clearly
- ✅ **Code Examples:** Practical, working code samples
- ✅ **Error Handling:** Robust error detection and recovery
- ✅ **Integration:** Works well with existing agents
- ✅ **Documentation:** Comprehensive usage guide
- ✅ **Testing:** Validated in real-world scenarios

---

## Advanced Examples

### Creating a Domain Expert

```markdown
---
name: healthcare-compliance-agent
description: HIPAA compliance and healthcare data security specialist
tools: Read,Grep,Bash,Write,Edit
model: sonnet
type: security
color: "#DC2626"
---

# Healthcare Compliance Specialist
Expert in HIPAA compliance, healthcare data security, and medical software regulations.

## Compliance Areas
- **HIPAA Privacy Rule:** PHI handling, minimum necessary standard
- **HIPAA Security Rule:** Administrative, physical, technical safeguards
- **HITECH Act:** Breach notification, audit controls
- **FDA Regulations:** Medical device software, 510(k) submissions

## Security Protocols
### PHI Data Handling
```typescript
interface PHISecureHandler {
  encrypt(data: PHIData): EncryptedPHI;
  decrypt(data: EncryptedPHI, authorization: AccessControl): PHIData | null;
  audit(access: PHIAccess): void;
  minimizeData(data: PHIData, purpose: AccessPurpose): MinimalPHI;
}
```

Implement healthcare applications with full HIPAA compliance and security best practices.
```

### Framework-Specific Agents

```markdown
---
name: nextjs-app-router-agent
description: Next.js 13+ App Router specialist with server components
tools: Read,Write,Edit,Bash
model: sonnet
type: development
color: "#000000"
---

# Next.js App Router Specialist
Expert in Next.js 13+ App Router, server components, and modern React patterns.

## App Router Patterns
### Server Components
```tsx
// app/dashboard/page.tsx - Server Component
import { getUserData } from '@/lib/api';

export default async function DashboardPage() {
  const user = await getUserData(); // Server-side data fetching

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <UserStats data={user} />
    </div>
  );
}
```

### Client Components
```tsx
'use client';
import { useState } from 'react';

export function InteractiveButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

Implement modern Next.js applications with optimal performance and developer experience.
```

---

## Conclusion

Agent customization allows you to extend the Universal AI Engineering Handbook to fit your specific needs while maintaining compatibility and consistency. Whether you're creating project-specific overrides or contributing new agents back to the community, following these guidelines ensures high-quality, maintainable agent implementations.

Key takeaways:
- Start with existing agents and customize incrementally
- Focus on single responsibility and clear interfaces
- Test thoroughly in real-world scenarios
- Follow the established patterns and conventions
- Consider contributing valuable agents back to the community

For questions about agent customization, check the [Troubleshooting Guide](TROUBLESHOOTING.md) or reach out via [GitHub Discussions](https://github.com/ascendvent/ai-handbook/discussions).

---

*Last Updated: January 2025*
*For the latest customization examples, see the [GitHub repository](https://github.com/ascendvent/ai-handbook).*