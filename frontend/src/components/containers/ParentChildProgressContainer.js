import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ParentChildProgressNavigation from '../navigation/ParentChildProgressNavigation'; // bottom tab component
import ParentChildProgressStatsContainer from './ParentChildProgressStatsContainer'; // stats container
import AsyncStorage from '@react-native-async-storage/async-storage';

const ParentChildProgressContainer = ({ navigation }) => {

  // State to manage child user information
  const [childUserId, setChildUserId] = React.useState('');
  const [childNickname, setChildNickname] = React.useState('');
  const [childAvatar, setChildAvatar] = React.useState('');


  React.useEffect(() => {
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

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Top Black Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Main contents */}
      <View style={styles.content}>    
        {/* Child Info Area */}
        <ParentChildProgressStatsContainer userId={childUserId} />
        {/* Navigation area */}
        <View style={styles.tabSection}>
          <ParentChildProgressNavigation />
        </View>
      </View>

    </SafeAreaView>
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

