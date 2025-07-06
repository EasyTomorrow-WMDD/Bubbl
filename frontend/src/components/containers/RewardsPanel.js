import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import BubblColors from '../../styles/BubblColors';

const RewardCard = ({ label, icon, value, countIcons, bgHeader, bgColor }) => (
  <View style={[styles.cardWrapper, { backgroundColor: bgHeader }]}>
    <View style={[styles.cardHeader, { backgroundColor: bgHeader }]}>
      <Text style={styles.headerText}>{label}</Text>
    </View>
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      {countIcons ? (
        <View style={styles.iconRow}>
          {Array.from({ length: value }).map((_, index) => (
            <Image
              key={index}
              source={icon}
              style={styles.smallIcon}
            />
          ))}
        </View>
      ) : (
        <View style={styles.inlineRow}>
          <Image source={icon} style={styles.icon} />
          <Text style={styles.valueText}>{`+${value}`}</Text>
        </View>
      )}
    </View>
  </View>
);

export default function RewardsPanel({ xp = 0, star = 0 }) {
  return (
    <View style={styles.wrapper}>
      <RewardCard
        label="STARS"
        icon={require('../../assets/icons/star_pirple.png')}
        value={star}
        countIcons={true}
        bgHeader={BubblColors.BubblOrange300}
        bgColor={BubblColors.BubblOrange100}
      />

      <RewardCard
        label="Total XP"
        icon={require('../../assets/icons/flash_gold.png')}
        value={xp}
        countIcons={false}
        bgHeader={BubblColors.BubblOrange300}
        bgColor={BubblColors.BubblOrange100}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: 10,
    gap: 12,
  },
  cardWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    width: 120,
  },
  card: {
    height: 60,
    borderRadius: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  cardHeader: {
    width: '100%',
    paddingVertical: 4,
    alignItems: 'center',
  },
  headerText: {
    color: BubblColors.BubblNeutralDark,
    fontWeight: 'bold',
    fontSize: 14,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  icon: {
    width: 26,
    height: 26,
  },
  smallIcon: {
    width: 24,
    height: 22,
    marginHorizontal: 1,
  },
  valueText: {
    fontSize: 16,
    fontWeight: '400',
    color: BubblColors.BubblNeutralDarker,
  },
});
