import { Text, View, Image, StyleSheet, ImageBackground, Pressable } from 'react-native';
import ChildNavBar from '../components/layout/ChildNavbar'
import BubblColors from '../styles/BubblColors';
import { fontStyles } from '../styles/BubblFontStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const PurchaseSuccess = ({ route, navigation }) => {
    const { item, userStars, userId } = route.params;
    console.log('ITEM BOUGHT', item)
    return (
        <>
            <SafeAreaView style={{ backgroundColor: BubblColors.BubblPurple500 }} />
            <ImageBackground
                source={require('../assets/images/Background_Purple.png')}
                style={styles.container}
                resizeMode="cover"
            >
                <ImageBackground
                    source={require('../assets/images/bg-avatar.png')}
                    resizeMode="cover"
                    style={{ height: 250, width: 250, alignItems: 'center', justifyContent: 'center' }}
                >
                    <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', height: 250, width: 250 }}>
                        <Image
                            source={{ uri: item.asset_image_url }}
                            style={{ height: 200, width: 200 }}
                        />
                    </View>

                    <Image source={require('../assets/images/star.png')} style={styles.starTopLeft} />
                    <Image source={require('../assets/images/star.png')} style={styles.starTopRight} />
                    <Image source={require('../assets/images/star.png')} style={styles.starBottomLeft} />
                    <Image source={require('../assets/images/star.png')} style={styles.starBottomRight} />
                </ImageBackground>
                <Text style={[fontStyles.display1, { color: 'white', marginTop: 80, textAlign: 'center' }]}>Your mascot got a new Item!</Text>
                <Text style={[fontStyles.bodyLarge, { color: 'white', marginTop: 20, textAlign: 'center' }]}>Now you own this item and can select it at any time!</Text>
                <View style={{ gap: 10, marginTop: 25 }}>
                    <Pressable style={[fontStyles.bodyMedium, { borderWidth: 1, borderColor: 'white', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 12, width: 350, alignItems: 'center', }]} onPress={() => navigation.navigate('InventoryScreen', {childProfileId: userId})} >
                        <Text style={{ color: 'white' }}>Back to shop</Text>
                    </Pressable>
                    <Pressable style={[fontStyles.bodyMedium, { borderWidth: 1, borderColor: 'white', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 12, backgroundColor: 'white', width: 350, alignItems: 'center' }]}  onPress={() => navigation.navigate('Modules', {childProfileId: userId})}>
                        <Text>Close</Text>
                    </Pressable>
                </View>

                {/* <ChildNavBar navigation={navigation} /> */}
            </ImageBackground>
        </>
    )
}

export default PurchaseSuccess;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        height: '120%'
    },
    starContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    starTopLeft: {
        position: 'absolute',
        top: -40,
        left: -20,
        width: 80,
        height: 80,
    },
    starTopRight: {
        position: 'absolute',
        top: -60,
        right: 30,
        width: 60,
        height: 60,
    },
    starBottomLeft: {
        position: 'absolute',
        bottom: -40,
        left: 10,
        width: 50,
        height: 50,
    },
    starBottomRight: {
        position: 'absolute',
        bottom: -50,
        right: -10,
        width: 100,
        height: 100,
    },
    centerContent: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    skinImage: {
        width: 200,
        height: 200,
        marginBottom: 40,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
        marginBottom: 40,
    },
    outlinedButton: {
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 15,
        paddingVertical: 12,
        paddingHorizontal: 50,
        marginBottom: 16,
    },
    outlinedButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    filledButton: {
        backgroundColor: 'white',
        borderRadius: 15,
        paddingVertical: 12,
        paddingHorizontal: 50,
    },
    filledButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

