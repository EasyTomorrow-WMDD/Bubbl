import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, StatusBar, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For "X" icon
import { useNavigation, useRoute } from '@react-navigation/native';
import LoadProfileInfo from '../../utils/LoadProfileInfo'; 
import supabase from '../../services/supabase';
import axios from 'axios';
import BubblConfig from '../../config/BubblConfig';
import Markdown from 'react-native-markdown-display';
import ParentStoryCard from '../cards/ParentStoryCard'; 
import { ARTICLE_IMAGE_URL } from '../../config/BubblImageConfig';
import { PARENT_STORY_TYPE_LABELS } from '../../constants/BubblConstants';
import { parentStyles, parentOtherStoryStyles, parentEssentialStoryStyles } from '../../styles/BubblParentMainStyles';
import { fontStyles } from '../../styles/BubblFontStyles';
import { markdownOtherArticleStyles, markdownEssentialsArticleStyles } from '../../styles/BubblMarkdownStyles';
import BubblColors from '../../styles/BubblColors'; 

// ============================================================================
// ParentStoryContainer Component
const ParentStoryContainer = () => {

  const navigation = useNavigation(); 
  const route = useRoute();
  const { storyId } = route.params;
  // State variable to hold related articles (for non-essentials stories)
  const [relatedStories, setRelatedStories] = useState([]);

  // State variable to hold profile information ("user_id" is needed for updating the read status of stories by the current profile user)
  const [profile, setProfile] = useState(null);
  
  const [storyData, setStoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ----------------------------------------------------------------
  // Step 1: Load profile information on load. 
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await LoadProfileInfo();
        setProfile(data);
      } catch (error) {
        console.error('[ERROR][ParentStory] Error loading profile info:', error);
      }
    };
    loadProfile();
  }, []);

  // ----------------------------------------------------------------
  // Step 2: Fetch story data and mark as read once profile is loaded OR when storyId changes
  useEffect(() => {
    if (!profile) return; 

    const fetchData = async () => {
      try {
        // Step 1: Get the access token from Supabase session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const accessToken = session?.access_token;

        if (!accessToken) {
          console.error('[ERROR][ParentStory] No access token found.');
          return;
        }

        // Step 2: Call API to fetch story details
        const response = await axios.get(
          `${BubblConfig.BACKEND_URL}/api/stories/getOneParentStory/${storyId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setStoryData(response.data.story);
        // console.log('[DEBUG] Fetched story data:', response);

        //console.log('[DEBUG] Profile:', profile);
        //console.log('[DEBUG] Calling markStoryAsRead for story:', storyId, 'user:', profile.user_id);
        // Step 3: Call API to update read status of the story
        if (profile && response.data.story) {
          await axios.post(
            `${BubblConfig.BACKEND_URL}/api/stories/markStoryAsRead`,
            {
              user_id: profile.user_id,
              parent_story_id: storyId,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
        }

      } catch (err) {
        console.error('[ERROR][ParentStory] Error fetching story data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [profile, storyId]);

  // ----------------------------------------------------------------
  // Step 3: Fetch related articles for non-essentials stories
  useEffect(() => {
    const fetchRelated = async () => {
      if (!storyData?.parent_story_type || !storyData?.parent_story_id) return;

      try {
        // Step 1: Get the access token from Supabase session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const accessToken = session?.access_token;

        if (!accessToken) {
          console.error('[ERROR][RelatedStories] No access token found.');
          return;
        }

        // Step 2: Call API to fetch story details
        const response = await axios.get(
          `${BubblConfig.BACKEND_URL}/api/stories/getRelatedStories?type=${storyData.parent_story_type}&exclude=${storyData.parent_story_id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // Step 3: Set related articles in state
        setRelatedStories(response.data.stories); 

      } catch (err) {
        console.error('[ERROR][RelatedStories] Error fetching related stories: ', err);
      }
    };

  // ----------------------------------------------------------------
    // Only fetch related articles if the story type is not 'essentials'
    if (storyData?.parent_story_type !== 'essentials') {
      fetchRelated();
    }

  }, [storyData]);

  // ----------------------------------------------------------------
  // Helper method to convert relative image URLs to absolute URLs in markdown content
  const convertRelativeImageUrls = (markdownContent) => {
    return markdownContent.replace(
      /!\[(.*?)\]\((.*?)\)/g, // Global regex to match image markdown sytax: ![alt text](relative_url)
      (match, altText, path) => {
        // Convert relative URL to absolute URL using ARTICLE_IMAGE_URL
        return `![${altText}](${ARTICLE_IMAGE_URL}${path})`;
      }
    );
  };

  // ----------------------------------------------------------------
  // If loading, show a loading indicator
  if (loading) {
    return (
      <View style={parentStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // ----------------------------------------------------------------
  // Set styles and contents based on the parent story type

  const { parent_story_type } = storyData;  // Get the parent story type from storyData

  // Determine styles based on the parent story type
  const mainStyles = 
    parent_story_type === 'essentials' 
    ? parentEssentialStoryStyles 
    : parentOtherStoryStyles;

  // Determine markdown styles based on the parent story type
  const markdownStyles = 
    parent_story_type === 'essentials' 
    ? markdownEssentialsArticleStyles 
    : markdownOtherArticleStyles;
    
  // Set the heading text based on the parent story type
  const headingText =
    parent_story_type === 'essentials' ? 'Essentials' : 'Explore Articles';

  // ----------------------------------------------------------------
  // Render contents
  return (
    <View style={mainStyles.parentOtherStoryLayoutContainer}>

      {/* Status bar */}
      <StatusBar barStyle="light-content" backgroundColor={BubblColors.BubblOrange500} />

      {/* Safe area for parent main contents */}
      <SafeAreaView edges={['top']} style={mainStyles.parentOtherStoryLayoutTopSafeArea} />

      {/* Outer container */}
      <View style={mainStyles.parentOtherStoryLayoutMainContainer}>

        {/* Extra container for the background */}
        <View style={mainStyles.parentOtherStoryLayoutBackground} />

        {/* =================================================================== */}
        {/* Section 1: Fixed Header */}
        <View style={mainStyles.parentOtherStoryHeader}>
          <Text style={[fontStyles.heading3, mainStyles.parentOtherStoryHeaderText]}>{headingText}</Text>
          <TouchableOpacity style={mainStyles.parentOtherStoryCloseButton} onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Scrollable content (for the rest of the sections) */}
        <ScrollView contentContainerStyle={mainStyles.scrollContent}>

          {/* =================================================================== */}
          {/* Section 2: Markdown content */}
          <View style={mainStyles.articleContent}>

            <Markdown
              style={markdownStyles}
              rules={{
                image: (node, children, parent, styles) => {
                  const imageUrl = node.attributes.src;
                  const alt = node.attributes.alt || '';
                  return (
                    <Image
                      key={node.key}
                      source={{ uri: imageUrl }}
                      style={{ width: '100%', height: 200, resizeMode: 'cover', borderRadius: 20 }}
                      accessibilityLabel={alt}
                    />
                  );
                }
              }}
            >
              { convertRelativeImageUrls(storyData?.parent_story_details || '') }
            </Markdown>

            {/* Divider */}
            <View style={mainStyles.sectionDivider} />
          </View>

          {/* =================================================================== */}
          {/* Section 3: Essentials navigation */}
          {storyData.parent_story_type === 'essentials' && (
            <View style={mainStyles.essentialsNavContainer}>
              <Text style={[fontStyles.heading1, mainStyles.essentialsNavHeading]}>Want to go on a reading streak?</Text>
              <View style={mainStyles.essentialsNavButtons}>
                <TouchableOpacity
                  style={[mainStyles.navButton, !storyData.previous_story_id && mainStyles.navButtonDisabled]}
                  onPress={() => {
                    if (storyData.previous_story_id) {
                      navigation.replace('ParentStory', { storyId: storyData.previous_story_id });
                    }
                  }}
                  disabled={!storyData.previous_story_id}
                >
                  <Text style={[fontStyles.bodyMedium, mainStyles.navButtonText]}>&lt; Previous Article</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[mainStyles.navButton, !storyData.next_story_id && mainStyles.navButtonDisabled]}
                  onPress={() => {
                    if (storyData.next_story_id) {
                      navigation.replace('ParentStory', { storyId: storyData.next_story_id });
                    }
                  }}
                  disabled={!storyData.next_story_id}
                >
                  <Text style={[fontStyles.bodyMedium, mainStyles.navButtonText]}>Next Article &gt;</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* =================================================================== */}
          {/* Section 4: Recommended stories */}
          {storyData.parent_story_type !== 'essentials' && relatedStories.length > 0 && (
            <View style={mainStyles.relatedContainer}>
              <Text style={[fontStyles.heading1, mainStyles.relatedHeading]}>
                Related articles if you are interested in the topic
              </Text>

              {relatedStories.map(relatedStoryItem => (
                <ParentStoryCard
                  key={relatedStoryItem.parent_story_id}
                  story={relatedStoryItem}
                  onPress={() => navigation.replace('ParentStory', { key: relatedStoryItem.parent_story_id, storyId: relatedStoryItem.parent_story_id })}
                />
              ))}
            </View>
          )}

        </ScrollView>
      </View>

      {/* Safe area for bottom of the screen */}
      <SafeAreaView edges={['bottom']} style={mainStyles.parentOtherStoryLayoutBottomSafeArea} />
    </View>
  );
};

export default ParentStoryContainer;

