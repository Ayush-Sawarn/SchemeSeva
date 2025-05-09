import React, { ReactNode } from 'react';
import { Text as RNText } from 'react-native';
import { Text as PaperText, TextProps as PaperTextProps } from 'react-native-paper';

type TextVariant = 'displayLarge' | 'displayMedium' | 'displaySmall' | 'headlineLarge' | 'headlineMedium' | 'headlineSmall' | 'titleLarge' | 'titleMedium' | 'titleSmall' | 'labelLarge' | 'labelMedium' | 'labelSmall' | 'bodyLarge' | 'bodyMedium' | 'bodySmall';

interface SafeTextProps {
  children: ReactNode;
  style?: any;
  variant?: TextVariant;
  [key: string]: any;
}

const safeToString = (value: any): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (React.isValidElement(value)) return '[React Element]';
  try {
    return String(value);
  } catch (e) {
    return '[object]';
  }
};

const processTextChildren = (children: ReactNode): ReactNode => {
  if (children === null || children === undefined) return null;
  if (Array.isArray(children)) {
    return children.map((child) => {
      if (React.isValidElement(child)) return child;
      return safeToString(child);
    });
  }
  if (React.isValidElement(children)) return children;
  return safeToString(children);
};

export const SafeText = (props: SafeTextProps) => {
  try {
    const safeProps = { ...props };
    if (safeProps.children) {
      safeProps.children = processTextChildren(safeProps.children);
    }
    if ("variant" in safeProps) {
      return <PaperText {...safeProps} />;
    }
    return <RNText {...safeProps} />;
  } catch (e) {
    console.warn("Safe Text caught error:", (e as Error).message);
    if ("variant" in props) {
      const safeProps = { ...props };
      delete safeProps.children;
      return <PaperText {...safeProps}>{""}</PaperText>;
    }
    return <RNText {...props} children="" />;
  }
};

export default SafeText;