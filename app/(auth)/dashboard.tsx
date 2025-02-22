import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  Text,
  Card,
  Searchbar,
  ActivityIndicator,
  IconButton,
  useTheme,
  Button,
} from "react-native-paper";
import { router } from "expo-router";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/auth";
import ChatBot from "../ChatBot";

type Scheme = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon_url?: string;
};

export default function Dashboard() {
  const theme = useTheme();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { signOut } = useAuth();
  const [isChatBotVisible, setChatBotVisible] = useState(false);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const { data, error } = await supabase
        .from("schemes")
        .select("*")
        .order("title");

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
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Searchbar
          placeholder="Search schemes..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={[styles.searchBar, { backgroundColor: theme.colors.surface }]}
          theme={{ colors: { elevation: { level3: theme.colors.surface } } }}
          iconColor={theme.colors.onSurface}
          placeholderTextColor={theme.colors.onSurfaceDisabled}
          inputStyle={{ color: theme.colors.onSurface }}
        />
        <View style={styles.logoutContainer}>
          <IconButton
            icon="logout"
            mode="contained"
            onPress={signOut}
            iconColor={theme.colors.onPrimary}
            containerColor={theme.colors.primary}
          />
          <Text style={{ color: theme.colors.onSurface }}>Logout</Text>
        </View>
      </View>

      <FlatList
        data={filteredSchemes}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() => router.push(`/scheme/${item.id}`)}
            mode="elevated"
          >
            <Card.Title
              title={item.title}
              titleStyle={styles.cardTitle}
              subtitle={item.category}
              subtitleStyle={styles.cardSubtitle}
              left={(props) => (
                <IconButton
                  {...props}
                  icon={item.icon_url || "file-document-outline"}
                  size={30}
                  iconColor={theme.colors.primary}
                />
              )}
            />
            <Card.Content>
              <Text variant="bodyMedium" style={styles.description}>
                {item.description}
              </Text>
            </Card.Content>
          </Card>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity
        style={styles.chatIcon}
        onPress={() => setChatBotVisible(true)}
      >
        <IconButton icon="chat" size={30} iconColor="#F4EFCA" />
      </TouchableOpacity>

      <Modal
        visible={isChatBotVisible}
        animationType="slide"
        transparent={false}
      >
        <ChatBot />
        <Button onPress={() => setChatBotVisible(false)}>Close</Button>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    gap: 12,
  },
  searchBar: {
    flex: 1,
    elevation: 0,
    borderRadius: 12,
  },
  logoutContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "#1E1E1E",
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 0.15,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#AAAAAA",
  },
  description: {
    color: "#FFFFFF",
    opacity: 0.7,
    lineHeight: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  chatIcon: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#F66435",
    borderRadius: 30,
    padding: 10,
    elevation: 4,
  },
});
