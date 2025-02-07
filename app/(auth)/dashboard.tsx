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
    >
      <Card.Title
        title={item.title}
        subtitle={item.category}
        left={(props) => (
          <IconButton
            {...props}
            icon={item.icon_url || 'file-document-outline'}
          />
        )}
      />
      <Card.Content>
        <Text numberOfLines={2} style={styles.description}>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  searchBar: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  description: {
    opacity: 0.7,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 