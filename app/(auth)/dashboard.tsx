import { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { 
  Text, 
  Card, 
  Searchbar, 
  ActivityIndicator,
  IconButton,
} from 'react-native-paper';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/auth';

type Scheme = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon_url?: string;
};

export default function Dashboard() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { signOut } = useAuth();

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const { data, error } = await supabase
        .from('schemes')
        .select('*')
        .order('title');

      if (error) throw error;
      setSchemes(data || []);
    } catch (error) {
      console.error('Error fetching schemes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSchemes = schemes.filter(scheme =>
    scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSchemeCard = ({ item }: { item: Scheme }) => (
    <Card 
      style={styles.card}
      onPress={() => router.push(`/scheme/${item.id}`)}
      mode="outlined"
    >
      <Card.Title
        title={item.title}
        titleStyle={styles.cardTitle}
        subtitle={item.category}
        subtitleStyle={styles.cardSubtitle}
        left={(props) => (
          <IconButton
            {...props}
            icon={item.icon_url || 'file-document-outline'}
            size={24}
          />
        )}
      />
      <Card.Content>
        <Text variant="bodyMedium" numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>
      </Card.Content>
    </Card>
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
      <View style={styles.header}>
        <Searchbar
          placeholder="Search schemes..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        <IconButton
          icon="logout"
          onPress={signOut}
          mode="contained"
        />
      </View>

      <FlatList
        data={filteredSchemes}
        renderItem={renderSchemeCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    elevation: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.15,
  },
  cardSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  description: {
    opacity: 0.7,
    lineHeight: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 