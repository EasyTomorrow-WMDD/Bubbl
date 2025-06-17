import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../../services/supabase';
import { globalStyles } from '../../styles/BubblStyles';
import BubblButton from '../forms/BubblButton';

const TemporaryMainContainer = ( {navigation} ) => {
  // State variables to hold profile information
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');

  // ==========================================================================
  // Load profile from AsyncStorage on component mount.
  // These are set when the user selects a profile in the Profile screen.
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
  
  // ==========================================================================
  // Method to logout 
  const handleLogout = async () => {
    try {
      // Step 1: Clear AsyncStorage
      await AsyncStorage.clear();
      console.log('Cleared AsyncStorage');

      // Step 2: Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out from Supabase:', error.message);
        return;
      }

      // Step 3: Navigate to the Welcome screen
      navigation.replace('Welcome');
    } catch (err) {
      console.error('Unexpected error during logout:', err);
    }
  };

  // ==========================================================================
  // Render the temporary main screen    
  return (
    <View style={globalStyles.welcomeContainer}>

      {/* Welcome heading */}
      <Text style={globalStyles.heading}>Welcome {nickname}!</Text>

      {/* Show user ID */}
      <Text style={globalStyles.title}>The user_id of your profile is: {userId}</Text>

      {/* Back to profile */}
      <BubblButton 
        label="Back to profile" 
        onPress={() => navigation.replace('Profile')}
      />

      {/* Logout */}
      <BubblButton 
        label="Logout" 
        onPress={handleLogout}
        style={{ marginTop: 12, backgroundColor: 'red' }}
      />

    </View>
  );
};

export default TemporaryMainContainer;
