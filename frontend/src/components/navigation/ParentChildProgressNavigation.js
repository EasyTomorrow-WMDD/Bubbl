import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ParentChildActivityContainer from '../containers/ParentChildActivityContainer';
import ParentChildMoodCanvasContainer from '../containers/ParentChildMoodCanvasContainer';
import { childProgressStyles } from '../../styles/BubblParentChildProgressStyles';
import { fontStyles } from '../../styles/BubblFontStyles';
import BubblColors from '../../styles/BubblColors';

// ============================================================================
// ParentChildProgressNavigation Component
const ParentChildProgressNavigation = ({ userId }) => {
  const [activeTab, setActiveTab] = useState('Activity');

  // ----------------------------------------------------------------
  // Method to render the content based on the active tab
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

  // ----------------------------------------------------------------
  // Render the main navigation component with tabs
  return (
    <View style={childProgressStyles.childProgressContainer}>

      {/* Tab Bar */}
      <View style={childProgressStyles.childProgressTabBar}>
        <View style={childProgressStyles.childProgressTabBarInnerArea}>
          {['Activity', 'Mood Canvas'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                childProgressStyles.childProgressTabItem, 
                activeTab === tab && childProgressStyles.childProgressActiveTabItem
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                fontStyles.bodySmall, 
                childProgressStyles.childProgressTabText, 
                activeTab === tab && childProgressStyles.childProgressActiveTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Tab Content */}
        {renderTabContent()}

    </View>
  );
};

export default ParentChildProgressNavigation;
