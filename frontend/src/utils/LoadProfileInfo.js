import AsyncStorage from '@react-native-async-storage/async-storage';

// ==========================================================================
// LoadProfileInfo utility method
// A utility function to load user profile information from AsyncStorage
// Returns an object with nickname, user_id, and avatar_id (if available)
//
// Example usage:
// import { useEffect, useState } from 'react';
// import LoadProfileInfo from '../../utils/LoadProfileInfo';
// useEffect(() => {
//   const fetchProfile = async () => {
//     const profile = await LoadProfileInfo();
//     setNickname(profile.nickname);
//     setUserId(profile.user_id);
//     setAvatarId(profile.avatar_id);
//   };
//   fetchProfile();
// }, []);
//
const LoadProfileInfo = async () => {
  try {
    const nickname = await AsyncStorage.getItem('selected_user_nickname');
    const user_id = await AsyncStorage.getItem('selected_user_id');
    const avatar_id = await AsyncStorage.getItem('selected_avatar_id'); // optional, if stored
    return {
      nickname: nickname || null,
      user_id: user_id || null,
      avatar_id: avatar_id || null,
    };
  } catch (error) {
    console.error('[LoadProfileInfo] Failed to load profile from AsyncStorage:', error);
    return {
      nickname: null,
      user_id: null,
      avatar_id: null,
    };
  }
};

export default LoadProfileInfo;
