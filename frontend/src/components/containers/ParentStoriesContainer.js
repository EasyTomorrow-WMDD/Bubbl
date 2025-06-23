import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoadProfileInfo from '../../utils/LoadProfileInfo'; 
import ParentStoryEssentialsList from '../lists/ParentStoryEssentialsList';
import ParentStoriesSearchForm from '../forms/ParentStoriesSearchForm';
import ParentStoryArticlesList from '../lists/ParentStoryArticlesList';

const ParentStoriesContainer = ( {navigation} ) => {

  // State variable to hold profile information
  const [profile, setProfile] = useState(null);

  // State variables for search functionality
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState('all');


  useEffect(() => {
    const fetchProfile = async () => {
      const data = await LoadProfileInfo();
      setProfile(data);
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return null; // or a loading indicator
  }

  return (
    <View style={styles.container}>
      {/* Section 1: Heading */}
      <View style={styles.headerContainer}>
        <Ionicons name="person-circle-outline" size={64} style={styles.avatar} />
        {/* <Image source={{ uri: profile.avatar_id }} style={styles.avatarImage} /> */}


        <View style={styles.textContainer}>
          <Text style={styles.heading}>Welcome {profile.nickname}!</Text>
          <Text style={styles.subheading}>Let's find some articles to read</Text>
        </View>
      </View>

      <Text style={styles.divider}>-----------------------</Text>

      {/* Section 2: Essential stories - render list */}
      {profile && <ParentStoryEssentialsList userId={profile.user_id}  navigation={navigation} />}

      {/* Section 3: Search for other stories */}
      <ParentStoriesSearchForm
        searchText={searchText}
        setSearchText={setSearchText}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      {/* Section 4: Search results */}
      <ParentStoryArticlesList
        searchText={searchText}
        selectedType={selectedType}
        userId={profile.user_id}
        navigation={navigation}
      />

    </View>
  );
};

export default ParentStoriesContainer;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    marginRight: 15,
    color: '#888', // tint color for placeholder icon
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  divider: {
    marginTop: 10,
    marginBottom: 15,
  },
});
