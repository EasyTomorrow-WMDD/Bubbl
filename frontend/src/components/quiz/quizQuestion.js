import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import MultiCorrectQuiz from './MultiCorrectQuiz';
//import ChooseImageQuiz from './ChooseImageQuiz';
import BubblColors from '../../styles/BubblColors';
import { Audio } from 'expo-av';
import BubblFonts from '../../styles/BubblFonts';

export default function QuizQuestion({ data, onAnswer, showTryAgain, onTryAgain }) {
  if (!data || !data.quiz) {
    return null;
  }

  const { type, text, quiz } = data;

  const [selectedOption, setSelectedOption] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [selectionReady, setSelectionReady] = useState(false);

  const [correctSound, setCorrectSound] = useState();
  const [wrongSound, setWrongSound] = useState();

  useEffect(() => {
    let correct, wrong;

    const loadSounds = async () => {
      try {
        const { sound: correctLoaded } = await Audio.Sound.createAsync(
          require('../../assets/sounds/correct.mp3')
        );
        correct = correctLoaded;

        const { sound: wrongLoaded } = await Audio.Sound.createAsync(
          require('../../assets/sounds/wrong.wav')
        );
        wrong = wrongLoaded;

        setCorrectSound(correct);
        setWrongSound(wrong);
      } catch (error) {
        console.error('Error loading sounds:', error);
      }
    };

    loadSounds();

    return () => {
      correct?.unloadAsync();
      wrong?.unloadAsync();
    };
  }, []);

  useEffect(() => {
    setHasChecked(false);
    setSelectedOption(null);
    setIsCorrect(false);
    setFeedbackMessage('');
    setSelectionReady(false);
  }, [data]);

  useEffect(() => {
    if (showTryAgain) {
      setHasChecked(false);
      setSelectedOption(null);
      setIsCorrect(false);
      setFeedbackMessage('');
      setSelectionReady(false);
    }
  }, [showTryAgain]);

  const handleButtonPress = async () => {
    if (showTryAgain) {
      onTryAgain();
      return;
    }

    if (!hasChecked) {
      if (!selectionReady) return;
      setHasChecked(true);

      try {
        if (isCorrect) {
          await correctSound?.replayAsync();
        } else {
          await wrongSound?.replayAsync();
        }
      } catch (error) {
        console.error('Error playing sound:', error);
      }

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
            disabled={hasChecked && !showTryAgain}
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
            disabled={hasChecked && !showTryAgain}
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

      // case 'choose_image':
      //   return (
      //     <ChooseImageQuiz
      //       data={data}
      //       onSelect={(label, correct, message) => handleSelect(label, correct, message)}
      //       disabled={hasChecked && !showTryAgain}
      //     />
      //   );

      case 'select_correct':
        return (
          <MultiCorrectQuiz
            data={data}
            onSelect={(correct, message) => handleSelect('multi', correct, message)}
            disabled={hasChecked && !showTryAgain}
            isCorrect={isCorrect}
            onSelecting={() => {
              if (!hasChecked || showTryAgain) {
                setSelectionReady(true);
              }
            }}
          />
        );

      default:
        return <Text style={styles.emptyText}>Unsupported question type</Text>;
    }
  };

  const getButtonText = () => {
    if (showTryAgain) return 'Try Again';
    if (hasChecked) return 'Continue';
    return 'Check';
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

        <View style={{ height: hasChecked && !showTryAgain ? 120 : 80 }} />
      </ScrollView>

      <View style={[
        styles.fixedBottom,
        hasChecked && !showTryAgain && (isCorrect ? styles.fixedBottomCorrect : styles.fixedBottomWrong)
      ]}>
        {hasChecked && feedbackMessage && !showTryAgain && (
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
            (!selectionReady && !hasChecked && !showTryAgain) ? styles.checkButtonDisabled : styles.checkButtonActive,
            hasChecked && !showTryAgain && (isCorrect ? styles.continueCorrect : styles.continueWrong),
          ]}
          onPress={handleButtonPress}
          disabled={!selectionReady && !hasChecked && !showTryAgain}
        >
          <Text style={styles.checkButtonText}>
            {getButtonText()}
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
    fontSize: BubblFonts.sizes.bodyMedium,
    fontFamily: BubblFonts.bodyTypeface,
  },
  fixedBottomWrong: {
    backgroundColor: BubblColors.BubblOrange400,
    fontSize: BubblFonts.sizes.bodyMedium,
    fontFamily: BubblFonts.bodyTypeface,
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
    fontSize: BubblFonts.sizes.bodyMedium,
    fontFamily: BubblFonts.bodyTypeface,
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'left',
    flexShrink: 1,
  },
  subHeading: {
    fontSize: BubblFonts.sizes.heading2,
    fontFamily: BubblFonts.headingTypeface,
    fontWeight: 'bold',
    color: BubblColors.BubblBlack,
    textAlign: 'left',
    marginBottom: 8,
  },
  question: {
    fontWeight: '400',
    textAlign: 'left',
    marginBottom: 12,
    color: BubblColors.BubblBlack,
    fontSize: BubblFonts.sizes.bodyLarge,
    fontFamily: BubblFonts.bodyTypeface,
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
    fontFamily: BubblFonts.bodyTypeface,
    fontSize: BubblFonts.sizes.bodyMedium
  },
  optionButtonCorrect: {
    backgroundColor: BubblColors.BubblCyan300,
    fontFamily: BubblFonts.bodyTypeface,
    fontSize: BubblFonts.sizes.bodyMedium
  },
  optionButtonWrong: {
    backgroundColor: BubblColors.BubblOrange300,
    fontFamily: BubblFonts.bodyTypeface,
    fontSize: BubblFonts.sizes.bodyMedium
  },
  optionText: {
    fontSize: BubblFonts.sizes.bodyMedium,
    color: BubblColors.BubblBlack,
    fontFamily: BubblFonts.bodyTypeface,

  },
  optionTextChecked: {
    fontWeight: '400',
    fontFamily: BubblFonts.bodyTypeface,
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
    fontFamily: BubblFonts.bodyTypeface,
  },
  checkButtonActive: {
    backgroundColor: BubblColors.BubblPurple500,
    fontFamily: BubblFonts.bodyTypeface,
    fontSize: BubblFonts.sizes.bodyMedium
  },
  continueCorrect: {
    backgroundColor: BubblColors.BubblCyan900,
    fontFamily: BubblFonts.bodyTypeface,
    fontSize: BubblFonts.sizes.bodyMedium
  },
  continueWrong: {
    backgroundColor: BubblColors.BubblOrange600,
    fontFamily: BubblFonts.bodyTypeface,
    fontSize: BubblFonts.sizes.bodyMedium
  },
  checkButtonText: {
    color: BubblColors.BubblWhite,
    fontFamily: BubblFonts.bodyTypeface,
    fontSize: BubblFonts.sizes.bodyMedium,
    fontWeight: '400',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
    fontFamily: BubblFonts.bodyTypeface,
    fontSize: BubblFonts.sizes.bodyMedium
  },
});