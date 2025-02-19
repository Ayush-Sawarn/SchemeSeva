import { useEffect } from "react";
import { Stack } from "expo-router";
import { PaperProvider, MD3DarkTheme } from "react-native-paper";
import { AuthProvider } from "../contexts/auth";

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#2E7D32",
    secondary: "#81C784",
    background: "#121212",
    surface: "#1E1E1E",
    error: "#CF6679",
    onPrimary: "#FFFFFF",
    onSecondary: "#000000",
    onBackground: "#FFFFFF",
    onSurface: "#FFFFFF",
    onError: "#000000",
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={darkTheme}>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: darkTheme.colors.surface,
            },
            headerTintColor: darkTheme.colors.onSurface,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </AuthProvider>
    </PaperProvider>
  );
}
