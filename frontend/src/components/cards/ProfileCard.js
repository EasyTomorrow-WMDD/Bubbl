import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../../styles/BubblStyles';
import { profileStyles } from '../../styles/ProfileStyles';
import { avatarImages } from '../../utils/AvatarMappings';
import LogChildMilestone from '../../utils/LogChildMilestone';

const ProfileCard = ({ profile, type, onPress, navigation }) => {

  // Get avatar image full path based on the avatar_id
  const avatarSource = avatarImages[profile.avatar_id] || avatarImages['avatar01'];

  // ==========================================================================
  // Method to store selected profile in AsyncStorage (user_id, user_nickname, avatar_id)
  const storeProfile = async () => {
    try {
      await AsyncStorage.setItem('selected_user_id', profile.user_id);
      await AsyncStorage.setItem('selected_user_nickname', profile.user_nickname);
      await AsyncStorage.setItem('selected_avatar_id', profile.avatar_id ?? 'avatar01');
      await AsyncStorage.setItem('selected_account_id', profile.account_id);

      // console.log('[INFO][ProfileCard] Stored profile:', {
      //   user_id: profile.user_id,
      //   account_id: profile.account_id,
      // });

    } catch (err) {
      console.error('[ERROR][ProfileCard] Failed to store profile:', err);
    }
  };

  // ==========================================================================
  // Method to handle profile card press
  const handlePress = async () => {
    // If a custom handler is provided, call it. (e.g., for child progress profile selection) 
    if (typeof onPress === 'function') {
      // console.log('[DUMMY][ProfileCard] Custom onPress handler called');
      return onPress();
    }
    // Otherwise, proceed with the default handler (navigation to parent or child main screen)
    if (type === 'parent') {
      const authResult = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to continue',
      });
      if (!authResult.success) return;
    }

    await storeProfile(); // Store the selected profile in AsyncStorage
    // console.log('[INFO][ProfileCard] Profile selected:', profile.user_nickname);
    
    navigation.replace(type === 'parent' ? 'ParentMain' : 'ChildMain');
  };

  // ==========================================================================
  // Render the profile card
  return (
    <TouchableOpacity onPress={handlePress} style={profileStyles.card}>
      <Image source={avatarSource} style={profileStyles.avatarImage} />
      <Text style={profileStyles.nickname}>{profile.user_nickname}</Text>
    </TouchableOpacity>
  );
};

export default ProfileCard;
