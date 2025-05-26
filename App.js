import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './FRONTEND/Home';
import ParentFeature from './FRONTEND/ParentFeature/ParentFeature';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ParentFeature" component={ParentFeature} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}