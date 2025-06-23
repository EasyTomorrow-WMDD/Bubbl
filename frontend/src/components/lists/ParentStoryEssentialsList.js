import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import supabase from '../../services/supabase';
import axios from 'axios';
import BubblConfig from '../../config/BubblConfig';

import ParentStoryCard from '../cards/ParentStoryCard';

const ParentStoryEssentialsList = ({ userId, navigation }) => {
  // State variables to hold story data
  const [stories, setStories] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

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
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      // Re-fetch data whenever this screen comes into focus
      fetchData(); 
    }, [])
  );


  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>Essentials for parenting</Text>
      <Text style={styles.sectionSubHeading}>{completedCount}/{totalCount} articles completed</Text>

      <FlatList
        horizontal
        data={stories}
        keyExtractor={(item) => item.parent_story_id}
        renderItem={({ item }) => (

          <ParentStoryCard
            story={item}
            onPress={() => navigation.navigate('ParentStory', { storyId: item.parent_story_id })}
          />

        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 24,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubHeading: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
  },
  card: {
    width: 240,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    height: 120,
    backgroundColor: '#eee',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  readTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#4caf50',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  readTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardTextContainer: {
    padding: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSummary: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default ParentStoryEssentialsList;
