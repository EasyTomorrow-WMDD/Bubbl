import AsyncStorage from '@react-native-async-storage/async-storage';

// ==========================================================================
// LoadChildInfo utility method
// A utility function to load the selected child profile information from AsyncStorage
// Returns an object with nickname, user_id, and avatar_id (if available)
//
// Example usage:
// import { useEffect, useState } from 'react';
// import LoadChildInfo from '../../utils/LoadChildInfo';
// useEffect(() => {
//   const fetchChildProfile = async () => {
//     const childProfile = await LoadChildInfo();
//     setNickname(childProfile.nickname);
//     setUserId(childProfile.user_id);
//     setAvatarId(childProfile.avatar_id);
//   };
//   fetchChildProfile();
// }, []);
//
const LoadChildInfo = async () => {
  try {
    const user_id = await AsyncStorage.getItem('selected_child_user_id');
    const nickname = await AsyncStorage.getItem('selected_child_nickname');
    const avatar_id = await AsyncStorage.getItem('selected_child_avatar'); // optional, if stored
    return {
      nickname: nickname || null,
      user_id: user_id || null,
      avatar_id: avatar_id || null,
    };
  } catch (error) {
    console.error('[LoadChildInfo] Failed to load child info from AsyncStorage:', error);
    return {
      nickname: null,
      user_id: null,
      avatar_id: null,
    };
  }
};

export default LoadChildInfo;
