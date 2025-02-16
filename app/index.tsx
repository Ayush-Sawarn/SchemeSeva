import { StyleSheet, View, Image, Dimensions, Pressable } from "react-native";
import { Button, Text, Appbar } from "react-native-paper";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
const CARD_SIZE = width * 0.35;

export default function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
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
          <Link href="/auth/signup" asChild>
            <Pressable style={styles.card}>
              <Text style={styles.cardText}>SIGN UP</Text>
            </Pressable>
          </Link>

          <Link href="/auth/login" asChild>
            <Pressable style={styles.card}>
              <Text style={styles.cardText}>LOG IN</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
  },
  header: {
    backgroundColor: "#1B5E20",
    elevation: 4,
    height: 64,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  navLogo: {
    width: 50,
    height: 50,
  },
  navTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    alignSelf: "center",
  },
  content: {
    flex: 1,
    marginTop: -1,
  },
  welcomeImage: {
    width: "100%",
    aspectRatio: 16 / 9,
    height: undefined,
    resizeMode: "contain",
    backgroundColor: "#333333",
  },
  textContainer: {
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  mainText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  buttonContainer: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: width * 0.1,
    paddingHorizontal: 20,
    transform: [{ translateY: -CARD_SIZE / 2 }],
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: "#2E7D32",
    borderRadius: 12,
    padding: width * 0.02,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardText: {
    fontSize: Math.min(width * 0.04, 20),
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
});
