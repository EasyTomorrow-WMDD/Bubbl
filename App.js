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
import ChildMoodScreen from './frontend/src/screens/ChildMoodScreen';
import ChildMoodDrawingScreen from './frontend/src/screens/ChildMoodDrawingScreen';
import ChildMoodDrawingConfirmationScreen from './frontend/src/screens/ChildMoodDrawingConfirmationScreen';
import ChildHome from './frontend/src/screens/child_homeScreen';
import TopicContainer from './frontend/src/components/containers/TopicContainer';
import InventoryScreen from './frontend/src/screens/InventoryScreen';
import TopicComplete from './frontend/src/screens/TopicComplete';
import { ChildProvider } from './frontend/src/context/ChildContext';
import TemporaryMainContainer from './frontend/src/components/containers/TemporaryMainContainer';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <SafeAreaView style={globalStyles.safeArea}>
      <ChildProvider>
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
          <Stack.Screen name="ChildMood" component={ChildMoodScreen} />
          <Stack.Screen name="ChildDrawing" component={ChildMoodDrawingScreen} />
          <Stack.Screen name="ChildDrawingConfirmation" component={ChildMoodDrawingConfirmationScreen} />
          <Stack.Screen name="TopicScreen" component={TopicContainer} />
          <Stack.Screen name="Modules" component={TemporaryMainContainer} />
          <Stack.Screen name="TopicComplete" component={TopicComplete} />
          <Stack.Screen name="InventoryScreen" component={InventoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ChildProvider>
    // </SafeAreaView>
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
