import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import supabase from '../../services/supabase';
import axios from 'axios';
import BubblConfig from '../../config/BubblConfig';

import ParentStoryCard from '../cards/ParentStoryCard';
import ParentStoryEssentialCard from '../cards/ParentStoryEssentialCard';
import { parentStyles } from '../../styles/BubblParentMainStyles';
import { fontStyles } from '../../styles/BubblFontStyles';
import BubblColors from '../../styles/BubblColors';

// ============================================================================
// ParentStoryEssentialsList Component
const ParentStoryEssentialsList = ({ userId, navigation }) => {
  // State variables to hold story data
  const [stories, setStories] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const [loading, setLoading] = useState(true);

  // ----------------------------------------------------------------
  // Function to fetch essential stories for the parent
  const fetchData = async () => {
    try {
      // Step 1: Get the access token from Supabase session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const accessToken = session?.access_token;

      if (!accessToken) {
        console.error('[ERROR] No access token found.');
        return;
      }

      // Step 2: Call API
      const response = await axios.get(
        `${BubblConfig.BACKEND_URL}/api/stories/essentials/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setStories(response.data.stories);
      setCompletedCount(response.data.completedCount);
      setTotalCount(response.data.totalCount);
    } catch (err) {
      console.error('[ERROR] Fetching essentials:', err);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------------------
  // Fetch data when the component mounts or userId changes
  useEffect(() => {
    fetchData();
  }, [userId]);

  // ----------------------------------------------------------------
  // Re-fetch data when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      // Re-fetch data whenever this screen comes into focus
      fetchData(); 
    }, [])
  );

  // ----------------------------------------------------------------
  // Loading state handling
  if (loading || !stories) 
    return <ActivityIndicator size="large" color={BubblColors.BubblPurple800} />;

  // ----------------------------------------------------------------
  // Render the list of essential stories
  return (
    <View style={parentStyles.parentEssentialListSectionContainer}>
      <Text style={[fontStyles.heading1, parentStyles.parentEssentialListSectionHeading]}>Essentials for parenting</Text>
      <Text style={[fontStyles.bodyDefault, parentStyles.parentEssentialListSectionSubHeading]}>{completedCount}/{totalCount} articles completed ✅ </Text>

      <FlatList
        horizontal
        data={stories}
        keyExtractor={(item) => item.parent_story_id}
        renderItem={({ item }) => (

          <ParentStoryEssentialCard
            story={item}
            onPress={() => navigation.navigate('ParentStory', { storyId: item.parent_story_id })}
          />

        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ParentStoryEssentialsList;
