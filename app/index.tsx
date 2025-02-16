import { StyleSheet, View, Image, Dimensions } from "react-native";
import { Button, Text } from "react-native-paper";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const BUTTON_SIZE = width * 0.1;

export default function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>
            <Text style={styles.schemeText}>SCHEMESEVA</Text>
          </Text>
          <Image
            source={require("../assets/images/SchemeSeva.jpeg")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Link href="/auth/signup" asChild>
            <Button
              mode="contained"
              style={styles.button}
              contentStyle={styles.buttonContent}
              buttonColor="#303030"
              elevation={4}
              labelStyle={styles.buttonLabel}
            >
              SIGN{"\n"}UP
            </Button>
          </Link>

          <Link href="/auth/login" asChild>
            <Button
              mode="contained"
              style={styles.button}
              contentStyle={styles.buttonContent}
              buttonColor="#303030"
              elevation={4}
              labelStyle={styles.buttonLabel}
            >
              LOG{"\n"}IN
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
    backgroundColor: "#E0E0E0",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: 24,
    textAlign: "center",
  },
  schemeText: {
    fontSize: 56,
    color: "#212121",
    fontWeight: "900",
    letterSpacing: 2,
  },
  sevaText: {
    fontSize: 60,
    color: "#212121",
    fontWeight: "900",
    letterSpacing: 3,
  },
  logo: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 32,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: 8,
  },
  buttonContent: {
    height: BUTTON_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLabel: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
    lineHeight: 28,
  },
});
