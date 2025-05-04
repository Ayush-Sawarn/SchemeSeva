import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Appbar } from "react-native-paper";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Text, SafePressable as Pressable } from "./safe-components";

// Add a simple safe stringify function to handle objects
const safeStringify = (value: any): string => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean")
    return String(value);
  return String(value); // Convert objects to strings safely
};

const { width, height } = Dimensions.get("window");
const CARD_SIZE = width * 0.25;

const flowSteps = [
  {
    icon: require("../assets/images/enter_details.png"),
    title: "Enter Details",
    desc: "Start by entering your basic details!",
  },
  {
    icon: require("../assets/images/search.png"),
    title: "Search",
    desc: "Our search engine will find the relevant schemes!",
  },
  {
    icon: require("../assets/images/select_apply.png"),
    title: "Select & Apply",
    desc: "Select and apply for the best suited scheme",
  },
];

function FlowChart() {
  return (
    <View style={styles.flowContainer}>
      {flowSteps.map((step, idx) => (
        <View key={idx} style={styles.Flowcard}>
          <View style={styles.iconWrap}>
            <Image
              source={step.icon}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.cardTitle}>{safeStringify(step.title)}</Text>
          <Text style={styles.cardDesc}>{safeStringify(step.desc)}</Text>
          {idx < flowSteps.length - 1 && <Text style={styles.arrow}>↓</Text>}
        </View>
      ))}
    </View>
  );
}

export default function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Appbar.Header style={styles.header}>
          <Image
            source={require("../assets/images/SchemeSeva.jpeg")}
            style={styles.navLogo}
            resizeMode="contain"
          />
          <Text style={styles.navTitle}>SchemeSeva</Text>
        </Appbar.Header>

        <View style={styles.content}>
          <Image
            source={require("../assets/images/welcome.jpg")}
            style={styles.welcomeImage}
            resizeMode="contain"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push("/auth/signup" as never)}
            >
              <Text style={styles.cardText}>SIGN UP</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push("/auth/login" as never)}
            >
              <Text style={styles.cardText}>LOG IN</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Heading Section above the FlowChart */}
        <View style={styles.headingSection}>
          <Text style={styles.subtitle}>How it works</Text>
          <Text style={styles.mainHeading}>Easy steps to apply</Text>
          <Text style={styles.mainHeading}>for Government Schemes</Text>
        </View>

        <FlowChart />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
  },
  header: {
    backgroundColor: "#333333",
    elevation: 4,
    height: 64,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  navLogo: {
    width: 106,
    height: 113,
    alignSelf: "auto",
  },
  navTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    alignSelf: "center",
  },
  content: {
    marginTop: -1,
    alignItems: "center",
  },
  welcomeImage: {
    width: "100%",
    aspectRatio: 16 / 9,
    height: undefined,
    resizeMode: "contain",
    backgroundColor: "#333333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: width * 0.1,
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 24,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: "#333333",
    borderRadius: 12,
    padding: width * 0.02,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 10,
    },
    shadowOpacity: 0.95,
    shadowRadius: 9.84,
  },
  cardText: {
    fontSize: Math.min(width * 0.04, 20),
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  flowContainer: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  Flowcard: {
    backgroundColor: "#101820",
    borderRadius: 16,
    padding: 20,
    marginBottom: 8,
    width: "90%",
    alignItems: "center",
    elevation: 2,
  },
  iconWrap: {
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    width: 48,
    height: 48,
  },
  cardTitle: {
    color: "#16a34a",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 4,
  },
  cardDesc: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
  },
  arrow: {
    color: "#16a34a",
    fontSize: 32,
    marginVertical: 4,
  },
  headingSection: {
    marginBottom: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  subtitle: {
    fontSize: 20,
    color: "#b0b8d1", // light indigo/gray
    textAlign: "center",
    marginBottom: 2,
  },
  mainHeading: {
    fontSize: 28,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 8,
    lineHeight: 36,
  },
});
