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
import { SafeText as Text, SafePressable as Pressable } from "./components";

// Helper function to safely convert any value to string
const safeToString = (value: any): string => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number")
    return String(value);
  if (React.isValidElement(value)) return "[React Element]";
  try {
    return String(value);
  } catch (e) {
    return "[object]";
  }
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

export function FlowChart() {
  return (
    <View style={styles.flowContainer}>
      {flowSteps.map((step, idx) => (
        <View key={idx} style={styles.Flowcard}>
          <View style={styles.iconWrap}>
            <Image source={step.icon} style={styles.icon} />
          </View>
          <Text style={styles.cardTitle}>{safeToString(step.title)}</Text>
          <Text style={styles.cardDesc}>{safeToString(step.desc)}</Text>
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
          />
          <Text style={styles.navTitle}>SchemeSeva</Text>
        </Appbar.Header>

        <View style={styles.content}>
          <Image
            source={require("../assets/images/welcome.jpg")}
            style={styles.welcomeImage}
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
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    height: 96,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  navLogo: {
    width: 120,
    height: 67,
    alignSelf: "flex-start",
    marginRight: 16,
  },
  navTitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#FFFFFF",
    alignSelf: "center",
    marginTop: -38,
  },
  content: {
    marginTop: -1,
    alignItems: "center",
  },
  welcomeImage: {
    width: "100%",
    aspectRatio: 2.5,
    maxHeight: 520,
    height: undefined,
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
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  cardText: {
    fontSize: Math.min(width * 0.04, 20),
    fontWeight: "bold",
    color: "#333333",
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
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
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
    color: "#b0b8d1",
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
