
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ChildNavbar = ({ navigation, childProfileId }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('ChildMain')}>
        <Text style={styles.navText}>Activities</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ChildMood', { childProfileId: childProfileId })
        }
      >
        <Text style={styles.navText}>Mood Draw</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() =>  navigation.navigate('InventoryScreen', {childProfileId: childProfileId})}>
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
    backgroundColor: '#6A0DAD', // Purple
    paddingVertical: 12,
    zIndex: 20,
  },
  navText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});