// app/restricted.tsx
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function RestrictedScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>🔐 Restricted Area</Text>
      <Button title="Return to Home" onPress={() => router.push('/')} />
    </View>
  );
}
