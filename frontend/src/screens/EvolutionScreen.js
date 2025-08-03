import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av'; 
import { fontStyles } from '../styles/BubblFontStyles';

const { width, height } = Dimensions.get('window');

const EvolutionScreen = ({ route }) => {
  const navigation = useNavigation();
  const { animationType } = route.params;
  const animationRef = useRef(null);
  const [text, setText] = useState(['', '']);
  const soundRef = useRef(null); 

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

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/Evolution.mp3')
      );
      soundRef.current = sound;
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  useEffect(() => {
    setText(initial);
    playSound(); 

    const duration = 3500;
    const timeout = setTimeout(() => {
      setText(final);
      setTimeout(() => {
        navigation.navigate('Modules');
      }, 2500);
    }, duration);

    return () => {
      clearTimeout(timeout);
      if (soundRef.current) {
        soundRef.current.unloadAsync(); 
      }
    };
  }, [animationType]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/DrawingCanvas/Done_Background.png')}
        style={styles.backgroundImage}
        imageStyle={styles.imageBackground}
      >
        {/* Centered animation */}
        <View style={styles.animationWrapper}>
          <LottieView
            ref={animationRef}
            source={file}
            autoPlay
            loop={false}
            style={styles.animation}
          />
          {/* Overlay text above animation */}
          <View style={styles.textBox}>
            <Text style={[fontStyles.display1, { textAlign: 'center', color: 'white' }]}>{text[0]}</Text>
            <Text style={[fontStyles.heading1, { textAlign: 'center', color: 'white' }]}>{text[1]}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default EvolutionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8361E4',
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    resizeMode: 'cover',
  },
  animationWrapper: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
  },
  animation: {
    width: 450,
    height: 450,
  },
  textBox: {
    position: 'absolute',
    top: '20%', 
    width: '100%',
    alignItems: 'center',
  },
});