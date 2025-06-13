import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import supabase from '../services/supabase'; 

export default function SignupScreen({ navigation }) {
  // State variables for form inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});

const validate = async () => {
  const newErrors = {};

  if (!username.trim()) newErrors.username = 'User name is required';
  if (!email.trim()) newErrors.email = 'Email is required';
  if (!password) newErrors.password = 'Password is required';
  if (!confirmPassword) newErrors.confirmPassword = 'Password is required';

  if (password && confirmPassword && password !== confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match';
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  // console.log('supabase object:', supabase);
  console.log('calling signUp!!');
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    if (error) {
      console.log('Signup error:', error.message);
      if (error.message.includes('already registered')) {
        newErrors.email = 'Email is already used by another user';
      } else {
        Alert.alert('Signup error', error.message);
      }
      setErrors(newErrors);
      return;
    }
    
  } catch (e) {
    console.log('Error during signup:', e);
    Alert.alert('Signup error', e.message);
    return;
  }

  console.log('done!!');

  navigation.replace('Onboarding');
};


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create account</Text>

      <Text style={styles.label}>User Name</Text>
      <TextInput
        style={[styles.input, errors.username && styles.errorInput]}
        placeholder="Enter your name"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.errorText}>{errors.username}</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, errors.email && styles.errorInput]}
        placeholder="Enter your email, e.g., email123@bubbl.com"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text style={styles.errorText}>{errors.email}</Text>

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={[styles.input, errors.password && styles.errorInput]}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.errorText}>{errors.password}</Text>

      <Text style={styles.passwordNote}>
        Your password must have the following: {'\n'}
        - 6 character minimum{'\n'}
        - 1 uppercase letter{'\n'}
        - 1 number{'\n'}
        - 1 special character (!@#$%+-)
      </Text>

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={[styles.input, errors.confirmPassword && styles.errorInput]}
        placeholder="Re-enter password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Text style={styles.errorText}>{errors.confirmPassword}</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="Create Account" onPress={validate} />
      </View>

      <Text style={styles.disclaimer}>
        By continuing, you agree to our Privacy & Cookie Policy and Terms & Conditions
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500'
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
  },
  passwordNote: {
    marginTop: 10,
    fontSize: 12,
    color: '#333',
    fontStyle: 'italic'
  },
  disclaimer: {
    marginTop: 20,
    fontSize: 12,
    color: '#555',
    textAlign: 'center'
  }
});
