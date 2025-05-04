import React from "react";
import { useEffect, useState, useRef } from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { Text, Card, ActivityIndicator, Searchbar } from "react-native-paper";
import { supabase } from "../../../lib/supabase";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";

const { width } = Dimensions.get("window");

export default function BankingCategory() {
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
        .eq("category", "Banking");
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
      <Searchbar
        placeholder="Search schemes..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      <ScrollView contentContainerStyle={styles.list}>
        {filteredSchemes.map((scheme) => (
          <Card key={scheme.id} style={styles.card}>
            {scheme.video_url && (
              <View style={styles.videoContainer}>
                <Video
                  style={styles.video}
                  source={{ uri: scheme.video_url }}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping={false}
                  onPlaybackStatusUpdate={(status) => {
                    if (status) {
                      setVideoStatus(status);
                    }
                  }}
                />
              </View>
            )}
            <Card.Content>
              <Text style={styles.title}>{scheme.title}</Text>
              <Text style={styles.category}>{scheme.category}</Text>
              <Text style={styles.description}>
                {typeof scheme.description === "string"
                  ? scheme.description
                  : Array.isArray(scheme.description)
                  ? scheme.description.join("\n")
                  : String(scheme.description)}
              </Text>
              <Text style={styles.sectionTitle}>Eligibility Criteria</Text>
              <Text style={styles.sectionText}>
                {typeof scheme.eligibility_criteria === "string"
                  ? scheme.eligibility_criteria
                  : Array.isArray(scheme.eligibility_criteria)
                  ? scheme.eligibility_criteria.join("\n")
                  : String(scheme.eligibility_criteria)}
              </Text>
              <Text style={styles.sectionTitle}>Benefits</Text>
              <Text style={styles.sectionText}>
                {typeof scheme.benefits === "string"
                  ? scheme.benefits
                  : Array.isArray(scheme.benefits)
                  ? scheme.benefits.join("\n")
                  : String(scheme.benefits)}
              </Text>
              <Text style={styles.sectionTitle}>How to Apply</Text>
              <Text style={styles.sectionText}>
                {typeof scheme.application_process === "string"
                  ? scheme.application_process
                  : Array.isArray(scheme.application_process)
                  ? scheme.application_process.join("\n")
                  : String(scheme.application_process)}
              </Text>
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
    elevation: 4,
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
});
