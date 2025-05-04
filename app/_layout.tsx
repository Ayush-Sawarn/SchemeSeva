import React, { ReactElement, ReactNode } from "react";
import { View, Platform } from "react-native";
import { Slot } from "expo-router";

// SDK 52 specific patch for web React child errors
if (Platform.OS === "web") {
  // Ensure React children are always renderable in SDK 52
  const originalCreateElement = React.createElement;

  // Use type assertion to work around TypeScript limitations with overriding React.createElement
  React.createElement = function (
    type: any,
    props: any,
    ...children: any[]
  ): ReactElement {
    // Process children to ensure they're safe for rendering
    const processedChildren = children.map((child) => {
      // Skip null, undefined, or valid elements
      if (
        child === null ||
        child === undefined ||
        React.isValidElement(child)
      ) {
        return child;
      }

      // Convert objects to strings - this addresses the "Objects are not valid as React child" error
      if (typeof child === "object") {
        try {
          return String(child);
        } catch (e) {
          return "";
        }
      }

      return child;
    });

    // Type assertion to bypass TypeScript's createElement signature check
    return originalCreateElement.apply(React, [
      type,
      props,
      ...processedChildren,
    ]) as ReactElement;
  } as typeof React.createElement;
}

// Import error boundary only for web
const ErrorBoundary =
  Platform.OS === "web" ? require("./error-boundary").default : React.Fragment;

// Import debug helper for web
if (Platform.OS === "web") {
  // This will initialize the debug helpers
  require("./debug-helper").default;
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
    </ErrorBoundary>
  );
}
