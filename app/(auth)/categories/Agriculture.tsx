import * as React from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { Text, Card, ActivityIndicator, Searchbar } from "react-native-paper";
import { supabase } from "../../../lib/supabase";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";

const { width } = Dimensions.get("window");

const AgricultureCategory: React.FC = () => {
  const [schemes, setSchemes] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const videoRef = React.useRef<any>(null);
  const [videoStatus, setVideoStatus] = React.useState<AVPlaybackStatus | null>(
    null
  );

  React.useEffect(() => {
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
};

export default AgricultureCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#23262B",
    paddingTop: 16,
  },
  searchBar: {
    margin: 16,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#2C2F35",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#FFFFFF",
  },
  category: {
    fontSize: 14,
    color: "#81C784",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#FFFFFF",
  },
  sectionText: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginBottom: 16,
  },
  video: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#23262B",
  },
});
