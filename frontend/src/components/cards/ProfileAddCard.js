import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/BubblStyles';
import { profileStyles } from '../../styles/ProfileStyles';

const ProfileAddCard = ({ type, navigation }) => {
  // Label for the add profile card based on type
  const label = type === 'parent' ? '+\nAdd Parent\n(Guardian)' : '+\nAdd Child';
  // Style to apply
  const cardStyle = type === 'parent' ? profileStyles.newParentCard : profileStyles.newChildCard;

  // ==========================================================================
  // Render the profile add card
  return (
    <TouchableOpacity
      style={profileStyles.card}
      onPress={() => navigation.navigate('AddProfile', { profile_type: type })}
    >
      <View style={cardStyle}>
        <Text style={profileStyles.nickname}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileAddCard;
