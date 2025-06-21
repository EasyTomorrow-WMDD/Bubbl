import { View, Text, TextInput } from 'react-native';
import { globalStyles } from '../../styles/BubblStyles';

// ==========================================================================
// BubblTextInput component
// A reusable text input component for Bubbl app
// Props:
// - label: Text label for the input
// - placeholder: Placeholder text for the input
// - value: Current value of the input
// - onChangeText: Function to call when the text changes
// - autoCapitalize: Controls auto-capitalization (default is 'none')
// - keyboardType: Type of keyboard to use (default is 'default')
// - error: Error message to display (optional)
const BubblTextInput = ({ label, placeholder, value, onChangeText, autoCapitalize = 'none', keyboardType = 'default', error }) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={globalStyles.label}>{label}</Text>
    <TextInput
      style={[globalStyles.input, error && globalStyles.errorInput]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
    />
    {!!error && <Text style={globalStyles.errorText}>{error}</Text>}
  </View>
);

export default BubblTextInput;
