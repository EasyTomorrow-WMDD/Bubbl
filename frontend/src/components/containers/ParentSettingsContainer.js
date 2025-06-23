import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../../services/supabase';
import { globalStyles } from '../../styles/BubblStyles';
import BubblButton from '../forms/BubblButton';
import LoadProfileInfo from '../../utils/LoadProfileInfo';
import LogoutUser from '../../utils/LogoutUser';

const ParentSettingsContainer = ( {navigation} ) => {
  // State variables to hold profile information
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const [avatarId, setAvatarId] = useState(null); // Optional, if stored

  // ==========================================================================
  // Load profile from AsyncStorage on component mount.
  // These are set when the user selects a profile in the Profile screen.
  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await LoadProfileInfo();
      setNickname(profile.nickname);
      setUserId(profile.user_id);
      setAvatarId(profile.avatar_id);
    };
    fetchProfile();
  }, []);

  // ==========================================================================
  // Method to logout 
  const handleLogout = async () => {
    const success = await LogoutUser(navigation);
    if (success) {
      console.log('[INFO] User logged out successfully');
    } else {
      console.error('[ERROR] Failed to log out user');
    }
  };

  // ==========================================================================
  // Render the temporary settings screen    
  return (
    <View style={globalStyles.welcomeContainer}>

      {/* Welcome heading */}
      <Text style={globalStyles.heading}>Temporary Settings</Text>

      {/* Welcome heading */}
      <Text style={globalStyles.title}>Current profile is: {nickname}</Text>

      {/* Show user ID */}
      <Text style={globalStyles.title}>user_id of the profile is: {userId}</Text>

      {/* Logout */}
      <BubblButton 
        label="Logout" 
        onPress={handleLogout}
        style={{ marginTop: 12, backgroundColor: 'red' }}
      />

    </View>
  );
};

export default ParentSettingsContainer;
