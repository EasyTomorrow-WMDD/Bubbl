// screens/MoodScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';


import LottieView from 'lottie-react-native';

const moods = {
  happy: { emoji: '😊', message: "Yay! You're feeling happy" },
  sad: { emoji: '😢', message: 'What makes you feel sad?' },
  mad: { emoji: '😠', message: "It's ok to feel angry" },
};

export default function MoodScreen({ navigation }) {
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Canvas</Text>
      <Text style={styles.subtitle}>How do you feel today?</Text>

      <View style={styles.emojiRow}>
        {Object.entries(moods).map(([key, mood]) => (
          <TouchableOpacity key={key} onPress={() => setSelected(key)}>
            <Text style={styles.emoji}>{mood.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>


       <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/optimized-lottie.json')}
        autoPlay
        loop
        style={{ width: 300, height: 300 }}
      />
    </View>

      {selected && (
        <>
          <Text style={styles.message}>{moods[selected].message}</Text>
          <Text style={styles.emojiBig}>{moods[selected].emoji}</Text>
          <Button title="Let's Draw" onPress={() => navigation.navigate('DrawingCanvas')} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 70 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 20 },
  emojiRow: { flexDirection: 'row', justifyContent: 'space-around', width: '60%', marginBottom: 20 },
  emoji: { fontSize: 40, marginHorizontal: 10 },
  emojiBig: { fontSize: 80, marginVertical: 20 },
  message: { fontSize: 18, marginBottom: 10, textAlign: 'center' },
});