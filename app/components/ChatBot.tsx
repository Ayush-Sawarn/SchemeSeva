import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import axios from 'axios';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const theme = useTheme();

  const handleSend = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/chat', {
        messages: [
          {
            role: 'user',
            content: input,
          },
        ],
      });

      setResponse(res.data.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse("Sorry, I couldn't fetch the information.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TextInput
        style={styles.input}
        placeholder="Ask about schemes..."
        value={input}
        onChangeText={setInput}
        mode="outlined"
      />
      <Button 
        mode="contained" 
        onPress={handleSend}
        style={styles.button}
      >
        Send
      </Button>
      {response ? (
        <Text style={[styles.response, { color: theme.colors.onBackground }]}>
          {response}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
  },
  response: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default ChatBot;