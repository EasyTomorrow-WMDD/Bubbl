import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import { globalStyles } from '../../styles/BubblStyles';
import { profileStyles } from '../../styles/ProfileStyles';
import { fontStyles } from '../../styles/BubblFontStyles';
import BubblColors from '../../styles/BubblColors';
import addButtonSign from '../../assets/icons/add_sign.png';

const ProfileAddCard = ({ type, navigation }) => {
  // Label for the add profile card based on type
  const label = type === 'parent' ? 'Add Parent\n(Guardian)' : 'Add Child';
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
        <Image source={addButtonSign} style={profileStyles.addIcon} resizeMode="contain" />
        <Text style={[fontStyles.bodyMedium, profileStyles.nickname, {color: BubblColors.BubblOrange950}]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileAddCard;
