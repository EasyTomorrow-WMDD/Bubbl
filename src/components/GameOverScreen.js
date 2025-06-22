import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

const GameOverScreen = ({ score, onRestart }) => (
  <View style={styles.centeredContent}>
    <Text style={styles.finalScoreText}>Game Over!</Text>
    <Text style={styles.finalScore}>Total Score: {score}</Text>
    <TouchableOpacity style={styles.restartButton} onPress={onRestart}>
      <Text style={styles.nextButtonText}>Play Again</Text>
    </TouchableOpacity>
  </View>
);

export default GameOverScreen;