/**
 * EMERGENCY FIX
 * This file directly patches React to ensure no "Objects are not valid as React child" errors
 */

import React from 'react';
import { Text } from 'react-native';

console.log("🚨 APPLYING ULTRA AGGRESSIVE EMERGENCY FIX");

// Save original createElement
const originalCreateElement = React.createElement;

// Track component stack for better error reporting
let componentStack = [];

// Global stringify function with better error reporting
const safeStringify = (obj) => {
  if (obj === null || obj === undefined) return '';
  if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
  
  // Critical: Handle React elements safely and log detailed info
  if (obj && typeof obj === 'object' && obj.$$typeof) {
    console.error(`🚨 REACT ELEMENT FOUND IN TEXT: ${JSON.stringify({
      element: {
        type: typeof obj.type === 'function' ? obj.type.name : obj.type,
        $$typeof: String(obj.$$typeof)
      },
      componentStack: componentStack.slice(-10) // Last 10 components in stack
    })}`);
    return '[React Element]'; // More visible in output
  }
  
  try {
    return String(obj);
  } catch (e) {
    return '[object]';
  }
};

// Extremely aggressive sanitization of children
const aggressiveSanitizeChild = (child) => {
  if (child === null || child === undefined) return null;
  
  // Pass through string/number/boolean
  if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean') {
    return child;
  }
  
  // If it's a valid React element, return it as is
  if (React.isValidElement(child)) {
    return child;
  }
  
  // Everything else gets converted to string
  return safeStringify(child);
};

// Process array of children
const sanitizeChildren = (children) => {
  if (!children) return children;
  
  if (Array.isArray(children)) {
    return children.map(aggressiveSanitizeChild);
  }
  
  return aggressiveSanitizeChild(children);
};

// Override createElement to sanitize children for all components
React.createElement = function(type, props, ...children) {
  try {
    // Track component rendering stack (keep stack limited to avoid memory issues)
    if (componentStack.length > 50) componentStack.shift();
    componentStack.push(typeof type === 'function' ? type.name : String(type));
    
    // Special case for Text components
    if (type === Text || (typeof type === 'string' && (type.toLowerCase() === 'text' || type.toLowerCase() === 'span'))) {
      // Only strings/numbers/null/undefined are allowed inside Text
      const sanitizedChildren = children.map(child => {
        if (child === null || child === undefined) return child;
        if (typeof child === 'string' || typeof child === 'number') return child;
        if (React.isValidElement(child) && child.type === Text) return child; // Allow nested Text
        
        // Detect and log React elements that are causing problems
        if (child && typeof child === 'object' && child.$$typeof) {
          console.error(`🚨 INVALID REACT ELEMENT IN TEXT COMPONENT: Component stack: ${componentStack.join(' > ')}`);
        }
        
        // Anything else gets stringified
        return safeStringify(child);
      });
      
      return originalCreateElement.apply(React, [type, props, ...sanitizedChildren]);
    }
    
    // For non-Text components, sanitize children but not as aggressively
    const sanitizedChildren = children.map(sanitizeChildren);
    return originalCreateElement.apply(React, [type, props, ...sanitizedChildren]);
  } catch (e) {
    console.error('React.createElement emergency patch caught error:', e.message, {
      componentStack: componentStack.join(' > '),
      componentType: typeof type === 'function' ? type.name : String(type)
    });
    
    // Last resort - create with empty children
    try {
      return originalCreateElement.apply(React, [type, props]);
    } catch (e2) {
      console.error('Fatal React rendering error:', e2);
      return null;
    }
  } finally {
    // Remove this component from stack when we're done
    componentStack.pop();
  }
};

// Patch React.Children.map to handle objects
const originalChildrenMap = React.Children.map;
React.Children.map = function(children, fn) {
  try {
    return originalChildrenMap(children, fn);
  } catch (e) {
    console.warn('React.Children.map patch caught error:', e.message);
    
    // If children is an object that can't be mapped, convert to array
    if (children && typeof children === 'object' && !Array.isArray(children)) {
      try {
        // Try to convert to array with one item
        return originalChildrenMap([children], fn);
      } catch (e2) {
        // Last resort: empty array
        return [];
      }
    }
    
    return []; // Return empty array as fallback
  }
};

// Export a flag to track if the fix was applied
export default { applied: true }; 