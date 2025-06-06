import React, { useState, useMemo } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { DndProvider, Draggable, Droppable } from 'react-native-dnd';
import { styles } from '../styles/styles';

const GameScreen = ({ currentPhrase, score, onCorrectAnswer, onNextPhrase }) => {
  const [droppedWord, setDroppedWord] = useState(null);

  const handleDrop = ({ payload }) => {
    if (!droppedWord && payload.word === currentPhrase.correctWord) {
      onCorrectAnswer();
      setDroppedWord(payload.word);
    }
  };

  const handleNext = () => {
    onNextPhrase();
    setDroppedWord(null);
  };

  const wordOptions = useMemo(() => (
    currentPhrase?.words.map((word, index) => (
      <Draggable key={index} payload={{ word }} disabled={!!droppedWord}>
        {({ viewProps }) => (
          <View {...viewProps} style={[styles.wordContainer, droppedWord === word && styles.hidden]}>
            <Text style={styles.wordText}>{word}</Text>
          </View>
        )}
      </Draggable>
    ))
  ), [currentPhrase, droppedWord]);

  return (
    <DndProvider>
      <View style={styles.header}>
        <Text style={styles.title}>Complete the Sentence</Text>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>

      <View style={styles.gameArea}>
        <View style={styles.sentenceContainer}>
          <Text style={styles.sentenceText}>{currentPhrase.sentence.split('___')[0]}</Text>
          <Droppable onDrop={handleDrop}>
            {({ viewProps, active }) => (
              <View
                {...viewProps}
                style={[
                  styles.blank,
                  active && !droppedWord && styles.droppableActive,
                  droppedWord && styles.droppedCorrect,
                ]}
              >
                <Text style={styles.wordText}>{droppedWord}</Text>
              </View>
            )}
          </Droppable>
          <Text style={styles.sentenceText}>{currentPhrase.sentence.split('___')[1]}</Text>
        </View>

        <View style={styles.wordOptionsContainer}>{wordOptions}</View>
      </View>

      {droppedWord && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      )}
    </DndProvider>
  );
};

export default GameScreen;