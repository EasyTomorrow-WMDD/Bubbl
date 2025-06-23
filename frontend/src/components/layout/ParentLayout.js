// ParentLayout.js
import { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ParentHeader from './ParentHeader';
import ParentBottomNav from '../navigation/ParentBottomNav';
import ParentSettingsContainer from '../containers/ParentSettingsContainer';
import ParentStoriesContainer from '../containers/ParentStoriesContainer';

const ParentLayout = ({ navigation, initialTab = 'Stories' }) => {

  const insets = useSafeAreaInsets(); // To handle safe area insets

  const [activeTab, setActiveTab] = useState(initialTab);

  const renderContent = () => {
    switch (activeTab) {
      case 'Stories':
        return <ParentStoriesContainer navigation={navigation} />;
      case 'Progress':
        return <Text style={styles.pageText}>Child Progress Screen</Text>;
      case 'Settings':
        return <ParentSettingsContainer navigation={navigation} />;
      case 'Notifications':
        return <Text style={styles.pageText}>Notifications Screen</Text>;
      default:
        return <Text style={styles.pageText}>Unknown Tab</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ParentHeader navigation={navigation} setActiveTab={setActiveTab} />
        <ScrollView 
          style={styles.mainContent} 
          contentContainerStyle={{
            paddingBottom: insets.bottom + 80,
            paddingHorizontal: 16,
          }}
        >
          {renderContent()}
        </ScrollView>
        <ParentBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8f9fa' },
  container: { flex: 1 },
  mainContent: { flex: 1, padding: 16 },
  pageText: { fontSize: 18 },
});

export default ParentLayout;
