import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../../styles/BubblStyles';

const ProfileCard = ({ profile, type, navigation }) => {

  // ==========================================================================
  // Method to store selected profile in AsyncStorage (user_id, user_nickname, avatar_id)
  const storeProfile = async () => {
    try {
      await AsyncStorage.setItem('selected_user_id', profile.user_id);
      await AsyncStorage.setItem('selected_user_nickname', profile.user_nickname);
      await AsyncStorage.setItem('selected_avatar_id', profile.avatar_id ?? '');
      await AsyncStorage.setItem('selected_account_id', profile.account_id);

      console.log('[INFO][ProfileCard] Stored profile:', {
        user_id: profile.user_id,
        account_id: profile.account_id,
      });

    } catch (err) {
      console.error('[ERROR][ProfileCard] Failed to store profile:', err);
    }
  };

  // ==========================================================================
  // Method to handle profile card press
  const handlePress = async () => {
    if (type === 'parent') {
      const authResult = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to continue',
      });
      if (!authResult.success) return;
    }

    await storeProfile(); // Store the selected profile in AsyncStorage
    console.log('[INFO][ProfileCard] Profile selected:', profile.user_nickname);
    navigation.replace(type === 'parent' ? 'ParentMain' : 'ChildMain');
  };

  // ==========================================================================
  // Render the profile card
  return (
    <TouchableOpacity onPress={handlePress} style={globalStyles.card}>
      <View style={globalStyles.avatarPlaceholder} />
      <Text style={globalStyles.nickname}>{profile.user_nickname}</Text>
    </TouchableOpacity>
  );
};

export default ProfileCard;
