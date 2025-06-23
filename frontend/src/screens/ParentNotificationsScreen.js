import { Text } from 'react-native';
import ParentLayout from '../components/layout/ParentLayout';

const ParentNotificationsScreen = ({ navigation }) => (
  <ParentLayout navigation={navigation} activeTab="None">
    <Text style={{ fontSize: 18 }}>Notifications Here</Text>
  </ParentLayout>
);

export default ParentNotificationsScreen;
