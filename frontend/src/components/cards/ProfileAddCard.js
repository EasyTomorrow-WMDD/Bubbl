import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/BubblStyles';

const ProfileAddCard = ({ type, navigation }) => {
  // Label for the add profile card based on type
  const label = type === 'parent' ? '+\nAdd Parent\n(Guardian)' : '+\nAdd Child';

  // ==========================================================================
  // Render the profile add card
  return (
    <TouchableOpacity
      style={globalStyles.card}
      onPress={() => navigation.navigate('AddProfile', { profile_type: type })}
    >
      <View style={globalStyles.avatarPlaceholder} />
      <Text style={globalStyles.nickname}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ProfileAddCard;
