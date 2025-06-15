import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../services/supabase';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [parentProfiles, setParentProfiles] = useState([]);
  const [childProfiles, setChildProfiles] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [accountOwnerId, setAccountOwnerId] = useState(null);

  const storeSelectedProfile = async (profile) => {
    try {
      await AsyncStorage.setItem('selected_user_id', profile.user_id);
      await AsyncStorage.setItem('selected_user_nickname', profile.user_nickname);
      await AsyncStorage.setItem('selected_avatar_id', profile.avatar_id ?? '');
    } catch (err) {
      console.error('Error saving profile to storage:', err);
    }
  };

  const handleParentPress = async (profile) => {
    const authResult = await LocalAuthentication.authenticateAsync({ promptMessage: 'Authenticate to continue' });
    if (authResult.success) {
      await storeSelectedProfile(profile);
      navigation.replace('ParentMain');
    }
  };

  const handleChildPress = async (profile) => {
    await storeSelectedProfile(profile);
    navigation.replace('ChildMain');
  };

  const fetchProfiles = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: userData } = await supabase
      .from('user')
      .select('*')
      .eq('user_auth_id', user.id)
      .single();

    if (!userData) return;

    setCurrentUser(userData);

    // If user is a kid, redirect
    if (userData.user_type === 'kid') {
      await storeSelectedProfile(userData);
      navigation.replace('ChildMain');
      return;
    }

    // Determine if current user is account owner
    const { data: accountData } = await supabase
      .from('account')
      .select('account_owner')
      .eq('account_id', userData.account_id)
      .single();

    if (!accountData) return;
    setAccountOwnerId(accountData.account_owner);

    const isOwner = accountData.account_owner === userData.user_id;

    const { data: allUsers } = await supabase
      .from('user')
      .select('*')
      .eq('account_id', userData.account_id);

    const parents = allUsers.filter((u) => u.user_type === 'parent');
    const kids = allUsers.filter((u) => u.user_type === 'kid');

    setParentProfiles(isOwner ? parents : [userData]);
    setChildProfiles(kids);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchProfiles();
    }, [])
  );

  const renderProfileCard = (profile, onPress) => (
    <TouchableOpacity key={profile.user_id} style={styles.card} onPress={() => onPress(profile)}>
      <View style={styles.avatarPlaceholder} />
      <Text style={styles.nickname}>{profile.user_nickname}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Who is using Bubbl?</Text>

      {currentUser?.user_type === 'parent' && (
        <>
          <Text style={styles.subheading}>Parents (Guardians)</Text>
          <View style={styles.cardRow}>
            {parentProfiles.map((p) => renderProfileCard(p, handleParentPress))}
            {accountOwnerId === currentUser.user_id && (
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AddProfile', { profile_type: 'parent' })}>
                <View style={styles.avatarPlaceholder} />
                <Text style={styles.nickname}>+{"\n"}Add Parent{"\n"}(Guardian)</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}

      <Text style={styles.subheading}>Child(ren)</Text>
      <View style={styles.cardRow}>
        {childProfiles.map((c) => renderProfileCard(c, handleChildPress))}
        {currentUser?.user_type === 'parent' && (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AddProfile', { profile_type: 'kid' })}>
            <View style={styles.avatarPlaceholder} />
            <Text style={styles.nickname}>+{"\n"}Add Child</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  card: {
    width: 100,
    height: 130,
    margin: 8,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 8,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#ccc',
    borderRadius: 8,
  },
  nickname: {
    marginTop: 8,
    textAlign: 'center',
  },
});
