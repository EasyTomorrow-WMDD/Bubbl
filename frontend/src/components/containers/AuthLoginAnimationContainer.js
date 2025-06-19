import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import { globalStyles } from '../../styles/BubblStyles';
import LottieView from 'lottie-react-native';

export default function AuthLoginAnimation() {
  const animationRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      animationRef.current?.play();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={globalStyles.animationContainer}>
      <LottieView
        ref={animationRef}
        source={require('../../assets/animations/Loging.json')}
        loop={false}
        autoPlay
        style={{ width: '106%', height: '106%' }}
        resizeMode="contain"
      />
    </View>
  );
}