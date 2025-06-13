import { View, Text, Button } from 'react-native';

export default function ParentMainScreen({ navigation }) {
  return (
    <View>
      <Text>Welcome Parent!</Text>
      <Text>You are in the parent portal!</Text>
      <Button title="Back to Profile" onPress={() => navigation.replace('Profile')} />
      <Button title="Logout" onPress={() => navigation.replace('Login')} />
    </View>
  );
}
