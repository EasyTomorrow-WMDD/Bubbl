import { View, Text, TextInput } from 'react-native';
import { globalStyles } from '../../styles/BubblStyles';
import { fontStyles } from '../../styles/BubblFontStyles';

// ==========================================================================
// BubblPasswordInput component
// A reusable password input component for Bubbl app
// Props:
// - label: Text label for the password input
// - placeholder: Placeholder text for the input
// - value: Current value of the input
// - onChangeText: Function to call when the text changes
// - error: Error message to display (optional)
const BubblPasswordInput = ({ label, placeholder, value, onChangeText, error }) => {

  // ----------------------------------------------------------------
  // Method to convert label to name
  const convertLabelToName = (label) => {
    return label.toLowerCase().replace(/\s+/g, '_');
  };
  // ----------------------------------------------------------------
  // Render the password input component

  const inputName = convertLabelToName(label);

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={[fontStyles.tagline, globalStyles.label]}>{label}</Text>
      <TextInput
        style={[fontStyles.bodyDefault, globalStyles.passwordInput, error && globalStyles.errorInput]}
        placeholder="Enter your password"
        value={value}
        onChangeText={onChangeText}
        name={inputName}
        autoComplete="new-password"
        textContentType="none"
        importantForAutofill="no"
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry
      />
      {!!error && <Text style={globalStyles.errorText}>{error}</Text>}
    </View>
  );
}

export default BubblPasswordInput;
