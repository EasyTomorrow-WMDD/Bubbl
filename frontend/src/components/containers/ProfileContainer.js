import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import supabase from '../../services/supabase';
import axios from 'axios';
import BubblConfig from '../../config/BubblConfig';
import { globalStyles } from '../../styles/BubblStyles';
import PageHeading from '../layout/PageHeading';
import ProfileList from '../lists/ProfileList';

const ProfileContainer = ({ navigation }) => {

  // State variables to hold parent and child profiles + current user info
  const [parentProfiles, setParentProfiles] = useState([]);
  const [childProfiles, setChildProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserType, setCurrentUserType] = useState(null);
  const [accountOwnerId, setAccountOwnerId] = useState(null);

  // Fetch profiles from the backend API on load
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        // Get the current user's session to retrieve access token
        const {
          data: { session },
        } = await supabase.auth.getSession();

        // Call the backend API to get user profiles associated with the current user
        const response = await axios.get(`${BubblConfig.BACKEND_URL}/api/users/profiles`, {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });

        // Set parent and child profiles from the response
        setParentProfiles(response.data.parents || []);
        setChildProfiles(response.data.children || []);
        setCurrentUserId(response.data.current_user_id);
        setCurrentUserType(response.data.current_user_type);
        setAccountOwnerId(response.data.account_owner_id);

        // await AsyncStorage.setItem('account_id', response.data.account_id);

      } catch (err) {
        console.error('[ERROR][Profile] Failed to load profiles:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;
  

  // ==========================================================================
  // Render the profile screen  
  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer}>

      {/* Heading Row */}
      <PageHeading title="Who is using Bubbl?" onBackPress={null} />

      {/* Profile Lists (Parents) */}
      <Text style={globalStyles.subheading}>Parents (Guardians)</Text>
      <ProfileList 
        profiles={parentProfiles} 
        type="parent" 
        navigation={navigation} 
        showAddCard={currentUserId === accountOwnerId} 
      />

      {/* Profile Lists (Children) */}
      <Text style={globalStyles.subheading}>Child(ren)</Text>
      <ProfileList 
        profiles={childProfiles} 
        type="kid" 
        navigation={navigation} 
        showAddCard={currentUserType === 'parent'}
      />

    </ScrollView>
  );
};

export default ProfileContainer;
