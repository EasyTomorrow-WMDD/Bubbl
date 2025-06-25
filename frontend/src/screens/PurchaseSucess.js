import { Text, View, Image, StyleSheet } from 'react-native';

const PurchaseSuccess = ({route}) => {

    const {item, userStars} = route.params;
    console.log('ITEM BOUGHT',item)
    return (
        <View style={styles.container}>
            <Text>Your mascot has a new item!</Text>
            <Image source={{uri: item.asset_image_url}} style={{height: 200, width: 250}}></Image>
        </View>
    )
}

export default PurchaseSuccess;

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

