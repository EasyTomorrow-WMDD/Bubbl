import { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import supabase from '../../services/supabase'; 
import { globalStyles } from '../../styles/BubblStyles';
import { fontStyles } from '../../styles/BubblFontStyles';
import { profileStyles } from '../../styles/ProfileStyles';
import BubblColors from '../../styles/BubblColors';
// Import components
import PageHeading from '../layout/PageHeading';
import BubblTextInput from '../forms/BubblTextInput';
import BubblPasswordInput from '../forms/BubblPasswordInput';
import BubblButton from '../forms/BubblButton';

const AuthSignupScreen = ({ navigation }) => {

  // State variables for form inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // State variable for form errors
  const [errors, setErrors] = useState({});

  // Method to validate form inputs and handle signup
  const validate = async () => {

    // Run validation checks
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'User name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (!confirmPassword) newErrors.confirmPassword = 'Password is required';
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // If there are any validation errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no validation errors, proceed with signup
    console.log('[INFO][Signup] Initiating signup..');
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      if (error) {
        console.log('[ERROR][Signup] Error:', error.message);
        if (error.message.includes('already registered')) {
          newErrors.email = 'Email is already used by another user';
        } else {
          Alert.alert('Signup error', error.message);
        }
        setErrors(newErrors);
        return;
      }
      
    } catch (e) {
      console.log('[ERROR][Signup]Error during signup:', e);
      Alert.alert('Signup error', e.message);
      return;
    }

    console.log('[INFO][Signup] Signup completed successfully! Moving to onboarding...');
    
    navigation.replace('Onboarding');
  };

  // ==========================================================================
  // Render the signup screen
  return (
    <View style={globalStyles.container}>

      {/* Heading Row */}
      <PageHeading title="Create account" onBackPress={() => navigation.replace('Welcome')} />

      {/* Main area */}
      <ScrollView style={globalStyles.formContainer}>
      {/* <View style={globalStyles.formContainer}> */}

        {/* User Name */}
        <BubblTextInput
          label="User Name"
          placeholder="Enter your name"
          value={username}
          onChangeText={setUsername}
          error={errors.username}
        />

        {/* Email */}
        <BubblTextInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          error={errors.email}
        />

        {/* Password */}
        <BubblPasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
        />

        {/* Notes on the password */}
        <Text style={[fontStyles.bodyDefault, globalStyles.passwordNote]}>
          Your password must have the following: {'\n'}
          {'\u2022'} 6 character minimum{'\n'}
          {'\u2022'} 1 uppercase letter{'\n'}
          {'\u2022'} 1 number{'\n'}
          {'\u2022'} 1 special character (!@#$%+-)
        </Text>

        {/* Confirm Password */}
        <BubblPasswordInput
          label="Confirm Password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={errors.confirmPassword}
        />

        {/* Create Account Button */}
        <BubblButton
          label="Create Account"
          onPress={validate}
        />

        {/* Disclaimer */}
        <Text style={[fontStyles.bodyDefault, globalStyles.disclaimer]}>
          By continuing, you agree to our Privacy & Cookie Policy and Terms & Conditions
        </Text>

      </ScrollView>
    </View>
  );
}

export default AuthSignupScreen;
