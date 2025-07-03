import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

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
        <>
          <Image source={icon} style={styles.icon} />
          <Text style={styles.valueText}>{`+${value}`}</Text>
        </>
      )}
    </View>
  </View>
);

export default function RewardsPanel({ xp = 0, star = 0 }) {
  return (
    <View style={styles.wrapper}>
      <RewardCard
        label="Stars Earned"
        icon={require('../../assets/icons/star.png')}
        value={star}
        countIcons={true}
        bgHeader={'#F99707'}
        bgColor={'#FFF2C6'}
      />

      <RewardCard
        label="XP Earned"
        icon={require('../../assets/icons/flash.png')}
        value={xp}
        countIcons={false}
        bgHeader={'#11BBB8'}
        bgColor={'#CBFCF6'}
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
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  icon: {
    width: 20,
    height: 20,
    marginBottom: 2,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  },
  smallIcon: {
    width: 18,
    height: 18,
    marginHorizontal: 1,
  },
  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
