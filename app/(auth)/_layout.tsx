import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../contexts/auth";
import { ActivityIndicator } from "react-native-paper";
import { View } from "react-native";

export default function AuthLayout() {
  const { user, loading } = useAuth();

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If user is not authenticated, redirect to welcome screen
  if (!user) {
    return <Redirect href="/" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="scheme/[id]"
        options={{
          title: "Scheme Details",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
