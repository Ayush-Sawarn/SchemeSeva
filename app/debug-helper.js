/**
 * Debug Helper
 * Adds global error tracking for React render errors specifically for web
 * Enhanced for SDK 52 compatibility
 */
import { Platform } from 'react-native';
import React from 'react';

// Only run on web platform
if (Platform.OS === 'web') {
  try {
    // SDK 52 specific patches
    
    // 1. Fix React's Children.toArray method which can cause issues
    const originalChildrenToArray = React.Children.toArray;
    if (originalChildrenToArray) {
      React.Children.toArray = function(children) {
        try {
          return originalChildrenToArray(children);
        } catch (e) {
          console.warn('React.Children.toArray error:', e.message);
          // Fallback implementation
          if (!children) return [];
          
          // Convert to array and sanitize
          const result = [];
          React.Children.forEach(children, child => {
            if (child === null || child === undefined) return;
            if (typeof child === 'string' || typeof child === 'number') {
              result.push(child);
            } else if (React.isValidElement(child)) {
              result.push(child);
            } else {
              // Convert objects to strings
              result.push(String(child));
            }
          });
          return result;
        }
      };
    }
    
    // 2. Override React.cloneElement
    const originalCloneElement = React.cloneElement;
    if (originalCloneElement) {
      React.cloneElement = function(element, props, ...children) {
        try {
          return originalCloneElement.apply(React, [element, props, ...children]);
        } catch (e) {
          console.warn('React.cloneElement error:', e.message);
          
          // If children are causing the issue, sanitize them
          if (children && children.length > 0) {
            const safeChildren = children.map(child => {
              if (child === null || child === undefined) return child;
              if (typeof child === 'string' || typeof child === 'number') return child;
              if (React.isValidElement(child)) return child;
              return String(child);
            });
            return originalCloneElement.apply(React, [element, props, ...safeChildren]);
          }
          
          // Last resort: clone with just the props
          return originalCloneElement.apply(React, [element, props]);
        }
      };
    }
  } catch (err) {
    console.error('Error applying SDK 52 React patches:', err);
  }

  // Save the original console.error
  const originalConsoleError = console.error;
  
  // Override console.error to catch and analyze React child errors
  console.error = function(...args) {
    // Call the original console.error first
    originalConsoleError.apply(console, args);
    
    // Check if this is a React child error
    if (args[0] && typeof args[0] === 'string' && 
        args[0].includes('Objects are not valid as a React child')) {
      
      // Get the error
      const error = new Error('React child error detected');
      
      // Log the stack trace to help identify where the error happens
      console.log('%c REACT CHILD ERROR DETECTED', 'background: #ff0000; color: white; font-size: 16px;');
      console.log('%c Check these components in your code:', 'color: #ff0000; font-weight: bold;');
      
      // Parse the stack trace to extract component names
      const stack = error.stack.split('\n');
      const componentLines = stack.filter(line => 
        line.includes('render') || 
        (line.includes('at ') && !line.includes('node_modules'))
      );
      
      // Log the relevant stack lines
      componentLines.forEach(line => {
        console.log('%c → ' + line.trim(), 'color: #ff6600;');
      });
      
      // Give helpful advice
      console.log('%c TIP: Look for places where you might be using an object inside a Text component', 
                 'color: blue; font-weight: bold;');
      console.log('%c Common issues:', 'color: blue;');
      console.log('%c 1. Concatenating an object with a string', 'color: blue;');
      console.log('%c 2. Using a React element as a child of Text', 'color: blue;');
      console.log('%c 3. Rendering raw API data without checking types', 'color: blue;');
    }
  };
  
  // Add special logging for all render functions
  const originalCreateElement = React.createElement;
  if (originalCreateElement) {
    React.createElement = function(type, props, ...children) {
      try {
        return originalCreateElement.apply(React, [type, props, ...children]);
      } catch (error) {
        if (error.message && error.message.includes('Objects are not valid as a React child')) {
          console.log(`%c ERROR IN COMPONENT: ${typeof type === 'string' ? type : type?.displayName || type?.name || 'Unknown'}`, 
                     'background: #ff0000; color: white; font-size: 14px;');
          
          if (props) {
            console.log('Props:', props);
          }
        }
        throw error;
      }
    };
  }
}

export default {
  // This is just a marker to indicate this file was loaded
  loaded: true,
  sdk: '52'
}; 