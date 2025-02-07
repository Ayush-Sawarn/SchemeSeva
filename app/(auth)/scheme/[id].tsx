import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card, Button, ActivityIndicator } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '../../../lib/supabase';

type SchemeDetails = {
  id: string;
  title: string;
  description: string;
  eligibility_criteria: string;
  benefits: string;
  application_process: string;
  category: string;
};

export default function SchemeDetails() {
  const { id } = useLocalSearchParams();
  const [scheme, setScheme] = useState<SchemeDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchemeDetails();
  }, [id]);

  const fetchSchemeDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('schemes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setScheme(data);
    } catch (error) {
      console.error('Error fetching scheme details:', error);
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
        <Text>Scheme not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            {scheme.title}
          </Text>
          <Text variant="bodySmall" style={styles.category}>
            {scheme.category}
          </Text>

          <View style={styles.section}>
            <Text variant="titleMedium">Description</Text>
            <Text variant="bodyMedium">{scheme.description}</Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium">Eligibility Criteria</Text>
            <Text variant="bodyMedium">{scheme.eligibility_criteria}</Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium">Benefits</Text>
            <Text variant="bodyMedium">{scheme.benefits}</Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium">How to Apply</Text>
            <Text variant="bodyMedium">{scheme.application_process}</Text>
          </View>
        </Card.Content>

        <Card.Actions>
          <Button mode="contained">Share</Button>
          <Button mode="outlined">Bookmark</Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 