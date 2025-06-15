import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import supabase from '../services/supabase';

const ParentMainScreen = () => {
  const navigation = useNavigation();
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const loadProfileInfo = async () => {
      try {
        const storedNickname = await AsyncStorage.getItem('selected_user_nickname');
        const storedUserId = await AsyncStorage.getItem('selected_user_id');
        if (storedNickname) setNickname(storedNickname);
        if (storedUserId) setUserId(storedUserId);
      } catch (error) {
        console.error('Error loading profile info:', error);
      }
    };

    loadProfileInfo();
  }, []);

  const handleLogout = async () => {
    console.log('Logging out...');
    try {
      await AsyncStorage.clear();
      console.log('Cleared AsyncStorage');

      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out from Supabase:', error.message);
        return;
      }

      console.log('Signed out from Supabase');
      navigation.replace('Welcome');
    } catch (err) {
      console.error('Unexpected error during logout:', err);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome {nickname}!</Text>
      <Text style={styles.text}>Current profile id is: {userId}</Text>
      <Button title="Back to profile" onPress={() => navigation.replace('Profile')} />
      <View style={{ marginTop: 12 }}>
        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
};

export default ParentMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});
