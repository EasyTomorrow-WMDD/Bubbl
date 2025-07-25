import React from 'react';
import { View } from 'react-native';
import { globalStyles } from '../../styles/BubblStyles';
import { profileStyles } from '../../styles/ProfileStyles';
import ProfileCard from '../cards/ProfileCard';
import ProfileAddCard from '../cards/ProfileAddCard';

// ==========================================================================
// ProfileList component
// A reusable component to display a list of profile cards
// Props:
// - profiles: Array of profile objects to display
// - type: Type of profiles (e.g., 'friends', 'followers')
// - navigation: Navigation object for navigating to profile details
// - onCardPress: Function to handle custom card press events
// - showAddCard: Boolean to conditionally show the add profile card
const ProfileList = ({ profiles, type, navigation, onCardPress, showAddCard = true }) => {
  return (
    // Render a list of profile cards
    <View style={profileStyles.cardRow}>
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          type={type}
          {...(onCardPress && { onPress: () => onCardPress(profile.user_id, profile.user_nickname, profile.avatar_id) })}
          navigation={navigation}
        />
      ))}
      {/* Conditionally render the add card if showAddCard is true AND there is no profile */}
      {showAddCard && profiles.length === 0 && (
        <ProfileAddCard type={type} navigation={navigation} />
      )}

    </View>
  );
};

export default ProfileList;
