import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ChooseImageQuiz({ data, onAnswer }) {
  const handlePress = (selected) => {
    const isCorrect = selected.is_correct;
    const message = isCorrect ? data.quiz.message_correct : data.quiz.message_wrong;
    onAnswer(selected.label, isCorrect, message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data.text}</Text>
      <Text style={styles.question}>{data.quiz.question}</Text>

      <View style={styles.imageGrid}>
        {data.quiz.images.map((img, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(img)} style={styles.imageWrapper}>
            <Image source={{ uri: img.url }} style={styles.image} />
            <Text style={styles.label}>{img.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 20, padding: 10 },
  text: { fontSize: 16, marginBottom: 10 },
  question: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  imageGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  imageWrapper: { width: '40%', marginBottom: 12, alignItems: 'center' },
  image: { width: 100, height: 100, borderRadius: 8 },
  label: { marginTop: 6, fontSize: 12 }
});
