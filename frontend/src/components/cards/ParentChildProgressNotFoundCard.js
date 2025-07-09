import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { fontStyles } from '../../styles/BubblFontStyles';
import { childProgressStyles } from '../../styles/BubblParentChildProgressStyles';
import BubblColors from '../../styles/BubblColors';

const NOT_FOUND_ICON = require('../../assets/icons/emoji_slightly_frowning.png'); 


// ============================================================================
// Card to display when no child progress item is found
const ParentChildProgressNotFoundCard = () => {

  // ----------------------------------------------------------------
  // Render in case no activity logs are found
  return (
    <View style={childProgressStyles.childProgressSearchNotFoundContainer}>
      <Image source={NOT_FOUND_ICON} style={childProgressStyles.childProgressSearchNotFoundIcon} />
      <Text style={[fontStyles.heading2, childProgressStyles.childProgressSearchNotFoundTitle, {textAlign: 'center', paddingHorizontal: 50} ]}>
        Oops! No results found.
      </Text>
      <Text style={[fontStyles.bodyDefault, childProgressStyles.childProgressSearchNotFoundSummary, {textAlign: 'center'}]}>
        Give it another go.
      </Text>
    </View>
  );

};

export default ParentChildProgressNotFoundCard;
