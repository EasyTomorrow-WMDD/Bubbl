import React, { useRef, useEffect, useState } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/BubblStyles';
import AuthLoginAnimation from './AuthLoginAnimationContainer';
import AuthLoginWhiteCard from './AuthLoginWhiteCardContainer';
import LottieView from 'lottie-react-native';

const AuthWelcomeContainer = ({ navigation }) => {
  const animationRef = useRef(null);
  const [animationFinished, setAnimationFinished] = useState(false);
  
// This component serves as the welcome screen for authentication.
// Here, users are navigating to either login or signup. There is no state management or logic for the moment. 

 // ==========================================================================

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Background with content */}
      <ImageBackground
        source={require('../../assets/images/Login/Background.png')}
        style={globalStyles.backgroundLogin}
      >

{/* Render the welcome screen */}
        <View style={globalStyles.animationContainer}>
          <AuthLoginAnimation />
        </View>
        <AuthLoginWhiteCard navigation={navigation} />
      </ImageBackground>

      {/* Lottie splash on top of everything */}
      {!animationFinished && (
        <View style={styles.overlay}>
          <LottieView
            ref={animationRef}
            source={require('../../assets/animations/Splash_3.json')}
            autoPlay
            loop={false}
            style={styles.lottie}
            onAnimationFinish={() => setAnimationFinished(true)}
          />
        </View>
      )}
    </View>
  );
};

export default AuthWelcomeContainer;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
lottie: {
  width: '125%',
  height: '125%',
  alignSelf: 'center',
},
});
