import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import MultiCorrectQuiz from './MultiCorrectQuiz';
import ChooseImageQuiz from './ChooseImageQuiz';

export default function QuizQuestion({ data, onAnswer }) {
  
  if (!data || !data.quiz) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.emptyText}>Loading question...</Text>
      </View>
    );
  }

  const { type, text, quiz } = data;

  const [selectedOption, setSelectedOption] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [selectionReady, setSelectionReady] = useState(false);

  useEffect(() => {
    
    setHasChecked(false);
    setSelectedOption(null);
    setIsCorrect(false);
    setFeedbackMessage('');
    setSelectionReady(false);
  }, [data]);

  const handleButtonPress = () => {
    if (!hasChecked) {
      if (!selectionReady) return;
      setHasChecked(true);
    } else {
      onAnswer(isCorrect);
    }
  };

  const handleSelect = (option, correct, message) => {
    setSelectedOption(option);
    setIsCorrect(correct);
    setFeedbackMessage(message);
    setSelectionReady(true);
  };

  const renderOptions = () => {
    switch (type) {
      case 'multiple_choice':
      case 'fill_blank':
        if (!quiz.options || !Array.isArray(quiz.options)) {
          return <Text style={styles.emptyText}>No options available.</Text>;
        }
        return quiz.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && styles.optionButtonSelected,
              hasChecked && selectedOption === option && (isCorrect ? styles.optionButtonCorrect : styles.optionButtonWrong)
            ]}
            disabled={hasChecked}
            onPress={() => handleSelect(option, option === quiz.correct, option === quiz.correct ? quiz.message_correct : quiz.message_wrong)}
          >
            <Text style={[
              styles.optionText,
              hasChecked && selectedOption === option && styles.optionTextChecked
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ));

      case 'true_false':
        return ['True', 'False'].map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && styles.optionButtonSelected,
              hasChecked && selectedOption === option && (isCorrect ? styles.optionButtonCorrect : styles.optionButtonWrong)
            ]}
            disabled={hasChecked}
            onPress={() => handleSelect(option, option === quiz.correct, option === quiz.correct ? quiz.message_correct : quiz.message_wrong)}
          >
            <Text style={[
              styles.optionText,
              hasChecked && selectedOption === option && styles.optionTextChecked
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ));

      case 'choose_image':
        return (
          <ChooseImageQuiz
            data={data}
            onSelect={(label, correct, message) => handleSelect(label, correct, message)}
            disabled={hasChecked}
          />
        );

      case 'select_correct':
        return (
          <MultiCorrectQuiz
            data={data}
            onSelect={(correct, message) => handleSelect('multi', correct, message)}
            disabled={hasChecked}
          />
        );

      default:
        return <Text style={styles.emptyText}>Unsupported question type</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {text && <Text style={styles.subHeading}>{text}</Text>}

        {quiz?.image && (
          <Image source={{ uri: quiz.image }} style={styles.img} />
        )}

        <Text style={styles.question}>
          {quiz?.question || quiz?.statement || quiz?.sentence || '📝'}
        </Text>

        {renderOptions()}

        <View style={{ height: hasChecked ? 120 : 80 }} />
      </ScrollView>

      <View style={[
        styles.fixedBottom,
        hasChecked && (isCorrect ? styles.fixedBottomCorrect : styles.fixedBottomWrong)
      ]}>
        {hasChecked && feedbackMessage && (
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackText}>{feedbackMessage}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.checkButton,
            (!selectionReady && !hasChecked) && styles.checkButtonDisabled
          ]}
          onPress={handleButtonPress}
          disabled={!selectionReady && !hasChecked}
        >
          <Text style={styles.checkButtonText}>
            {hasChecked ? 'Continue' : 'Check'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scroll: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 16,
    paddingBottom: 30,
    flexDirection: 'column',
    alignItems: 'center',
  },
  fixedBottomCorrect: {
    backgroundColor: '#4CAF50',
  },
  fixedBottomWrong: {
    backgroundColor: '#E53935',
  },
  feedbackContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  feedbackText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    paddingVertical: 12,
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
  optionButtonSelected: {
    backgroundColor: '#FFAA3B',
  },
  optionButtonCorrect: {
    backgroundColor: '#81C784',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  optionButtonWrong: {
    backgroundColor: '#EF5350',
    borderWidth: 2,
    borderColor: '#E53935',
  },
  checkButton: {
    backgroundColor: 'black',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 12,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkButtonDisabled: {
    borderColor: '#A5D6A7',
  },
  checkButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
  },
});
