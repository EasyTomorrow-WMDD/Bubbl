import { View, Text, Button } from 'react-native';

export default function ChildMainScreen({ navigation }) {
  return (
    <View>
      <Text>Welcome Kid!</Text>
      <Text>You are in the child portal!</Text>
      <Button title="Back to Profile" onPress={() => navigation.replace('Profile')} />
      <Button title="Logout" onPress={() => navigation.replace('Login')} />
    </View>
  );
}
