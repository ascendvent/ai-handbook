# GitHub Actions Playbook

## Purpose

This playbook defines **Ascendvent LLC's** standards and patterns for managing GitHub Actions workflows, including automated fixes via Claude Flow agents, best practices for database-related workflows, and CI/CD integration.

---

## 1. Workflow Maintenance Philosophy

**Primary Rule:** Avoid manual edits to `.github/workflows/*.yml` unless Claude Flow agents cannot address the issue.

### Benefits of Automation:

* Consistency across projects
* Faster recovery from workflow failures
* Alignment with local `.claude-flow/agents/` definitions

**Preferred Approach:**

1. Detect issues in workflows.
2. Use `mcp__claude-flow__github_workflow_auto` to fix them.
3. Verify with CI runs and manual inspection.

---

## 2. Available Claude Flow Workflow Tools

### GitHub Workflow Auto Agent

```typescript
mcp__claude-flow__github_workflow_auto(repo, workflow_config)
```

**Purpose:** Detect and repair GitHub Actions issues.

**Capabilities:**

* Fix YAML syntax errors
* Repair malformed job structures
* Standardize environment configs
* Optimize workflow performance

**Example:**

```typescript
mcp__claude-flow__github_workflow_auto("my-repo", {
  type: "fix_broken_workflows",
  target_files: [
    ".github/workflows/build-and-test.yml",
    ".github/workflows/security-scan.yml"
  ],
  issues: ["yaml_syntax_errors", "duplicate_sections"]
})
```

---

## 3. Database Workflow Fixes

### Required Components for DB-Dependent Workflows

```yaml
services:
  postgres:
    image: postgres:15
    env:
      POSTGRES_USER: test_user
      POSTGRES_PASSWORD: test_pass
      POSTGRES_DB: test_db
    options: >-
      --health-cmd pg_isready
      --health-interval 10s
      --health-timeout 5s
      --health-retries 5
    ports:
      - 5432:5432

steps:
  - name: Install PostgreSQL client
    run: |
      sudo apt-get update
      sudo apt-get install -y postgresql-client

  - name: Wait for PostgreSQL
    run: |
      until pg_isready -h localhost -p 5432 -U test_user; do
        sleep 2
      done

  - name: Initialize test database schema
    run: |
      PGPASSWORD=test_pass psql -h localhost -p 5432 -U test_user -d test_db -f config/postgres/init-test.sql
```

### Prevention Checklist

* [ ] DB service defined with health checks
* [ ] Client installed
* [ ] Connection wait logic present
* [ ] Schema init before tests
* [ ] Test env variables set

---

## 4. Workflow Best Practices

**DO:**

* Keep workflow configs in sync with `.claude-flow/agents/`
* Commit workflow changes via automation where possible
* Validate workflows after each change

**DON'T:**

* Duplicate logic between local agents and workflows
* Edit workflows without testing in a branch
* Skip required CI steps for speed

---

## 5. Troubleshooting Workflow Issues

**Common Issues Fixed by Claude Flow:**

* Duplicate `on:` triggers
* Missing `jobs:` key
* Orphaned `steps:`
* Invalid YAML indentation

**Manual Intervention Only If:**

* Agent reports inability to fix
* Workflow contains unique, non-standard integrations

---

## 6. Alignment Strategy

Local `.claude-flow/agents/` → `.github/workflows/*.yml`

* Agents define the rules
* Workflows implement them
* Changes to agent behavior should trigger workflow regeneration
