import { StyleSheet, View, Button, Text } from 'react-native';
// import ParentFeature from './FRONTEND/ParentFeature/ParentFeature.js';

export default function Home({navigation}){
    return (
        <View style={styles.container}>
            <Text>Welcome to Bubbl</Text>
            <View>
                <Button title={'Parent Feature'} onPress={() => navigation.navigate('ParentFeature')} ></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});