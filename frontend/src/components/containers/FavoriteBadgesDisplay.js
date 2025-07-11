import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { URI_URL } from '../../utils/config';

const FavoriteBadgesDisplay = ({ badges }) => {
  if (!badges || badges.length === 0) return null;
  
  const selected = badges
    .filter(b => b.selection_order !== null && b.selection_order >= 1 && b.selection_order <= 3)
    .sort((a, b) => a.selection_order - b.selection_order);

  if (selected.length === 0) return null;

  return (
    <View style={styles.row}>
      {selected.map((badge, idx) => (
        <View key={idx} style={styles.badgeContainer}>
          <Image
          source={{ uri: `${URI_URL}/${badge.badge_image_url}?v=${Date.now()}` }}
            style={styles.image}
          />
          <Text style={styles.label}>{badge.badge_name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 25,
  },
  badgeContainer: {
    alignItems: 'center',
    width: 70,
  },
  image: {
    width: 40,
    height: 45,
  },
  label: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
  },
});

export default FavoriteBadgesDisplay;
