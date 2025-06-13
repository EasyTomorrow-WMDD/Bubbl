import { View, Text, Button } from 'react-native';

export default function SignupScreen({ navigation }) {
  return (
    <View>
      <Text>Signup Screen</Text>
      <Button title="Create Account" onPress={() => navigation.replace('Onboarding')} />
      <Button title="Back to Login" onPress={() => navigation.replace('Login')} />
    </View>
  );
}
