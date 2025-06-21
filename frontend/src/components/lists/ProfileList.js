import React from 'react';
import { View } from 'react-native';
import { globalStyles } from '../../styles/BubblStyles';
import ProfileCard from '../cards/ProfileCard';
import ProfileAddCard from '../cards/ProfileAddCard';

// ==========================================================================
// ProfileList component
// A reusable component to display a list of profile cards
// Props:
// - profiles: Array of profile objects to display
// - type: Type of profiles (e.g., 'friends', 'followers')
// - navigation: Navigation object for navigating to profile details
// - showAddCard: Boolean to conditionally show the add profile card
const ProfileList = ({ profiles, type, navigation, showAddCard }) => {
  return (
    // Render a list of profile cards
    <View style={globalStyles.cardRow}>
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          type={type}
          navigation={navigation}
        />
      ))}
      {/* Conditionally render the add card if showAddCard is true */}
      {showAddCard && (
        <ProfileAddCard type={type} navigation={navigation} />
      )}

    </View>
  );
};

export default ProfileList;
