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
import ProfileAddScreen from './frontend/src/screens/ProfileAddScreen';
import ParentLayout from './frontend/src/components/layout/ParentLayout';
import ParentMainScreen from './frontend/src/screens/ParentMainScreen';
import ParentStoryScreen from './frontend/src/screens/ParentStoryScreen';
import ParentChildProgressScreen from './frontend/src/screens/ParentChildProgressScreen';
import ParentSettingsScreen from './frontend/src/screens/ParentSettingsScreen';
import ParentNotificationsScreen from './frontend/src/screens/ParentNotificationsScreen';
import ChildMainScreen from './frontend/src/screens/ChildMainScreen';
import ChildMoodScreen from './frontend/src/screens/ChildMoodScreen';
import ChildMoodDrawingScreen from './frontend/src/screens/ChildMoodDrawingScreen';
import ChildMoodDrawingConfirmationScreen from './frontend/src/screens/ChildMoodDrawingConfirmationScreen';
import ChildHome from './frontend/src/screens/child_homeScreen';
import TopicContainer from './frontend/src/components/containers/TopicContainer';
import { ChildProvider } from './frontend/src/context/ChildContext';

import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import GameScreen from './src/components/GameScreen';
import GameOverScreen from './src/components/GameOverScreen';
import { PHRASES } from './src/constants/phrases';
import { styles } from './src/styles/styles';


const Stack = createNativeStackNavigator();

export default function App() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [score, setScore] = useState(0);

  const isGameEnd = currentPhraseIndex === PHRASES.length;
  const currentPhrase = PHRASES[currentPhraseIndex];

  const handleCorrectAnswer = () => {
    setScore((prevScore) => prevScore + 10);
  };

  const handleNextPhrase = () => {
    if (currentPhraseIndex < PHRASES.length) {
      setCurrentPhraseIndex((prevIndex) => prevIndex + 1);
    }
  };
  
  const handleRestart = () => {
    setCurrentPhraseIndex(0);
    setScore(0);
  };

  return (
    <ChildProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={AuthWelcomeScreen} />
          <Stack.Screen name="Login" component={AuthLoginScreen} />
          <Stack.Screen name="Signup" component={AuthSignupScreen} />
          <Stack.Screen name="Onboarding" component={AuthOnboardingScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="AddProfile" component={ProfileAddScreen} />
          <Stack.Screen name="ParentMain" component={ParentLayout} />
          <Stack.Screen name="ParentStory" component={ParentStoryScreen} />
          <Stack.Screen name="ParentMainScreen" component={ParentMainScreen} />
          <Stack.Screen name="ChildMain" component={ChildMainScreen} />
          <Stack.Screen name="ChildMood" component={ChildMoodScreen} />
          <Stack.Screen name="ChildDrawing" component={ChildMoodDrawingScreen} />
          <Stack.Screen name="ChildDrawingConfirmation" component={ChildMoodDrawingConfirmationScreen} />
          <Stack.Screen name="TopicScreen" component={TopicContainer} />
        </Stack.Navigator>
      </NavigationContainer>
    </ChildProvider>
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