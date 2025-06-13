import { View, Text, Button } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Login (Success)" onPress={() => navigation.replace('Profile')} />
      <Button title="Login with Google (New User)" onPress={() => navigation.replace('Onboarding')} />
      <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
}
