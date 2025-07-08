import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ParentChildProgressNavigation from '../navigation/ParentChildProgressNavigation'; // bottom tab component
import ParentChildProgressStatsContainer from './ParentChildProgressStatsContainer'; // stats container
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parentStyles } from '../../styles/BubblParentMainStyles'; 
import { childProgressStyles } from '../../styles/BubblParentChildProgressStyles';
import { fontStyles } from '../../styles/BubblFontStyles';
import BubblColors from '../../styles/BubblColors';

// ============================================================================
// ParentChildProgressContainer Component
const ParentChildProgressContainer = ({ navigation }) => {

  // State to manage child user information
  const [childUserId, setChildUserId] = useState('');
  const [childNickname, setChildNickname] = useState('');
  const [childAvatar, setChildAvatar] = useState('');


  // ----------------------------------------------------------------
  // Load child information from AsyncStorage when the component mounts
  useEffect(() => {
    const loadChildInfo = async () => {
      const nickname = await AsyncStorage.getItem('selected_child_nickname');
      const userId = await AsyncStorage.getItem('selected_child_user_id');
      const avatar = await AsyncStorage.getItem('selected_child_avatar');
      if (nickname) setChildNickname(nickname);
      if (userId) setChildUserId(userId);
      if (avatar) setChildAvatar(avatar);
      // console.log('[DEBUG][ParentChildProgressContainer] Loaded child info:', { nickname, userId, avatar });
    };
    loadChildInfo();
  }, []);

  // ----------------------------------------------------------------
  // Render the main container with sections
  return (
    <View style={childProgressStyles.childProgressLayoutContainer}>
      {/* Status bar */}
      <StatusBar barStyle="light-content" backgroundColor={BubblColors.BubblPurple50} />
      {/* Safe area for parent main contents */}
      <SafeAreaView edges={['top']} style={childProgressStyles.childProgressLayoutTopSafeArea} />
      
      {/* Main area for parent page */}
      <View style={childProgressStyles.childProgressLayoutMainContainer}>

        {/* Top Header */}
        <View style={childProgressStyles.childProgressHeader}>
          {/* Return button */}
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={childProgressStyles.childProgressSide}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          {/* Page Title */}
          <Text 
            style={[
              fontStyles.heading3, 
              childProgressStyles.childProgressTitle
            ]}>
              Child Progress
            </Text>
          {/* Placeholder to balance out the return button */}
          <View style={[childProgressStyles.childProgressSide]} />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Child Info Area */}
          <ParentChildProgressStatsContainer userId={childUserId} />

          {/* Tab Navigation Area */}
          <View style={styles.tabSection}>
            <ParentChildProgressNavigation />
          </View>
        </View>
      </View>

      {/* Safe area for bottom navigation */}
      <SafeAreaView edges={['bottom']} style={childProgressStyles.childProgressLayoutBottomSafeArea} />

    </View>
  );
};

export default ParentChildProgressContainer;


const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  topHeader: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

  },
  scrollContent: {
    padding: 16,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    marginBottom: 8,
  },
  nickname: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabSection: {
    flex: 1,
  },
});

