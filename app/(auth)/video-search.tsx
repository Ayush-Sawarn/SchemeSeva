import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import {
  SafeText as Text,
  SafeButton as Button,
} from "../../app/safe-components";
import { Video, ResizeMode } from "expo-av";
import { supabase } from "../../lib/supabase";

// Scheme code to name mapping
const SCHEME_MAPPING = {
  AIF: "Agricultural Infrastructure Fund",
  PKKKY: "Prakritik Kheti Khushhal Kisan Yojana",
  FIS: "Flow Irrigation Scheme",
  RKPY: "Rajya Krishi Yantrikaran Programme",
  MPY: "Medha Prostahan Yojana",
};

export default function VideoSearch() {
  const [input, setInput] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [scheme, setScheme] = useState<any | null>(null);

  const fetchMergedVideo = async (userInput: string) => {
    setLoading(true);
    setVideoUrl(null);
    setScheme(null);
    try {
      const response = await fetch(
        "http://192.168.29.78:8000/generate-video",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_input: userInput }),
        }
      );
      const data = await response.json();
      if (data.s3_url) {
        const videoUrl = data.s3_url.replace(
          "s3://",
          "https://3final3.s3.eu-north-1.amazonaws.com/"
        );
        setVideoUrl(videoUrl);

        try {
          // Extract scheme code from the URL
          const schemeCode = videoUrl
            .split("/")
            .pop()
            ?.split("_")[0] as keyof typeof SCHEME_MAPPING;
          if (!schemeCode) {
            console.log("Could not extract scheme code from URL");
            return;
          }

          const schemeName = SCHEME_MAPPING[schemeCode];
          if (!schemeName) {
            console.log("No mapping found for scheme code:", schemeCode);
            return;
          }

          // Fetch the matching scheme from Supabase using the full scheme name
          const { data: schemes, error } = await supabase
            .from("schemes")
            .select("*")
            .ilike("title", `%${schemeName}%`);

          if (!error && schemes && schemes.length > 0) {
            setScheme(schemes[0]);
          } else {
            console.log("No scheme found for:", schemeName);
          }
        } catch (error) {
          console.error("Error processing scheme:", error);
        }
      } else {
        Alert.alert("Error", data.error || "Failed to generate video");
      }
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Failed to generate video";
      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Search for a Scheme Video</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter scheme keywords..."
          value={input}
          onChangeText={setInput}
        />
        <Button
          mode="contained"
          onPress={() => fetchMergedVideo(input)}
          disabled={loading || !input.trim()}
          style={styles.button}
        >
          Generate Video
        </Button>
        {loading && (
          <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        )}
        {videoUrl && (
          <Video
            source={{ uri: videoUrl }}
            useNativeControls
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
          />
        )}
        {scheme && (
          <View style={styles.schemeCardContainer}>
            <Text style={styles.schemeTitle}>{scheme.title}</Text>
            <Text style={styles.schemeDescription}>{scheme.description}</Text>
            <Text style={styles.schemeLabel}>Eligibility:</Text>
            <Text style={styles.schemeContent}>
              {scheme.eligibility_criteria}
            </Text>
            <Text style={styles.schemeLabel}>Benefits:</Text>
            <Text style={styles.schemeContent}>{scheme.benefits}</Text>
            <Text style={styles.schemeLabel}>Application Process:</Text>
            <Text style={styles.schemeContent}>
              {scheme.application_process}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#111",
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  heading: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    marginBottom: 24,
  },
  video: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginTop: 24,
    borderRadius: 12,
    backgroundColor: "#000",
  },
  schemeCardContainer: {
    backgroundColor: "#23262B",
    borderRadius: 12,
    padding: 16,
    marginTop: 32,
    marginBottom: 32,
  },
  schemeTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  schemeDescription: {
    color: "#fff",
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 24,
  },
  schemeLabel: {
    fontWeight: "bold",
    color: "#fff",
    marginTop: 16,
    marginBottom: 8,
    fontSize: 18,
  },
  schemeContent: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
});
