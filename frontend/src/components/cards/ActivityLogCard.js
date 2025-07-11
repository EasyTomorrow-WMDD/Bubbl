import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { format, parseISO } from 'date-fns';
import { clanImages } from '../../utils/ClanMappings'; // Import clan images mapping
import { fontStyles } from '../../styles/BubblFontStyles';
import BubblColors from '../../styles/BubblColors';
import { childProgressStyles } from '../../styles/BubblParentChildProgressStyles';

// ============================================================================
// ActivityLogCard Component
const ActivityLogCard = ({ item, index, previousItem }) => {
  const currentDate = format(parseISO(item.log_timestamp), 'MMMM dd, yyyy');
  const previousDate = previousItem
    ? format(parseISO(previousItem.log_timestamp), 'MMMM dd, yyyy')
    : null;
  const showDateDivider = currentDate !== previousDate;
  const clanImage = clanImages[item.clan] || require('../../assets/icons/clans/clan_purple.png'); // Fallback image

  return (
    <View>
      {showDateDivider && (
        <View style={childProgressStyles.activityLogDateDividerContainer}>
          <Text style={[fontStyles.bodyTiny, childProgressStyles.activityLogDateDividerText]}>{currentDate}</Text>
        </View>
      )}
      <View style={childProgressStyles.activityLogCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Image source={clanImage} style={childProgressStyles.activityLogCardImage} />
          <View style={childProgressStyles.activityLogCardTextContainer}>
            <Text style={[fontStyles.heading3, childProgressStyles.activityLogCardSummary]}>{item.log_event_summary}</Text>
            <Text style={[fontStyles.bodySmall, childProgressStyles.activityLogCardDetail]}>{item.log_event}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ActivityLogCard;
