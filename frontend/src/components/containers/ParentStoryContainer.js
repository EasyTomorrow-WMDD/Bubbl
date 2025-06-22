import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For "X" icon
import { useNavigation, useRoute } from '@react-navigation/native';
import LoadProfileInfo from '../../utils/LoadProfileInfo'; 
import supabase from '../../services/supabase';
import axios from 'axios';
import BubblConfig from '../../config/BubblConfig';
import Markdown from 'react-native-markdown-display';
import ParentStoryCard from '../cards/ParentStoryCard'; 


import { PARENT_STORY_TYPE_LABELS } from '../../constants/BubblConstants';

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

    // Only fetch related articles if the story type is not 'essentials'
    if (storyData?.parent_story_type !== 'essentials') {
      fetchRelated();
    }

  }, [storyData]);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const { parent_story_type } = storyData;

  const headingText =
    parent_story_type === 'essentials' ? 'Essentials' : 'Explore Articles';

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* Section 1: Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{headingText}</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Scrollable content (for the rest of the sections) */}
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Section 2: Markdown content */}
        <View style={styles.articleContent}>
          <Markdown style={markdownStyles}>
            {(storyData?.parent_story_details || '').replace(
              '[SUPABASE_PROJECT_ID]',
              BubblConfig.SUPABASE_PROJECT_ID
            )}
          </Markdown>

          {/* Divider */}
          <View style={styles.sectionDivider} />
        </View>

        {/* Section 3: Essentials navigation */}
        {storyData.parent_story_type === 'essentials' && (
          <View style={styles.essentialsNavContainer}>
            <Text style={styles.essentialsNavHeading}>Want to go on a reading streak?</Text>
            <View style={styles.essentialsNavButtons}>
              <TouchableOpacity
                style={[styles.navButton, !storyData.previous_story_id && styles.navButtonDisabled]}
                onPress={() => {
                  if (storyData.previous_story_id) {
                    navigation.replace('ParentStory', { storyId: storyData.previous_story_id });
                  }
                }}
                disabled={!storyData.previous_story_id}
              >
                <Text style={styles.navButtonText}>&lt; Previous Article</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.navButton, !storyData.next_story_id && styles.navButtonDisabled]}
                onPress={() => {
                  if (storyData.next_story_id) {
                    navigation.replace('ParentStory', { storyId: storyData.next_story_id });
                  }
                }}
                disabled={!storyData.next_story_id}
              >
                <Text style={styles.navButtonText}>Next Article &gt;</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Section 4: Recommended stories */}
        {storyData.parent_story_type !== 'essentials' && relatedStories.length > 0 && (
          <View style={styles.relatedContainer}>
            <Text style={styles.relatedHeading}>
              Related articles if you are interested in the topic
            </Text>

            {relatedStories.map(relatedStoryItem => (
              <ParentStoryCard
                key={relatedStoryItem.parent_story_id}
                story={relatedStoryItem}
                onPress={() => navigation.replace('ParentStory', { storyId: relatedStoryItem.parent_story_id })}
              />
            ))}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

export default ParentStoryContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#000',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 18,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  articleContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
    backgroundColor: '#fff',
  },

  sectionDivider: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 24,
  },
  // Essentials navigation
  essentialsNavContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
  },

  essentialsNavHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },

  essentialsNavButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  navButton: {
    flex: 1,
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },

  navButtonDisabled: {
    backgroundColor: '#ccc',
  },

  navButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  // Related articles section
  relatedContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },

  relatedHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },


});


const markdownStyles = {
  body: {
    color: '#333',
    fontSize: 16,
    lineHeight: 24,
  },
  heading1: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e90ff',
    marginBottom: 12,
  },
  heading2: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  bullet_list: {
    marginVertical: 8,
    paddingLeft: 16,
  },
  list_item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 12,
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 16,
  },
};
