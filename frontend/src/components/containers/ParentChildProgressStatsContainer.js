import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import supabase from '../../services/supabase';
import axios from 'axios';
import BubblConfig from '../../config/BubblConfig';

const ParentChildProgressStatsContainer = ({ userId }) => {

  // State to manage loading and stats data
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {

        // Step 1: Get the current user's session to retrieve access token
        const { data: { session } } = await supabase.auth.getSession();

        // Step 2: Call the backend API to get stats for the specified user
        const response = await axios.get(`${BubblConfig.BACKEND_URL}/api/users/${userId}/stats`, {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (response.data.success) {
          setStats(response.data);
        } else {
          console.warn('[ERROR][ChildStats] Failed:', response.data.error);
        }
      } catch (err) {
        console.error('[ERROR][ChildStats] Error:', err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchStats();
  }, [userId]);

  if (loading || !stats) return <ActivityIndicator size="large" color="#000" />;

  const { user, avatar_assets, badges } = stats;
  const progress = (user.user_xp - user.xp_to_current_level) / (user.xp_to_next_level - user.xp_to_current_level);

  return (
    <View style={styles.container}>

      {/* Header row */}
      <View style={styles.headerRow}>

        {/* Avatar Rendering */}
        <View style={styles.avatarWrapper}>
          {avatar_assets.map((asset, index) => (
            <Image
              key={index}
              source={{ uri: asset.url }}
              style={[styles.avatarLayer, { zIndex: index }]}
              resizeMode="contain"
            />
          ))}
          <Text>Avatar here</Text>
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <View style={styles.badgesRow}>
            <Text>Badges here</Text>
            {badges.map((b, i) => (
              <Image key={i} source={{ uri: b.url }} style={styles.badgeIcon} />
            ))}
          </View>
          <Text style={styles.nickname}>{user.user_nickname}</Text>
          <Text style={styles.levelText}>Level {user.user_level}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { flex: progress }]} />
            <View style={{ flex: 1 - progress }} />
          </View>
        </View>

      </View>

      {/* Stats: Day Streak, Stars, Badge Count */}
      <View style={styles.statsRow}>
        <StatBox icon={require('../../assets/icons/fire.png')} value={user.user_day_streak} label="Day Streak" />
        <StatBox icon={require('../../assets/icons/star.png')} value={user.user_star} label="Collect Stars" />
        <StatBox icon={require('../../assets/icons/badge.png')} value={user.badge_count} label="Badges" />
      </View>
    </View>
  );
};

const StatBox = ({ icon, value, label }) => (
  <View style={styles.statBox}>
    <Image source={icon} style={styles.statIcon} />
    <View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  </View>
);

export default ParentChildProgressStatsContainer;


const styles = StyleSheet.create({
  container: { padding: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  avatarWrapper: { width: 100, height: 100, position: 'relative', backgroundColor: '#888' },
  avatarLayer: { position: 'absolute', width: '100%', height: '100%' },
  userInfo: { marginLeft: 16, flex: 1 },
  badgesRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  badgeIcon: { width: 32, height: 32, borderRadius: 16 },
  nickname: { fontSize: 20, fontWeight: 'bold' },
  levelText: { fontSize: 16, color: '#666' },
  progressBar: { flexDirection: 'row', height: 6, backgroundColor: '#ddd', borderRadius: 3, overflow: 'hidden', marginTop: 6 },
  progressFill: { backgroundColor: '#333' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 16 },
  statBox: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statIcon: { width: 28, height: 28 },
  statValue: { fontSize: 16, fontWeight: 'bold' },
  statLabel: { fontSize: 12, color: '#555' },
});

