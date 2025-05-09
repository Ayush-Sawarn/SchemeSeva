/**
 * Safe wrapped components that won't crash when rendering invalid children
 */
import React, { ReactNode } from "react";
import {
  Text as RNText,
  Pressable,
  StyleSheet,
  TextProps as RNTextProps,
  Platform,
  View,
  PressableProps as RNPressableProps,
  ViewProps,
} from "react-native";
import {
  Text as PaperText,
  Button as PaperButton,
  TextProps as PaperTextProps,
  ButtonProps as PaperButtonProps,
  MD3TypescaleKey,
} from "react-native-paper";

// Type definitions
type SafeTextProps = {
  children?: ReactNode;
  style?: any;
  variant?: MD3TypescaleKey;
  [key: string]: any;
} & RNTextProps;

type ButtonProps = PaperButtonProps & {
  children: ReactNode;
};

type PressableProps = {
  children?: ReactNode;
  [key: string]: any;
} & Partial<RNPressableProps>;

// Helper function to safely convert any value to string
const safeToString = (value: any): string => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number")
    return String(value);
  if (React.isValidElement(value)) return "[React Element]";
  try {
    return String(value);
  } catch (e) {
    return "[object]";
  }
};

// Process all children to ensure they're safe for Text
const processTextChildren = (children: ReactNode): ReactNode => {
  if (children === null || children === undefined) return null;

  // Handle arrays of children
  if (Array.isArray(children)) {
    return children.map((child) => {
      if (React.isValidElement(child)) return child;
      return safeToString(child);
    });
  }

  // Handle React elements
  if (React.isValidElement(children)) return children;

  return safeToString(children);
};

// Safe Text component that supports both RN and Paper Text props
export const SafeText = (props: SafeTextProps) => {
  try {
    const safeProps = { ...props };

    // Process children to ensure they're safe
    if (safeProps.children) {
      safeProps.children = processTextChildren(safeProps.children);
    }

    // If it has a variant prop, use PaperText, otherwise RNText
    if ("variant" in safeProps) {
      const paperProps = {
        ...safeProps,
        children: safeProps.children || "",
      } as PaperTextProps<never>;
      return <PaperText {...paperProps} />;
    } else {
      return <RNText {...safeProps} />;
    }
  } catch (e) {
    console.warn("Safe Text caught error:", (e as Error).message);
    // Fallback rendering with empty content
    if ("variant" in props) {
      return (
        <PaperText variant={props.variant} style={props.style}>
          {""}
        </PaperText>
      );
    } else {
      return <RNText {...props} children="" />;
    }
  }
};

// Safe Button component
export const SafeButton = (props: ButtonProps) => {
  try {
    const safeProps = { ...props };
    if (safeProps.children) {
      safeProps.children = processTextChildren(safeProps.children);
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

// Add more safe components as needed

export default {
  SafeText,
  SafeButton,
  SafePressable,
};
