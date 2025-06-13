import { View, Text, Button } from 'react-native';

export default function OnboardingScreen({ navigation }) {
  return (
    <View>
      <Text>Onboarding Screen</Text>
      <Button title="Complete Onboarding" onPress={() => navigation.replace('Profile')} />
    </View>
  );
}
