import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Button } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function FaceAuth({ onSuccess }) {
  const [isEnrolled, setIsEnrolled] = useState(null);
  const [authFailed, setAuthFailed] = useState(false);
  const [retry, setRetry] = useState(0);

  // Check if the device has biometric hardware and if the user has enrolled any biometrics
  useEffect(() => {
    (async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const enrolled = hasHardware && await LocalAuthentication.isEnrolledAsync();
      setIsEnrolled(enrolled);
    })();
  }, []);

// Handle the authentication process when the component mounts
  useEffect(() => {
    if (isEnrolled) {
      (async () => {
        setAuthFailed(false);
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Get authenticated with Face ID',
          cancelLabel: 'Cancel',
          fallbackLabel: 'Use passcode',
        });

        if (result.success) {
          onSuccess && onSuccess();
        } else {
          setAuthFailed(true);
        }
      })();
    }
  }, [isEnrolled, retry]);

  if (isEnrolled === null) {
    return <Text style={{ textAlign: 'center', marginTop: 50 }}>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20, textAlign: 'center' }}>
        {isEnrolled
          ? ''
          : 'You need to enroll your face in the device settings to use this feature.'}
      </Text>
      {authFailed && (
      <Button
        title="Try Again"
        onPress={() => {
          setRetry(retry + 1);
        }}
      />
    )}
    </View>
  );
}
