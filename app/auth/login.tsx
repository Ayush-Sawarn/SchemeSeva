import { useState } from "react";
import { StyleSheet, View, Alert, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/auth";
import { supabase } from "../../lib/supabase";
import { Text, Button } from "../safe-components";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!phone || phone.length !== 10) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number");
      return;
    }
    if (!password) {
      Alert.alert("Error", "Please enter your password");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        phone: `+91${phone}`,
        password: password,
      });

      if (error) throw error;

      await signIn();
      router.replace("/dashboard" as never);
    } catch (error: any) {
      if (error.message === "Invalid login credentials") {
        Alert.alert("Error", "Invalid phone number or password.");
      } else {
        Alert.alert("Error", error?.message || "Login failed");
      }
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
            label="Phone Number (+91)"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
            style={styles.input}
            textColor="#000000"
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            textColor="#000000"
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            style={styles.button}
          >
            Log In
          </Button>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => router.push("/auth/signup" as never)}
          >
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
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
    backgroundColor: "#FFFFFF",
    height: 48,
    color: "#000000",
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
