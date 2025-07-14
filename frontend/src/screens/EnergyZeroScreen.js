import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function EnergyZeroScreen({ route, navigation }) {
  const { timeToNextMs, childId } = route.params || {};

  const formatCountdown = (ms) => {
    if (!ms || ms <= 0) return '00:00';
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const [countdown, setCountdown] = useState(formatCountdown(timeToNextMs));
  const intervalRef = useRef(null);

  useEffect(() => {
    let remaining = timeToNextMs;

    intervalRef.current = setInterval(() => {
      remaining -= 1000;
      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        setCountdown('00:00');
      } else {
        setCountdown(formatCountdown(remaining));
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [timeToNextMs]);

  return (
    <View style={styles.container}>
      <Text style={styles.energyZero}>Energy: 0</Text>
      <Text style={styles.countdownText}>
        {countdown ? `You will regain 1 energy in ${countdown}` : 'Please wait...'}
      </Text>
      <Button title="Go Back" onPress={() => navigation.navigate('Modules')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  energyZero: { fontSize: 20, color: 'red', textAlign: 'center', marginBottom: 10 },
  countdownText: { fontSize: 16, textAlign: 'center', color: '#555' },
});
