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
const BubblButton = ({ label, onPress, style, textStyle }) => (
  <TouchableOpacity onPress={onPress} style={[globalStyles.button, style]}>
    <Text style={[globalStyles.buttonText, textStyle]}>{label}</Text>
  </TouchableOpacity>
);

export default BubblButton;
