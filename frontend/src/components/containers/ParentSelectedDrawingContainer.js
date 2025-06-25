import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ParentSelectedDrawingContainer = ({ navigation, route }) => {
  const { drawing } = route.params;

  console.log('[ParentSelectedDrawingContainer] Selected drawing:', drawing);

  const formattedDate = new Date(drawing.created_at).toLocaleDateString();

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Drawing */}
      <Image
        source={{ uri: drawing.signedUrl }}
        style={styles.drawingImage}
        resizeMode="contain"
      />

      {/* Bottom Info */}
      <View style={styles.bottomBox}>
        {/* Mood */}
        <View style={styles.moodBox}>
          {/* You can replace this with a PNG if you have mood icons */}
          <Text style={styles.moodText}>{drawing.mood}</Text>
        </View>

        {/* Date */}
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>
    </View>
  );
};

export default ParentSelectedDrawingContainer;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topHeader: {
    backgroundColor: '#8361E4',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawingImage: {
    flex: 1,
    width: '100%',
    marginVertical: 16,
  },
  bottomBox: {
    backgroundColor: '#EDEBFC',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    alignItems: 'center',
  },
  moodBox: {
    backgroundColor: '#8361E4',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 10,
  },
  moodText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    color: '#555',
  },
});