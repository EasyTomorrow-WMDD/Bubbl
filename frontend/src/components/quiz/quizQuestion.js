import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default function QuizQuestion({ data, onAnswer }) {
  const { type, text, quiz } = data;

  const renderOptions = () => {
    if (!quiz) return <Text>⚠️ No quiz data found</Text>;

    switch (type) {
      case 'multiple_choice':
      case 'fill_blank':
        return Array.isArray(quiz.options)
          ? quiz.options.map((option, index) => (
              <Button
                key={index}
                title={option}
                onPress={() =>
                  onAnswer(
                    option === quiz.correct,
                    option === quiz.correct ? quiz.message_correct : quiz.message_wrong
                  )
                }
              />
            ))
          : <Text>⚠️ No options provided</Text>;

      case 'true_false':
        return ['True', 'False'].map((option, index) => (
          <Button
            key={index}
            title={option}
            onPress={() =>
              onAnswer(
                option === quiz.correct,
                option === quiz.correct ? quiz.message_correct : quiz.message_wrong
              )
            }
          />
        ));

      case 'choose_image':
        return Array.isArray(quiz.images)
          ? quiz.images.map((img, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Image source={{ uri: img.url }} style={{ width: 100, height: 100 }} />
                <Button title={img.label} onPress={() => onAnswer(img.is_correct)} />
              </View>
            ))
          : <Text>⚠️ No images provided</Text>;

      case 'drag_drop':
        return <Text>🧩 Drag and drop not implemented</Text>;

      default:
        return <Text>❌ Unsupported question type</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>

      {/* Render image if available */}
      {quiz?.image && (
        <Image
          source={{ uri: quiz.image }}
          style={styles.image}
        />
      )}

      <Text style={styles.question}>
        {quiz?.question || quiz?.statement || quiz?.sentence || '📝'}
      </Text>

      {renderOptions()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 20 },
  text: { fontSize: 16, marginBottom: 10 },
  question: { fontWeight: 'bold', marginBottom: 10 },
  image: {
    width: 250,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 16,
    alignSelf: 'center',
  },
});
