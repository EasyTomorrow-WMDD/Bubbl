import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Header from './frontend/src/components/layout/Header';
import ChildHome from './frontend/src/screens/child_homeScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <Header/>
      <ChildHome/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
