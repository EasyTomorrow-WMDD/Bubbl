import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import BubblColors from '../../styles/BubblColors';
import { useTab } from '../../utils/TabContext';

const ChildNavbar = ({ navigation, childProfileId }) => {
  const { activeTab, setActiveTab } = useTab();

  return (
    <View style={styles.navbar}>
      {/* Activities */}
      <TouchableOpacity
        onPress={() => {
          setActiveTab('activities');
          navigation.navigate('ChildMain');
        }}
        style={styles.navItem}
      >
        <View style={[activeTab === 'activities' ? styles.iconWrapperActive : styles.iconWrapper]}>
          <Image
            source={require('../../assets/icons/activities.png')}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </View>
        <Text style={[activeTab === 'activities' ? styles.activeTab : styles.navText]}>Activities</Text>
      </TouchableOpacity>

      {/* Mood Draw */}
      <TouchableOpacity
        onPress={() => {
          setActiveTab('mood');
          navigation.navigate('ChildMood', { childProfileId });
        }}
        style={styles.navItem}
      >
        <View style={[activeTab === 'mood draw' ? styles.iconWrapperActive : styles.iconWrapper]}>
          <Image
            source={require('../../assets/icons/paint.png')}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </View>
        <Text style={[activeTab === 'mood draw' ? styles.activeTab : styles.navText]}>Mood Draw</Text>
      </TouchableOpacity>

      {/* Shop */}
      <TouchableOpacity
        onPress={() => {
          setActiveTab('shop');
          navigation.navigate('InventoryScreen', { childProfileId });
        }}
        style={styles.navItem}
      >
        <View style={[activeTab === 'shop' ? styles.iconWrapperActive : styles.iconWrapper]}>
          <Image
            source={require('../../assets/icons/store.png')}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </View>
        <Text style={[activeTab === 'shop' ? styles.activeTab : styles.navText]}>Shop</Text>
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
    paddingBottom: 20,
    zIndex: 20,
    borderTopColor: '#c5c5c5aa',
    borderTopWidth: 1,
  },
  navItem: {
    alignItems: 'center',
  },
  iconWrapper: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    opacity:0.7
  },
  iconWrapperActive: {
    width: 36, 
    height: 36, 
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: BubblColors.BubblPurple500,
    padding: 3, 
    opacity: 1
  },
  navIcon: {
    width: '100%',
    height: '100%',
  },
  navText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
  activeTab: {
    color: BubblColors.BubblPurple500,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
});
