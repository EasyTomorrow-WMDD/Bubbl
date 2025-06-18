import { TouchableOpacity, Text } from 'react-native';
import { globalStyles } from '../../styles/BubblStyles';

// ==========================================================================
// BubblButton component
// A reusable button component for Bubbl app
// Props:
// - label: Text to display on the button
// - onPress: Function to call when the button is pressed
// - style: Additional styles for the button
// - textStyle: Additional styles for the button text
const BubblButtonLogin = ({ label, onPress, style, textStyle }) => (
  <TouchableOpacity onPress={onPress} style={[globalStyles.buttonLogin, style]}>
    <Text style={[globalStyles.buttonLoginText, textStyle]}>{label}</Text>
  </TouchableOpacity>
);

export default BubblButtonLogin;
