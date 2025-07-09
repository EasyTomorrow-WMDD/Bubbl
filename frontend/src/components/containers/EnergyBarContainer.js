import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import BubblColors from '../../styles/BubblColors';

const EnergyBarContainer = ({ energy, maxEnergy = 3, navigation }) => {
  const fillPercentage = (energy / maxEnergy) * 100;

  return (
    <View style={styles.wrapper}>
      <View style={styles.barWithIcon}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>

        <View style={styles.backgroundBar}>
          <View style={[styles.fillBar, { width: `${fillPercentage}%` }]} />
        </View>

        <View style={styles.heartContainer}>
          <Text style={styles.heart}>❤️</Text>
          <Text style={styles.energyCount}>{energy}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginVertical: 10,
  },
  barWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    marginRight: 8,
    padding: 4,
  },
  closeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BubblColors.BubblNeutralDark,
  },
  backgroundBar: {
    width: 250,
    height: 11,
    backgroundColor: BubblColors.BubblCyan100,
    borderRadius: 10,
    overflow: 'hidden',
  },
  fillBar: {
    height: '100%',
    backgroundColor: BubblColors.BubblCyan400,
  },
  heartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  heart: {
    fontSize: 15,
  },
  energyCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
    color: BubblColors.BubblNeutralDark,
  },
});

export default EnergyBarContainer;
