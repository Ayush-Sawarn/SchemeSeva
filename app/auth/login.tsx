import { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/auth";

const { width } = Dimensions.get("window");
const BUTTON_SIZE = width * 0.1;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signIn(email, password);
      router.replace("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>

        <View style={styles.form}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            mode="flat"
            theme={{
              colors: { background: "#303030", onSurfaceVariant: "#FFFFFF" },
            }}
            textColor="#FFFFFF"
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            mode="flat"
            theme={{
              colors: { background: "#303030", onSurfaceVariant: "#FFFFFF" },
            }}
            textColor="#FFFFFF"
            onSubmitEditing={handleLogin}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Link href="/auth/signup">
            <Text style={styles.link}>Sign Up</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E0E0",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#212121",
    textAlign: "center",
    marginBottom: 32,
  },
  form: {
    gap: 16,
    width: "80%",
    alignSelf: "center",
  },
  input: {
    backgroundColor: "#303030",
    height: 48,
  },
  error: {
    color: "#B00020",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: "#212121",
  },
  link: {
    color: "#303030",
    fontWeight: "bold",
  },
});
