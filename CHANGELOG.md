# Changelog

All notable changes to the Universal AI Engineering Handbook will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.0.0] - 2026-03-02

### Changed
- Bumped package version to 3.0.0


## [2.3.0] - 2025-01-27

### Added
- Complete Claude CLI inheritance resolution system for CLAUDE.md `Inherits:` directives
- Binary CLI tools: `ai-handbook-inherit` and `claude-inherit` for manual inheritance resolution
- Automatic postinstall hook that resolves inheritance when CLAUDE.md contains inheritance directives
- Core `resolveInheritance()` function with support for multiple inheritance sources
- `.claude/config.json` generation with proper project and shared memory configuration

### Fixed
- Bug where Claude CLI ignores `Inherits: @ascendvent/ai-handbook` directives in CLAUDE.md files
- GitFlow branch merge validation bypass for develop→main PRs
- Semantic release workflow compatibility with branch protection rules

### Changed
- Enhanced inheritance documentation with comprehensive troubleshooting guide
- Improved commit validation workflow to handle GitFlow branch merges
- Updated Node.js version requirement in CI workflows

## [2.2.1] - 2025-01-26

### Changed
- Minor version bump for GitHub release alignment

## [2.2.0] - 2025-01-25

### Added
- Comprehensive open source documentation structure
- Enhanced README with Getting Started guide and agent selection flowchart
- Documentation resources section with performance benefits and links
- Real-world usage patterns and examples in README
- SECURITY.md for vulnerability reporting
- docs/EXAMPLES.md for real-world usage scenarios
- docs/TROUBLESHOOTING.md for common issues and solutions
- docs/AGENT_CUSTOMIZATION.md for extending agents
- Development workflow scripts in package.json for better developer experience

### Changed
- **MAJOR:** Optimized all 11 agent files for maximum token reduction (60-80% smaller)
- Streamlined agent descriptions while preserving core functionality
- Improved agent coordination patterns and usage instructions
- Enhanced documentation structure for better open source adoption
- Updated package.json files list to include new documentation files

### Improved
- Agent token efficiency leading to faster Claude Code performance
- Documentation clarity and professional open source presentation
- Developer onboarding experience with comprehensive guides

## [2.1.0] - 2025-01-25

### Added
- Architectural assumption prevention protocol to prevent infrastructure assumptions
- Loop detection and research escalation protocol to prevent infinite loops
- Enhanced blocker escalation protocols for authentication and access issues
- Framework change detection with mandatory research phase

### Changed
- Updated all agents with loop detection protocols
- Enhanced tracking-agent with process compliance monitoring
- Improved quality-agent with architectural verification requirements

### Fixed
- Framework version conflict handling in development workflows
- Infinite loop prevention in agent troubleshooting processes

## v1.2.0 – 2024-08-13

### Fixed
- **Version Consistency**: Updated all version references across files to maintain consistency
- **Documentation**: Fixed POLICY.md self-references and version discrepancies in examples
- **Template Updates**: Updated CLAUDE.template.md and workflow examples to use current version

### Improved
- **Version Management**: Standardized all version references to v1.2.0 across documentation
- **Installation Guide**: Updated all package installation examples with current version
- **Workflow Documentation**: Updated GitHub Actions examples with correct version tags

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

## v1.0.0 – 2024-08-01

### Added
- Initial release of ai-handbook
- Added POLICY.md with stack-agnostic global rules
- Added PLAYBOOKS: DOCKER.md, POSTGRES.md, REACT-HOOKS.md, TYPESCRIPT.md
- Added CLAUDE.template.md for project overlays
- Created agents/ directory for global agent definitions

---

## Contributing to the Changelog

When contributing to this project, please:

1. **Follow [Conventional Commits](https://conventionalcommits.org/) format**
2. **Update the [Unreleased] section** with your changes
3. **Use appropriate change categories:**
   - `Added` for new features
   - `Changed` for changes in existing functionality
   - `Deprecated` for soon-to-be removed features
   - `Removed` for now removed features
   - `Fixed` for any bug fixes
   - `Security` for vulnerability fixes

4. **Include performance impact** measurements where applicable
5. **Document breaking changes** in detail with migration guidance
6. **Link to relevant issues/PRs** using GitHub references

### Release Process

Maintainers will:
1. Move items from [Unreleased] to a new version section
2. Update version numbers across the project
3. Create Git tags for releases
4. Publish to NPM registry

For questions about versioning, see our [Contributing Guidelines](CONTRIBUTING.md).
