import { Text } from 'react-native';
import ParentLayout from '../components/layout/ParentLayout';

const ParentChildProgress = ({ navigation }) => (
  <ParentLayout navigation={navigation} activeTab="Progress">
    <Text style={{ fontSize: 18 }}>Child Progress Here</Text>
  </ParentLayout>
);

export default ParentChildProgress;
