import React, { useEffect } from 'react';
import { View, Text, Platform, AppRegistry, NativeEventEmitter } from 'react-native';

// More aggressive patching for unsupported events
if (Platform.OS === 'android') {
  // Try to patch at the AppRegistry level
  const originalProcessRootTag = AppRegistry.runApplication;
  AppRegistry.runApplication = (appKey, appParameters) => {
    // Patch the native event emitter
    try {
      const RCTDeviceEventEmitter = require('react-native/Libraries/EventEmitter/RCTDeviceEventEmitter');
      const originalEmit = RCTDeviceEventEmitter.emit;
      
      RCTDeviceEventEmitter.emit = function(eventType, ...args) {
        if (eventType === 'topInsetsChange' || eventType === 'topLayoutChange') {
          console.log(`Suppressed unsupported event: ${eventType}`);
          return;
        }
        return originalEmit.apply(this, [eventType, ...args]);
      };
    } catch (e) {
      console.log('Failed to patch RCTDeviceEventEmitter:', e);
    }
    
    return originalProcessRootTag(appKey, appParameters);
  };
}

// Component with useEffect to handle events
function EventHandler() {
  useEffect(() => {
    // Alternative approach using event listeners
    const handleGlobalError = (error) => {
      if (error && error.message && error.message.includes('topInsetsChange')) {
        console.log('Caught unsupported event error');
        return true; // prevent default error handling
      }
      return false;
    };

    // Add our error handler to global error handling
    const ErrorUtils = global.ErrorUtils;
    if (ErrorUtils) {
      const originalGlobalHandler = ErrorUtils.globalHandler;
      ErrorUtils.globalHandler = (error) => {
        if (!handleGlobalError(error)) {
          originalGlobalHandler(error);
        }
      };
    }

    return () => {
      // Cleanup if component unmounts
      if (ErrorUtils && ErrorUtils.globalHandler) {
        ErrorUtils.globalHandler = originalGlobalHandler;
      }
    };
  }, []);

  return null;
}

export default function EventErrorBoundary({ children }) {
  return (
    <>
      <EventHandler />
      {children}
    </>
  );
} 