import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { fontStyles } from '../../styles/BubblFontStyles';
import { useNavigation } from '@react-navigation/native';
import BubblColors from '../../styles/BubblColors';

const ShopHeader = ({title, childProfileId}) => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={[fontStyles.heading3, {color:'white', fontSize: 30, paddingTop:20}]}>{title}</Text>
          <Pressable style={styles.icons} onPress={() => navigation.navigate('InventoryScreen', { childProfileId })}>
            <Image source={require('../../assets/icons/close.png')} style={styles.icon} />
          </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: BubblColors.BubblPurple500
  },
header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center', 
  paddingHorizontal: 24,
},

  icons: {
    flexDirection: 'row',
    paddingTop:15
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
});

export default ShopHeader;
