import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fontStyles } from '../../styles/BubblFontStyles';

const PatthernHeader = () => {
  const navigation = useNavigation();
  return (

        <View style={styles.header}>
          <Text style={[fontStyles.display3, {color:'white'}]}>Bubbl</Text>
          <Pressable style={styles.icons} onPress={() => navigation.navigate('Profile')}>
            <Image source={require('../../assets/icons/happy-beaming.png')} style={styles.icon} />
          </Pressable>
        </View>
  );
};

const styles = StyleSheet.create({

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 24,
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
