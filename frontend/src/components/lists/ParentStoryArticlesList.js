import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import supabase from '../../services/supabase';
import ParentStoryCard from '../cards/ParentStoryCard';
import BubblConfig from '../../config/BubblConfig';

const ParentStoryArticlesList = ({ searchText, selectedType, userId, navigation }) => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStories = async () => {
    setIsLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const accessToken = session?.access_token;

      const response = await axios.get(
        `${BubblConfig.BACKEND_URL}/api/stories/search`,
        {
          params: {
            user_id: userId,
            text: searchText,
            type: selectedType,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setStories(response.data.stories);
    } catch (err) {
      console.error('[ERROR] Searching parent stories:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, [searchText, selectedType]);

  if (isLoading) {
    return <Text style={styles.statusText}>Loading...</Text>;
  }

  if (stories.length === 0) {
    return <Text style={styles.statusText}>No stories found.</Text>;
  }

  return (
    <View style={{ alignContent: 'center', paddingHorizontal: 16, paddingTop: 16 }}>
      {stories.map(story => (
        <ParentStoryCard
          key={story.parent_story_id}
          story={story}
          onPress={() => navigation.navigate('ParentStory', { storyId: story.parent_story_id })}
          showTypeTag={true}
        />
      ))}
    </View>
  );


};

const styles = StyleSheet.create({
  statusText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    color: '#555',
  },
  listContent: {
    paddingBottom: 24,
  },
});

export default ParentStoryArticlesList;
