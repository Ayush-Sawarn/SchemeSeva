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
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4,
    color: "#FFFFFF",
  },
});
