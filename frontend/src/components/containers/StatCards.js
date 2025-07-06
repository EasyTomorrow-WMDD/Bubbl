import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';
import FavoriteBadgesDisplay from './FavoriteBadgesDisplay';
import { fontStyles } from '../../styles/BubblFontStyles';


const StatCard = ({ label, icon, value, extra, bgHeader, bgColor }) => (
  <View style={{ backgroundColor: bgHeader, borderRadius: 20 }}>
    <View style={[styles.cardHeader, { backgroundColor: bgHeader }]}>
      <Text style={[fontStyles.bodyDefault, {color: 'white'}]}>{label}</Text>
    </View>
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <Image source={icon} style={styles.icon} />
      <Text style={[fontStyles.bodyDefault]}>{value} {extra && <Text style={styles.extraText}>{extra}</Text>}</Text>
    </View>
  </View>
);

export default function StatsPanel({ user }) {
  if (!user) return null;
  console.log(user);

  return (
    <View style={styles.container}>
      <StatCard label="Total HP" icon={require('../../assets/icons/heart.png')} value={user.user_energy} bgHeader={'#EE47EB'} bgColor={'#FDE8FF'} />
      <StatCard label="Total Stars" icon={require('../../assets/icons/star.png')} value={user.user_star} bgHeader={'#F99707'} bgColor={'#FFF2C6'} />
      <StatCard label="XP" icon={require('../../assets/icons/flash.png')} value={user.user_xp} bgHeader={'#11BBB8'} bgColor={'#CBFCF6'} />
    </View>
  );
}

export function StatsInventory({ user, badges, section }) {
  if (!user) return null;

  return (
    <View>
      <View style={styles.container}>
        <StatCard label="Total Stars" icon={require('../../assets/icons/star.png')} value={user.user_star} bgHeader={'#F99707'} bgColor={'#FFF2C6'}/>
        <StatCard label="Badges" icon={require('../../assets/icons/badge.png')} value={user.user_badge ?? 0} bgHeader={'#25A249'} bgColor={'#D3ECDB'}/>
      </View>
      {section === 'badges' ? <FavoriteBadgesDisplay badges={badges} /> : null }
      
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },

  card: {
    width: 100,
    height: 53,
    borderRadius: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },

  cardHeader: {
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 2,
    alignItems: 'center',
  },

  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },

  icon: {
    width: 22,
    height: 20,
  },

  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

});