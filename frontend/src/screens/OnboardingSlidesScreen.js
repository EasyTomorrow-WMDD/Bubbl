import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { fontStyles } from '../styles/BubblFontStyles';
import BubblColors from '../styles/BubblColors';
import axios from 'axios';
import { BASE_URL } from '../utils/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BubblFonts from '../styles/BubblFonts';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  topContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height * 0.5,
  },
  bottomCard: {
    flex: 0.3,
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -120
  },
  title: {
    marginTop: -50,
    textAlign: 'center',
    marginBottom: 20,
    fontSize: BubblFonts.sizes.heading1,
    fontFamily: BubblFonts.headingTypeface,
    lineHeight: BubblFonts.lineHeights.heading1,
  },
  titleStyle: {
    fontSize: BubblFonts.sizes.heading1,
    fontFamily: BubblFonts.headingTypeface,
  },
  text: {
    textAlign: 'center',
    fontSize: BubblFonts.sizes.bodyDefault,
    fontFamily: BubblFonts.bodyTypeface,
    lineHeight: BubblFonts.lineHeights.bodyDefault,
  },
  textStyle: {
    fontSize: BubblFonts.sizes.tagline,
    fontFamily: BubblFonts.bodyTypeface,
  },
  skipButton: {
    position: 'absolute',
    top: 70,
    right: 30,
    zIndex: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginRight: -10,
  },
  skipButtonImage: {
    width: 25, 
    height: 25,
  },
  skipButtonText: {
    fontSize: BubblFonts.sizes.bodyMedium,
    fontFamily: BubblFonts.bodyTypeface,
  },
  previousButton: {
    position: 'absolute',
    bottom: 40,
    left: 18,
    zIndex: 1000,
  },
  previousButtonText: {
    padding: 10,
    fontSize: BubblFonts.sizes.bodyMedium,
    fontFamily: BubblFonts.bodyTypeface,
  },
  nextButtonText: {
    fontSize: BubblFonts.sizes.bodyMedium,
    fontFamily: BubblFonts.bodyTypeface,
  }
});

const slides = [
  {
    key: '1',
    title: 'Meet Your Mascot Friend!',
    text: 'Your mascot friend is there to help and guide you while you learn. Customize it to your liking and keep him happy by using the app.',
    animation: require('../assets/animations/Mascot_Animation.json'),
    backgroundColor: BubblColors.BubblOrange500,
    imageStyle: {
      width: width * 1.3,
      height: height * 1.2,
      paddingRight: 20
    },
    bottomCardStyle: {
      backgroundColor: '#FFFAEB',
    },
    titleStyle: {
      color: '#461802',
    },
    textStyle: {
      color: '#7A310D',
    },
    skipButtonStyle: {
      color: BubblColors.BubblWhite,
    },
    previousButtonStyle: {
      color: '#B74D06',
    },
    nextButtonStyle: {
      color: '#B74D06',
    },
  },
  {
    key: '2',
    title: 'Fun Activities. Real Life Skills!',
    text: 'Learn about boundaries, safe touch, emotions, and more. All through playful challenges and game-like lessons.',
    animation: require('../assets/animations/Activities_Animation.json'),
    backgroundColor: '#EE47EB',
    imageStyle: {
      width: width * 1.2 ,
      height: height ,
    },
    bottomCardStyle: {
      backgroundColor: '#FFF4FF',
      flex: 0.3
    },
    titleStyle: {
      color: '#4D0546',
    },
    textStyle: {
      color: '#741B6C',
    },
    skipButtonStyle: {
      color: BubblColors.BubblWhite,
    },
    previousButtonStyle: {
      color: '#AE1DA6',
    },
    nextButtonStyle: {
      color: '#AE1DA6',
    },
  },
  {
    key: '3',
    title: 'Draw What You Feel With Ease!',
    text: 'With the Moodboard, you can share how you feel and draw freely, giving emotions a safe space to be expressed.',
    animation: require('../assets/animations/Mood _Canvas_Animation.json'),
    backgroundColor: '#11BBB8',
    imageStyle: {
      width: width * 0.9,
      height: height * 1.2,
    },
    bottomCardStyle: {
      backgroundColor: '#F0FDFB',
    },
    titleStyle: {
      color: '#032D30',
    },
    textStyle: {
      color: '#124D4F',
    },
    skipButtonStyle: {
      color: BubblColors.BubblWhite,
    },
    previousButtonStyle: {
      color: '#0D7678',
    },
    nextButtonStyle: {
      color: '#0D7678',
    },
  },
  {
    key: '4',
    title: 'Get to Know Your Resources!',
    text: ' Use HP to play the activities. Earn XP and stars by completing them, help your mascot grow, and unlock new accessories for cool looks.',
    animation: require('../assets/animations/Resources_Animation.json'),
    backgroundColor: BubblColors.BubblPurple500,
    imageStyle: {
      width: width * 1.0,
      height: height * 1.0,
    },
    bottomCardStyle: {
      backgroundColor: '#F0FDFF',
    },
    titleStyle: {
      color: '#2E195C',
      FontWeight: 700,
    },
    textStyle: {
      color: '#4B2A88',
    },
    skipButtonStyle: {
      color: '#FFFFFF',
    },
    previousButtonStyle: {
      color: '#6B3BC6',
    },
    nextButtonStyle: {
      color: '#6B3BC6',
    }
  },
];

