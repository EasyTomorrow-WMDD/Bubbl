import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useCallback, useEffect, useState } from 'react';
// import * as SplashScreen from 'expo-splash-screen';
import { TabProvider } from './frontend/src/utils/TabContext';
import * as Font from 'expo-font';

// Import screens and components
import AuthWelcomeScreen from './frontend/src/screens/AuthWelcomeScreen';
import AuthLoginScreen from './frontend/src/screens/AuthLoginScreen';
import AuthSignupScreen from './frontend/src/screens/AuthSignupScreen';
import AuthOnboardingScreen from './frontend/src/screens/AuthOnboardingScreen';
import ProfileScreen from './frontend/src/screens/ProfileScreen';
import ProfileAddScreen from './frontend/src/screens/ProfileAddScreen';
import ParentLayout from './frontend/src/components/layout/ParentLayout';
import ParentStoryScreen from './frontend/src/screens/ParentStoryScreen';
import ParentChildProgressScreen from './frontend/src/screens/ParentChildProgressScreen';
import ParentSelectedDrawingScreen from './frontend/src/screens/ParentSelectedDrawingScreen';
import ChildMainScreen from './frontend/src/screens/ChildMainScreen';
import ChildMoodScreen from './frontend/src/screens/ChildMoodScreen';
import ChildMoodDrawingScreen from './frontend/src/screens/ChildMoodDrawingScreen';
import ChildDrawingConfirmation from './frontend/src/screens/ChildMoodDrawingConfirmationScreen';
import TopicContainer from './frontend/src/components/containers/TopicContainer';
import InventoryScreen from './frontend/src/screens/InventoryScreen';
import TopicComplete from './frontend/src/screens/TopicComplete';
import BadgesScreen from './frontend/src/screens/BadgesScreen';
import { ChildProvider } from './frontend/src/context/ChildContext';
import TemporaryMainContainer from './frontend/src/components/containers/TemporaryMainContainer';
import Previsualization from './frontend/src/screens/Previsualization';
import PurchaseSuccess from './frontend/src/screens/PurchaseSucess';
import StreakScreen from './frontend/src/screens/StreakScreen';
import EvolutionScreen from './frontend/src/screens/EvolutionScreen';
import OnboardingSlidesScreen from './frontend/src/screens/OnboardingSlidesScreen';

// SplashScreen.preventAutoHideAsync(); // Keep splash screen until fonts are loaded

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'MuseoSansRounded': require('./assets/fonts/MuseoSansRounded700.otf'),
      'ABeeZee': require('./assets/fonts/ABeeZee-Regular.otf'),
      '9939': require('./assets/fonts/9939.otf'),
      '9942': require('./assets/fonts/9942.otf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) await SplashScreen.hideAsync();
  // }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  //  <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
  // </View>

  return (
    <SafeAreaProvider>
      <ChildProvider>
        <TabProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Welcome" component={AuthWelcomeScreen} />
              <Stack.Screen name="Login" component={AuthLoginScreen} />
              <Stack.Screen name="Signup" component={AuthSignupScreen} />
              <Stack.Screen name="Onboarding" component={AuthOnboardingScreen} />
              <Stack.Screen name="OnboardingSlides" component={OnboardingSlidesScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="AddProfile" component={ProfileAddScreen} />
              <Stack.Screen name="ParentMain" component={ParentLayout} />
              <Stack.Screen name="ParentStory" component={ParentStoryScreen} />
              <Stack.Screen name="ParentChildProgress" component={ParentChildProgressScreen} />
              <Stack.Screen name="ParentSelectedDrawingScreen" component={ParentSelectedDrawingScreen} />
              <Stack.Screen name="ChildMain" component={ChildMainScreen} />
              <Stack.Screen name="ChildMood" component={ChildMoodScreen} />
              <Stack.Screen name="ChildDrawing" component={ChildMoodDrawingScreen} />
              <Stack.Screen name="ChildDrawingConfirmation" component={ChildDrawingConfirmation} />
              <Stack.Screen name="TopicScreen" component={TopicContainer} />
              <Stack.Screen name="Modules" component={TemporaryMainContainer} />
              <Stack.Screen name="TopicComplete" component={TopicComplete} />
              <Stack.Screen name="InventoryScreen" component={InventoryScreen} />
              <Stack.Screen name="BadgesScreen" component={BadgesScreen} />
              <Stack.Screen name="PrevScreen" component={Previsualization} />
              <Stack.Screen name="PurchaseSuccess" component={PurchaseSuccess} />
              <Stack.Screen name="Streak" component={StreakScreen} />
              <Stack.Screen name="EvolutionScreen" component={EvolutionScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </TabProvider>
      </ChildProvider>
    </SafeAreaProvider>
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