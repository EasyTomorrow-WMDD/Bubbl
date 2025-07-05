import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ChildNavbar = ({ navigation, childProfileId }) => {
  return (
    <View style={styles.navbar}>
      {/* Activities */}
      <TouchableOpacity onPress={() => navigation.navigate('ChildMain')} style={styles.navItem}>
        <Image source={require('../../assets/icons/activities.png')} style={styles.navIcon} />
        <Text style={styles.navText}>Activities</Text>
      </TouchableOpacity>

      {/* Mood Draw */}
      <TouchableOpacity
        onPress={() => navigation.navigate('ChildMood', { childProfileId })}
        style={styles.navItem}
      >
        <Image source={require('../../assets/icons/Paint.png')} style={styles.navIcon} />
        <Text style={styles.navText}>Mood Draw</Text>
      </TouchableOpacity>

      {/* Quest */}
      <TouchableOpacity
        onPress={() => navigation.navigate('InventoryScreen', { childProfileId })}
        style={styles.navItem}
      >
        <Image source={require('../../assets/icons/store.png')} style={styles.navIcon} />
        <Text style={styles.navText}>Quest</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChildNavbar;

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    zIndex: 20,
    paddingBottom: 20, 
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 25,
    height: 25,
    marginBottom: 4,
  },
  navText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5
  },
});