function SlideComponent({ item, index, currentSlide }) {
  const animationRef = useRef(null);

  useEffect(() => {
  if (animationRef.current) {
    animationRef.current.reset();
    if (index === currentSlide) {
      animationRef.current.play();
    }
  }
}, [currentSlide]);

  return (
    <SafeAreaView style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <View style={styles.topContainer}>
        <LottieView
          ref={animationRef}
          source={item.animation}
          loop={false}
          style={[styles.image, item.imageStyle]}
        />
      </View>
      <View style={[styles.bottomCard, item.bottomCardStyle]}>
        <Text style={[fontStyles.display1, styles.title, item.titleStyle]}>{item.title}</Text>
        <Text style={[fontStyles.bodyDefault, styles.text, item.textStyle]}>{item.text}</Text>
      </View>
    </SafeAreaView>
  );
}

export default function OnboardingSlidesScreen({ navigation }) {
  const [sliderRef, setSliderRef] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const onDone = async () => {
    try {
      const userId = await AsyncStorage.getItem('selected_user_id');
      if (userId) {
        await axios.post(`${BASE_URL}/api/onboarding/complete`, {
          user_id: userId,
          completed: true,
        });
      }
    } catch (error) {
      console.error('Error marking onboarding complete:', error);
    }

    navigation.replace('Modules');
  };

  const goToPreviousSlide = () => {
    if (sliderRef && currentSlide > 0) {
      const newSlide = currentSlide - 1;
      setCurrentSlide(newSlide);
      sliderRef.goToSlide(newSlide);
    }
  };

  const onSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const getCurrentSlideStyle = () => {
    return slides[currentSlide];
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={onDone}
      >
        <Text style={[styles.skipButtonText, { color: getCurrentSlideStyle().skipButtonStyle.color }]}>
          Skip
        </Text>
        <Image
          source={require('../assets/icons/arrow_skip.png')}
          style={[styles.skipButtonImage, { tintColor: getCurrentSlideStyle().skipButtonStyle.color }]}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {currentSlide > 0 && (
        <TouchableOpacity
          style={styles.previousButton}
          onPress={goToPreviousSlide}
        >
          <Text style={[styles.previousButtonText, { color: getCurrentSlideStyle().previousButtonStyle.color }]}>
            Previous
          </Text>
        </TouchableOpacity>
      )}

      <AppIntroSlider
        ref={(ref) => setSliderRef(ref)}
        data={slides}
        renderItem={({ item, index }) => (
          <SlideComponent
            item={item}
            index={index}
            currentSlide={currentSlide}
          />
        )}
        onDone={onDone}
        showSkipButton={false}
        onSlideChange={onSlideChange}
        renderNextButton={() => (
          <Text style={{ 
            color: getCurrentSlideStyle().nextButtonStyle.color, 
            padding: 10, 
            fontSize: BubblFonts.sizes.bodyMedium,
            fontFamily: BubblFonts.bodyTypeface,
            paddingLeft: 20 
          }}>
            Next
          </Text>
        )}
        renderDoneButton={() => (
          <Text style={{ 
            color: getCurrentSlideStyle().nextButtonStyle.color, 
            padding: 10, 
            fontSize: BubblFonts.sizes.bodyMedium,
            fontFamily: BubblFonts.bodyTypeface, 
            paddingLeft: 20 
          }}>
            Start
          </Text>
        )}
        activeDotStyle={{ backgroundColor: getCurrentSlideStyle().nextButtonStyle.color, paddingLeft: 20 }}
      />
    </View>
  );
}