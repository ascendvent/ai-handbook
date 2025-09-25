# AI Handbook Updates Required

## Overview
This document outlines the changes needed to the `@ascendvent/ai-handbook` package to prevent agents from making architectural assumptions and require clarifying questions instead.

## Root Cause
Agents were making assumptions about infrastructure state and implementation approaches without verifying actual deployment vs documentation, leading to wasted effort and incorrect solutions.

## Required Changes

### 1. CLAUDE_GLOBAL.md Updates

**File:** `/CLAUDE_GLOBAL.md`  
**Location:** Add to "Authentication/Access Escalation Criteria" section (around line 61)  
**Current relevant line:** `- **Requirement and Tack Clarification** → STOP and ask follow up questions to research and ensure details for verification all asks`

**Addition needed after line 61:**

```markdown
### Architectural Assumption Prevention Protocol
- **Infrastructure Assumptions** → STOP and confirm what's actually deployed vs documented before implementing solutions
- **Implementation Approach Ambiguity** → STOP and ask which approach when multiple options exist (e.g., n8n workflows vs monolith)
- **Scope Verification** → STOP and clarify requirements when specs mention unbuilt features as if they exist
- **Architectural Decision Points** → STOP and confirm architecture choices before large implementation efforts
- **Technology Stack Verification** → STOP and verify actual technology deployment vs specification assumptions

**Required Clarifying Questions Framework:**
Before any major implementation, agents MUST ask:
- "I see specs mentioning [technology/infrastructure] - is this actually deployed and configured?"
- "Should I implement approach A or B? Both are mentioned in the documentation."
- "Before building this, what's the current state of [infrastructure/feature/service]?"
- "The specs assume [X] exists - can you confirm the current implementation status?"
- "Which architectural approach should I take: [list specific options from analysis]?"

**Implementation Rule:**
When multiple viable approaches exist or infrastructure state is unclear, agents MUST present options and ask for explicit direction rather than making assumptions and proceeding.
```

### 2. Agent-Specific Updates Required

The following agents need behavioral updates to incorporate the assumption prevention protocol:

#### 2.1 Development Agent (`/agents/development-agent.md`)
**Current Issue:** Makes assumptions about stack configuration and deployment state  
**Update Needed:** Add infrastructure verification requirements before implementation

**Addition to agent prompt:**
```markdown
## Assumption Prevention Requirements
- **ALWAYS verify infrastructure state** before implementing solutions that depend on external services
- **ASK clarifying questions** when multiple implementation approaches are viable
- **CONFIRM architectural decisions** explicitly before major development efforts
- **STOP and ask** when encountering discrepancies between specs and actual deployment
```

#### 2.2 Quality Agent (`/agents/quality-agent.md`)
**Current Issue:** Assumes certain refactoring approaches without confirming constraints  
**Update Needed:** Add architecture verification before suggesting major refactors

**Addition to agent prompt:**
```markdown
## Architecture Verification Protocol
- **VERIFY existing infrastructure** before suggesting architectural changes
- **ASK about deployment constraints** that may affect refactoring approaches  
- **CONFIRM technology choices** before recommending new dependencies or patterns
```

#### 2.3 SPARC Agent (`/agents/sparc-agent.md`)
**Current Issue:** May assume implementation approaches during specification phase  
**Update Needed:** Enhanced specification phase to include infrastructure verification

**Addition to agent prompt:**
```markdown
## Specification Phase Enhancement
During the Specification phase, MUST include:
- **Infrastructure State Verification**: Confirm what's actually deployed vs documented
- **Implementation Approach Clarification**: When multiple approaches exist, present options and ask for direction
- **Technology Stack Validation**: Verify assumed technologies are actually available and configured
```

#### 2.4 Research Agent (`/agents/research-agent.md` - if exists in ai-handbook)
**Current Issue:** May recommend solutions based on documented specs without verifying implementation feasibility  
**Update Needed:** Add implementation state verification to research methodology

#### 2.5 New Agent Consideration: Infrastructure Verification Agent
**Purpose:** Dedicated agent for verifying infrastructure state and deployment status  
**Scope:** Check actual vs documented infrastructure before other agents make implementation decisions  
**Tools:** Read, Bash, WebFetch for checking service availability

### 3. Global Behavioral Changes

#### 3.1 Task Tool Usage Protocol Update
**Current:** Agents proceed with implementation based on specs  
**Updated:** Agents must verify infrastructure state and ask clarifying questions before implementation

#### 3.2 Error Message Enhancement
**Current:** Generic "implementation failed" messages  
**Updated:** Specific error categories that distinguish between:
- Infrastructure not available (need user configuration)
- Implementation bugs (continue troubleshooting)
- Architecture assumptions (need user clarification)

### 4. Testing the Changes

#### 4.1 Validation Scenarios
Create test scenarios where:
- Specs mention undeployed infrastructure
- Multiple implementation approaches are viable
- Documentation and reality don't match

#### 4.2 Success Criteria
- Agents ask clarifying questions instead of making assumptions
- Users receive explicit options when multiple approaches exist
- Implementation failures are properly categorized
- No more "false success" scenarios where agents assume infrastructure exists

### 5. Rollout Plan

1. **Phase 1:** Update CLAUDE_GLOBAL.md with assumption prevention protocol
2. **Phase 2:** Update individual agent prompts with specific verification requirements
3. **Phase 3:** Test with controlled scenarios to validate behavioral changes
4. **Phase 4:** Deploy updated package and validate across projects

## Expected Benefits

- **Reduced wasted effort** from implementing solutions for non-existent infrastructure
- **Better user experience** with explicit choices instead of hidden assumptions
- **Faster problem resolution** through proper error categorization
- **More reliable implementations** based on actual system state vs documentation

## Implementation Priority

**High Priority:** CLAUDE_GLOBAL.md updates (affects all agents immediately)  
**Medium Priority:** Core agent updates (development, quality, sparc)  
**Low Priority:** New infrastructure verification agent (nice-to-have)

---

**Created:** 2025-01-29  
**Reason:** Prevent architectural assumptions and require explicit clarification  
**Impact:** Global behavioral change for all projects using ai-handbook