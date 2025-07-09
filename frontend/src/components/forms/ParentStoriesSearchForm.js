import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PARENT_STORY_TYPE_LABELS } from '../../constants/BubblConstants';
import { parentStyles } from '../../styles/BubblParentMainStyles';
import { fontStyles } from '../../styles/BubblFontStyles';
import BubblColors from '../../styles/BubblColors';

// ==========================================================================
// Parent Stories Search Form Component
const ParentStoriesSearchForm = ({
  searchText,
  setSearchText,
  selectedType,
  setSelectedType,
}) => {
  const tagKeys = ['all', ...Object.keys(PARENT_STORY_TYPE_LABELS)];

  const [inputText, setInputText] = useState(searchText || ''); // Local state for input text

  // ----------------------------------------------------------------
  // Method to handle search text entry
  const handleSubmit = () => {
    setSearchText(inputText.trim());
  }

  // ----------------------------------------------------------------
  // Render the search form with search box and tag filter
  return (
    <View style={parentStyles.parentOtherStoriesContainer}>
      <Text style={[fontStyles.heading1, parentStyles.parentOtherStoriesSectionHeading]}>Explore articles that interest you</Text>

      {/* Search Box */}
      <View style={parentStyles.bubblSearchBox}>
        <Ionicons name="search" size={20} color={BubblColors.BubblNeutralDarkest60} style={parentStyles.bubblSearchIcon} />
        <TextInput
          placeholder="Search articles..."
          value={inputText}
          onChangeText={setInputText}
          style={[fontStyles.bodyMedium, parentStyles.bubblFormInput]}
          onSubmitEditing={handleSubmit}
          onBlur={handleSubmit}
          returnKeyType="search"
        />
      </View>

      {/* Tag Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={parentStyles.tagScroll}>
        {tagKeys.map((key) => {
          const label = key === 'all' ? 'All' : PARENT_STORY_TYPE_LABELS[key];
          const isSelected = selectedType === key;

          return (
            <TouchableOpacity
              key={key}
              onPress={() => setSelectedType(key)}
              style={[
                fontStyles.bodySmall,
                parentStyles.tag,
                isSelected ? parentStyles.tagSelected : parentStyles.tagUnselected,
              ]}
            >
              <Text
                style={[
                  fontStyles.bodySmall,
                  parentStyles.tagText,
                  isSelected ? parentStyles.tagTextSelected : parentStyles.tagTextUnselected,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ParentStoriesSearchForm;
