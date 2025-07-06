import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const EvolutionScreen = ({ route }) => {
  const { animationType } = route.params; // should be 'evolution1', 'evolution2', or 'evolution3'
  const animationRef = useRef(null);
  const [text, setText] = useState('');

  const animationMap = {
    evolution1: {
      file: require('../assets/animations/Evolution1op.json'),
      initial: ['WAIT...', 'did that egg just move?'],
      final: ['WOW!', 'You found a new friend!'],
    },
    evolution2: {
      file: require('../assets/animations/Evolution2op.json'),
      initial: ['WAIT...', "what's happening to Bubbl?"],
      final: ['WOW!', 'Bubbl grew up!'],
    },
    evolution3: {
      file: require('../assets/animations/Evolution3op.json'),
      initial: ['WAIT...', "what's happening to Bubbl?"],
      final: ['WOW!', 'Bubbl grew up!'],
    },
  };

  const { file, initial, final } = animationMap[animationType] || animationMap.evolution1;

  useEffect(() => {
    setText(initial);

    // Delay final text until animation ends
    const duration = 3500; // adjust depending on animation length
    const timeout = setTimeout(() => setText(final), duration);

    return () => clearTimeout(timeout);
  }, [animationType]);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        source={file}
        autoPlay
        loop={false}
        style={styles.animation}
      />
      <View style={styles.textBox}>
        <Text style={styles.text}>{text[0]}</Text>
        <Text style={styles.text}>{text[1]}</Text>
      </View>
    </View>
  );
};

export default EvolutionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8361E4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: width * 0.9,
    height: height * 0.5,
  },
  textBox: {
    marginTop: 24,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});