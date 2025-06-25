import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import supabase from '../../services/supabase';
import BubblConfig from '../../config/BubblConfig';
import axios from 'axios';
import ProfileList from '../lists/ProfileList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ParentChildSelectionContainer = ({ navigation }) => {
  const [childProfiles, setChildProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        // Step 1: Get the current user's session to retrieve access token
        const {
          data: { session },
        } = await supabase.auth.getSession();

        // Step 2: Call the backend API to get child profiles associated with the authenticated user
        const response = await axios.get(`${BubblConfig.BACKEND_URL}/api/users/getChildProfiles`, {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });

        // Step 3: Set the child profiles from the response
        const children = response.data.children || [];
        // console.log('[DEBUG][ParentChildSelectionContainer] Fetched child profiles:', children);
        setChildProfiles(children);

      } catch (error) {
        console.error('[ERROR][ParentChildSelectionContainer] Failed to fetch child profiles:', error);
      }
    };
    fetchProfiles();
  }, []);

  const onCardPress = async (childUserId, childUserNickname, childUserAvatar) => {
    // console.log('[DEBUG][ParentChildSelectionContainer] Card pressed:', { childUserId, childUserNickname,childUserAvatar, }); 
    try {
      // Store selected child profile in AsyncStorage
      await AsyncStorage.setItem('selected_child_user_id', childUserId);
      await AsyncStorage.setItem('selected_child_nickname', childUserNickname);
      await AsyncStorage.setItem('selected_child_avatar', childUserAvatar || '');
      // console.log('[INFO][ParentChildSelectionContainer] Stored selected child profile:', { childUserId, childUserNickname, childUserAvatar, });
      // Navigate to the ParentChildProgressContainer
      navigation.navigate('ParentChildProgress');
    } catch (error) {
      console.error('[ERROR][ParentChildSelectionContainer] Failed to store selected child profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Child Progress</Text>
      <Text style={styles.subHeading}>Child account</Text>
      <ProfileList
        profiles={childProfiles}
        userType="kid"
        onCardPress={onCardPress}
        showAddCard={false}
      />
    </View>
  );
};

export default ParentChildSelectionContainer;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 12 },
  subHeading: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
});

