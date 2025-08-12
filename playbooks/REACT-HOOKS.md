--- ai-handbook/PLAYBOOKS/REACT-HOOKS.md
4) React Hook Dependency Stability & Infinite Loop Prevention
🔄 Critical Hook Architecture Patterns

React hook dependency instability is a major source of infinite re-render loops that can crash applications and cause resource exhaustion. Follow these patterns religiously:

❌ ANTI-PATTERN: Unstable Dependencies

// NEVER: Dynamic values in hook initialization cause infinite loops
const { get: getStatus } = useApiGet<OnboardingStatus>(`/api/status/${user?.id}`);

// NEVER: Non-memoized callback with changing dependencies
const checkStatus = async () => {
  const result = await getStatus(); // This function reference changes every render!
  // ... rest of function
};
✅ CORRECT PATTERN: Stable Dependencies

// CORRECT: Stable hook initialization, dynamic URLs at call-time
const { get: getStatusBase } = useApiGet<OnboardingStatus>();

// CORRECT: Properly memoized callback with stable dependencies  
const checkStatus = useCallback(async () => {
  const result = await getStatusBase(`/api/status/${user?.id}`);
  // ... rest of function
}, [user, getStatusBase]); // Only include truly stable dependencies
🚨 Hook Dependency Stability Rules

Hook Creation Stability: Never include dynamic values in hook initialization

// BAD: Hook recreated on every user change
const { get } = useApiGet(`/api/user/${user?.id}`);

// GOOD: Stable hook, dynamic URL at runtime  
const { get } = useApiGet();
const userData = await get(`/api/user/${user?.id}`);
useCallback Dependencies: Only include dependencies that should trigger re-creation

// BAD: Function recreated on every render due to unstable dep
const handler = useCallback(async () => {
  await someFunction();
}, [someFunction]); // someFunction changes every render!

// GOOD: Stable dependencies only
const handler = useCallback(async () => {
  await api.get(`/endpoint/${stableValue}`);
}, [stableValue]); // Only include stable values
Custom Hook Returns: Always memoize returned functions

// In custom hooks, always memoize functions returned to components
export function useCustomHook() {
  const doSomething = useCallback(async () => {
    // implementation
  }, [/* stable deps only */]);
  
  return { doSomething }; // Stable function reference
}
🔍 Infinite Loop Detection Techniques

Browser Dev Tools Detection:

Console Warnings: Watch for "Maximum update depth exceeded" React warnings
Network Tab: Look for rapid-fire identical API requests (<100ms apart)
Performance Tab: Record and look for excessive React render cycles
Memory Tab: Watch for continuously climbing memory usage
Log-Based Detection:

# Check for repetitive log patterns indicating infinite loops
docker-compose logs app | grep -E "(render|effect|callback)" | tail -50

# Look for excessive identical API calls
docker-compose logs app | grep -E "GET|POST" | uniq -c | sort -nr

# Monitor for React warnings in container logs  
docker-compose logs app | grep -i "warning.*update.*depth"
🛠 Debugging Infinite Loop Root Causes

Step 1: Identify the Loop Source

# Add debug logs to suspect components/hooks
console.log('[ComponentName] Rendering with props:', props);
console.log('[HookName] Hook called with deps:', deps);
Step 2: Trace Dependency Chain

Start with the component showing symptoms (e.g., excessive renders)
Check all hooks used by that component
Examine custom hook dependencies and return values
Look for unstable references in dependency arrays
Step 3: Verify Fix with Container Rebuild

# Always rebuild after hook dependency fixes
docker-compose down --volumes --remove-orphans
docker-compose build --no-cache
docker-compose up -d --force-recreate

# Monitor logs to confirm loop is eliminated
docker-compose logs app --tail=50 | grep -v "GET /api/health"
📋 Hook Stability Checklist

Before committing any hook changes:

[ ] No dynamic values in hook initialization calls
[ ] All useCallback dependencies are truly stable
[ ] Custom hooks return memoized function references
[ ] No object/array literals in dependency arrays
[ ] Tested with clean Docker rebuild and log monitoring
[ ] Verified no "Maximum update depth" warnings in console
Common Hook Stability Issues:

Dynamic URLs in hook creation: Causes hook recreation on every render
Non-memoized callbacks: Creates new function references continuously
Object literals in deps: [{ key: value }] creates new object every render
Function props as deps: Parent component functions that aren't memoized
State setters in deps: Usually unnecessary and can cause loops

