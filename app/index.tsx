import { StyleSheet, View, Image } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Welcome() {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* TODO: Add your app logo here */}
        <Image
          source={require("../assets/images/SchemeSeva.jpeg")}
          style={styles.logo}
        />

        <Text
          variant="headlineMedium"
          style={[styles.title, { color: theme.colors.onBackground }]}
        >
          Welcome to SchemeSeva
        </Text>

        <Text
          variant="bodyLarge"
          style={[styles.tagline, { color: theme.colors.onBackground }]}
        >
          Your Guide to Government Schemes and Policies
        </Text>

        <View style={styles.buttonContainer}>
          <Link href="/auth/signup" asChild>
            <Button mode="contained" style={styles.button}>
              Sign Up
            </Button>
          </Link>

          <Link href="/auth/login" asChild>
            <Button mode="outlined" style={styles.button}>
              Login
            </Button>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "bold",
  },
  tagline: {
    textAlign: "center",
    marginBottom: 40,
    opacity: 0.7,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 300,
    gap: 12,
  },
  button: {
    width: "100%",
  },
});
