import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import supabase from '../../services/supabase';
import BubblConfig from '../../config/BubblConfig';
import * as Linking from 'expo-linking';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { globalStyles } from '../../styles/BubblStyles';
import PageHeading from '../layout/PageHeading';
import BubblTextInput from '../forms/BubblTextInput';
import BubblPasswordInput from '../forms/BubblPasswordInput';
import BubblButton from '../forms/BubblButton';
import DividerWithText from '../layout/DividerWithText';

const AuthLoginContainer = ({ navigation }) => {

  const isDev = process.env.NODE_ENV === 'development';
  const dummyUser = BubblConfig.DUMMY_USER_EMAIL || '';
  const dummyPassword = BubblConfig.DUMMY_USER_PASSWORD || '';

  // State variables for form inputs
  const [email, setEmail] = useState( isDev ? dummyUser : '');
  const [password, setPassword] = useState( isDev ? dummyPassword : '');
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  // ==========================================================================
  // Method to handle login with email and password
  const handleLogin = async () => {
    const newErrors = {};
    setAuthError('');
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // console.log('🔍 Supabase login result:', { data, error });

    if (error) {
      setErrors({ email: 'Login failed. Please check your Email and Password.', password: true });
      return;
    }

    // console.log('[INFO][Login] User logged in successfully:');

    // 🚀 Save session to AsyncStorage
    if (data.session) {
      // console.log('[INFO][Login] Saving session to AsyncStorage...');
      await AsyncStorage.setItem('supabaseSession', JSON.stringify(data.session));
    }

    // Navigate after login
    handleNavigation();
  };

  // ==========================================================================
  const handleGoogleLogin = async () => {

    const redirectUri = AuthSession.makeRedirectUri({
      scheme: 'bubbl',
      path: 'login-callback',
      preferLocalhost: true,
      isTripleSlashed: true,
      useProxy: true,
    });
    // const redirectUri = 'bubbl://login-callback/';

    console.log('[INFO][Login with Google] Redirect URI:', redirectUri);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUri,
      },
    });

    if (error) {
      console.log('[ERROR][Login with Google] OAuth error:', error.message);
      return;
    }

    const authUrl = data?.url;
    if (authUrl) {
      // console.log('[INFO][Login with Google] Opening browser for:', authUrl);
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);

      if (result.type === 'success' && result.url) {
        const params = new URLSearchParams(result.url.split('#')[1]);
        const access_token = params.get('access_token');
        const refresh_token = params.get('refresh_token');

        if (access_token && refresh_token) {
          const { data, error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (error) {
            console.log('[ERROR][Login with Google] Failed to set session:', error.message);
          } else {
            // console.log('[INFO][Login with Google] Session restored:', data);

            // 🚀 Save session
            if (data.session) {
              // console.log('[INFO][Login with Google] Saving session to AsyncStorage...');
              await AsyncStorage.setItem('supabaseSession', JSON.stringify(data.session));
            }

            handleNavigation();
          }
        } else {
          console.log('[ERROR][Login with Google] Tokens not found in URL');
        }
      }
    }
  };

  // ==========================================================================
  const handleNavigation = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      // console.log('[INFO][Login] Current session:', session);

      const accessToken = session?.access_token;

      // console.log('[INFO][Login] Access Token:', accessToken);
      
      // console.log(`[INFO][Login] Calling ${BubblConfig.BACKEND_URL}/api/users/exists`);

      const response = await axios.get(`${BubblConfig.BACKEND_URL}/api/users/exists`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const exists = response.data.exists;

      if (exists) {
        // console.log('[INFO][Login] User exists, navigating to ParentMainScreen');
        navigation.replace('Profile');
      } else {
        // console.log('[INFO][Login] New user, navigating to Onboarding');
        navigation.replace('Onboarding');
      }

    } catch (error) {
      console.error('[ERROR][Login] Failed to check user existence:', error);
      setAuthError('[ERROR][Login] Something went wrong. Please try again.');
    }
  };

  // ==========================================================================
  return (
    <View style={globalStyles.container}>

      <PageHeading title="Login" onBackPress={() => navigation.replace('Welcome')} />

      <View style={globalStyles.formContainer}>

        <BubblTextInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          error={errors.email}
        />

        <BubblPasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          error={errors.password && 'Password is required'}
        />

        <TouchableOpacity style={globalStyles.forgotContainer}>
          <Text style={globalStyles.forgotText}>Forgot your password?</Text>
        </TouchableOpacity>

        <BubblButton
          label="Login"
          onPress={handleLogin}
        />

        <DividerWithText text="or" />

        <BubblButton
          label="Login with Google"
          onPress={handleGoogleLogin}
        />

        <Text style={globalStyles.errorText}>{authError}</Text>
      </View>
    </View>
  );
};

export default AuthLoginContainer;