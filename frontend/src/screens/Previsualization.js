import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Pressable } from 'react-native';
import { useState, useEffect, createContext } from 'react';
import Avatar from '../components/containers/Avatar';
import Header from '../components/layout/Header';
import ChildNavbar from '../components/layout/ChildNavbar';
import axios from 'axios';
import { BASE_URL } from '../utils/config';
import { useNavigation } from '@react-navigation/native';
import starIcon from '../assets/icons/star.png';

const Previsualization = ({ route }) => {
    const navigation = useNavigation();
    const { item, userId, userLevel, userStars } = route.params;
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    
    console.log('ITEM', item);

    const assetType = item?.ref_asset_variation?.ref_asset?.asset_type;
    const assetMap = {};
    assets.forEach((asset) => {
        const type = asset.ref_asset.asset_type;
        const levelAsset = asset.ref_asset_variation?.ref_asset_variation_level?.find(
            (img) => img.user_level === userLevel
        );
        if (levelAsset) {
            assetMap[type] = levelAsset.asset_image_url;
        }
    });

    // USE EFFECT TO FETCH AVATAR
    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL}/api/childProgress/userAvatar/${userId}`
                );
                setAssets(response.data);
                console.log('AVATAR', JSON.stringify(response.data, null, 2));
            } catch (error) {
                console.error('Error fetching avatar:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAvatar();
    }, [userId, userLevel]);
    
    // FUNCTION TO BUY ITEM
    const buyItem = async (item) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/shop/buy`, {
                userId: userId,
                assetVariationLevelId: item.asset_variation_level_id,
            });
            console.log('Purchase response:', response.data);
            if (response.data.success) {
                navigation.navigate('PurchaseSuccess', {
                    item: item,
                    userStars: userStars - item.ref_asset_variation.asset_variation_price,
                });
            } else {
                console.error('Purchase failed:', response.data.message);
            }
        } catch (error) {
            if (error.response) {
                console.error('Backend error:', error.response.data);
            } else {
                console.error('Unknown error:', error.message);
            }
        }
    };

    return (
        <View>
            <Header />
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, gap: 20 }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 20, color: 'blue', marginLeft: 20 }}>Back</Text>
                </Pressable>
                <Text style={styles.title}>Inventory</Text>
            </View>
            <View>
                <Text>{item.ref_asset_variation.asset_variation_name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>{item.ref_asset_variation.asset_variation_price}</Text>
                    <Image source={starIcon} style={{ width: 20, height: 20 }} />
                </View>
            </View>
            {/* RENDER AVATAR */}
            <View style={styles.avatarContainer}>
                {/* IF THE ITEM SELECTED BY USER IS A SKIN, RENDERS THE SKIN SELECTED WITH THE USER ACCESSORIES EQUIPED OTHERWISE, WILL RENDER THE SKIN ALREADY OWNS WITH THE ACCESSORY THAT WANTS TO BUY */}

                {assetType === 'skin' ? (
                    <>
                        <Image
                            source={{ uri: item.asset_image_url }}
                            style={styles.skin}
                            resizeMode="contain"
                        />
                        {assetMap.hat && (
                            <Image source={{ uri: assetMap.hat }} style={styles.hat} resizeMode="contain" />
                        )}
                        {assetMap.glasses && (
                            <Image source={{ uri: assetMap.glasses }} style={styles.glasses} resizeMode="contain" />
                        )}
                        {assetMap.scarf && (
                            <Image source={{ uri: assetMap.scarf }} style={styles.scarf} resizeMode="contain" />
                        )}
                    </>
                ) : (

                    <>
                        {assetMap.skin && (
                            <Image
                                source={{ uri: assetMap.skin }}
                                style={styles.skin}
                                resizeMode="contain"
                            />
                        )}

                        <Image
                            source={{ uri: item.asset_image_url }}
                            style={
                                assetType === 'hat'
                                    ? styles.hat
                                    : assetType === 'glasses'
                                        ? styles.glasses
                                        : assetType === 'scarf'
                                            ? styles.scarf
                                            : styles.accessory
                            }
                            resizeMode="contain"
                        />
                    </>
                )}
            </View>
            {/* SUMMARY OF PURCHASE SECTION */}
            <View style={{ backgroundColor: 'black' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }}>
                    <Text style={{ color: 'white' }}>Your current starts</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                        <Text style={{ color: 'white' }}>{userStars}</Text>
                        <Image source={starIcon} style={{ width: 20, height: 20 }} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }}>
                    <Text style={{ color: 'white' }}>Purchase total</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                        <Text style={{ color: 'white' }}>{item.ref_asset_variation.asset_variation_price}</Text>
                        <Image source={starIcon} style={{ width: 20, height: 20 }} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }}>
                    <Text style={{ color: 'white' }}>You will have</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                        <Text style={{ color: 'white' }}>{userStars - item.ref_asset_variation.asset_variation_price}</Text>
                        <Image source={starIcon} style={{ width: 20, height: 20 }} />
                    </View>
                </View>
            </View>
            <Pressable onPress={() => buyItem(item)}>
                <Text style={styles.title}>Buy</Text>
            </Pressable>
        </View>

    )
}

export default Previsualization;

const styles = StyleSheet.create({
    avatarContainer: {
        width: '100%',
        height: 300,
        position: 'relative',
        marginTop: 0,
    },
    skin: {
        width: 300,
        height: 300,
        position: 'absolute',
        left: 50,
        top: 50,
    },
    hat: {
        width: 100,
        height: 90,
        position: 'absolute',
        top: 50,
        left: 210,
        transform: [{ rotate: '15deg' }],
    },
    glasses: {
        width: 150,
        height: 160,
        position: 'absolute',
        top: 120,
        left: 140,
    },
    scarf: {
        width: 140,
        height: 100,
        position: 'absolute',
        top: 220,
        left: 130,
    },
    accessory: {
        width: 100,
        height: 100,
        position: 'absolute',
        top: 120,
        left: 130,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
    },

});
