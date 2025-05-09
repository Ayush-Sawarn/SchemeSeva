import React, { useState, useEffect } from "react";
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
import { SafeText as Text, SafeButton as Button } from "../../app/components";

const { width } = Dimensions.get("window");
const BUTTON_SIZE = width * 0.1;
const OTP_RESEND_DELAY = 60; // seconds

export default function SignUp() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"phone" | "otp" | "password">("phone");
  const [resendTimer, setResendTimer] = useState(OTP_RESEND_DELAY);
  const [canResend, setCanResend] = useState(false);
  const { signIn } = useAuth();

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (step === "otp" && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, resendTimer]);

  const validatePhone = (phone: string) => {
    return /^\d{10}$/.test(phone);
  };

  const handleSendOtp = async () => {
    if (!validatePhone(phone)) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    try {
      console.log("Sending OTP to:", `+91${phone}`);

      const { error } = await supabase.auth.signInWithOtp({
        phone: `+91${phone}`,
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) {
        console.error("OTP send error details:", error);
        throw error;
      }

      setStep("otp");
      setResendTimer(OTP_RESEND_DELAY);
      setCanResend(false);
      Alert.alert("Success", "OTP sent successfully");
    } catch (error: any) {
      console.error("OTP send error:", error);
      let errorMessage = error?.message || "Failed to send OTP";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: `+91${phone}`,
      });

      if (error) throw error;

      setResendTimer(OTP_RESEND_DELAY);
      setCanResend(false);
      Alert.alert("Success", "OTP resent successfully");
    } catch (error: any) {
      console.error("OTP resend error:", error);
      Alert.alert("Error", error?.message || "Failed to resend OTP");
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
      console.error("OTP verification error:", error?.message || error);
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
      console.error("Password set error:", error?.message || error);
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
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>
                {canResend
                  ? "Didn't receive OTP? "
                  : `Resend OTP in ${resendTimer}s`}
              </Text>
              {canResend && (
                <TouchableOpacity onPress={handleResendOtp} disabled={loading}>
                  <Text style={styles.resendLink}>Resend</Text>
                </TouchableOpacity>
              )}
            </View>
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
    color: "#666",
  },
  link: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  resendText: {
    color: "#666",
  },
  resendLink: {
    color: "#007AFF",
    fontWeight: "bold",
    marginLeft: 4,
  },
});
