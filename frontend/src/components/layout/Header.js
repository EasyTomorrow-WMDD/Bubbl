import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { fontStyles } from '../../styles/BubblFontStyles';
import { useNavigation } from '@react-navigation/native';
import BubblColors from '../../styles/BubblColors';

const Header = ({ title }) => {
  const navigation = useNavigation();
  return (
      <View style={styles.header}>
        <Text style={[fontStyles.heading3, { color: 'white', fontSize: 30, paddingVertical: 20 }]}>{title}</Text>
        <Pressable style={styles.icons} onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../../assets/icons/happy-beaming.png')} style={styles.icon} />
        </Pressable>
      </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom:24
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

export default Header;
