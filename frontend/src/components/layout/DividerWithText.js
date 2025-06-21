import { View, Text } from 'react-native';
import { globalStyles } from '../../styles/BubblStyles';

// ==========================================================================
// DividerWithText component
// A reusable divider component with text in the middle
// Props:
// - text: Text to display in the middle of the divider (default is 'or')
// - style: Additional styles for the divider container
// - textStyle: Additional styles for the text
//
// Usage: 
// <DividerWithText text="or" style={customStyle} textStyle={customTextStyle} />
//
const DividerWithText = ({ text = 'or', style, textStyle }) => (
  <View style={[globalStyles.dividerContainer, style]}>
    <View style={globalStyles.dividerLine} />
    <Text style={[globalStyles.dividerText, textStyle]}>{text}</Text>
    <View style={globalStyles.dividerLine} />
  </View>
);

export default DividerWithText;
