import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RewardsPanel from '../components/containers/RewardsPanel';
import BubblColors from '../styles/BubblColors';
import BubblFonts from '../styles/BubblFonts';

export default function TopicComplete({ route }) {
  const navigation = useNavigation(); 
  const { heading, text, topic_xp, topic_star } = route.params;

  const handleBackToHome = () => {
    navigation.navigate('Modules');
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Image
            source={require('../assets/icons/flash_gold.png')}
            style={styles.image}
          />
          <Text style={styles.heading}>
            {heading || "You're a Kindness Champion!"}
          </Text>
          <Text style={styles.message}>
            {text || 'You spotted bullying, stood up for others, and showed what it means to be a real friend.'}
          </Text>

          <RewardsPanel xp={topic_xp} star={topic_star} />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleBackToHome}>
          <Text style={styles.buttonText}>Claim Rewards</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BubblColors.BubblNeutralWhite,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: BubblFonts.headingTypeface,
    color: BubblColors.BubblBlack,
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    fontFamily: BubblFonts.bodyTypeface,
    color: BubblColors.BubblBlack,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: BubblColors.BubblNeutralWhite,
  },
  button: {
    backgroundColor: BubblColors.BubblPurple500,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 28,
    marginTop: -30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: BubblFonts.headingTypeface,
    color: BubblColors.BubblNeutralWhite,
  },
});
