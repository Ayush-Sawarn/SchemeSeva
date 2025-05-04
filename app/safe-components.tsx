/**
 * Safe wrapped components that won't crash when rendering invalid children
 */
import React from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  View,
  ViewProps,
  Pressable,
  PressableProps,
  Platform,
} from "react-native";
import {
  Text as PaperText,
  TextProps as PaperTextProps,
  Button as PaperButton,
  ButtonProps,
} from "react-native-paper";

// SDK 52 Web-specific patch (applied only once)
if (Platform.OS === "web" && typeof window !== "undefined") {
  // This aggressive patch ensures no "Objects are not valid as React child" errors
  // by overriding the React Native Text component's internal render method

  // Original RNText implementation
  const OriginalRNText = RNText;

  // Create a new wrapper component for RNText
  const SafeRNText = (props: any) => {
    // Make a safe copy of props
    const safeProps = { ...props };

    // Ensure children are always safe
    if (safeProps.children !== undefined && safeProps.children !== null) {
      // Convert any non-primitive children to strings
      if (
        typeof safeProps.children === "object" &&
        !React.isValidElement(safeProps.children)
      ) {
        if (Array.isArray(safeProps.children)) {
          safeProps.children = safeProps.children.map((child: any) => {
            if (child === null || child === undefined) return "";
            if (typeof child === "string" || typeof child === "number")
              return child;
            if (React.isValidElement(child)) return child;
            return String(child);
          });
        } else {
          safeProps.children = String(safeProps.children);
        }
      }
    }

    return <OriginalRNText {...safeProps} />;
  };

  // Override RNText with our safe version
  // @ts-ignore - This is a runtime patch
  RNText = SafeRNText;

  // Apply the same to PaperText if it's being used
  const OriginalPaperText = PaperText;

  // Create wrapper for PaperText
  const SafePaperText = (props: any) => {
    // Make a safe copy of props
    const safeProps = { ...props };

    // Ensure children are always safe
    if (safeProps.children !== undefined && safeProps.children !== null) {
      // Convert any non-primitive children to strings
      if (
        typeof safeProps.children === "object" &&
        !React.isValidElement(safeProps.children)
      ) {
        if (Array.isArray(safeProps.children)) {
          safeProps.children = safeProps.children.map((child: any) => {
            if (child === null || child === undefined) return "";
            if (typeof child === "string" || typeof child === "number")
              return child;
            if (React.isValidElement(child)) return child;
            return String(child);
          });
        } else {
          safeProps.children = String(safeProps.children);
        }
      }
    }

    return <OriginalPaperText {...safeProps} />;
  };

  // Override PaperText with our safe version
  // @ts-ignore - This is a runtime patch
  PaperText = SafePaperText;
}

// Helper function to safely convert anything to a string
const safeToString = (value: any): string => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return value.toString();
  if (typeof value === "boolean") return value.toString();

  try {
    // Try to stringify objects but avoid React elements
    if (value && typeof value === "object") {
      if (value.$$typeof) {
        console.error("React element found where string expected:", value);
        return "[React Element]"; // More visible indication of the problem
      }

      try {
        return JSON.stringify(value);
      } catch (e) {
        return "[Complex Object]";
      }
    }
    return String(value);
  } catch (e) {
    return "[object]";
  }
};

// Process all children to ensure they're safe for Text
const processTextChildren = (children: any): React.ReactNode => {
  if (children === null || children === undefined) return null;

  // Handle arrays of children
  if (Array.isArray(children)) {
    return children.map((child, index) => {
      if (React.isValidElement(child)) return child;

      // Additional check for React elements that might not be caught by isValidElement
      if (child && typeof child === "object" && child.$$typeof) {
        console.error("Potentially invalid React element in array:", child);
        return null; // Skip rendering this element
      }

      return safeToString(child);
    });
  }

  // Handle React elements
  if (React.isValidElement(children)) return children;

  // Additional check for React elements that might not be caught by isValidElement
  if (children && typeof children === "object" && children.$$typeof) {
    console.error("Potentially invalid React element:", children);
    return null;
  }

  return safeToString(children);
};

// Safe Text component that supports both RN and Paper Text props
export const Text = (props: any) => {
  try {
    const safeProps = { ...props };

    // Debug info to help identify the problematic component
    if (safeProps.children && typeof safeProps.children === "object") {
      if (safeProps.children.$$typeof) {
        console.error("Direct React element in Text:", {
          element: safeProps.children,
          parentProps: safeProps,
          stack: new Error().stack,
        });
      }
    }

    // Process children to ensure they're safe
    if (safeProps.children) {
      safeProps.children = processTextChildren(safeProps.children);

      // SDK 52 compatibility fix - ensure children is always a primitive value
      if (
        typeof safeProps.children === "object" &&
        safeProps.children !== null &&
        !React.isValidElement(safeProps.children)
      ) {
        safeProps.children = String(safeProps.children);
      }
    }

    // If it has a variant prop, use PaperText, otherwise RNText
    if ("variant" in safeProps) {
      // Use PaperText with proper props
      return <PaperText {...safeProps} />;
    } else {
      return <RNText {...safeProps} />;
    }
  } catch (e) {
    console.warn("Safe Text caught error:", (e as Error).message);
    // Fallback rendering with empty content
    if ("variant" in props) {
      // Empty fallback for PaperText
      const safeProps = { ...props };
      delete safeProps.children;
      return <PaperText {...safeProps}>{"" as any}</PaperText>;
    } else {
      return <RNText {...props} children="" />;
    }
  }
};

// Safe Button component
export const Button = (props: ButtonProps) => {
  try {
    const safeProps = { ...props };
    if (
      typeof safeProps.children === "string" ||
      typeof safeProps.children === "number"
    ) {
      // Already safe
    } else if (React.isValidElement(safeProps.children)) {
      // Already a React element, should be safe
    } else if (safeProps.children) {
      // Convert to string
      safeProps.children = safeToString(safeProps.children);
    }

    return <PaperButton {...safeProps} />;
  } catch (e) {
    console.warn("Safe Button caught error:", (e as Error).message);
    return <PaperButton {...props} children="" />;
  }
};

// Safe Pressable component
export const SafePressable = (props: PressableProps) => {
  try {
    const safeProps = { ...props };
    if (safeProps.children) {
      // If the children are not a function or React element, process them
      if (
        typeof safeProps.children !== "function" &&
        !React.isValidElement(safeProps.children)
      ) {
        safeProps.children = processTextChildren(safeProps.children);
      }
    }

    return <Pressable {...safeProps} />;
  } catch (e) {
    console.warn("Safe Pressable caught error:", (e as Error).message);
    return <Pressable {...props}>{null}</Pressable>;
  }
};

// Export all other components you commonly use
export { View };

// Add more safe components as needed
