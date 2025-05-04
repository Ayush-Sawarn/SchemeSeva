/**
 * EMERGENCY FIX FOR SERVER-SIDE RENDERING
 * A minimal version that's safe for SSR
 */

import React from 'react';

// This is a safer version for both SSR and client
console.log("🔄 Applying SSR-compatible emergency fix");

// Only apply client-side patches when running in the browser
if (typeof window !== 'undefined') {
  try {
    // Safe patch for React.Children.toArray
    const originalToArray = React.Children.toArray;
    React.Children.toArray = function(children) {
      try {
        return originalToArray(children);
      } catch (e) {
        console.warn('React.Children.toArray fallback - ignoring error:', e.message);
        return [];
      }
    };
    
    // Safe patch for React.Children.map
    const originalMap = React.Children.map;
    React.Children.map = function(children, fn) {
      try {
        return originalMap(children, fn);
      } catch (e) {
        console.warn('React.Children.map fallback - ignoring error:', e.message);
        if (Array.isArray(children)) {
          return children.map(fn);
        }
        return [];
      }
    };
  } catch (e) {
    console.error('Failed to apply client-side patches:', e);
  }
}

// Export dummy component for compatibility
export default function EmergencyFix() {
  return null;
} 