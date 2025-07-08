import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { parentStyles } from '../../styles/BubblParentMainStyles';
import { fontStyles } from '../../styles/BubblFontStyles';
import BubblColors from '../../styles/BubblColors';

const PARENT_NAV_ICON_01 = require('../../assets/icons/parent_nav_01.png'); // Path to the first parent navigation icon
const PARENT_NAV_ICON_02 = require('../../assets/icons/parent_nav_02.png'); // Path to the second parent navigation icon
const PARENT_NAV_ICON_03 = require('../../assets/icons/parent_nav_03.png'); // Path to the third parent navigation icon

// ============================================================================
// Method to render one navigation item: 
const NavItem = ({ icon, label, isActive, onPress }) => (
  <TouchableOpacity style={parentStyles.parentNavItem} onPress={onPress}>
    <Image
      source={icon}
      style={[ parentStyles.parentNavIcon, isActive ? parentStyles.parentNavIconActive : parentStyles.parentNavIconInactive]}
      resizeMode="contain"
    />
    <Text style={[fontStyles.bodySmall, parentStyles.parentNavLabel, isActive ? parentStyles.parentNavLabelActive : parentStyles.parentNavLabelInactive]}>{label}</Text>
  </TouchableOpacity>
);

// ============================================================================
// Parent Bottom Navigation Component
const ParentBottomNav = ({ activeTab, setActiveTab }) => {
  return (
    <View style={parentStyles.parentNavContainer}>
      <NavItem icon={PARENT_NAV_ICON_01} label="Stories" isActive={activeTab === 'Stories'} onPress={() => setActiveTab('Stories')} />
      <NavItem icon={PARENT_NAV_ICON_02} label="Progress" isActive={activeTab === 'Progress'} onPress={() => setActiveTab('Progress')} />
      <NavItem icon={PARENT_NAV_ICON_03} label="Settings" isActive={activeTab === 'Settings'} onPress={() => setActiveTab('Settings')} />
    </View>
  );
};

export default ParentBottomNav;
