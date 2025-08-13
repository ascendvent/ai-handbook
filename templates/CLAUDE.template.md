# CLAUDE.md – Project Overlay

Scope: Project-specific rules only  
Inherits: ascendvent/ai-handbook@v1.2.0

policy_sources:
  - source: github:ascendvent/ai-handbook
    version: v1.2.0
    includes:
      - POLICY.md
      # Add only the stack playbooks this project uses, for example:
      # - PLAYBOOKS/DOCKER.md
      # - PLAYBOOKS/TYPESCRIPT.md
      # - PLAYBOOKS/REACT-HOOKS.md
      # - PLAYBOOKS/POSTGRES.md

Project-specific rules:
- Stack declaration here. Example: Next.js + TypeScript + Postgres.
- Latency SLOs here. Example: p95 latency ≤ 400 ms for public APIs.
- Secrets and config location here.
- Health checks and smoke tests here.
- Any approved overrides with link to policy-change PR.
- Any additional local playbooks or policies.

