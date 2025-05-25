import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useTheme } from "react-native-paper";
import { router } from "expo-router";
import { SafeText as Text } from "../../app/safe-components";
import { supabase } from "../../lib/supabase";

const categories = [
  {
    key: "Agriculture",
    label: "Agriculture, Rural & Environment",
    image: require("../../assets/images/Agriculture.png"),
    color: "#A3E635",
  },
  {
    key: "Banking",
    label: "Banking, Financial Services and Insurance",
    image: require("../../assets/images/Banking.png"),
    color: "#FACC15",
  },
  {
    key: "Business",
    label: "Business & Entrepreneurship",
    image: require("../../assets/images/Business.png"),
    color: "#38BDF8",
  },
  {
    key: "Education",
    label: "Education & Learning",
    image: require("../../assets/images/Education.png"),
    color: "#F87171",
  },
  {
    key: "Health",
    label: "Health & Wellness",
    image: require("../../assets/images/Health.png"),
    color: "#34D399",
  },
];

export default function Dashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const { data, error } = await supabase.from("schemes").select("category");
      if (error) throw error;
      const countsObj: Record<string, number> = {};
      (data as { category: string }[]).forEach((row) => {
        let displayCategory = row.category;
        if (row.category === "Agriculture")
          displayCategory = "Agriculture, Rural & Environment";
        if (row.category === "Banking")
          displayCategory = "Banking, Financial Services and Insurance";
        if (row.category === "Business")
          displayCategory = "Business & Entrepreneurship";
        if (row.category === "Education")
          displayCategory = "Education & Learning";
        if (row.category === "Health") displayCategory = "Health & Wellness";
        countsObj[displayCategory] = (countsObj[displayCategory] || 0) + 1;
      });
      setCounts(countsObj);
    } catch (error) {
      console.error("Error fetching scheme counts:", error);
    }
  };

  const handleCategoryPress = (category: string) => {
    router.push(`/scheme/${category}` as never);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Find schemes based on categories</Text>
        <View style={styles.grid}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              style={styles.categoryCard}
              onPress={() => handleCategoryPress(cat.key)}
            >
              <Image source={cat.image} style={styles.categoryIcon} />
              <Text style={[styles.schemeCount, { color: cat.color }]}>
                {counts[cat.label] || 0} Schemes
              </Text>
              <Text style={styles.categoryLabel}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 32,
    marginBottom: 50,
    lineHeight: 38,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
  categoryCard: {
    width: 180,
    alignItems: "center",
    marginBottom: 60,
    marginHorizontal: 44,
  },
  categoryIcon: {
    width: 90,
    height: 90,
    marginBottom: 12,
  },
  schemeCount: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  categoryLabel: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 20,
    marginTop: 2,
    marginBottom: 0,
    fontFamily: "serif",
  },
});
