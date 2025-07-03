import { View, Text, Image, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/BubblStyles';
import { fontStyles } from '../../styles/BubblFontStyles';
import backIcon from '../../assets/icons/navigation-back.png';

// ==========================================================================
// PageHeading component
// A reusable page heading component for Bubbl app
// Props:
// - title: Text to display as the page title
// - onBackPress: Function to call when the back button is pressed (optional)
// - style: Additional styles for the heading container
// - titleStyle: Additional styles for the title text
//
// Usage: 
// <PageHeading title="Login" onBackPress={() => navigation.replace('Welcome')} />
//
const PageHeading = ({ title, onBackPress, style, titleStyle }) => (
  <View style={[globalStyles.headerRow, style]}>
    { onBackPress && (
        <TouchableOpacity onPress={onBackPress}>
          <Image
            source={backIcon}
            style={{ marginTop: 40 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
    ) }
    <Text style={[fontStyles.display3, globalStyles.headerTitle, titleStyle]}>{title}</Text>
    { onBackPress && (
        // Spacer to balance back the icon
        <View style={{ width: 24 }} />
    ) }    
  </View>
);

export default PageHeading;
