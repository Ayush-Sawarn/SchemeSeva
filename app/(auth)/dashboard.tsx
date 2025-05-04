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
  Card,
  Searchbar,
  ActivityIndicator,
  IconButton,
  useTheme,
} from "react-native-paper";
import { router } from "expo-router";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/auth";
import React from "react";
import { Text, Button } from "../../app/safe-components";

const safeText = (value: any): string => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.join(", ");

  // Check for React elements
  if (value && typeof value === "object" && value.$$typeof) {
    console.error("React element found in dashboard data:", value);
    return "[React Element]";
  }

  return String(value);
};

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
        // Map the database category to the display category
        let displayCategory = row.category;
        if (row.category === "Agriculture") {
          displayCategory = "Agriculture,Rural & Environment";
        } else if (row.category === "Banking") {
          displayCategory = "Banking,Financial Services and Insurance";
        } else if (row.category === "Business") {
          displayCategory = "Business & Entrepreneurship";
        } else if (row.category === "Education") {
          displayCategory = "Education & Learning";
        } else if (row.category === "Health") {
          displayCategory = "Health & Wellness";
        }
        countsObj[displayCategory] = (countsObj[displayCategory] || 0) + 1;
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

  try {
    return (
      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: theme.colors.background,
        }}
      >
        <Text style={styles.heading}>Find schemes based on categories</Text>
        <View style={styles.grid}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              style={styles.categoryCard}
              onPress={() => {
                try {
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
                } catch (e) {
                  console.warn("Navigation error:", e);
                }
              }}
            >
              <Image source={cat.image} style={styles.categoryIcon} />
              <Text style={styles.categoryCount}>
                {typeof counts[cat.label] === "number" ? counts[cat.label] : 0}{" "}
                Schemes
              </Text>
              <Text style={styles.categoryLabel}>{safeText(cat.label)}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button
          contentStyle={styles.buttonContent}
          style={styles.button}
          icon="magnify"
          mode="contained"
          onPress={() => {
            try {
              router.push("/schemes" as never);
            } catch (e) {
              console.warn("Navigation error:", e);
            }
          }}
        >
          Find schemes based on categories
        </Button>
      </ScrollView>
    );
  } catch (e) {
    console.error("Dashboard render error:", e);
    return (
      <View
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Text>Something went wrong. Please restart the app.</Text>
      </View>
    );
  }
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
  categoryCount: {
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
  buttonContent: {
    padding: 10,
  },
  button: {
    marginTop: 20,
    marginHorizontal: 20,
  },
});
