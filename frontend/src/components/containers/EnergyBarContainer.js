import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import  BubblColors  from '../../styles/BubblColors';

const EnergyBarContainer = ({ energy, maxEnergy = 3 }) => {
  const fillPercentage = (energy / maxEnergy) * 100;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}></Text>
      <View style={styles.barWithIcon}>
        <View style={styles.backgroundBar}>
          <View style={[styles.fillBar, { width: `${fillPercentage}%` }]} />
        </View>
        <View style={styles.heartContainer}>
          <Text style={styles.heart}>❤️</Text>
          <Text style={styles.energyCount}>{energy}</Text>
        </View>
        {/*
          for images
          <Image source={require('../assets/heart.png')} style={styles.heartImage} />
        */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: 16,
    color: BubblColors.BubblNeutralDark,
  },
  barWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
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
  heartImage: {
    marginLeft: 8,
    width: 18,
    height: 16,
  },
});

export default EnergyBarContainer;
