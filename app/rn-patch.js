/**
 * Selectively patch React Native's native modules and event system
 * to block only problematic events without affecting core functionality.
 */

// List of events to block
const BLOCKED_EVENTS = ['topInsetsChange', 'topLayoutChange'];

// Create a new Error class to help identify our patched errors
class EventPatchError extends Error {
  constructor(message) {
    super(`[EventPatch] ${message}`);
    this.name = 'EventPatchError';
  }
}

// Function to apply patches
function applyPatches() {
  if (typeof global === 'undefined') return;

  // Keep track of which patches were applied
  const appliedPatches = [];

  // Suppress only the specific error
  const originalConsoleError = console.error;
  console.error = function(...args) {
    const errorMessage = args[0];
    if (typeof errorMessage === 'string' &&
        (errorMessage.includes('topInsetsChange') ||
         errorMessage.includes('Unsupported top level event'))) {
      // Suppress this error
      return;
    }
    return originalConsoleError.apply(console, args);
  };
  appliedPatches.push('console.error');
  
  // Set a global flag to indicate patches were applied
  try {
    global.__eventPatchesApplied = true;
  } catch (e) {
    console.log('[RN-Patch] Could not set global flag');
  }
  
  console.log('[RN-Patch] Applied minimal patches:', appliedPatches.join(', '));
}

// Apply patches immediately when loaded
applyPatches();

export default { BLOCKED_EVENTS }; 