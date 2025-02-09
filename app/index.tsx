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
        <Image
          source={require("../assets/images/SchemeSeva.jpeg")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text
          variant="displaySmall"
          style={[styles.title, { color: theme.colors.onBackground }]}
        >
          SchemeSeva
        </Text>

        <Text
          variant="bodyLarge"
          style={[styles.tagline, { color: theme.colors.onBackground }]}
        >
          Your Guide to Government Schemes
        </Text>

        <View style={styles.buttonContainer}>
          <Link href="/auth/signup" asChild>
            <Button
              mode="contained"
              style={styles.button}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              Get Started
            </Button>
          </Link>

          <Link href="/auth/login" asChild>
            <Button
              mode="outlined"
              style={styles.button}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              Sign In
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
    padding: 24,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  tagline: {
    textAlign: "center",
    marginBottom: 48,
    opacity: 0.7,
    letterSpacing: 0.25,
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 320,
    gap: 16,
  },
  button: {
    width: "100%",
    borderRadius: 12,
  },
  buttonContent: {
    height: 52,
  },
  buttonLabel: {
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
