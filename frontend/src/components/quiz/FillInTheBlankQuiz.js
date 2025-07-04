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
      {/* Tipo de pregunta */}
      {data.text && (
        <Text style={styles.typeText}>{data.text}</Text>
      )}

      {/* Imagen opcional */}
      {data.quiz.image && (
        <Image
          source={{ uri: data.quiz.image }}
          style={styles.image}
        />
      )}

      {/* Pregunta principal */}
      {data.quiz.question && (
        <Text style={styles.question}>
          {data.quiz.question}
        </Text>
      )}

      {/* Opciones */}
      {data.quiz.options.map((option, i) => (
        <Button key={i} title={option} onPress={() => handlePress(option)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 20, padding: 10 },
  typeText: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 6, 
    textAlign: 'center',
    color: '#333' 
  },
  question: { 
    fontWeight: '400', 
    fontSize: 18, 
    marginBottom: 10, 
    textAlign: 'center',
    color: '#000' 
  },
  image: {
    width: 250,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 16,
    alignSelf: 'center',
  },
});
