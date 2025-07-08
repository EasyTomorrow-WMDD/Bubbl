import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; // Was used for alpha release, now using Image 
import { parentStyles } from '../../styles/BubblParentMainStyles';
import { fontStyles } from '../../styles/BubblFontStyles';
import BubblColors from '../../styles/BubblColors';

const PROFILE_ICON = require('../../assets/icons/happy-beaming.png'); // Path to the profile icon 

const ParentHeader = ({ navigation, setActiveTab }) => {
  // ----------------------------------------------------------------
  // Render header area for parent screens
  return (
    <View style={parentStyles.parentHeaderContainer}>
      <Text style={[parentStyles.parentHeaderTitle, fontStyles.display3 ]}>Bubbl</Text>
      <View style={parentStyles.parentHeaderIcons}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={PROFILE_ICON}
            style={ parentStyles.parentHeaderIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {/* Notification is out of scope for MVP */}
        {/* <TouchableOpacity onPress={() => setActiveTab('Notifications')}>
          <Ionicons name="notifications-outline" size={26} color="black" style={{ marginLeft: 15 }} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default ParentHeader;
