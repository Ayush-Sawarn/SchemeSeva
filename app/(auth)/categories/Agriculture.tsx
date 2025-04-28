import { useEffect, useState, useRef } from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { Text, Card, ActivityIndicator, Searchbar } from "react-native-paper";
import { supabase } from "../../../lib/supabase";
import { Video, ResizeMode } from "expo-av";

const { width } = Dimensions.get("window");

export default function AgricultureCategory() {
  const [schemes, setSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const { data, error } = await supabase
        .from("schemes")
        .select("*")
        .eq("category", "Agriculture,Rural & Environment");
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
                />
              </View>
            )}
            <Card.Content>
              <Text style={styles.title}>{scheme.title}</Text>
              <Text style={styles.category}>{scheme.category}</Text>
              <Text style={styles.description}>{scheme.description}</Text>
              <Text style={styles.sectionTitle}>Eligibility Criteria</Text>
              <Text style={styles.sectionText}>
                {scheme.eligibility_criteria}
              </Text>
              <Text style={styles.sectionTitle}>Benefits</Text>
              <Text style={styles.sectionText}>{scheme.benefits}</Text>
              <Text style={styles.sectionTitle}>How to Apply</Text>
              <Text style={styles.sectionText}>
                {scheme.application_process}
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
