import { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, ScrollView, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import ParentHeader from './ParentHeader';
import ParentBottomNav from '../navigation/ParentBottomNav';
import ParentSettingsContainer from '../containers/ParentSettingsContainer';
import ParentStoriesContainer from '../containers/ParentStoriesContainer';
import ParentChildSelectionContainer from '../containers/ParentChildSelectionContainer';
import { parentStyles } from '../../styles/BubblParentMainStyles';
import { BubblFonts } from '../../styles/BubblFonts';
import BubblColors from '../../styles/BubblColors';

const ParentLayout = ({ navigation, initialTab = 'Stories' }) => {

  const insets = useSafeAreaInsets(); // To handle safe area insets

  const screenHeight = Dimensions.get('window').height; // Get the screen height

  const [activeTab, setActiveTab] = useState(initialTab); // Default to 'Stories'

  // scroll ref
  const scrollRef = useRef();
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: false });
    }
  }, [activeTab]);

  // ----------------------------------------------------------------
  // Render content depending on the tab selected
  const renderContent = () => {
    switch (activeTab) {
      case 'Stories':
        return <ParentStoriesContainer navigation={navigation} />;
      case 'Progress':
        return <ParentChildSelectionContainer navigation={navigation} />;
      case 'Settings':
        return <ParentSettingsContainer navigation={navigation} />;
      case 'Notifications':
        return <Text style={parentStyles.parentLayoutPageText}>Notifications Screen</Text>;
      default:
        return <Text style={parentStyles.parentLayoutPageText}>Unknown Tab</Text>;
    }
  };

  // ----------------------------------------------------------------
  // Main layout structure
  return (
    <View style={{ flex: 1, backgroundColor: BubblColors.BubblPurple500 }}>
      {/* Status bar */}
      <StatusBar barStyle="light-content" backgroundColor={BubblColors.BubblPurple50} />
      {/* Safe area for parent main contents */}
      <SafeAreaView edges={['top']} style={parentStyles.parentLayoutTopSafeArea} />
      {/* Main area for parent page */}
      <View style={parentStyles.parentLayoutContainer}>

        {/* Workaround to get the white background layer to prevent purple leak at bottom */}
        <View style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: activeTab === 'Stories' ? BubblColors.BubblOrange50 : BubblColors.BubblPurple50,
          marginTop: screenHeight * 0.5, // Basically this is taking up the bottom half of the screen..
        }} />
        
        {/* Parent Header */}
        <ParentHeader navigation={navigation} setActiveTab={setActiveTab} />
        {/* Main content area (scrollable) */}
        <ScrollView 
          ref={scrollRef}
          style={parentStyles.parentLayoutMainContent} 
          contentContainerStyle={{
            minHeight: screenHeight - 50,
            backgroundColor: BubblColors.BubblPurple50,
            paddingBottom: insets.bottom + 80,
          }}
        >
          {renderContent()}
        </ScrollView>
        {/* Bottom navigation */}
        <ParentBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
      {/* Safe area for bottom navigation */}
      <SafeAreaView edges={['bottom']} style={parentStyles.parentLayoutBottomSafeArea} />
    </View>
  );
};

export default ParentLayout;
