import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ParentChildActivityContainer from '../containers/ParentChildActivityContainer';
import ParentChildMoodCanvasContainer from '../containers/ParentChildMoodCanvasContainer';

const ParentChildProgressNavigation = ({ userId }) => {
  const [activeTab, setActiveTab] = useState('Activity');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Activity':
        return <ParentChildActivityContainer userId={userId} />;
      case 'Mood Canvas':
        return <ParentChildMoodCanvasContainer />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {['Activity', 'Mood Canvas'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>
        {renderTabContent()}
      </View>
    </View>
  );
};

export default ParentChildProgressNavigation;



const styles = StyleSheet.create({
  container: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#eee',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tabItem: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  activeTabItem: {
    borderBottomWidth: 3,
    borderBottomColor: '#f90', // Orange highlight
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  tabContent: {
    flex: 1,
    paddingTop: 16,
  },
});

