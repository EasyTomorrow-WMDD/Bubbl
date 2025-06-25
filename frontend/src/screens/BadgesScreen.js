import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert, Pressable } from 'react-native';
import { BASE_URL } from '../utils/config';
import { URI_URL } from '../utils/config';

const BadgesScreen = ({ userId, refreshBadges }) => {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetchBadges = async () => {
      try {
        const url = `${BASE_URL}/api/users/${userId}/badges`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch badges');
        const data = await response.json();

        let order = 1;
        const processed = data.map((b) => {
          if (b.badge_active) {
            return { ...b, selectionOrder: order++ };
          } else {
            return { ...b, selectionOrder: null };
          }
        });

        setBadges(processed);
      } catch (err) {
        console.error('Error fetching badges:', err);
        Alert.alert('Error loading badges');
      }
    };

    fetchBadges();
  }, [userId]);

  const handleToggleBadge = (badgeId) => {
    setBadges((prev) => {
      const updated = [...prev];
      const selected = updated.find((b) => b.badge_id === badgeId);
      if (!selected || !selected.has_earned) return prev;

      const active = updated.filter((b) => b.badge_active);
      if (selected.badge_active) {
        const oldOrder = selected.selectionOrder;
        selected.badge_active = false;
        selected.selectionOrder = null;

        return updated.map((b) => {
          if (b.badge_active && b.selectionOrder > oldOrder) {
            return { ...b, selectionOrder: b.selectionOrder - 1 };
          }
          return b;
        });
      } else {
        if (active.length >= 3) {
          Alert.alert('Only 3 badges can be active at once.');
          return prev;
        }
        selected.badge_active = true;
        selected.selectionOrder = active.length + 1;
        return updated;
      }
    });
  };

  const handleSaveBadges = async () => {
    const activeBadgeIds = badges
      .filter((b) => b.badge_active)
      .sort((a, b) => a.selectionOrder - b.selectionOrder)
      .map((b) => b.badge_id);

    try {
      const res = await fetch(`${BASE_URL}/api/users/${userId}/badges/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activeBadgeIds }),
      });

      if (!res.ok) throw new Error('Failed to save badges');
      Alert.alert('Badges saved!');

      if (refreshBadges) refreshBadges(); // <- Esto actualiza InventoryScreen

    } catch (err) {
      console.error('Error saving badges:', err);
      Alert.alert('Error saving badges');
    }
  };

  const renderItem = ({ item }) => {
    const badgeImage = (
      <View style={styles.badgeItem}>
        <View style={styles.badgeWrapper}>
          <Image
            source={{
              uri: `${URI_URL}/${item.badge_image_url}`,
            }}
            style={[
              styles.image,
              !item.has_earned && styles.locked,
              item.has_earned && !item.badge_active && styles.inactive,
              item.badge_active && styles.selectedBadge,
            ]}
          />
          {item.badge_active && (
            <View style={styles.selectionCircle}>
              <Text style={styles.selectionText}>{item.selectionOrder}</Text>
            </View>
          )}
        </View>
        <Text style={styles.label}>{item.badge_name}</Text>
      </View>
    );

    return item.has_earned ? (
      <TouchableOpacity onPress={() => handleToggleBadge(item.badge_id)}>
        {badgeImage}
      </TouchableOpacity>
    ) : (
      badgeImage
    );
  };

  return (
    <View>
      <Text style={styles.heading}>Your Badges</Text>
      <FlatList
        data={badges}
        renderItem={renderItem}
        keyExtractor={(item) => item.badge_id}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
      <Pressable onPress={handleSaveBadges} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </Pressable>
    </View>
  );
};

export default BadgesScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  grid: {
    alignItems: 'center',
    paddingBottom: 60,
  },
  badgeItem: {
    alignItems: 'center',
    margin: 10,
    width: 90,
    position: 'relative',
  },
  badgeWrapper: {
    position: 'relative',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
  },
  locked: {
    opacity: 0.2,
  },
  inactive: {
    opacity: 0.5,
  },
  selectedBadge: {
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 8,
  },
  selectionCircle: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'green',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 10,
    marginHorizontal: 60,
    borderRadius: 10,
    marginTop: 10,
  },
  saveButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
