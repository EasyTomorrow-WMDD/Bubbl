import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './frontend/src/screens/LoginScreen';
import SignupScreen from './frontend/src/screens/SignupScreen';
import OnboardingScreen from './frontend/src/screens/OnboardingScreen';
import ProfileScreen from './frontend/src/screens/ProfileScreen';
import ParentMainScreen from './frontend/src/screens/ParentMainScreen';
import ChildMainScreen from './frontend/src/screens/ChildMainScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ParentMain" component={ParentMainScreen} />
        <Stack.Screen name="ChildMain" component={ChildMainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
