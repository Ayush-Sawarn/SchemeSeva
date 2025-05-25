import React from "react";
import { useEffect, useState, useRef } from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import {
  Text,
  Card,
  ActivityIndicator,
  Searchbar,
  Button,
} from "react-native-paper";
import { supabase } from "../../../lib/supabase";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export default function EducationCategory() {
  const [schemes, setSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const videoRef = useRef<any>(null);
  const [videoStatus, setVideoStatus] = useState<AVPlaybackStatus | null>(null);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const { data, error } = await supabase
        .from("schemes")
        .select("*")
        .eq("category", "Education");
      if (error) throw error;
      setSchemes(data || []);
    } catch (error) {
      console.error("Error fetching schemes:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSchemes = schemes.filter(
    (scheme) =>
      scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        mode="outlined"
        style={{ margin: 16 }}
        onPress={() => router.push("/video-search" as never)}
      >
        Search for a Scheme Video
      </Button>
      <Searchbar
        placeholder="Search schemes..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      <ScrollView contentContainerStyle={styles.list}>
        {filteredSchemes.map((scheme) => (
          <Card key={scheme.id} style={styles.card}>
            <Card.Content>
              <Text style={styles.title}>{scheme.title}</Text>
              <Text style={styles.description}>{scheme.description}</Text>
              <Text style={styles.label}>Eligibility:</Text>
              <Text>{scheme.eligibility_criteria}</Text>
              <Text style={styles.label}>Benefits:</Text>
              <Text>{scheme.benefits}</Text>
              <Text style={styles.label}>Application Process:</Text>
              <Text>{scheme.application_process}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#23262B",
    paddingTop: 16,
  },
  searchBar: {
    margin: 16,
    borderRadius: 12,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 24,
    borderRadius: 12,
    backgroundColor: "#1E1E1E",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  videoContainer: {
    width: width - 64,
    height: (width - 64) * 0.56,
    backgroundColor: "#000",
    alignSelf: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  category: {
    opacity: 0.7,
    marginBottom: 8,
    color: "#fff",
  },
  description: {
    color: "#fff",
    opacity: 0.85,
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
  },
  sectionText: {
    color: "#fff",
    opacity: 0.85,
    marginBottom: 4,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#23262B",
  },
  label: {
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
  },
});
