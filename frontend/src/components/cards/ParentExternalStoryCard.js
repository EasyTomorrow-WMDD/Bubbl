import React from 'react';
import { View, Text, Image, StyleSheet, Linking, Pressable } from 'react-native';
import placeholderImage from '../../assets/images/placeholder_parent_stories.png'; // placeholder image for stories if featured image is not available
import BubblColors from '../../styles/BubblColors';
import { fontStyles } from '../../styles/BubblFontStyles';
import { parentStyles } from '../../styles/BubblParentMainStyles';

// ============================================================================
// ParentExternalStoryCard Component
const ParentExternalStoryCard = ({ article }) => {

  // ----------------------------------------------------------------
  // Method to handle article press
  const onPress = () => {
    if (article.url) {
      Linking.openURL(article.url).catch(err => console.error('Failed to open URL:', err));
    }
  };

  // ----------------------------------------------------------------
  // Render the external story card
  return (
    <Pressable style={parentStyles.parentStoryOtherCardContainer} onPress={onPress}>

      {/* Card image & tag */}
      <View style={parentStyles.parentStoryOtherCardImageContainer}>
        {/* Image */}
        <Image
          source={article.urlToImage ? { uri: article.urlToImage } : placeholderImage}
          style={parentStyles.parentStoryOtherCardImage}
          resizeMode="cover"
        />
        {/* Tag */}
        <View style={parentStyles.parentStoryOtherCardReadTag}>
          <Text style={[fontStyles.bodySmall, parentStyles.parentStoryOtherCardReadTagText]}>
            External
          </Text>
        </View>
      </View>
      {/* Card text */}
      <View style={parentStyles.parentStoryOtherCardTextContainer}>
        <Text style={[fontStyles.heading2, parentStyles.parentStoryOtherCardTitle]}>{article.title}</Text>
        <Text style={[fontStyles.bodyDefault, parentStyles.parentStoryOtherCardSummary]}>{article.description}</Text>
      </View>
    </Pressable>
  );
};

export default ParentExternalStoryCard;
