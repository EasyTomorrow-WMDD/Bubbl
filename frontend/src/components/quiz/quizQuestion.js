import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import MultiCorrectQuiz from './MultiCorrectQuiz';
import ChooseImageQuiz from './ChooseImageQuiz';
import BubblColors from '../../styles/BubblColors';

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

  const getImageStyle = () => {
    switch (type) {
      case 'true_false':
        return styles.truefalse_img;
      case 'multiple_choice':
        return styles.multiplechoice_img;
      case 'fill_blank':
        return styles.fillblank_img;
      default:
        return styles.img;
    }
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
        {(type !== 'choose_image' && type !== 'select_correct') && (
          <>
            {data?.text && (
              <Text style={styles.subHeading}>{data.text}</Text>
            )}
            {quiz?.question && (
              <Text style={styles.question}>{quiz.question}</Text>
            )}
            {quiz?.image && (
              <Image source={{ uri: quiz.image }} style={getImageStyle()} />
            )}
          </>
        )}

        {renderOptions()}

        <View style={{ height: hasChecked ? 120 : 80 }} />
      </ScrollView>

      <View style={[
        styles.fixedBottom,
        hasChecked && (isCorrect ? styles.fixedBottomCorrect : styles.fixedBottomWrong)
      ]}>
        {hasChecked && feedbackMessage && (
          <View style={styles.feedbackContainer}>
            <View style={styles.feedbackContent}>
              <Image
                source={
                  isCorrect
                    ? require('../../assets/icons/correct.png')
                    : require('../../assets/icons/wrong.png')
                }
                style={styles.feedbackIcon}
              />
              <Text style={styles.feedbackText}>{feedbackMessage}</Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.checkButton,
            (!selectionReady && !hasChecked) ? styles.checkButtonDisabled : styles.checkButtonActive,
            hasChecked && (isCorrect ? styles.continueCorrect : styles.continueWrong),
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
    backgroundColor: BubblColors.BubblCyan200,
  },
  fixedBottomWrong: {
    backgroundColor: BubblColors.BubblOrange400,
  },
  feedbackContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'flex-start',
  },
  feedbackContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    maxWidth: 400,
    flexWrap: 'nowrap',
  },
  feedbackIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },
  feedbackText: {
    color: BubblColors.BubblBlack,
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'left',
    flexShrink: 1,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BubblColors.BubblBlack,
    textAlign: 'left',
    marginBottom: 8,
  },
  question: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'left',
    marginBottom: 12,
    color: BubblColors.BubblBlack,
  },
  img: {
    width: '100%',
    height: 230,
    borderRadius: 20,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginBottom: 12,
  },
  truefalse_img: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  multiplechoice_img: {
    width: '100%',
    height: 230,
    borderRadius: 20,
    resizeMode: 'cover',
    marginBottom: 12,
  },
  fillblank_img: {
    width: '100%',
    height: 250,
    borderRadius: 18,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: BubblColors.BubblPurple500,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    width: '100%',
    alignSelf: 'center',
    shadowColor: BubblColors.BubblBlack,
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  optionButtonSelected: {
    backgroundColor: BubblColors.BubblPurple300,
  },
  optionButtonCorrect: {
    backgroundColor: BubblColors.BubblCyan300,
  },
  optionButtonWrong: {
    backgroundColor: BubblColors.BubblOrange300,
  },
  optionText: {
    fontSize: 16,
    color: BubblColors.BubblBlack,
  },
  optionTextChecked: {
    fontWeight: '400',
  },
  checkButton: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 12,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkButtonDisabled: {
    backgroundColor: '#ccc',
  },
  checkButtonActive: {
    backgroundColor: BubblColors.BubblPurple500,
  },
  continueCorrect: {
    backgroundColor: BubblColors.BubblCyan900,
  },
  continueWrong: {
    backgroundColor: BubblColors.BubblOrange600,
  },
  checkButtonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
  },
});
