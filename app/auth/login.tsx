import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Alert, TouchableOpacity } from "react-native";
import { TextInput, Button, useTheme, Snackbar } from "react-native-paper";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/auth";
import { supabase } from "../../lib/supabase";
import { SafeText as Text } from "../../app/components";

const RATE_LIMIT_DURATION = 30000; // 30 seconds
const MAX_ATTEMPTS = 3;

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const { signIn } = useAuth();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const theme = useTheme();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const sanitizeInput = (input: string) => {
    // Remove any non-numeric characters
    return input.replace(/\D/g, "");
  };

  const validatePhone = (phone: string) => {
    const sanitized = sanitizeInput(phone);
    return sanitized.length === 10;
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handlePhoneChange = (text: string) => {
    const sanitized = sanitizeInput(text);
    if (sanitized.length <= 10) {
      setPhone(sanitized);
    }
  };

  const handlePasswordChange = (text: string) => {
    // Basic password sanitization
    const sanitized = text.replace(/[<>]/g, "");
    setPassword(sanitized);
  };

  const checkRateLimit = () => {
    const now = Date.now();
    if (lastAttemptTime && now - lastAttemptTime < RATE_LIMIT_DURATION) {
      if (attempts >= MAX_ATTEMPTS) {
        const timeLeft = Math.ceil(
          (RATE_LIMIT_DURATION - (now - lastAttemptTime)) / 1000
        );
        setError(`Please wait ${timeLeft} seconds before trying again.`);
        setSnackbarVisible(true);
        return false;
      }
    } else {
      setAttempts(0);
    }
    return true;
  };

  const handleLogin = async () => {
    if (!checkRateLimit()) return;

    if (!validatePhone(phone)) {
      setError("Please enter a valid 10-digit phone number");
      setSnackbarVisible(true);
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long");
      setSnackbarVisible(true);
      return;
    }

    setLoading(true);
    setLastAttemptTime(Date.now());
    setAttempts((prev) => prev + 1);

    try {
      // Use a more structured logging approach
      const logData = {
        phone: `+91${phone}`,
        timestamp: new Date().toISOString(),
      };
      console.log("[Login] Attempt:", JSON.stringify(logData));

      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          phone: `+91${phone}`,
          password,
        });

      // Log response in a structured way
      const responseLog = {
        success: !!data?.session,
        hasError: !!signInError,
        errorMessage: signInError?.message || null,
        timestamp: new Date().toISOString(),
      };
      console.log("[Login] Response:", JSON.stringify(responseLog));

      if (signInError) {
        const errorLog = {
          message: signInError.message,
          code: signInError.status,
          timestamp: new Date().toISOString(),
        };
        console.error("[Login] Error:", JSON.stringify(errorLog));
        throw signInError;
      }

      if (!data?.session) {
        throw new Error("No session returned from sign in");
      }

      await signIn();
      router.replace("/dashboard" as never);
    } catch (err) {
      const errorLog = {
        message: err instanceof Error ? err.message : "Unknown error",
        timestamp: new Date().toISOString(),
      };
      console.error("[Login] Caught error:", JSON.stringify(errorLog));

      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setSnackbarVisible(false);
    setError(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>

        <View style={styles.form}>
          <TextInput
            label="Phone Number (+91)"
            value={phone}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
            maxLength={10}
            style={styles.input}
            textColor={theme.colors.onSurface}
            mode="outlined"
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
            style={styles.input}
            textColor={theme.colors.onSurface}
            mode="outlined"
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            style={styles.button}
            disabled={loading}
          >
            Log In
          </Button>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => router.push("/auth/signup" as never)}
            disabled={loading}
          >
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: "Dismiss",
          onPress: handleRetry,
        }}
      >
        {error || "An error occurred"}
      </Snackbar>
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
    backgroundColor: "#FFFFFF",
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
  button: {
    marginTop: 8,
    paddingVertical: 8,
  },
});
