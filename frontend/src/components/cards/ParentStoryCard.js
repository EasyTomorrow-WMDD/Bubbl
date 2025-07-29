import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import placeholderImage from '../../assets/images/placeholder_parent_stories.png'; // placeholder image for stories if featured image is not available
import { PARENT_STORY_TYPE_LABELS } from '../../constants/BubblConstants';
import BubblColors from '../../styles/BubblColors';
import { fontStyles } from '../../styles/BubblFontStyles';
import { parentStyles } from '../../styles/BubblParentMainStyles';
import { ARTICLE_IMAGE_URL } from '../../config/BubblImageConfig';

// ============================================================================
// ParentStoryCard Component
const ParentStoryCard = ({ story, onPress, showTypeTag = false }) => {

  // console.log(`Feature image!: ${ARTICLE_IMAGE_URL}${story.parent_story_featured_image_url}`)

  // ----------------------------------------------------------------
  // Render the ParentStoryCard component
  return (
    <Pressable style={parentStyles.parentStoryOtherCardContainer} onPress={onPress}>

      {/* Card image & tag */}
      <View style={parentStyles.parentStoryOtherCardImageContainer}>
        {/* Image */}
        <Image
          source={story.parent_story_featured_image_url ? { uri: `${ARTICLE_IMAGE_URL}${story.parent_story_featured_image_url}` } : placeholderImage}
          style={parentStyles.parentStoryOtherCardImage}
          resizeMode="cover"
        />
        {/* Tag */}
        {showTypeTag && story.parent_story_type && (
          <View style={parentStyles.parentStoryOtherCardReadTag}>
            <Text style={[fontStyles.bodySmall, parentStyles.parentStoryOtherCardReadTagText]}>
              {showTypeTag ? PARENT_STORY_TYPE_LABELS[story.parent_story_type] : 'Read'}
            </Text>
          </View>
        )}
        {!showTypeTag && story.read && (
          <View style={parentStyles.parentStoryOtherCardReadTag}>
            <Text style={[fontStyles.bodySmall, parentStyles.parentStoryOtherCardReadTagText]}>Read</Text>
          </View>
        )}
      </View>
      {/* Card text */}
      <View style={parentStyles.parentStoryOtherCardTextContainer}>
        <Text style={[fontStyles.heading2, parentStyles.parentStoryOtherCardTitle]}>{story.parent_story_title}</Text>
        <Text style={[fontStyles.bodyDefault, parentStyles.parentStoryOtherCardSummary]}>{story.parent_story_summary}</Text>
      </View>
    </Pressable>
  );
};

export default ParentStoryCard;
