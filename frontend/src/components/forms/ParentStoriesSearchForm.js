import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PARENT_STORY_TYPE_LABELS } from '../../constants/BubblConstants';

const ParentStoriesSearchForm = ({
  searchText,
  setSearchText,
  selectedType,
  setSelectedType,
}) => {
  const tagKeys = ['all', ...Object.keys(PARENT_STORY_TYPE_LABELS)];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Explore articles that interest you</Text>

      {/* Search Box */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Search articles..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.input}
        />
      </View>

      {/* Tag Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagScroll}>
        {tagKeys.map((key) => {
          const label = key === 'all' ? 'All' : PARENT_STORY_TYPE_LABELS[key];
          const isSelected = selectedType === key;

          return (
            <TouchableOpacity
              key={key}
              onPress={() => setSelectedType(key)}
              style={[
                styles.tag,
                isSelected ? styles.tagSelected : styles.tagUnselected,
              ]}
            >
              <Text
                style={[
                  styles.tagText,
                  isSelected ? styles.tagTextSelected : styles.tagTextUnselected,
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

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  tagScroll: {
    flexDirection: 'row',
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  tagSelected: {
    backgroundColor: '#111',
  },
  tagUnselected: {
    backgroundColor: '#eee',
  },
  tagText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tagTextSelected: {
    color: '#fff',
  },
  tagTextUnselected: {
    color: '#333',
  },
});

export default ParentStoriesSearchForm;
