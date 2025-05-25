import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import {
  Card,
  ActivityIndicator,
  Searchbar,
  useTheme,
  Snackbar,
} from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "../../../lib/supabase";
import { ResizeMode, Video } from "expo-av";
import { SafeText as Text } from "../../components";

const { width } = Dimensions.get("window");
const ITEMS_PER_PAGE = 10;

interface Scheme {
  id: string;
  title: string;
  description: string;
  eligibility_criteria: string;
  benefits: string;
  application_process: string;
  video_url?: string;
  category: string;
}

interface SchemeState {
  schemes: Scheme[];
  loading: boolean;
  error: string | null;
  videoStatus: any;
}

export default function SchemeDetails() {
  const { id } = useLocalSearchParams();
  const [state, setState] = useState<SchemeState>({
    schemes: [],
    loading: true,
    error: null,
    videoStatus: null,
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const videoRef = useRef<Video>(null);
  const theme = useTheme();

  const fetchScheme = useCallback(
    async (pageNum: number) => {
      try {
        setState((prev) => ({
          ...prev,
          loading: true,
          error: null,
        }));

        const {
          data,
          error: fetchError,
          count,
        } = await supabase
          .from("schemes")
          .select("*", { count: "exact" })
          .eq("id", id)
          .range((pageNum - 1) * ITEMS_PER_PAGE, pageNum * ITEMS_PER_PAGE - 1)
          .single();

        if (fetchError) throw fetchError;

        if (data) {
          setState((prev) => ({
            ...prev,
            schemes: [data as Scheme],
          }));
          setHasMore(count ? count > pageNum * ITEMS_PER_PAGE : false);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch scheme details";
        setState((prev) => ({ ...prev, error: errorMessage }));
        setSnackbarVisible(true);
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    },
    [id]
  );

  useEffect(() => {
    fetchScheme(1);
  }, [fetchScheme]);

  const handleLoadMore = () => {
    if (!state.loading && hasMore) {
      setPage((prev) => prev + 1);
      fetchScheme(page + 1);
    }
  };

  const handleRetry = () => {
    setSnackbarVisible(false);
    fetchScheme(1);
  };

  const renderFooter = () => {
    if (!state.loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </View>
    );
  };

  const renderVideo = () => {
    return null;
  };

  if (state.loading && !state.schemes.length) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!state.schemes.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Scheme not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Video removed as per new requirements */}
      <FlatList
        data={state.schemes}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={String(item.title)} />
            <Card.Content>
              <Text style={styles.description}>{String(item.description)}</Text>
              <Text style={styles.sectionTitle}>Eligibility Criteria:</Text>
              <Text style={styles.text}>
                {String(item.eligibility_criteria)}
              </Text>
              <Text style={styles.sectionTitle}>Benefits:</Text>
              <Text style={styles.text}>{String(item.benefits)}</Text>
              <Text style={styles.sectionTitle}>Application Process:</Text>
              <Text style={styles.text}>
                {String(item.application_process)}
              </Text>
            </Card.Content>
          </Card>
        )}
        keyExtractor={(item) => String(item.id)}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: "Retry",
          onPress: handleRetry,
        }}
      >
        {state.error || "An error occurred"}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#23262B",
  },
  videoContainer: {
    width: width,
    height: width * 0.56,
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  card: {
    margin: 16,
    backgroundColor: "#2A2D32",
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#fff",
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: "#fff",
  },
  error: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },
});
