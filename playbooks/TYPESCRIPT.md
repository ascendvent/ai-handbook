# TypeScript Playbook

## Purpose

Defines TypeScript development standards, strict typing requirements, and compilation verification protocols for Ascendvent AI-assisted development.

---

## 🛠 Development Guidelines

### Code Style

* TypeScript strict mode ON
* No `any` types - use explicit typing
* Follow ESLint and Prettier configuration in `/config`
* Prefer functional programming style when practical

## 📋 Pre-Commit Testing Checklist

Every code change must pass ALL these tests:

```bash
# TypeScript compilation
npm run check
# Must compile without errors
```

## 🔍 Enhanced Change Verification Protocol

### TypeScript Specific Verification

```bash
# Verify TypeScript compilation has no errors
docker-compose logs app | grep -i "error\|ts\|typescript" | tail -10
```

## Best Practices

**DO:**
* Use strict TypeScript configuration
* Define explicit types for all functions and variables
* Follow ESLint and Prettier rules
* Run type checks before committing
* Use functional programming patterns

**DON'T:**
* Use `any` type except in very specific migration cases
* Skip TypeScript compilation checks
* Ignore type errors or warnings
* Use loose type definitions

