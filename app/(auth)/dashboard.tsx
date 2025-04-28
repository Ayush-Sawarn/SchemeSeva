import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  Text,
  Card,
  Searchbar,
  ActivityIndicator,
  IconButton,
  useTheme,
  Button,
} from "react-native-paper";
import { router } from "expo-router";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/auth";
import ChatBot from "../components/ChatBot";

const categories = [
  {
    key: "agriculture",
    label: "Agriculture,Rural & Environment",
    image: require("../../assets/images/Agriculture.png"),
    color: "#A3E635",
  },
  {
    key: "banking",
    label: "Banking,Financial Services and Insurance",
    image: require("../../assets/images/Banking.png"),
    color: "#FACC15",
  },
  {
    key: "business",
    label: "Business & Entrepreneurship",
    image: require("../../assets/images/Business.png"),
    color: "#38BDF8",
  },
  {
    key: "education",
    label: "Education & Learning",
    image: require("../../assets/images/Education.png"),
    color: "#F87171",
  },
  {
    key: "health",
    label: "Health & Wellness",
    image: require("../../assets/images/Health.png"),
    color: "#34D399",
  },
];

export default function Dashboard() {
  const theme = useTheme();
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { signOut } = useAuth();
  const [isChatBotVisible, setChatBotVisible] = useState(false);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      // Fetch all schemes and count by category in JS
      const { data, error } = await supabase.from("schemes").select("category");
      if (error) throw error;
      const countsObj: Record<string, number> = {};
      (data as { category: string }[]).forEach((row) => {
        countsObj[row.category] = (countsObj[row.category] || 0) + 1;
      });
      setCounts(countsObj);
    } catch (error) {
      console.error("Error fetching counts:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Text style={styles.heading}>Find schemes based{"\n"}on categories</Text>
      <View style={styles.grid}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={styles.categoryCard}
            onPress={() => {
              if (cat.key === "agriculture") {
                router.push("/scheme/Agriculture" as never);
              } else if (cat.key === "banking") {
                router.push("/scheme/Banking" as never);
              } else if (cat.key === "business") {
                router.push("/scheme/Business" as never);
              } else if (cat.key === "education") {
                router.push("/scheme/Education" as never);
              } else if (cat.key === "health") {
                router.push("/scheme/Health" as never);
              }
            }}
          >
            <Image source={cat.image} style={styles.categoryIcon} />
            <Text style={[styles.count, { color: cat.color }]}>
              {(counts[cat.label] || 0) + " Schemes"}
            </Text>
            <Text style={styles.categoryLabel}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    backgroundColor: "#23262B",
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 50,
    lineHeight: 38,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "flex-start",
    paddingHorizontal: 8,
    paddingBottom: 40,
  },
  categoryCard: {
    width: "18%",
    minWidth: 120,
    alignItems: "center",
    marginBottom: 30,
    marginHorizontal: 15,
  },
  categoryIcon: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  count: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "monospace",
  },
  categoryLabel: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "400",
    lineHeight: 24,
    marginTop: 2,
    marginBottom: 0,
    fontFamily: "serif",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
