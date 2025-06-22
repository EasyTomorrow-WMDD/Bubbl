import { Text } from 'react-native';
import ParentLayout from '../components/layout/ParentLayout';

const ParentMainScreen = ({ navigation }) => (
  <ParentLayout navigation={navigation} activeTab="Stories">
    <Text style={{ fontSize: 18 }}>Parent Story Content Here</Text>
  </ParentLayout>
);

export default ParentMainScreen;
