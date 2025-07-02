import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';



const Avatar = ({ userId, userLevel }) => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
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

    console.log('ASSETMAP', assetMap)

    useEffect(() => {
        if (!userId) return;
        const fetchAvatar = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL}/api/childProgress/userAvatar/${userId}`
                );
                setAssets(response.data);
                console.log('AVATAR', JSON.stringify(response.data, null, 2));
            } catch (error) {
                console.error('Error fetching avatar:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAvatar();
    }, [userId]);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

    return (
        <View style={styles.avatarContainer}>
            {/* Skin */}
            {assetMap.skin && (
                <Image
                    source={{ uri: assetMap.skin }}
                    style={styles.skin}
                    resizeMode="contain"
                />
            )}

            {/* Hat */}
            {assetMap.hat && (
                <Image
                    source={{ uri: assetMap.hat }}
                    style={styles.hat}
                    resizeMode="contain"
                />
            )}

            {/* Glasses */}
            {assetMap.glasses && (
                <Image
                    source={{ uri: assetMap.glasses }}
                    style={styles.glasses}
                    resizeMode="contain"
                />
            )}
            {/* Scarf */}
            {assetMap.scarf && (
                <Image
                    source={{ uri: assetMap.scarf }}
                    style={styles.glasses}
                    resizeMode="contain"
                />
            )}
        </View>
    );

};
const styles = StyleSheet.create({
    avatarContainer: {
        width: '100%',
        height: 200,
        position: 'relative',
    },
    skin: {
        width: 150,
        height:150,
        position: 'absolute',
        left: 100,
        top: 50,
    },
    hat: {
        width: 100,
        height:100,
        position: 'absolute',
        top: 0,
        left: 170,
        transform: [{ rotate: '15deg' }],
    },
    glasses: {
        width: 120,
        height: 40,
        position: 'absolute',
        top: 90,
        left: 90,
    },
    scarf:{
        width: 120,
        height: 40,
        position: 'absolute',
        top: 90,
        left: 90,
    }
});


export default Avatar;
