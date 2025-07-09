import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoadProfileInfo from '../../utils/LoadProfileInfo'; 
import ParentStoryEssentialsList from '../lists/ParentStoryEssentialsList';
import ParentStoriesSearchForm from '../forms/ParentStoriesSearchForm';
import ParentStoryArticlesList from '../lists/ParentStoryArticlesList';
import { parentStyles } from '../../styles/BubblParentMainStyles';
import { fontStyles } from '../../styles/BubblFontStyles';
import BubblColors from '../../styles/BubblColors';
import { avatarImages } from '../../utils/AvatarMappings';

const ParentStoriesContainer = ( {navigation} ) => {

  // State variable to hold profile information
  const [profile, setProfile] = useState(null);

  // State variables for search functionality
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  let avatarSource = ''; // Variable to hold the avatar image source

  // ==========================================================================
  // Fetch profile information when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      const data = await LoadProfileInfo();
      setProfile(data);
    };

    fetchProfile();
    
  }, []);

  if (!profile) {
    return null; // or a loading indicator
  } else {
    // Get avatar image full path based on the avatar_id
    avatarSource = avatarImages[profile.avatar_id] || avatarImages['avatar01']; 
  }


  // ==========================================================================
  // Render the main container with sections
  return (
    <View style={parentStyles.parentStoriesContainer}>
      {/* Section 1: Heading */}
      <View style={parentStyles.parentStoriesHeaderContainer}>
        {/* <Ionicons name="person-circle-outline" size={64} style={styles.avatar} /> */}
        <View style={parentStyles.parentStoriesAvatarWrapper}>
          <Image source={avatarSource} style={parentStyles.parentStoriesAvatarImage} />
        </View>
        <Text style={[fontStyles.display2, parentStyles.parentStoriesHeading]}>Welcome {profile.nickname}!</Text>
        <Text style={[fontStyles.bodyMedium, parentStyles.parentStoriesSubheading]}>Let's find some articles to read</Text>
      </View>

      {/* Section 2: Essential stories - render list */}
      {profile && <ParentStoryEssentialsList userId={profile.user_id}  navigation={navigation} />}

      <View style={parentStyles.parentOtherStoriesContainer}>
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

    </View>
  );
};

export default ParentStoriesContainer;
