import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const EnergyBarContainer = ({ energy, maxEnergy = 3 }) => {
  const fillPercentage = (energy / maxEnergy) * 100;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}></Text>
      <View style={styles.barWithIcon}>
        <View style={styles.backgroundBar}>
          <View style={[styles.fillBar, { width: `${fillPercentage}%` }]} />
        </View>
        <Text style={styles.heart}>❤️</Text>
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
    color: '#333',
  },
  barWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backgroundBar: {
    width: 200,
    height: 20,
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  fillBar: {
    height: '100%',
    backgroundColor: '#f44336',
  },
  heart: {
    marginLeft: 8,
    fontSize: 20,
  },
  heartImage: {
    marginLeft: 8,
    width: 24,
    height: 24,
  },
});

export default EnergyBarContainer
