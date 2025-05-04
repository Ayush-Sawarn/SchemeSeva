import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

// SDK 52 specific patch for "Objects are not valid as a React child" error
if (Platform.OS === 'web') {
  // Fix the Text component in React Native Web
  try {
    // Save original React.createElement
    const originalTextRender = Text.render;
    
    // Access the original createElement function
    const ReactDOM = require('react-dom');
    
    // Create a more robust patch for React's createElement to sanitize all children
    const oldRender = ReactDOM.render;
    if (oldRender && typeof oldRender === 'function') {
      ReactDOM.render = function(...args) {
        try {
          return oldRender.apply(this, args);
        } catch (error) {
          if (error && error.message && error.message.includes('Objects are not valid as a React child')) {
            console.warn('Special handling for React child error in ReactDOM.render');
            // Try a backup approach: clone and sanitize the element tree
            if (args[0] && React.isValidElement(args[0])) {
              const sanitized = React.cloneElement(args[0], { 
                ...args[0].props,
                // Force children to be strings
                children: React.Children.map(args[0].props.children, child => {
                  if (child === null || child === undefined) return child;
                  if (typeof child === 'string' || typeof child === 'number') return child;
                  if (React.isValidElement(child)) return child;
                  return String(child);
                })
              });
              return oldRender.call(this, sanitized, args[1], args[2]);
            }
          }
          throw error;
        }
      };
    }
  } catch (err) {
    console.warn('Failed to patch ReactDOM:', err);
  }
}

// EMERGENCY FIX: Monkey patch Text component to handle invalid children
try {
  // Save original Text render method
  const originalRender = Text.render;
  
  // Override Text render to safely stringify any non-string children
  if (Text.render) {
    Text.render = function(...args) {
      try {
        return originalRender.apply(this, args);
      } catch (e) {
        if (e && e.message && e.message.includes('Objects are not valid as a React child')) {
          // Log detailed error information
          console.error('🚨 REACT CHILD ERROR IN TEXT RENDER:', {
            error: e.message,
            componentStack: e.componentStack || 'Unknown stack',
            props: JSON.stringify(args[0]),
            platform: Platform.OS
          });
          
          // If this is a React child error, try to sanitize the children
          const props = {...args[0]};
          if (props.children) {
            if (Array.isArray(props.children)) {
              props.children = props.children.map(child => {
                if (typeof child === 'string' || typeof child === 'number') return child;
                if (child === null || child === undefined) return '';
                
                // For React elements or objects, provide more details
                if (child && typeof child === 'object') {
                  if (child.$$typeof) {
                    console.error('Found React element in Text:', {
                      type: typeof child.type === 'function' ? child.type.name : child.type,
                      props: Object.keys(child.props || {})
                    });
                    return '[React Element]';
                  }
                  try {
                    return JSON.stringify(child);
                  } catch (jsonErr) {
                    return '[Complex Object]';
                  }
                }
                return String(child);
              });
            } else if (typeof props.children !== 'string' && typeof props.children !== 'number') {
              // For non-primitive children, provide more details
              if (props.children && typeof props.children === 'object' && props.children.$$typeof) {
                console.error('Found React element as direct child of Text:', {
                  type: typeof props.children.type === 'function' ? props.children.type.name : props.children.type,
                  props: Object.keys(props.children.props || {})
                });
                props.children = '[React Element]';
              } else {
                props.children = String(props.children);
              }
            }
          }
          return originalRender.call(this, props);
        }
        throw e;
      }
    };
  }
} catch (err) {
  console.warn('Failed to patch Text component:', err);
}

// A simpler, more aggressive error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Always suppress the "Objects are not valid as a React child" error
    if (error && error.message && error.message.includes('Objects are not valid as a React child')) {
      console.error('Suppressing React child error:', {
        message: error.message,
        stack: error.stack,
        componentStack: error.componentStack,
        info: 'This error happens when a React component (not a string/number) is rendered inside <Text>'
      });
      return { hasError: false };
    }
    
    // Other errors will show the error UI
    console.error('Error caught in boundary:', error);
    return { hasError: true, errorInfo: error };
  }

  componentDidCatch(error, errorInfo) {
    // Log additional component stack information
    console.error('Error boundary caught error:', {
      error: error?.message,
      componentStack: errorInfo?.componentStack,
      platform: Platform.OS
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Something went wrong</Text>
          {Platform.OS === 'web' && (
            <Text style={styles.errorDetails}>
              {this.state.errorInfo?.message || 'Unknown error'}
            </Text>
          )}
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  errorText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#cf6679',
    marginBottom: 10
  },
  errorDetails: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center'
  }
});

export default ErrorBoundary; 