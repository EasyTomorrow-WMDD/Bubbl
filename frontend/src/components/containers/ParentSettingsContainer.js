import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Dimensions, Image, TouchableOpacity } from 'react-native';
import supabase from '../../services/supabase';
import axios from 'axios';
import BubblConfig from '../../config/BubblConfig';
import ProfileList from '../lists/ProfileList';
import BubblButton from '../forms/BubblButton';
import LoadProfileInfo from '../../utils/LoadProfileInfo';
import LogoutUser from '../../utils/LogoutUser';
import { profileStyles } from '../../styles/ProfileStyles';
import { parentStyles } from '../../styles/BubblParentMainStyles';
import { fontStyles } from '../../styles/BubblFontStyles';
import BubblColors from '../../styles/BubblColors';
import addButtonIcon from '../../assets/icons/add_button.png';


// ============================================================================
// ParentSettingsContainer Component
const ParentSettingsContainer = ( {navigation} ) => {

  // State variables to hold parent and child profiles + current user info
  const [parentProfiles, setParentProfiles] = useState([]);
  const [childProfiles, setChildProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserType, setCurrentUserType] = useState(null);
  const [accountOwnerId, setAccountOwnerId] = useState(null);

  const screenHeight = Dimensions.get('window').height; // Get the screen height
  
  // ----------------------------------------------------------------
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

  // ----------------------------------------------------------------
  // Method to logout 
  const handleLogout = async () => {
    const success = await LogoutUser(navigation);
    if (success) {
      console.log('[INFO] User logged out successfully');
    } else {
      console.error('[ERROR] Failed to log out user');
    }
  };

  // ----------------------------------------------------------------
  // Render the temporary settings screen    
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
        <Text style={[fontStyles.display2, parentStyles.parentChildSelectionHeader]}>Settings</Text>
        <Text style={[fontStyles.bodyDefault, parentStyles.parentChildSelectionSubHeading, {marginBottom:12}]}>Add account</Text>

        {/* Profile Lists (Parents) */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 }}>
          <Text style={[fontStyles.heading1, profileStyles.subheading]}>Parents (Guardians)</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddProfile', { profile_type: 'parent' })}>
            <Image source={addButtonIcon} style={profileStyles.addIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        <ProfileList 
          profiles={parentProfiles} 
          type="parent" 
          navigation={navigation} 
          showAddCard={false} 
          loading={loading}
        />

        {/* Profile Lists (Children) */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 }}>
          <Text style={[fontStyles.heading1, profileStyles.subheading, {textAlign:'center'}]}>Child(ren)</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddProfile', { profile_type: 'kid' })}>
            <Image source={addButtonIcon} style={profileStyles.addIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        <ProfileList 
          profiles={childProfiles} 
          type="kid" 
          navigation={navigation} 
          showAddCard={true}
          loading={loading}
        />

      </View>


    </>
  );

};

export default ParentSettingsContainer;
