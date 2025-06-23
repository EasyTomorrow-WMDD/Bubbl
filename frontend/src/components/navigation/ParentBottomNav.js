import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ParentBottomNav = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <NavItem icon="book-outline" label="Stories" isActive={activeTab === 'Stories'} onPress={() => setActiveTab('Stories')} />
      <NavItem icon="bar-chart-outline" label="Progress" isActive={activeTab === 'Progress'} onPress={() => setActiveTab('Progress')} />
      <NavItem icon="settings-outline" label="Settings" isActive={activeTab === 'Settings'} onPress={() => setActiveTab('Settings')} />
    </View>
  );
};

const NavItem = ({ icon, label, isActive, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Ionicons name={icon} size={22} color={isActive ? '#1e90ff' : '#555'} />
    <Text style={[styles.label, isActive && { color: '#1e90ff' }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  item: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default ParentBottomNav;
