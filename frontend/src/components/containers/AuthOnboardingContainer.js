import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import supabase from '../../services/supabase';
import axios from 'axios';
import BubblConfig from '../../config/BubblConfig';
import { globalStyles } from '../../styles/BubblStyles';
import PageHeading from '../layout/PageHeading';
import BubblTextInput from '../forms/BubblTextInput';
import BubblDatePicker from '../forms/BubblDatePicker';
import BubblPicker from '../forms/BubblPicker';
import BubblButton from '../forms/BubblButton';
import BubblAvatarPicker from '../forms/BubblAvatarPicker';
import { profileStyles } from '../../styles/ProfileStyles';
import BubblColors from '../../styles/BubblColors';
import { fontStyles } from '../../styles/BubblFontStyles';

// ============================================================================
// AuthOnboardingContainer component
const AuthOnboardingContainer = ({ navigation }) => {

  // State variables for form inputs
  const [nickname, setNickname] = useState('');
  const [dob, setDob] = useState(null);
  const [avatar_id, setAvatarId] = useState('avatar01'); // Placeholder for avatar selection
  const [userType, setUserType] = useState('parent');
  const [isCreatingAccount, setIsCreatingAccount] = useState(true);
  // const [accountName, setAccountName] = useState('');
  const [accountName, setAccountName] = useState('dummy');  // temporary: set account name to dummy as we are not using it yet.
  const [invitationCode, setInvitationCode] = useState('');
  const [errors, setErrors] = useState({});


  // ----------------------------------------------------------------
  // Method to validate inputs and submit the form
  const validateAndSubmit = async () => {

    // temporary: set account name to user nickname
    if (isCreatingAccount) {
      setAccountName(nickname);
    }
    // Validate inputs, set errors if any. 
    const errors = {};
    if (!nickname.trim()) errors.nickname = 'Please enter a nickname';
    if (isCreatingAccount && !accountName.trim()) errors.accountName = 'Please enter account name';
    if (!isCreatingAccount && !invitationCode.trim()) errors.invitationCode = 'Please enter invitation code';
    console.log('[DEBUG][Onboarding] Validation errors:', errors);

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      // Get the current user's session to retrieve access token
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const accessToken = session?.access_token;
            // -- Add this
      console.log(`accessToken: ${accessToken}`);

      // Set payload for registration
      const payload = {
        nickname,
        dob,
        userType,
        avatar_id,
        isCreatingAccount,
        accountName,
        invitationCode,
      };

      // Make API call to register user
      const response = await axios.post(`${BubblConfig.BACKEND_URL}/api/users/registerUser`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // If registration is successful, navigate to Profile
      if (response.data.success) {
        navigation.replace('Profile');
      } else {
        console.error('[ERROR][Onboarding]Unexpected failure occurred.');
      }
    } catch (err) {
      console.error('[ERROR][Onboarding] Error registering user:', err);
    }
  };


  // ----------------------------------------------------------------
  // Render the onboarding screen
  return (
    <View style={profileStyles.OnboardingLayoutContainer}>

      {/* Status bar */}
      <StatusBar barStyle="dark-content" backgroundColor={BubblColors.BubblPurple950} />

      {/* Main area for parent page */}
      <ScrollView contentContainerStyle={globalStyles.scrollContainer}>

        {/* Heading Row */}
        <PageHeading title="Setup account" onBackPress={null} />

        {/* Form area */}
        <View style={globalStyles.formContainer}>

          {/* Your nickname */}
          <BubblTextInput
            label="Your nickname"
            placeholder="Enter your nickname"
            value={nickname}
            onChangeText={setNickname}
            error={errors.nickname}
          />

          {/* Your avatar */}
          <Text style={[fontStyles.tagline, globalStyles.label]}>Choose your avatar</Text>
          <BubblAvatarPicker
            currentAvatarId={avatar_id}
            onChange={setAvatarId}
          />

          {/* Date of Birth */}
          <BubblDatePicker
            label="Your birth date"
            value={dob}
            onChange={setDob}
          />

          {/* User Type */}
          {/* <BubblPicker
            label="User type"
            selectedValue={userType}
            onValueChange={setUserType}
            items={[
              { label: 'Parent', value: 'parent' },
              { label: 'Kid', value: 'kid' },
            ]}
          /> */}

          {/* Selection: New account creation or Joining existing account */}
          {/* <BubblPicker
            label="Are you creating a new account?"
            selectedValue={isCreatingAccount ? 'yes' : 'no'}
            onValueChange={(val) => setIsCreatingAccount(val === 'yes')}
            items={[
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' },
            ]}
          /> */}

          {/* Conditional rendering based on account creation choice */}
          {isCreatingAccount ? (
            <>
              {/* Account name for new account */}
              {/* <BubblTextInput
                label="Your account name"
                placeholder="Enter your account name"
                value={accountName}
                onChangeText={setAccountName}
                error={errors.accountName}
              /> */}
            </>
          ) : (
            <>
              {/* Invitation code to join existing account */}
              {/* <BubblTextInput
                label="Invitation code"
                placeholder="Enter invitation code"
                value={invitationCode}
                onChangeText={setInvitationCode}
                error={errors.invitationCode}
              /> */}
            </>
          )}

          {/* Button to proceed with account setup */}
          <BubblButton
            label="Setup Account"
            onPress={validateAndSubmit}
          />

        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={profileStyles.OnboardingLayoutBottomSafeArea} />
    </View>
  );
}

export default AuthOnboardingContainer;
