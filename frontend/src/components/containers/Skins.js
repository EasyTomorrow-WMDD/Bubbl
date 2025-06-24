import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, Text, ScrollView } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import starIcon from '../../assets/icons/star.png'


const Skins = ({ userId, userLevel }) => {

    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    

    const skins = assets.filter(item =>
        item.ref_asset_variation?.ref_asset?.asset_type === 'skin'
    );



    console.log('SKINS', skins);
    useEffect(() => {
        const fetchSkins = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL}/api/shop/skins?userLevel=${userLevel}`
                );
                setAssets(response.data);
            } catch (error) {
                console.error('Error fetching skins:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSkins();
    }, [userLevel]);


    return (

        <View>
            <Text style={styles.subHeading}>Skins</Text>
            <View style={styles.SkinsContainer}>
                {skins.length > 0 ? (
                    skins.map((skin, index) => (
                        <View
                            key={index}
                            style={{
                                margin: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 100,
                                width: 90,
                                borderColor: 'black',
                                borderWidth: 1,
                                backgroundColor: '#fff',
                            }}
                        >
                            <Image
                                source={{ uri: skin.asset_image_url }}
                                style={{ width: 60, height: 80, resizeMode: 'contain' }}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}    >

                            <Text style={{color:'black'}}>{skin.ref_asset_variation.asset_variation_price}</Text>
                            <Image
                                source={starIcon}
                                style={{ width: 20, height: 20, resizeMode: 'contain' }}
                            />
                            </View>
                        </View>
                    ))
                ) : (
                    <Text>No skins available</Text>
                )}
            </View>
        </View>
    )
}

export default Skins;

const styles = StyleSheet.create({
    SkinsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 40,
    },
    subHeading: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})