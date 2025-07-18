import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Pressable, Image } from 'react-native';
import supabase from '../../services/supabase';
import axios from 'axios';
import BubblConfig from '../../config/BubblConfig';
import { globalStyles } from '../../styles/BubblStyles';
import { profileStyles } from '../../styles/ProfileStyles';
import PageHeading from '../layout/PageHeading';
import ProfileList from '../lists/ProfileList';
import BubblColors from '../../styles/BubblColors';
import { fontStyles } from '../../styles/BubblFontStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignOutModal from '../layout/ModalSignOut';

// ============================================================================
// ProfileContainer Component
const ProfileContainer = ({ navigation }) => {

  // State variables to hold parent and child profiles + current user info
  const [parentProfiles, setParentProfiles] = useState([]);
  const [childProfiles, setChildProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserType, setCurrentUserType] = useState(null);
  const [accountOwnerId, setAccountOwnerId] = useState(null);
  const [showSignOutModal, setShowSignOutModal] = useState(false);


  // ----------------------------------------------------------------
  // Fetch profiles from the backend API on load
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        // Get the current user's session to retrieve access token
        const {
          data: { session },
        } = await supabase.auth.getSession();

        // Call the backend API to get user profiles associated with the current user
        const response = await axios.get(`${BubblConfig.BACKEND_URL}/api/users/profiles`, {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });

        // Set parent and child profiles from the response
        setParentProfiles(response.data.parents || []);
        setChildProfiles(response.data.children || []);
        setCurrentUserId(response.data.current_user_id);
        setCurrentUserType(response.data.current_user_type);
        setAccountOwnerId(response.data.account_owner_id);

        // await AsyncStorage.setItem('account_id', response.data.account_id);

      } catch (err) {
        console.error('[ERROR][Profile] Failed to load profiles:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;


  // ----------------------------------------------------------------
  // Render the profile screen  
  return (
<View style={{ flex: 1, backgroundColor: BubblColors.BubblPurple500 }}>
  {/* Header */}
<SafeAreaView edges={['top']} style={{ backgroundColor: BubblColors.BubblPurple500 }}>
  
  <View style={[styles.header]}>
    {/* CTA */}
    <Pressable onPress={() => setShowSignOutModal(true)} style={{ margin: 0, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
      <Image source={require('../../assets/icons/log-out.png')} style={styles.icon} />
      <Text style={[fontStyles.bodyMedium, { color: 'white' }]}>Sign out</Text>
    </Pressable>
    {/* TITLE */}
    <View style={styles.titleWrapper}>
      <Text style={[fontStyles.heading1, { color: 'white' }]}>Profiles</Text>
    </View>
    <Pressable onPress={() => navigation.navigate('Welcome')} style={{ margin: 0, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
      <Image source={require('../../assets/icons/close.png')} style={[styles.icon, {marginLeft:70, tintColor: BubblColors.BubblPurple500,}]} />
    </Pressable>
  </View>
</SafeAreaView>

  {/* Scrollable Content */}
  <ScrollView
    style={{ flex: 1 }}
    contentContainerStyle={{
      flexGrow: 1,
      backgroundColor: 'white',
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      padding: 20,
    }}
  >
    <Text style={[fontStyles.display3, profileStyles.subheading]}>Parents (Guardians)</Text>
    <ProfileList
      profiles={parentProfiles}
      type="parent"
      navigation={navigation}
      showAddCard={false}
    />
    <Text style={[fontStyles.display3, profileStyles.subheading]}>Child(ren)</Text>
    <ProfileList
      profiles={childProfiles}
      type="kid"
      navigation={navigation}
      showAddCard={false}
    />
  </ScrollView>
  <SignOutModal
  visible={showSignOutModal}
  onCancel={() => setShowSignOutModal(false)}
  onConfirm={async () => {
    setShowSignOutModal(false);
    await supabase.auth.signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }}
/>
</View>

  );
};

export default ProfileContainer;

const styles = StyleSheet.create({
  safeArea: {

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: BubblColors.BubblPurple500
  },

  icon: {
    width: 24,
    height: 24,
    // marginLeft: 16,
    tintColor: 'white',
  },
});