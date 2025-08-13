# Claude Flow Playbook

## Purpose

Defines standardized orchestration, coordination, and MCP tool usage patterns for Claude Flow agents across all Ascendvent projects. Ensures workflow automation, task orchestration, and troubleshooting follow reusable, battle-tested approaches.

---

## 🤖 Claude Flow Orchestration Patterns

### **Swarm Initialization Patterns**

```typescript
// Hierarchical topology for complex tasks
mcp__claude-flow__swarm_init({
  topology: "hierarchical",
  maxAgents: 8,
  strategy: "balanced"
})

// Mesh topology for collaborative research
mcp__claude-flow__swarm_init({
  topology: "mesh",
  maxAgents: 4,
  strategy: "parallel"
})
```

### **Agent Specialization Templates**

```typescript
// Technical specialist agents
mcp__claude-flow__agent_spawn({
  type: "specialist",
  name: "Technical-Architecture-Analyst",
  capabilities: ["system_design", "performance_analysis", "integration_patterns"]
})

// Research and methodology agents  
mcp__claude-flow__agent_spawn({
  type: "researcher",
  name: "Evidence-Based-Research-Agent",
  capabilities: ["methodology_analysis", "peer_review_synthesis", "technical_feasibility"]
})

// Quality assurance and testing agents
mcp__claude-flow__agent_spawn({
  type: "tester",
  name: "Quality-Assurance-Agent",
  capabilities: ["test_automation", "coverage_analysis", "regression_testing"]
})
```

### **Task Orchestration Strategies**

```typescript
// Sequential for dependent tasks
mcp__claude-flow__task_orchestrate({
  task: "Multi-phase system implementation",
  strategy: "sequential",
  priority: "high",
  dependencies: ["foundation", "core_features", "integration"]
})

// Parallel for independent research
mcp__claude-flow__task_orchestrate({
  task: "Multi-domain research analysis",
  strategy: "parallel",
  priority: "medium",
  dependencies: []
})

// Adaptive for complex problem-solving
mcp__claude-flow__task_orchestrate({
  task: "System optimization and debugging",
  strategy: "adaptive",
  priority: "critical"
})
```

---

## 🧠 Memory and Learning Patterns

```typescript
// Store collective knowledge
mcp__claude-flow__memory_usage({
  action: "store",
  key: "patterns/successful_workflows",
  value: "GitHub Actions + PostgreSQL + Claude Flow integration patterns",
  namespace: "global_knowledge",
  ttl: 604800 // 1 week
})

// Pattern recognition for similar issues
mcp__claude-flow__pattern_recognize({
  data: ["workflow_failures", "database_errors", "ci_cd_patterns"],
  patterns: ["database_initialization_missing", "yaml_syntax_errors"]
})

// Neural training on successful patterns
mcp__claude-flow__neural_train({
  pattern_type: "coordination",
  training_data: "successful_database_workflow_fixes",
  epochs: 50
})
```

---

## 🔄 Alignment Strategy: Local Agents → GitHub Actions

* **Local Claude Flow Agents** define the **authoritative behavior**
* GitHub Actions workflows **must align** with agent specifications
* Changes to agent logic propagate to workflows
* Prevent drift between CI/CD and local dev environments

---

## 🚨 Troubleshooting Workflow Issues

**Common Problems Fixed by Claude Flow:**

* Duplicate `on:` trigger sections
* Missing `jobs:` keys
* Orphaned `steps:` without parent jobs
* Invalid YAML indentation
* Inconsistent environment variable naming
* Missing job dependencies

**Manual Intervention Only When:**

* Claude Flow cannot repair
* Custom business logic is required
* Third-party integration setup is unique

---

## ✅ Best Practices

**DO**

* Use Claude Flow agents before manual edits
* Keep `.claude-flow/agents/` definitions updated
* Run workflow repair verification tests

**DON'T**

* Edit YAML directly unless unavoidable
* Duplicate logic between agents and workflows
* Ignore drift warnings

