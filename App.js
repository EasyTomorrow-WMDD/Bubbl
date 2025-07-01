import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
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
            <Stack.Screen name="Streak" component={StreakScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
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