import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import supabase from '../../services/supabase';
import BubblConfig from '../../config/BubblConfig';
import axios from 'axios';
import ProfileList from '../lists/ProfileList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parentStyles } from '../../styles/BubblParentMainStyles';
import { fontStyles } from '../../styles/BubblFontStyles';
import BubblColors from '../../styles/BubblColors';


// ============================================================================
// ParentChildSelectionContainer Component
const ParentChildSelectionContainer = ({ navigation }) => {
  const [childProfiles, setChildProfiles] = useState([]);

  const screenHeight = Dimensions.get('window').height; // Get the screen height

  // ----------------------------------------------------------------
  // Fetch child profiles associated with the authenticated user
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

  // ----------------------------------------------------------------
  // Handle card press to store selected child profile and navigate
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

  // ----------------------------------------------------------------
  // Render the child profiles list
  return (
    <>
      {/* Workaround to get the purple background behind main container */}
      <View style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: BubblColors.BubblPurple500,
        height: screenHeight * 0.2,
      }} />

      {/* Main contents */}
      <View style={parentStyles.parentChildSelectionContainer}>

        {/* Heading */}
        <Text style={[fontStyles.display2, parentStyles.parentChildSelectionHeader]}>Child Progress</Text>
        <Text style={[fontStyles.bodyDefault, parentStyles.parentChildSelectionSubHeading]}>See how each child is doing in their learning journey.</Text>

        {/* Profile list */}
        <ProfileList
          profiles={childProfiles}
          userType="kid"
          onCardPress={onCardPress}
          showAddCard={false}
        />
      </View>
      
    </>
  );
};

export default ParentChildSelectionContainer;

