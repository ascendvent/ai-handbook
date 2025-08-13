# Changelog

## v1.1.1 – 2025-08-13

### Added
- **Refactoring Agent**: New automated agent for DRY violation detection, dead code analysis, and architecture quality assessment
- **MCP Tools**: Added `mcp__claude-flow__refactor_analyze` and `mcp__claude-flow__refactor_branch` command-line tools
- **GitHub Actions Workflow**: Added `refactor-analyze.yml` workflow for automated refactoring analysis on PRs and monthly schedule
- **Tools Directory**: New `/tools/mcp/` directory structure for MCP command utilities

### Changed
- **Test Enforcement Agent**: Removed Playwright E2E test dependency to simplify configuration
- **POLICY.md**: Added dedicated Refactoring Agent section with enforcement rules and trigger conditions
- **Package.json**: Added binary exports for MCP refactoring tools

### Improved
- **README**: Updated key features to highlight automated refactoring detection capabilities
- **Agent Documentation**: Updated agents catalog to include Refactoring Agent specifications

## v1.0.0 – YYYY-MM-DD
- Initial release of ai-handbook  
- Added POLICY.md with stack-agnostic global rules  
- Added PLAYBOOKS: DOCKER.md, POSTGRES.md, REACT-HOOKS.md, TYPESCRIPT.md  
- Added CLAUDE.template.md for project overlays  
- Created agents/ directory for global agent definitions
