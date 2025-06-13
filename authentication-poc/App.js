import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import Page1 from './screens/Page1';
import Page2 from './screens/Page2';
import supabase from './lib/supabase';

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
  const handleDeepLink = async ({ url }) => {
    console.log('🚀 Deep link received:', url);

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.log('⚠️ Error fetching session:', error.message);
    } else {
      console.log('✅ Session from deep link:', session);
    }
  };

  const sub = Linking.addEventListener('url', handleDeepLink);
  return () => sub.remove();
}, []);


  const linking = {
    prefixes: [Linking.createURL('/')],
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Page1">
        <Stack.Screen name="Page1" component={Page1} />
        <Stack.Screen name="Page2" component={Page2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
