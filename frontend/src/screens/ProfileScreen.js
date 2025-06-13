import { View, Text, Button } from 'react-native';

export default function ProfileScreen({ navigation }) {
  return (
    <View>
      <Text>Profile Page</Text>
      <Text>Parent Users</Text>
      <Button title="Go to Parent Portal" onPress={() => navigation.replace('ParentMain')} />
      <Text>Kid Users</Text>
      <Button title="Go to Child Portal" onPress={() => navigation.replace('ChildMain')} />
    </View>
  );
}
