import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PatthernHeader = () => {
  const navigation = useNavigation();
  return (

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Bubbl.</Text>
          <Pressable style={styles.icons} onPress={() => navigation.navigate('Profile')}>
            <Image source={require('../../assets/icons/happy-beaming.png')} style={styles.icon} />
          </Pressable>
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#8361E4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 0,
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
    tintColor: 'white',
  },
});

export default PatthernHeader;
