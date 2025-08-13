
### `.github/workflows/README.md`

````md
# Reusable CI Workflows – Ascendvent AI Handbook

These GitHub Actions workflows are reusable CI pipelines designed to enforce global engineering policy, testing standards, and code quality across all Ascendvent projects.

Projects should reference these workflows by version tag (e.g., `@v1.2.0`) in their own `.github/workflows/*.yml` files.

---

## Available Workflows

### 1. `policy-validate.yml`
**Purpose:**  
Validates that the project’s `CLAUDE.md`:
- Exists in the repo root
- Inherits from `ascendvent/ai-handbook`
- Passes structural checks
- Does not paste global policy text directly

**Usage example:**
```yaml
jobs:
  policy:
    uses: ascendvent/ai-handbook/.github/workflows/policy-validate.yml@v1.2.0
````

---

### 2. `build-and-test.yml`

**Purpose:**
Runs the project’s build and test suite with coverage, using project-provided commands.

**Inputs:**

* `test_command` (string, required) – command to run the tests
* `node_version` (string, optional, default `20`)
* `working_directory` (string, optional, default `"."`)

**Usage example:**

```yaml
jobs:
  tests:
    uses: ascendvent/ai-handbook/.github/workflows/build-and-test.yml@v1.2.0
    with:
      test_command: npm test -- --coverage
      node_version: "20"
```

---

### 3. `lint-and-format.yml`

**Purpose:**
Runs linting and optional formatting checks.

**Inputs:**

* `lint_command` (string, required) – command to run the linter
* `format_command` (string, optional) – command to run the formatter
* `node_version` (string, optional, default `20`)
* `working_directory` (string, optional, default `"."`)

**Usage example:**

```yaml
jobs:
  lint:
    uses: ascendvent/ai-handbook/.github/workflows/lint-and-format.yml@v1.2.0
    with:
      lint_command: npm run lint
      format_command: npm run format:check
```

---

## Version Pinning

Always pin to a version tag:

* ✅ Good: `ascendvent/ai-handbook/.github/workflows/build-and-test.yml@v1.2.0`
* ❌ Bad: `@main` (may break without warning)

---

## Adding New Workflows

1. Create the `.yml` file in this directory.
2. Update this README with:

   * Purpose
   * Inputs
   * Usage example
3. Commit and push on a feature branch.
4. Open a PR for review.

```

---

If you want, I can now give you **`scripts/validator/validate-policy.cjs`** so `policy-validate.yml` is actually functional and rejects bad CLAUDE.md files automatically. That’s the last big piece for full enforcement.
```

| **Refactoring Agent** | Reviews code for DRY and refactoring opportunities, flags duplicates/dead code, and can open a `refactor/<scope>` branch + PR with a prioritized plan. |
