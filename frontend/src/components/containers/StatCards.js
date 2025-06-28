import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';
import FavoriteBadgesDisplay from './FavoriteBadgesDisplay';


const StatCard = ({ label, icon, value, extra, bgHeader, bgColor }) => (
    <View style={[styles.card, {backgroundColor:bgColor}]}>
        <View style={[styles.cardHeader, {backgroundColor:bgHeader}]}>
            <Text style={styles.headerText}>{label}</Text>
        </View>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.valueText}>{value} {extra && <Text style={styles.extraText}>{extra}</Text>}</Text>
    </View>
);

export default function StatsPanel({user}) {

    if (!user) return null;
    console.log(user);

    return (
        <View style={styles.container}>
            <StatCard label="Total HP" icon={require('../../assets/icons/heart.png')} value={user.user_energy} bgHeader={'#EE47EB'} bgColor={'#FDE8FF'}/>
            <StatCard label="Total Stars" icon={require('../../assets/icons/star.png')} value={user.user_star} bgHeader={'#F99707'} bgColor={'#FFF2C6'} />
            <StatCard label="XP" icon={require('../../assets/icons/flash.png')} value={user.user_xp} bgHeader={'#11BBB8'} bgColor={'#CBFCF6'}/>
        </View>
    );

}

export function StatsInventory({user, badges}){
       if (!user) return null;
    
    return (
        <View>
        <View style={styles.container}>
            <StatCard label="Total Stars" icon={require('../../assets/icons/star.png')} value={user.user_star} />
            <StatCard label="Badges" icon={require('../../assets/icons/badge.png')} value={user.user_badge ?? 0} />
        </View>
         <FavoriteBadgesDisplay badges={badges} />
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
    height:70,
    borderRadius: 20,
    alignItems: 'center',
  },

  cardHeader: {
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 4,
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