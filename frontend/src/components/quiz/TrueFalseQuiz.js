import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default function TrueFalseQuiz({ data, onAnswer, image }) {
  const handleSelect = (choice) => {
    const isCorrect = choice === data.correct;
    const message = isCorrect ? data.message_correct : data.message_wrong;
    onAnswer(choice, isCorrect, message);
  };

  return (
    <View style={styles.container}>
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      )}

      <Text style={styles.statement}>{data.statement}</Text>

      <View style={styles.buttonContainer}>
        <Button title="True" onPress={() => handleSelect('True')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="False" onPress={() => handleSelect('False')} />
      </View>
    </View>
  );
}
