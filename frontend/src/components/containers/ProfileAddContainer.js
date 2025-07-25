import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import supabase from '../../services/supabase';
import BubblConfig from '../../config/BubblConfig';
import { globalStyles } from '../../styles/BubblStyles';
import PageHeading from '../layout/PageHeading';
import BubblTextInput from '../forms/BubblTextInput';
import BubblDatePicker from '../forms/BubblDatePicker';
import BubblButton from '../forms/BubblButton';
import BubblAvatarPicker from '../forms/BubblAvatarPicker';
import { fontStyles } from '../../styles/BubblFontStyles';


const ProfileAddContainer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { profile_type } = route.params;

  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [avatarId, setAvatarId] = useState('avatar01');
  const [dob, setDob] = useState(null);

  // ==========================================================================
  // Method to validate the form inputs
  const validate = () => {
    let valid = true;
    if (!nickname.trim()) {
      setNicknameError('User nickname is required');
      valid = false;
    } else {
      setNicknameError('');
    }
    return valid;
  };

  // ==========================================================================
  // Method to handle the profile creation process
  const handleCreate = async () => {
    if (!validate()) return;

    try {
      // Get the current user's session to retrieve access token
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const accessToken = session?.access_token;
      
      // Set payload for profile creation
      const payload = {
        user_auth_id: null,
        user_access_type: 'sub',
        user_type: profile_type,
        user_nickname: nickname,
        user_dob: dob,
        avatar_id: avatarId,
      };

      // Make API call to add profile
      const response = await axios.post(`${BubblConfig.BACKEND_URL}/api/users/addProfile`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // If registration is successful, navigate back to Profile
      if (response.data?.user) {
        navigation.replace('Profile');
      } else {
        console.error('[ERROR][Add Profile]Unexpected failure occurred.');
      }
    } catch (err) {
      console.error('[ERROR][Add Profile] Error registering user:', err);
    }      
  };


  // ==========================================================================
  // Render the add profile screen  
  return (
    <View style={globalStyles.container}>

      {/* Heading Row */}
      <PageHeading
        title={profile_type === 'parent' ? 'Add parent profile' : 'Add child profile'} 
        onBackPress={() => navigation.goBack()} 
      />

      {/* Form area */}
      <View style={globalStyles.formContainer}>

        {/* Nickname field */}
        <BubblTextInput
          label="Your nickname"
          placeholder="Enter your nickname"
          value={nickname}
          onChangeText={setNickname}
          error={nicknameError}
        />

        {/* Your avatar */}
        <Text style={[fontStyles.tagline, globalStyles.label]}>Choose your avatar</Text>
        <BubblAvatarPicker
          currentAvatarId={avatarId}
          onChange={setAvatarId}
        />

        {/* Date of Birth */}
        {/* <BubblDatePicker
          label="Your birth date"
          value={dob}
          onChange={setDob}
        /> */}

        {/* Button to proceed with profile creation */}
        <BubblButton
          label="Create Profile"
          onPress={handleCreate}
        />

      </View>

    </View>
  );
};

export default ProfileAddContainer;
