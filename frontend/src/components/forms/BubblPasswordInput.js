import { View, Text, TextInput } from 'react-native';
import { globalStyles } from '../../styles/BubblStyles';

// ==========================================================================
// BubblPasswordInput component
// A reusable password input component for Bubbl app
// Props:
// - label: Text label for the password input
// - placeholder: Placeholder text for the input
// - value: Current value of the input
// - onChangeText: Function to call when the text changes
// - error: Error message to display (optional)
const BubblPasswordInput = ({ label, placeholder, value, onChangeText, error }) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={globalStyles.label}>{label}</Text>
    <TextInput
      style={[globalStyles.input, error && globalStyles.errorInput]}
      placeholder="Enter your password"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry
    />
    {!!error && <Text style={globalStyles.errorText}>{error}</Text>}
  </View>
);

export default BubblPasswordInput;
