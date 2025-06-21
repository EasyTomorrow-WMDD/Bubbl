import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import supabase from '../../services/supabase';
import BubblConfig from '../../config/BubblConfig';
import * as Linking from 'expo-linking';  // Import Linking to handle redirects for Google OAuth
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';
// Import styles
import { globalStyles } from '../../styles/BubblStyles';
// Import components
import PageHeading from '../layout/PageHeading';
import BubblTextInput from '../forms/BubblTextInput';
import BubblPasswordInput from '../forms/BubblPasswordInput';
import BubblButton from '../forms/BubblButton';
import DividerWithText from '../layout/DividerWithText';

const AuthLoginContainer = ({ navigation }) => {

  // State variables for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  // ==========================================================================
  // Method to handle login with email and password
  const handleLogin = async () => {

    // Run validation checks
    const newErrors = {};
    setAuthError('');
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    // If there are any validation errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no validation errors, proceed with login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log('🔍 Supabase login result:', { data, error });
    console.log('🔍 Supabase URL:', BubblConfig.SUPABASE_URL);
    console.log('🔍 Supabase KEY:', BubblConfig.SUPABASE_ANON_KEY?.slice(0, 10));


    // If there is an error during login, set the error message
    if (error) {
      setErrors({ email: 'Login failed. Please check your Email and Password.', password: true });
      return;
    }

    console.log('[INFO][Login] User logged in successfully:');

    // If login is successful, navigate to appropriate screen
    handleNavigation();

  };

  // ==========================================================================
  // Method to handle Google login
  const handleGoogleLogin = async () => {

    // redirectUri is the URL to which the user will be redirected after authentication.
    // The same is defined in the Redirect URLs section of the Supabase URL Configuration settings.
    //  - authpoc://login-callback
    //  - exp://*/--/login-callback
    // Also ensure that the Site URL in Supabase URL Configuration settings also matches the URL of expo app
    //  - exp://h9giymo-anonymous-8081.exp.direct
    //
    // Google Cloud settings:
    // https://console.cloud.google.com
    // Open project. 
    // View all products -> Management -> Google Auth Platform
    // View all clients -> OAuth 2.0 Client IDs
    // "Bubbl Supabase Web Auth" should have: 
    //  - Audience: External
    //  - Authorized redirect URIs: as provided by supabase e.g., https://abcdefghijklmnopqrstuvwxyz.supabase.co/auth/v1/callback
    //  - Client secret: as provided by supabase

    // 1. Define the redirect URI for the OAuth flow
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: 'authpoc',
      path: 'login-callback',
    });

    console.log('[INFO][Login with Google] Redirect URI:', redirectUri);

    // 2. Start the OAuth flow with Supabase -> it should build a URL for Google authentication
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

    // 3. If the data contains a URL, open it in the browser for user authentication
    // Once the user authenticates, Google will redirect them back to Supabase backend.
    // Supabase will receive the OAuth response from Google containing Google ID token and account information (email, name, etc.,)
    // At this point, a new user will be created in Supabase if it doesn't already exist in auth.users table.
    // Finally, Supabase will redirect the user back to the app using the redirect URI.
    const authUrl = data?.url;
    if (authUrl) {
      console.log('[INFO][Login with Google] Opening browser for:', authUrl);
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);

      // console.log('[Login with Google] AuthSession result:', result);
      if (result.type === 'success' && result.url) {
        // 4. If the authentication was successful, extract the access token and refresh token from the URL. 
        // The URL will contain the tokens in the fragment (after the #), e.g.,
        // authpoc://login-callback#access_token=xyz&refresh_token=abc&expires_in=3600
        // Note: Since Bubbl is not a web app, we need to process the token extraction manually from our end. 
        const params = new URLSearchParams(result.url.split('#')[1]);
        const access_token = params.get('access_token');
        const refresh_token = params.get('refresh_token');

        // 5. If tokens are found, set the session in Supabase
        // i.e., we are ready to use the tokens in the app session. 
        if (access_token && refresh_token) {
          const { data, error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (error) {
            console.log('[ERROR][Login with Google] Failed to set session:', error.message);
          } else {
            console.log('[INFO][Login with Google] Session restored:', data);

            // If login is successful, navigate to appropriate screen
            handleNavigation();

          }
        } else {
          console.log('[ERROR][Login with Google] Tokens not found in URL');
        }
      }
    }
  };

  // ==========================================================================
  // Method to handle navigation after login
  const handleNavigation = async () => {

    try {

      const {
        data: { session },
      } = await supabase.auth.getSession();

      const accessToken = session?.access_token;

      console.log('[INFO][Login] Access Token:', accessToken);
      console.log(`[INFO][Login] Calling ${BubblConfig.BACKEND_URL}/api/users/exists`)

      const response = await axios.get(`${BubblConfig.BACKEND_URL}/api/users/exists`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const exists = response.data.exists;

      if (exists) {
        console.log('[INFO][Login] User exists, navigating to Profile');
        navigation.replace('Profile');
      } else {
        console.log('[INFO][Login] New user, navigating to Onboarding');
        navigation.replace('Onboarding');
      }
    } catch (error) {
      console.error('[ERROR][Login] Failed to check user existence:', error);
      setAuthError('[ERROR][Login] Something went wrong. Please try again.');
    }

  };


  // ==========================================================================
  // Render the login screen  
  return (
    <View style={globalStyles.container}>

      {/* Heading Row */}
      <PageHeading title="Login" onBackPress={() => navigation.replace('Welcome')} />

      {/* Form area */}
      <View style={globalStyles.formContainer}>

        {/* Email field */}
        <BubblTextInput
          label="Email"
          placeholder="Enter your email, e.g., email123@bubbl.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          error={errors.email}
        />

        {/* Password field */}
        <BubblPasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          error={errors.password && 'Password is required'}
        />

        {/* Forgot Password link - currently inactive */}
        <TouchableOpacity style={globalStyles.forgotContainer}>
          <Text style={globalStyles.forgotText}>Forgot your password?</Text>
        </TouchableOpacity>

        {/* Login button */}
        <BubblButton
          label="Login"
          onPress={handleLogin}
        />

        {/* Divider with text */}
        <DividerWithText text="or" />

        {/* Login with Google button */}
        <BubblButton
          label="Login with Google"
          onPress={handleGoogleLogin}
        />

        {/* Login with Apple button (currently inactive) */}
        <BubblButton
          label="Login with Apple"
          onPress={() => { }}
        />

        {/* Error message for authentication issues */}
        <Text style={globalStyles.errorText}>{authError}</Text>
      </View>
    </View>
  );
}

export default AuthLoginContainer;




