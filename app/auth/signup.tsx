import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/auth";
import { supabase } from "../../lib/supabase";
import { Text, Button } from "../safe-components";

const { width } = Dimensions.get("window");
const BUTTON_SIZE = width * 0.1;

export default function SignUp() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"phone" | "otp" | "password">("phone");
  const { signIn } = useAuth();

  const handleSendOtp = async () => {
    if (!phone || phone.length !== 10) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: `+91${phone}`,
      });

      if (error) throw error;
      setStep("otp");
      Alert.alert("Success", "OTP sent successfully");
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      Alert.alert("Error", "Please enter the 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: `+91${phone}`,
        token: otp,
        type: "sms",
      });

      if (error) throw error;
      if (!data.session) throw new Error("Could not verify OTP.");

      setStep("password");
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSetPassword = async () => {
    if (!password || password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) throw updateError;

      Alert.alert("Success", "Account created successfully!");
      await signIn();
      router.replace("/dashboard" as never);
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Failed to set password.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case "otp":
        return (
          <>
            <TextInput
              label="OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={6}
              style={styles.input}
              textColor="#FFFFFF"
            />
            <Button
              mode="contained"
              onPress={handleVerifyOtp}
              loading={loading}
              style={styles.button}
            >
              Verify OTP
            </Button>
            <Button
              onPress={() => setStep("phone")}
              disabled={loading}
              textColor="#555"
            >
              Back
            </Button>
          </>
        );
      case "password":
        return (
          <>
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              textColor="#FFFFFF"
            />
            <TextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              style={styles.input}
              textColor="#FFFFFF"
            />
            <Button
              mode="contained"
              onPress={handleSetPassword}
              loading={loading}
              style={styles.button}
            >
              Set Password & Sign Up
            </Button>
          </>
        );
      case "phone":
      default:
        return (
          <>
            <TextInput
              label="Phone Number (+91)"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={10}
              style={styles.input}
              textColor="#FFFFFF"
            />
            <Button
              mode="contained"
              onPress={handleSendOtp}
              loading={loading}
              style={styles.button}
            >
              Send OTP
            </Button>
          </>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>

        <View style={styles.form}>{renderStep()}</View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/auth/login" as never)}>
            <Text style={styles.link}>Log In</Text>
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
  },
  input: {
    backgroundColor: "#000000",
    color: "#FFFFFF",
  },
  error: {
    color: "#B00020",
    textAlign: "center",
  },
  button: {
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 16,
  },
  buttonLabel: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
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
