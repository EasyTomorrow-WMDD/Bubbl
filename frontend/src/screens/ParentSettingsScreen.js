import { Text } from 'react-native';
import ParentLayout from '../components/layout/ParentLayout';

const ParentSettingsScreen = ({ navigation }) => (
  <ParentLayout navigation={navigation} activeTab="Settings">
    <Text style={{ fontSize: 18 }}>Parent Settings Here</Text>
  </ParentLayout>
);

export default ParentSettingsScreen;
