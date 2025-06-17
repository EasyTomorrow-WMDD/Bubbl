import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { globalStyles } from './frontend/src/styles/BubblStyles';

import AuthWelcomeScreen from './frontend/src/screens/AuthWelcomeScreen';
import AuthLoginScreen from './frontend/src/screens/AuthLoginScreen';
import AuthSignupScreen from './frontend/src/screens/AuthSignupScreen';
import AuthOnboardingScreen from './frontend/src/screens/AuthOnboardingScreen';
import ProfileScreen from './frontend/src/screens/ProfileScreen';
import ParentMainScreen from './frontend/src/screens/ParentMainScreen';
import ChildMainScreen from './frontend/src/screens/ChildMainScreen';
import ProfileAddScreen from './frontend/src/screens/ProfileAddScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={AuthWelcomeScreen} />
          <Stack.Screen name="Login" component={AuthLoginScreen} />
          <Stack.Screen name="Signup" component={AuthSignupScreen} />
          <Stack.Screen name="Onboarding" component={AuthOnboardingScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="AddProfile" component={ProfileAddScreen} />
          <Stack.Screen name="ParentMain" component={ParentMainScreen} />
          <Stack.Screen name="ChildMain" component={ChildMainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
