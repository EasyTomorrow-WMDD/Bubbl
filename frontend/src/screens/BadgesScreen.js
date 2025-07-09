import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { BASE_URL } from '../utils/config';
import { URI_URL } from '../utils/config';
import BubblColors from '../styles/BubblColors';

const BadgesScreen = ({ userId, refreshBadges }) => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchBadges = async () => {
      try {
        const url = `${BASE_URL}/api/users/${userId}/badges`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch badges');
        const data = await response.json();
        setBadges(data);
      } catch (err) {
        console.error('Error fetching badges:', err);
        Alert.alert('Error loading badges');
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, [userId]);

  const handleToggleBadge = useCallback((badgeId) => {
    setBadges((prev) => {
      const badgeIndex = prev.findIndex(b => b.badge_id === badgeId);
      if (badgeIndex === -1 || !prev[badgeIndex].has_earned) return prev;

      const activeCount = prev.filter(x => x.badge_active).length;
      const newBadges = [...prev];

      if (newBadges[badgeIndex].badge_active) {
        newBadges[badgeIndex] = { 
          ...newBadges[badgeIndex], 
          badge_active: false, 
          selectionOrder: null 
        };
      } else {
        if (activeCount >= 3) {
          Alert.alert('Only 3 badges can be active at once.');
          return prev;
        }
        newBadges[badgeIndex] = { 
          ...newBadges[badgeIndex], 
          badge_active: true, 
          selectionOrder: activeCount + 1 
        };
      }

      return newBadges;
    });
  }, []);

  const handleSaveBadges = async () => {
    const activeBadgeIds = badges
      .filter((b) => b.badge_active)
      .sort((a, b) => (a.selectionOrder || 0) - (b.selectionOrder || 0))
      .map((b) => b.badge_id);

    try {
      const res = await fetch(`${BASE_URL}/api/users/${userId}/badges/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activeBadgeIds }),
      });

      if (!res.ok) throw new Error('Failed to save badges');
      Alert.alert('Badges saved!');

      if (refreshBadges) refreshBadges();

    } catch (err) {
      console.error('Error saving badges:', err);
      Alert.alert('Error saving badges');
    }
  };

  const renderItem = useCallback(({ item }) => {
    const imageUrl = item.badge_image_url
      ? `${URI_URL}/${item.badge_image_url}`
      : 'https://via.placeholder.com/60x60.png?text=Badge';

    return (
      <TouchableOpacity
        disabled={!item.has_earned}
        onPress={() => handleToggleBadge(item.badge_id)}
        activeOpacity={0.7}
      >
        <View style={styles.badgeItem}>
          <View style={styles.badgeWrapper}>
            <Image
              source={{ uri: imageUrl }}
              style={[
                styles.image,
                !item.has_earned && styles.locked,
                item.has_earned && !item.badge_active && styles.inactive,
                item.has_earned && item.badge_active && styles.selectedBadge,
              ]}
            />
            {item.has_earned && item.badge_active && (
              <View style={styles.selectionCircle}>
                <Text style={styles.selectionText}>
                  {item.selectionOrder ?? ''}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.label}>{item.badge_name ?? 'Badge'}</Text>
        </View>
      </TouchableOpacity>
    );
  }, [handleToggleBadge]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={BubblColors?.BubblPurple400 ?? '#6a1b9a'} />
        <Text style={{ marginTop: 10 }}>Loading badges...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      contentContainerStyle={styles.screen}
      showsVerticalScrollIndicator={true}
      vertical={true}
      showsHorizontalScrollIndicator={false}
      // contentContainerStyle={{ paddingHorizontal: 20, flexDirection: 'row' }}
      style={{ height: 450 }}
    >
     
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Choose up to 3 favorites badges to stand out!
        </Text>
      </View>

      <View style={styles.grid}>
        {badges.length > 0 ? (
          badges.map((item) => (
            <View key={`badge-${item.badge_id}`}>
              {renderItem({ item })}
            </View>
          ))
        ) : (
          <Text>No badges available</Text>
        )}
      </View>

      <Pressable
        onPress={handleSaveBadges}
        style={({ pressed }) => [
          styles.saveButton,
          pressed && styles.saveButtonPressed
        ]}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </Pressable>
    </ScrollView>
  );
};

export default BadgesScreen;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: 'center',
  },
  infoBox: {
    width: '100%',
    backgroundColor: BubblColors.BubblOrange100,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  infoBoxText: {
    fontSize: 16,
    color: BubblColors.BubblNeutralDark,
    textAlign: 'center',
    fontWeight: '400',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
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
    width: 50,
    height: 50,
  },
  locked: {
    opacity: 0.2,
  },
  inactive: {
    opacity: 0.5,
  },
  selectedBadge: {
    borderWidth: 2,
    borderColor: BubblColors.BubblPurple500,
    borderRadius: 8,
  },
  selectionCircle: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: BubblColors.BubblPurple800,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionText: {
    color: BubblColors.BubblNeutralWhite,
    fontSize: 12,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: BubblColors?.BubblPurple300,
    width: 358,
    height: 56,
    borderRadius: 12,
    marginHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonPressed: {
    backgroundColor: BubblColors?.BubblPurple400,
  },
  saveButtonText: {
    color: BubblColors.BubblNeutralDark,
    fontSize: 16,
    fontWeight: '500',
  },
});