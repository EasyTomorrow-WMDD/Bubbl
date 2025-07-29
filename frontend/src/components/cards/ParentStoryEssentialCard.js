import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, Pressable } from 'react-native';
import placeholderImage from '../../assets/images/placeholder_parent_stories.png'; // placeholder image for stories if featured image is not available
import { parentStyles } from '../../styles/BubblParentMainStyles';
import { fontStyles } from '../../styles/BubblFontStyles';
import BubblColors from '../../styles/BubblColors';
import { ARTICLE_IMAGE_URL } from '../../config/BubblImageConfig';

// ============================================================================
// ParentEssentialStoryCard Component
const ParentStoryEssentialCard = ({ story, onPress }) => {
  return (
    <Pressable style={parentStyles.parentEssentialCard} onPress={onPress}>
      <View style={parentStyles.parentEssentialCardWrapper}>
        {/* Image background with story's featured image or placeholder */}
        <ImageBackground
          source={story.parent_story_featured_image_url ? { uri: `${ARTICLE_IMAGE_URL}${story.parent_story_featured_image_url}` } : placeholderImage}
          style={parentStyles.parentEssentialCardImage}
          imageStyle={parentStyles.parentEssentialCardImageStyle}
        >
          {/* Indicator if story has been read or not */}
          {story.read && (
            <View style={parentStyles.parentStoryReadTag}>
              <Text style={[fontStyles.bodySmall, parentStyles.parentStoryReadTagText]}>Read</Text>
            </View>
          )}
          {/* Story title and summary */}
          <View style={parentStyles.parentStoryCardTextContainer}>
            <Text style={[fontStyles.heading2, parentStyles.parentStoryCardTitle]}>{story.parent_story_title}</Text>
            <Text style={[fontStyles.bodyMedium, parentStyles.parentStoryCardSummary]}>{story.parent_story_summary}</Text>
          </View>
        </ImageBackground>
      </View>
    </Pressable>
  );
};

export default ParentStoryEssentialCard;
