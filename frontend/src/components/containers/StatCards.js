import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';


const StatCard = ({ label, icon, value, extra }) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
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
            <StatCard label="Total HP" icon={require('../../assets/icons/heart.png')} value={user.user_energy} />
            <StatCard label="Total Stars" icon={require('../../assets/icons/star.png')} value={user.user_star} />
            <StatCard label="XP" icon={require('../../assets/icons/flash.png')} value={user.user_xp} />
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
    },
    card: {
        width: 100,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        alignItems: 'center',
        paddingBottom: 10,
    },
    cardHeader: {
        backgroundColor: '#19D4E0',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    icon: {
        width: 30,
        height: 30,
        marginVertical: 6,
    },
    valueText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    extraText: {
        fontSize: 12,
        fontWeight: 'normal',
    },
});
