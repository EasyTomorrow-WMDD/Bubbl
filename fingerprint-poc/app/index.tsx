/* app/index.tsx
 * References: https://docs.expo.dev/versions/latest/sdk/local-authentication/
 */

import { View, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter(); // Using expo-router for navigation

  const handleAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync(); // Check if the device has hardware for fingerprint authentication
    const isEnrolled = await LocalAuthentication.isEnrolledAsync(); // Check if the user has enrolled fingerprints

    // If the device does not have hardware or no fingerprints are enrolled, show an alert
    if (!hasHardware || !isEnrolled) {
      Alert.alert('Unavailable', 'Fingerprint authentication is not available.');
      return;
    }

    // Attempt to authenticate the user using fingerprint
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Scan your fingerprint',
      disableDeviceFallback: true,
    });

    // If authentication is successful, navigate to the restricted screen
    if (result.success) {
      router.push('/restricted');
    } else {
      Alert.alert('Failed', 'Authentication failed.');
    }
  };

  // Render the main screen with a button to trigger fingerprint authentication
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Parental Contents!" onPress={handleAuth} />
    </View>
  );
}
