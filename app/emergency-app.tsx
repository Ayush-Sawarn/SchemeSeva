import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

/**
 * This is a completely standalone emergency app screen
 * Used as a fallback when the main app crashes
 */

export function EmergencyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SchemesSeva Emergency Mode</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Agriculture Schemes</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            try {
              router.push("/scheme/Agriculture");
            } catch (e) {
              console.log("Navigation failed");
            }
          }}
        >
          <Text style={styles.buttonText}>View Schemes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Banking & Financial Services</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            try {
              router.push("/scheme/Banking");
            } catch (e) {
              console.log("Navigation failed");
            }
          }}
        >
          <Text style={styles.buttonText}>View Schemes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Business & Entrepreneurship</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            try {
              router.push("/scheme/Business");
            } catch (e) {
              console.log("Navigation failed");
            }
          }}
        >
          <Text style={styles.buttonText}>View Schemes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Education & Learning</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            try {
              router.push("/scheme/Education");
            } catch (e) {
              console.log("Navigation failed");
            }
          }}
        >
          <Text style={styles.buttonText}>View Schemes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Health & Wellness</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            try {
              router.push("/scheme/Health");
            } catch (e) {
              console.log("Navigation failed");
            }
          }}
        >
          <Text style={styles.buttonText}>View Schemes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
    paddingTop: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#2E7D32",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
