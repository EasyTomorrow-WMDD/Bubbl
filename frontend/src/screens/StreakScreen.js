import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StreakScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.goBack(); // 👈 go back to quiz automatically
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🔥</Text>
      <Text style={styles.title}>4 in a row, that's amazing!</Text>
      <Text style={styles.badgeText}>🏅 You won a badge!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#FF5722',
  },
  emoji: {
    fontSize: 100,
    textAlign: 'center',
  },
  badgeText: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4CAF50',
  },
});
