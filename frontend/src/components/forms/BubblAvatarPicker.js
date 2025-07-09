import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { avatarImages } from '../../utils/AvatarMappings';
import BubblColors from '../../styles/BubblColors';
import { globalStyles } from '../../styles/BubblStyles';

// ============================================================================
// BubblAvatarPicker component
// A reusable avatar picker component for Bubbl app
// Props:
// - currentAvatarId: The currently selected avatar ID
// - onChange: Callback function to handle avatar selection change
const BubblAvatarPicker = ({ currentAvatarId, onChange }) => {

  // State to manage the selected avatar
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatarId || null);

  // Effect to update the selected avatar if currentAvatarId is provided
  useEffect(() => {
    if (currentAvatarId) {
      setSelectedAvatar(currentAvatarId);
    }
  }, [currentAvatarId]);

  // Method to handle avatar selection
  const handleSelect = (avatarId) => {
    setSelectedAvatar(avatarId);
    onChange(avatarId);
  };

  // ----------------------------------------------------------------
  // Render the avatar picker
  return (
    <View style={globalStyles.avatarPickerContainer}>
      {Object.entries(avatarImages).map(([avatarId, imagePath]) => (
        <TouchableOpacity
          key={avatarId}
          onPress={() => handleSelect(avatarId)}
          style={[
            globalStyles.avatarPickerAvatarWrapper,
            selectedAvatar === avatarId && globalStyles.avatarPickerSelectedAvatar,
          ]}
        >
          <Image source={imagePath} style={globalStyles.avatarPickerAvatarImage} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BubblAvatarPicker;
