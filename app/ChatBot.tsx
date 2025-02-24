import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import axios from "axios";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        messages: [
          {
            role: "user",
            content: input,
          },
        ],
      });

      setResponse(res.data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("Sorry, I couldn't fetch the information.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ask about schemes..."
        value={input}
        onChangeText={setInput}
      />
      <Button title="Send" onPress={handleSend} />
      {response ? <Text style={styles.response}>{response}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  response: {
    marginTop: 16,
    color: "#333",
  },
});

export default ChatBot;
