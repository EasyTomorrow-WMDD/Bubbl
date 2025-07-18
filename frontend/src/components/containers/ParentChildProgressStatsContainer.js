import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import supabase from '../../services/supabase';
import axios from 'axios';
import BubblConfig from '../../config/BubblConfig';
import { avatarImages } from '../../utils/AvatarMappings';
import { childProgressStyles } from '../../styles/BubblParentChildProgressStyles';
import { fontStyles } from '../../styles/BubblFontStyles';
import BubblColors from '../../styles/BubblColors';

// ============================================================================
// ParentChildProgressStatsContainer Component
const ParentChildProgressStatsContainer = ({ userId }) => {

  // State to manage loading and stats data
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  const screenHeight = Dimensions.get('window').height; // Get the screen height
  

  // ----------------------------------------------------------------
  // Fetch stats data for the specified user
  useEffect(() => {
    const fetchStats = async () => {
      try {

        // Step 1: Get the current user's session to retrieve access token
        const { data: { session } } = await supabase.auth.getSession();

        // console.log('[INFO][ChildStats] Fetching stats for userId:', userId);

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

    if (userId) {
      fetchStats();
    }
  }, [userId]);


  // ----------------------------------------------------------------
  // StatBox Component for displaying individual stats
  const StatBox = ({ icon, value, label }) => (
    <View style={childProgressStyles.childProgressStatBox}>
      {/* Stat icon */}
      <View style={childProgressStyles.childProgressStatIconContainer}>
        <Image source={icon} style={childProgressStyles.childProgressStatIcon} />
      </View>
      {/* Stat value and label */}
      <View>
        <Text style={[fontStyles.heading3, childProgressStyles.childProgressStatValue]}>{value}</Text>
        <Text style={[fontStyles.bodyTiny, childProgressStyles.childProgressStatLabel]}>{label}</Text>
      </View>
    </View>
  );

  // ----------------------------------------------------------------
  // Loading state handling
  if (loading || !stats) return <ActivityIndicator size="large" color="#000" />;

  // ----------------------------------------------------------------
  // Render the stats UI
  const { user, avatar_assets, badges } = stats;
  const avatarSource = avatarImages[user.avatar_id] || avatarImages['avatar01']; 
  const progress = (user.user_xp - user.xp_to_current_level) / (user.xp_to_next_level - user.xp_to_current_level); // Calculate progress as a fraction
  // console.log('[DEBUG][ChildStats] User current xp:', user.user_xp);
  // console.log('[DEBUG][ChildStats] User xp to current level:', user.xp_to_current_level);
  // console.log('[DEBUG][ChildStats] User xp to next level:', user.xp_to_next_level);
  // console.log('[DEBUG][ChildStats] User progress:', progress);

  return (
    <View style={childProgressStyles.childProgressStatsContainer}>

      {/* Main container for child progress stats */}
      <View style={childProgressStyles.childProgressStatsMainContainer}>

        {/* Header row (using flex to show avatar on left and other info on right) */}
        <View style={childProgressStyles.childProgressHeaderRow}>

          {/* Left side: Avatar */}
          <View style={childProgressStyles.childProgressAvatarWrapper}>
            <Image 
              source={avatarSource} 
              style={childProgressStyles.childProgressAvatarLayer} 
              resizeMode='contain' 
            />
          </View>

          {/* Right side: User Info */}
          <View style={childProgressStyles.childProgressUserInfo}>
            <Text style={[fontStyles.display2, childProgressStyles.childProgressNickname]}>{user.user_nickname}</Text>
            <Text style={[fontStyles.tagline, childProgressStyles.childProgressLevelText]}>Level {user.user_level}</Text>
            <View style={childProgressStyles.childProgressProgressBar}>
              <View style={[childProgressStyles.childProgressProgressFill, { flex: progress }]} />
              <View style={{ flex: 1 - progress }} />
            </View>
          </View>

        </View>

        {/* Stats: Day Streak, Stars, Badge Count */}
        <View style={childProgressStyles.childProgressStatsRow}>
          <StatBox icon={require('../../assets/icons/flash_purple.png')} value={user.user_day_streak} label="Day Streak" />
          <StatBox icon={require('../../assets/icons/star.png')} value={user.user_star} label="Collect Stars" />
          <StatBox icon={require('../../assets/icons/badge.png')} value={`x${user.badge_count}`} label="Badges" />
        </View>

      </View>

    </View>
  );
};

export default ParentChildProgressStatsContainer;
