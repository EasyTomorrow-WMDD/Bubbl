import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default function FillInTheBlankQuiz({ data, onAnswer }) {
  const handlePress = (selected) => {
    const isCorrect = selected === data.quiz.correct;
    const message = isCorrect ? data.quiz.message_correct : data.quiz.message_wrong;
    onAnswer(selected, isCorrect, message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data.text}</Text>

      {data.quiz.image && (
        <Image
          source={{ uri: data.quiz.image }}
          style={styles.image}
        />
      )}

      <Text style={styles.question}>
        {data.quiz.sentence.replace('______', '_____')}
      </Text>

      {data.quiz.options.map((option, i) => (
        <Button key={i} title={option} onPress={() => handlePress(option)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 20, padding: 10 },
  text: { fontSize: 16, marginBottom: 10 },
  question: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  image: {
    width: 250,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 16,
    alignSelf: 'center',
  },
});

