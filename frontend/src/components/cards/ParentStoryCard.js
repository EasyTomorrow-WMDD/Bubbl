// ParentStoryCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import placeholderImage from '../../assets/images/placeholder_parent_stories.png'; // placeholder image for stories if featured image is not available
import { PARENT_STORY_TYPE_LABELS } from '../../constants/BubblConstants';

const ParentStoryCard = ({ story, onPress, showTypeTag = false }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={story.parent_story_featured_image_url ? { uri: story.parent_story_featured_image_url } : placeholderImage}
          style={styles.image}
          resizeMode="cover"
        />
        {showTypeTag && story.parent_story_type && (
          <View style={styles.readTag}>
            <Text style={styles.readTagText}>
              {showTypeTag ? PARENT_STORY_TYPE_LABELS[story.parent_story_type] : 'Read'}
            </Text>
          </View>
        )}
        {!showTypeTag && story.read && (
          <View style={styles.readTag}>
            <Text style={styles.readTagText}>Read</Text>
          </View>
        )}
      </View>
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{story.parent_story_title}</Text>
        <Text style={styles.cardSummary}>{story.parent_story_summary}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ParentStoryCard;


const styles = StyleSheet.create({
  card: {
    width: 240,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginLeft: 6,
    marginRight: 6,
    backgroundColor: '#fff',
    marginTop: 12,
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

