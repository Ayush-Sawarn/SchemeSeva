import { Redirect, Slot } from "expo-router";
import { useAuth } from "../../contexts/auth";
import { ActivityIndicator } from "react-native-paper";
import { View, StyleSheet } from "react-native";

export default function AuthLayout() {
  const { user, loading } = useAuth();

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <View style={styles.container} pointerEvents="box-none">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If user is not authenticated, redirect to welcome screen
  if (!user) {
    return <Redirect href="/" />;
  }

  // Render child routes!
  return <Slot />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
