import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MultiCorrectQuiz from './MultiCorrectQuiz';

export default function QuizQuestion({ data, onAnswer }) {
  const { type, text, quiz } = data;

  const renderOptions = () => {
    if (!quiz) return <Text style={styles.emptyText}>No quiz data found</Text>;

    const handleAnswer = (selected) => {
      const isCorrect = selected === quiz.correct;
      const message = isCorrect ? quiz.message_correct : quiz.message_wrong;
      onAnswer(isCorrect, message);
    };

    switch (type) {
      case 'multiple_choice':
      case 'fill_blank':
        return quiz.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleAnswer(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ));

      case 'true_false':
        return ['True', 'False'].map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleAnswer(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ));

      case 'choose_image':
        return quiz.images.map((img, index) => (
          <TouchableOpacity
            key={index}
            style={styles.imageOption}
            onPress={() => onAnswer(img.is_correct)}
          >
            <Image source={{ uri: img.url }} style={styles.imageChoice} />
            <Text style={styles.optionText}>{img.label}</Text>
          </TouchableOpacity>
        ));

      case 'select_correct':
        return <MultiCorrectQuiz data={data} onAnswer={onAnswer} />;

      default:
        return <Text style={styles.emptyText}>Unsupported question type</Text>;
    }
  };

  return (
    <View style={styles.cardContainer}>
      {text && <Text style={styles.subHeading}>{text}</Text>}

      {quiz?.image && (
        <Image source={{ uri: quiz.image }} style={styles.img} />
      )}

      <Text style={styles.question}>{quiz?.question || quiz?.statement || quiz?.sentence || '📝'}</Text>

      {renderOptions()}
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    gap: 14,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
    color: '#555',
  },
  img: {
    width: '100%',
    height: 160,
    borderRadius: 20,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  optionButton: {
    backgroundColor: '#FFC670',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    width: '100%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  imageOption: {
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    padding: 10,
    marginVertical: 10,
  },
  imageChoice: {
    width: 100,
    height: 100,
    borderRadius: 16,
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
  },
});
