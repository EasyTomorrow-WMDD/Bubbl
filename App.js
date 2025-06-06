import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import GameScreen from './src/components/GameScreen';
import GameOverScreen from './src/components/GameOverScreen';
import { PHRASES } from './src/constants/phrases';
import { styles } from './src/styles/styles';

export default function App() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [score, setScore] = useState(0);

  const isGameEnd = currentPhraseIndex === PHRASES.length;
  const currentPhrase = PHRASES[currentPhraseIndex];

  const handleCorrectAnswer = () => {
    setScore((prevScore) => prevScore + 10);
  };

  const handleNextPhrase = () => {
    if (currentPhraseIndex < PHRASES.length) {
      setCurrentPhraseIndex((prevIndex) => prevIndex + 1);
    }
  };
  
  const handleRestart = () => {
    setCurrentPhraseIndex(0);
    setScore(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {isGameEnd ? (
        <GameOverScreen score={score} onRestart={handleRestart} />
      ) : (
        <GameScreen
          currentPhrase={currentPhrase}
          score={score}
          onCorrectAnswer={handleCorrectAnswer}
          onNextPhrase={handleNextPhrase}
        />
      )}
    </SafeAreaView>
  );
}
