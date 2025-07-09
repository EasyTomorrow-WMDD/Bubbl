import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { fontStyles } from '../styles/BubblFontStyles';
import BubblColors from '../styles/BubblColors';
import axios from 'axios';
import { BASE_URL } from '../utils/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Welcome to Bubbl!',
    text: 'Have fun while learning with your mascot!',
    image: require('../assets/images/yellow_bubbl.png'),
    backgroundColor: BubblColors.BubblPurple500,
  },
  {
    key: '2',
    title: 'Energy (HP)',
    text: 'Use energy to answer quizzes. It recharges over time!',
    image: require('../assets/images/hp_card.png'),
    backgroundColor: '#EE47EB',
  },
  {
    key: '3',
    title: 'Stars',
    text: 'Earn stars to customize your mascot.',
    image: require('../assets/images/star_card.png'),
    backgroundColor: '#F99707',
  },
  {
    key: '4',
    title: 'XP',
    text: 'Level up with XP and your mascot will evolve!',
    image: require('../assets/images/xp_card.png'),
    backgroundColor: BubblColors.BubblCyan500,
  },
  {
    key: '5',
    title: 'Activities, Mood Draw and Shop',
    text: 'Play Quizzes, Draw in Mood Draw  and customize your mascot in Shop!',
    image: require('../assets/images/Child_Bottom_Navigation.png'),
    backgroundColor: '#6B46C1',
  },
];

export default function OnboardingSlidesScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <Text style={[fontStyles.display1, styles.title]}>{item.title}</Text>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={[fontStyles.bodyDefault, styles.text]}>{item.text}</Text>
    </View>
  );

  const onDone = async () => {
    try {
      const userId = await AsyncStorage.getItem('selected_user_id');
      if (userId) {
        await axios.post(`${BASE_URL}/api/onboarding/complete`, {
          user_id: userId,
          completed: true
        });
      }
    } catch (error) {
      console.error('Error marking onboarding complete:', error);
    }

    navigation.replace('Modules');
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      onDone={onDone}
      showSkipButton
      onSkip={onDone}
      activeDotStyle={{ backgroundColor: 'white' }}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
  },
});
