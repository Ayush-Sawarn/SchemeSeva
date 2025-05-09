import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  SafeText as Text,
  SafeButton as Button,
} from "../../app/safe-components";
import { Video, ResizeMode } from "expo-av";

export default function VideoSearch() {
  const [input, setInput] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMergedVideo = async (userInput: string) => {
    setLoading(true);
    setVideoUrl(null);
    try {
      const response = await fetch("http://localhost:8000/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: userInput }),
      });
      const data = await response.json();
      if (data.s3_url) {
        setVideoUrl(
          data.s3_url.replace(
            "s3://",
            "https://3final3.s3.eu-north-1.amazonaws.com/"
          )
        ); // Adjust if needed for public access
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
      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
      {videoUrl && (
        <Video
          source={{ uri: videoUrl }}
          useNativeControls
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
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
  button: { marginBottom: 24 },
  video: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginTop: 24,
    borderRadius: 12,
    backgroundColor: "#000",
  },
});
