import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BubblColors from '../styles/BubblColors';
import EnergyBarContainer from '../components/containers/EnergyBarContainer';

export default function StreakScreen({ navigation }) {
  const handleContinue = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      {/* Barra de energía arriba */}
      <View style={styles.energyBarWrapper}>
        <EnergyBarContainer energy={3} maxEnergy={3} />
      </View>

      <View style={styles.content}>
        <Image
          source={require('../assets/icons/f_red.png')}
          style={styles.emojiImage}
        />
        <Text style={styles.title}>4 in a row</Text>
        <Text style={styles.title}>that's amazing!</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
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
  energyBarWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'center',
    color: BubblColors.BubblNeutralDark,
  },
  emojiImage: {
    width: 140,
    height: 140,
    textAlign: 'center',
    marginBottom: 20,
  },
  badgeText: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4CAF50',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 50,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: BubblColors.BubblPurple500,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: BubblColors.BubblNeutralWhite,
    fontWeight: '400',
  },
});
