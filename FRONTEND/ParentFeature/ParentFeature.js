import { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import FaceAuth from './../../AUTH/FaceAuth';

export default function ProtectedFeatureScreen() {
  const [allowed, setAllowed] = useState(false);

  if (!allowed) {
    return (
      <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
        <FaceAuth onSuccess={() => setAllowed(true)} />
      </View>
    );
  }

  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
      <Text>¡Welcome to the Protected Feature!</Text>
    </View>
  );
}
