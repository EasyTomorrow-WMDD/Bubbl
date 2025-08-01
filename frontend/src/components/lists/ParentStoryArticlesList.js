import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import supabase from '../../services/supabase';
import ParentStoryCard from '../cards/ParentStoryCard';
import ParentExternalStoryCard from '../cards/ParentExternalStoryCard';
import BubblConfig from '../../config/BubblConfig';
import { parentStyles } from '../../styles/BubblParentMainStyles';
import { fontStyles } from '../../styles/BubblFontStyles';
import BubblColors from '../../styles/BubblColors';
import { fi } from 'date-fns/locale';

const NOT_FOUND_ICON = require('../../assets/icons/emoji_slightly_frowning.png'); 

// ============================================================================
// ParentStoryArticlesList Component
const ParentStoryArticlesList = ({ searchText, selectedType, userId, navigation }) => {
  const [stories, setStories] = useState([]);
  const [externalStories, setExternalStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingExternal, setLoadingExternal] = useState(true);

  // ----------------------------------------------------------------
  // Fetch (internal) parent stories from the backend
  const fetchStories = async () => {
    setLoading(true);
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
      console.error('[ERROR][ParentStoryArticleList] Searching parent stories:', err);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------------------
  // Fetch external stories from the backend
  const fetchExternalStories = async () => {
    setLoadingExternal(true);
    try {
      // Step 1: Get the session to retrieve the access token
      const { data: { session }, } = await supabase.auth.getSession();
      const accessToken = session?.access_token;

      // Step 2: Make the API call to fetch external stories
      const response = await axios.get(
        `${BubblConfig.BACKEND_URL}/api/stories/searchExternalNews`,
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

      setExternalStories(response.data.articles);
    } catch (err) {
      console.error('[ERROR][ParentStoryArticleList] Searching external stories:', err);
    } finally {
      setLoadingExternal(false);
    } 
  };

  // ----------------------------------------------------------------
  // Fetch stories & external stories when search text or selected type changes
  useEffect(() => {
    fetchStories();
    // FOR BETA DEVELOPMENT: disabled external stories fetching to make sure we don't hit the rate limit of the external API
    // July 11: uncommenting to prepare for beta release. 
    fetchExternalStories();
  }, [searchText, selectedType]);

  // ----------------------------------------------------------------
  // Loading state handling
  // ** Excluding external stories for now, as we might reach the rate limit of external API. 
  if (loading || loadingExternal || !stories) 
    return <ActivityIndicator size="large" color={BubblColors.BubblPurple800} />;

  // ----------------------------------------------------------------
  // Render empty state if no stories found
  if (stories.length === 0 && externalStories.length === 0) {
    return (
      <View style={parentStyles.searchNotFoundContainer}>
        <Image source={NOT_FOUND_ICON} style={parentStyles.searchNotFoundIcon} />
        <Text style={[fontStyles.heading2, parentStyles.parentStoryOtherCardTitle, {textAlign: 'center', paddingHorizontal: 50} ]}>
          This is not what you are searching for.
        </Text>
        <Text style={[fontStyles.bodyDefault, parentStyles.parentStoryOtherCardSummary, {textAlign: 'center'}]}>
          Try different keywords or check your spelling.
        </Text>
      </View>
    );
  }

  // ===========================================================================
  // Render the list of parent stories
  return (
    <View style={parentStyles.parentStoriesListContainer}>

      {/* Internal Parent Stories */}
      {stories.map(story => (
        <ParentStoryCard
          key={story.parent_story_id}
          story={story}
          onPress={() => navigation.navigate('ParentStory', { key: story.parent_story_id, storyId: story.parent_story_id })}
          showTypeTag={true}
        />
      ))}

      {/* External News Articles */}
      {externalStories.map((article, idx) => (
        <ParentExternalStoryCard
          key={idx}
          article={article}
        />
      ))}

    </View>
  );


};

export default ParentStoryArticlesList;
