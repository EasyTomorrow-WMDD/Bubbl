import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import starIcon from '../../assets/icons/star.png'
import { useNavigation } from '@react-navigation/native';


const Skins = ({ userId, userLevel, userStars, onAssetEquipped }) => {

    const navigation = useNavigation();
    const [assets, setAssets] = useState([]);
    const [accesories, setAccesories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ownedLevels, setOwnedLevels] = useState([]);
    console.log('OWNED LEVELS', ownedLevels);
    const isOwned = ownedLevels.includes(assets.asset_variation_level_id);



    const skins = assets.filter(item =>
        item.ref_asset_variation?.ref_asset?.asset_type === 'skin'
    );

    const handlePress = (item) => {
        navigation.navigate('PrevScreen', {
            item,
            userId,
            userLevel,
            userStars,
        });
    };

const handleEquip = async (item) => {
  try {
    await axios.post(`${BASE_URL}/api/shop/activate`, {
      userId,
      assetVariationLevelId: item.asset_variation_level_id
    });

    onAssetEquipped && onAssetEquipped();
  } catch (err) {
    console.error('Error activating asset:', err.message);
  }
};



    console.log('SKINS', skins);
    console.log('ACCESORIES', accesories);
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

    useEffect(() => {
        const fetchAccessories = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL}/api/shop/accesories`
                );
                setAccesories(response.data);
            } catch (error) {
                console.error('Error fetching accessories:', error);
            }
        };

        fetchAccessories();
    }, []);


    useEffect(() => {
        const fetchOwned = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/shop/owned?userId=${userId}`);
                const owned = response.data.map(item => item.ref_asset_variation_level_id);
                setOwnedLevels(owned);
            } catch (err) {
                console.error('Error fetching owned:', err);
            }
        };

        fetchOwned();
    }, [userId]);
    return (

<View>
  <Text style={styles.subHeading}>Skins</Text>
  <View style={styles.elementContainer}>
    {skins.length > 0 ? (
      skins.map((skin, index) => {
        const owned = ownedLevels.includes(skin.asset_variation_level_id);
        return (
          <Pressable
            onPress={() => owned ? handleEquip(skin) : handlePress(skin)}
            key={index}
            style={{
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
              height: 100,
              width: 90,
              borderColor: owned ? 'gray' : 'black',
              borderWidth: 1,
              backgroundColor: owned ? '#eee' : '#fff',
              opacity: owned ? 0.6 : 1,
            }}
          >
            <Image
              source={{ uri: skin.asset_image_url }}
              style={{ width: 60, height: 80, resizeMode: 'contain' }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
              {owned ? (
                <Text style={{ color: 'gray', fontWeight: 'bold' }}>Owned</Text>
              ) : (
                <>
                  <Text style={{ color: 'black' }}>{skin.ref_asset_variation.asset_variation_price}</Text>
                  <Image
                    source={starIcon}
                    style={{ width: 20, height: 20, resizeMode: 'contain' }}
                  />
                </>
              )}
            </View>
          </Pressable>
        );
      })
    ) : (
      <Text>No skins available</Text>
    )}
  </View>

  <Text style={styles.subHeading}>Accessories</Text>
  {accesories.length > 0 ? (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, flexDirection: 'row' }}
      style={{ height: 200 }}
    >
      {accesories.map((accessory, index) => {
        const owned = ownedLevels.includes(accessory.asset_variation_level_id);
        return (
          <Pressable
            key={index}
            onPress={() => owned ? handleEquip(accessory) : handlePress(accessory)}
            style={{
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
              height: 100,
              width: 90,
              borderColor: owned ? 'gray' : 'black',
              borderWidth: 1,
              backgroundColor: owned ? '#eee' : '#fff',
              opacity: owned ? 0.6 : 1,
            }}
          >
            <Image
              source={{ uri: accessory.asset_image_url }}
              style={{ width: 60, height: 80, resizeMode: 'contain' }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
              {owned ? (
                <Text style={{ color: 'gray', fontWeight: 'bold' }}>Owned</Text>
              ) : (
                <>
                  <Text style={{ color: 'black' }}>{accessory.ref_asset_variation.asset_variation_price}</Text>
                  <Image
                    source={starIcon}
                    style={{ width: 20, height: 20, resizeMode: 'contain' }}
                  />
                </>
              )}
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  ) : (
    <Text>No accessories available</Text>
  )}
</View>

    );
};

export default Skins;

const styles = StyleSheet.create({
    elementContainer: {
        flexDirection: 'row',
        paddingHorizontal: 40,
    },
    subHeading: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})