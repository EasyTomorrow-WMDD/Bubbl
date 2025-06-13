import { useState, useEffect } from 'react';
import { AppState } from 'react-native';

import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import supabase from '../lib/supabase';
import * as Linking from 'expo-linking';  // Import Linking to handle redirects for Google OAuth
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

const Page1 = ({ navigation }) => {
  // State variables for create account
  const [createEmail, setCreateEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');

  // State variables for login  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Use navigation hook to navigate between screens
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        console.log('Session detected, redirecting to Page2');
        navigation.navigate('Page2');
      }
    };

    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        checkSession(); // check again when user returns from browser
      }
    });

    return () => subscription.remove();
  }, []);



  // --------------------------------------------------------------------------
  // Simple method to handle user sign up
  const handleSignUp = async () => {
    if (!createEmail || !createPassword) return Alert.alert('Error', 'Please enter email and password');

    // Call Supabase signUp method
    // TODO: In actual app, we should do validation of fields + use state to show loading state and disable button
    const { error } = await supabase.auth.signUp({
      email: createEmail,
      password: createPassword,
    });
    if (error) {
      // if unsuccessful, show error message
      Alert.alert('Sign Up Failed', error.message);
    }
    else {
      Alert.alert('Success', 'New user created!');
      setCreateEmail('');
      setCreatePassword('');
    }
  };

  // --------------------------------------------------------------------------
  // Simple method to handle user login
  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) return Alert.alert('Error', 'Please enter login credentials');

    // Call Supabase signIn method
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    if (error) {
      Alert.alert('Login Failed', 'Incorrect credentials');
    } else {
      navigation.navigate('Page2');
    }
  };

  // --------------------------------------------------------------------------
  // Simple method to handle Google login
  const handleGoogleLogin = async () => {
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: 'authpoc',
      path: 'login-callback',
    });

    console.log('Redirect URI:', redirectUri);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUri,
      },
    });

    if (error) {
      console.log('OAuth error:', error.message);
      return;
    }

    const authUrl = data?.url;

    if (authUrl) {
      console.log('Opening browser for:', authUrl);

      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);

      console.log('AuthSession result:', result);

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
            console.log('Failed to set session:', error.message);
          } else {
            console.log('Session restored:', data);
          }
        } else {
          console.log('Tokens not found in URL');
        }
      }
    }
  };


// --------------------------------------------------------------------------
// Test method to open a Google OAuth session
const testGoogleOAuth = async () => {
  const authUrl = 'https://google.com'; // any safe link

  try {
    const result = await WebBrowser.openAuthSessionAsync(authUrl);

    console.log('Test result:', result);
  } catch (e) {
    console.log('Test error:', e);
    //console.log('AuthSession:', AuthSession);

  }
};


  // --------------------------------------------------------------------------
  // Render the UI for Page1
  return (
    <View style={styles.container}>

      {/* Create account */}
      <Text style={styles.label}>Create account</Text>
      <TextInput style={styles.input} placeholder="Email" onChangeText={setCreateEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setCreatePassword} />
      <Button title="Create" onPress={handleSignUp} />

      {/* Login with ID / password */}
      <Text style={styles.label}>Login with ID</Text>
      <TextInput style={styles.input} placeholder="Email" onChangeText={setLoginEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setLoginPassword} />
      <Button title="Login" onPress={handleLogin} />

      {/* Login with Google */}
      <Text style={styles.label}>Login with Google</Text>
      <Button title="Google" onPress={handleGoogleLogin} />

      {/* Just for test purpose - we will see what happens if we navigate to a restricted area */}
      <Text style={styles.label}>Go to restricted area</Text>
      <Button title="Go to Page 2" onPress={() => navigation.navigate('Page2')} />

      <Text style={styles.label}>Browser Test</Text>
        <Button title="Test Browser" onPress={testGoogleOAuth} />

    </View>
  );
};

export default Page1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
  },
});
