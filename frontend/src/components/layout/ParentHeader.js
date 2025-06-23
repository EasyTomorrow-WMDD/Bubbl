import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ParentHeader = ({ navigation, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bubbl</Text>
      <View style={styles.icons}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle-outline" size={26} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Notifications')}>
          <Ionicons name="notifications-outline" size={26} color="black" style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
  },
});

export default ParentHeader;
