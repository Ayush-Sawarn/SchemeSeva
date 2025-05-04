import React from "react";
import { useEffect, useState, useRef } from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { Card, ActivityIndicator } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "../../../lib/supabase";
import { ResizeMode, Video, AVPlaybackStatus } from "expo-av";
import { Text } from "../../../app/safe-components";

const { width } = Dimensions.get("window");

type SchemeDetails = {
  id: string;
  title: string;
  description: string;
  eligibility_criteria: string;
  benefits: string;
  application_process: string;
  category: string;
  video_url?: string;
};

export default function SchemeDetails() {
  const { id } = useLocalSearchParams();
  const [scheme, setScheme] = useState<SchemeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  const [videoStatus, setVideoStatus] = useState<AVPlaybackStatus | null>(null);

  useEffect(() => {
    fetchSchemeDetails();
  }, [id]);

  const fetchSchemeDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("schemes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      // Ensure all fields are strings before setting state
      if (data) {
        Object.keys(data).forEach((key) => {
          if (
            data[key] &&
            typeof data[key] === "object" &&
            !Array.isArray(data[key])
          ) {
            console.warn(`Converting object to string in field: ${key}`);
            data[key] = JSON.stringify(data[key]);
          }
        });
      }

      setScheme(data);
    } catch (error) {
      console.error("Error fetching scheme details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!scheme) {
    return (
      <View style={styles.centered}>
        <Text variant="bodyMedium">Scheme not found</Text>
      </View>
    );
  }

  const safeText = (value: any): string => {
    if (value === null || value === undefined) return "";
    if (typeof value === "string") return value;
    if (Array.isArray(value)) return value.join("\n");

    // Check for React elements
    if (value && typeof value === "object" && value.$$typeof) {
      console.error("React element found in scheme data:", value);
      return "[React Element]";
    }

    return String(value);
  };

  return (
    <ScrollView style={styles.container}>
      {scheme.video_url && (
        <View style={styles.videoContainer}>
          <Video
            style={styles.video}
            source={{ uri: scheme.video_url }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping={false}
            onPlaybackStatusUpdate={(status) => setVideoStatus(() => status)}
          />
        </View>
      )}

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>
            {typeof scheme.title === "string" ? scheme.title : ""}
          </Text>
          <Text style={styles.category}>
            {typeof scheme.category === "string" ? scheme.category : ""}
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionText}>
              {typeof scheme.description === "string" ? scheme.description : ""}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Eligibility Criteria</Text>
            <Text style={styles.sectionText}>
              {typeof scheme.eligibility_criteria === "string"
                ? scheme.eligibility_criteria
                : ""}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Benefits</Text>
            <Text style={styles.sectionText}>
              {typeof scheme.benefits === "string" ? scheme.benefits : ""}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How to Apply</Text>
            <Text style={styles.sectionText}>
              {typeof scheme.application_process === "string"
                ? scheme.application_process
                : ""}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#23262B",
  },
  videoContainer: {
    width: width,
    height: width * 0.56, // 16:9 aspect ratio
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  card: {
    margin: 16,
  },
  title: {
    marginBottom: 4,
  },
  category: {
    opacity: 0.7,
    marginBottom: 16,
  },
  section: {
    marginTop: 16,
    gap: 8,
  },
  sectionTitle: {
    fontWeight: "bold",
  },
  sectionText: {
    marginTop: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
