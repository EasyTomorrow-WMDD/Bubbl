import React, { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';

const MAX_ENERGY = 3;

export default function EnergyTimer({ userId }) {
  // console.log('userId:', userId);

  const [energy, setEnergy] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const intervalRef = useRef(null);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const fetchEnergyStatus = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/energy/status`, {
        params: { user_id: userId },
      });
      const { user_energy, time_to_next_recharge_ms } = response.data;
      console.log('Backend response:', response.data);
      setEnergy(user_energy);
      setTimeLeft(user_energy < MAX_ENERGY ? time_to_next_recharge_ms : null);
    } catch (err) {
      console.error('Failed to fetch energy status:', err.message);
    }
  };

  useEffect(() => {
    fetchEnergyStatus();

    return () => clearInterval(intervalRef.current);
  }, [userId]);

  useEffect(() => {


    if (energy === null) return;

    if (energy >= MAX_ENERGY || timeLeft == null) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(intervalRef.current);
          fetchEnergyStatus();
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [energy, timeLeft]);

  if (!userId) return;
  return (
    <View>
      {energy < MAX_ENERGY && typeof timeLeft === 'number' && timeLeft > 0 ? (
        <View>
          <Text style={{color: 'white', fontSize: 20}}>Next refill in: </Text>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', textAlign:'center'}}>{formatTime(timeLeft)}</Text>
        </View>

      ) : null}

    </View>
  );
}
