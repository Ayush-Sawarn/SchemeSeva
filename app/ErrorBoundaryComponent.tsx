import React, { Component, ErrorInfo, ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error.message);
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      const errorMessage = this.state.error?.message || "Unknown error";

      if (errorMessage.includes("Objects are not valid as a React child")) {
        return (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>React Child Error</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <Text style={styles.errorHint}>
              This usually happens when a React component is directly used where
              only text should be. Check your Text components to make sure they
              only contain strings or other Text components.
            </Text>
          </View>
        );
      }

      // Default fallback
      return (
        this.props.fallback || (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>Something went wrong</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
        )
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    padding: 20,
    backgroundColor: "#ffdddd",
    borderRadius: 5,
    margin: 10,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff0000",
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  errorHint: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
});

export default ErrorBoundary;
