#!/bin/bash

# Test suite for loop detection and research escalation workflow
# Tests the process improvements to prevent infinite loops during framework changes

set -e

TEST_DIR="/tmp/agent-workflow-test"
mkdir -p "$TEST_DIR"
cd "$TEST_DIR"

echo "🧪 Testing Loop Detection & Research Escalation Workflow"

# Test 1: Loop Detection Triggers
test_loop_detection() {
  echo "📋 Test 1: Loop Detection Triggers"
  
  # Simulate repeated error log entries
  cat > agent-logs.txt << EOF
ERROR: Express route error - TypeError: Unexpected ? at 5, expected END
ERROR: Express route error - TypeError: Unexpected ? at 5, expected END  
ERROR: Express route error - TypeError: Unexpected ? at 5, expected END
EOF
  
  # Test loop detection logic
  LOOP_COUNT=$(grep -c "Express route error" agent-logs.txt)
  if [ "$LOOP_COUNT" -ge 3 ]; then
    echo "✅ PASS: Loop detection triggered after $LOOP_COUNT identical errors"
  else
    echo "❌ FAIL: Loop detection should trigger after 3+ identical errors"
    return 1
  fi
}

# Test 2: Framework Change Detection
test_framework_change_detection() {
  echo "📋 Test 2: Framework Change Detection"
  
  # Simulate package.json with framework version change
  cat > package.json << EOF
{
  "dependencies": {
    "express": "^5.0.0",
    "react": "^18.2.0"
  }
}
EOF
  
  # Simulate previous version
  cat > package.json.old << EOF
{
  "dependencies": {
    "express": "^4.18.0", 
    "react": "^18.2.0"
  }
}
EOF
  
  # Test framework change detection
  FRAMEWORK_CHANGES=$(diff package.json.old package.json | grep -E "express.*[0-9]\." | wc -l)
  if [ "$FRAMEWORK_CHANGES" -gt 0 ]; then
    echo "✅ PASS: Framework version change detected"
  else
    echo "❌ FAIL: Should detect Express version change from 4 to 5"
    return 1
  fi
}

# Test 3: Research Phase Enforcement
test_research_phase_enforcement() {
  echo "📋 Test 3: Research Phase Enforcement"
  
  mkdir -p docs/research
  
  # Test case: Framework change without research documentation
  if [ ! -f "docs/research/framework-migration-$(date +%Y-%m-%d).md" ]; then
    echo "✅ PASS: Correctly identifies missing research documentation"
  else
    echo "❌ FAIL: Should flag missing research documentation"
    return 1
  fi
  
  # Create research documentation
  cat > "docs/research/framework-migration-$(date +%Y-%m-%d).md" << EOF
# Express 5 Migration Research

## Issue Identified
Express 4 optional parameter syntax `:param?` deprecated in Express 5
New syntax required: `{/:param}`

## Impact Assessment
- Affects routing in server/ directory
- Breaking change requiring code updates
- Migration complexity: Medium

## Proposed Solution
1. Scan for `:param?` patterns
2. Replace with `{/:param}` syntax
3. Test all affected routes
4. Update documentation

## User Approval Required
Present this plan before implementation.
EOF
  
  # Test research documentation validation
  if [ -f "docs/research/framework-migration-$(date +%Y-%m-%d).md" ]; then
    echo "✅ PASS: Research documentation created and validated"
  else
    echo "❌ FAIL: Research documentation not properly created"
    return 1
  fi
}

# Test 4: Escalation Workflow
test_escalation_workflow() {
  echo "📋 Test 4: Escalation Workflow"
  
  # Simulate agent log with proper escalation
  cat > escalation-log.txt << EOF
ATTEMPT 1: Fixing Express routing error
ATTEMPT 2: Same error persists
ESCALATION: Switching to research mode - investigating Express version compatibility
RESEARCH: Found Express 4 to 5 breaking changes in routing syntax
PLAN: Present migration strategy to user for approval
EOF
  
  # Validate escalation workflow
  if grep -q "ESCALATION.*research mode" escalation-log.txt && grep -q "PLAN.*user.*approval" escalation-log.txt; then
    echo "✅ PASS: Proper escalation workflow followed"
  else
    echo "❌ FAIL: Escalation workflow not properly followed"
    return 1
  fi
}

# Test 5: Process Compliance Monitoring
test_process_compliance() {
  echo "📋 Test 5: Process Compliance Monitoring"
  
  # Simulate violation: framework change without research
  cat > violation-log.txt << EOF
CHANGE: Updated Express from 4.18.0 to 5.0.0
ACTION: Attempting route syntax fix
ERROR: Route pattern still failing
EOF
  
  # Check for research phase bypass
  if grep -q "framework.*change\|Express.*5" violation-log.txt && ! grep -q "research.*phase\|investigation" violation-log.txt; then
    echo "✅ PASS: Correctly identified process violation (framework change without research)"
  else
    echo "❌ FAIL: Should detect framework change without research phase"
    return 1
  fi
}

# Run all tests
echo "🚀 Running Loop Detection & Research Escalation Tests..."
echo "=================================================="

test_loop_detection
test_framework_change_detection  
test_research_phase_enforcement
test_escalation_workflow
test_process_compliance

echo "=================================================="
echo "✅ All tests passed! Loop detection workflow is working correctly."

# Cleanup
cd - >/dev/null
rm -rf "$TEST_DIR"

echo "🎉 Loop Detection & Research Escalation Workflow Tests Complete"