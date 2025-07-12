import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import starIcon from '../../assets/icons/star.png'
import { useNavigation } from '@react-navigation/native';
import { fontStyles } from '../../styles/BubblFontStyles';
import BubblColors from '../../styles/BubblColors';



const Skins = ({ userId, userLevel, userStars, onAssetEquipped, assets }) => {

  // console.log('ASSETS BEIGN RECEIVED', assets)

  const navigation = useNavigation();
  const [skin, setSkin] = useState([]);
  const [accesories, setAccesories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ownedLevels, setOwnedLevels] = useState([]);
  // console.log('OWNED LEVELS', ownedLevels);


  const isEquipped = (item) => {
    return assets.some(asset =>
      asset.ref_asset_variation.asset_variation_name ===
      item.ref_asset_variation.asset_variation_name
    );
  };

  const skins = skin
    .filter(item => item.ref_asset_variation?.ref_asset?.asset_type === 'skin')
    .sort((a, b) => {
      const aEquipped = isEquipped(a);
      const bEquipped = isEquipped(b);
      if (aEquipped && !bEquipped) return -1;
      if (!aEquipped && bEquipped) return 1;
      return 0;
    });

  const sortedAccessories = accesories.sort((a, b) => {
    const aEquipped = isEquipped(a);
    const bEquipped = isEquipped(b);
    if (aEquipped && !bEquipped) return -1;
    if (!aEquipped && bEquipped) return 1;
    return 0;
  });



  // console.log('SKINS', skins)



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


  // console.log('SKINS', skins);
  console.log('ACCESORIES', accesories);
  useEffect(() => {
    const fetchSkins = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/shop/skins?userLevel=${userLevel}`
        );
        setSkin(response.data);
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
        console.log('🔎 Owned from API:', owned);
        setOwnedLevels(owned);
      } catch (err) {
        console.error('Error fetching owned:', err);
      }
    };

    fetchOwned();
  }, [userId]);
  return (

    <View style={{ padding: 15, backgroundColor: 'white', borderTopLeftRadius:25, borderTopRightRadius:25, marginTop:24 }}>
      <Text style={[fontStyles.heading2, { fontSize: 30, paddingTop: 40 }]}>Appearance
      </Text>
      <ScrollView horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: 'row', gap: 20 }}
        style={{ height: 250 }}>
        {skins.length > 0 ? (
          skins.map((skin, index) => {
            const owned = ownedLevels.includes(skin.asset_variation_level_id);
            return (
              <Pressable
                onPress={() => owned ? handleEquip(skin) : handlePress(skin)}
                key={index}
                style={{
                  marginTop: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 204,
                  width: 132,
                  borderColor: isEquipped(skin) ? BubblColors.BubblPurple400 : BubblColors.BubblPurple200,
                  borderWidth: 3,
                  backgroundColor: BubblColors.BubblPurple100,
                  borderRadius: 24
                }}
              >
                <Text style={[fontStyles.bodyMedium, { color: BubblColors.BubblPurple950 }]}>
                  {skin.ref_asset_variation.asset_variation_name}
                </Text>
                <Image
                  source={{ uri: skin.asset_image_url }}
                  style={{ width: 90, height: 120, resizeMode: 'contain' }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                  {owned ? (
                    <Text style={[{ color: BubblColors.BubblPurple900 }, fontStyles.heading3]}>Owned</Text>
                  ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={[{ color: BubblColors.BubblPurple900 }, fontStyles.heading3]}>{skin.ref_asset_variation.asset_variation_price}</Text>
                      <Image
                        source={starIcon}
                        style={{ width: 20, height: 20, resizeMode: 'contain' }}
                      />
                    </View>
                  )}
                </View>
              </Pressable>
            );
          })
        ) : (
          <Text>No appearance
            available</Text>
        )}
      </ScrollView>

      <Text style={[fontStyles.heading2, { fontSize: 30, paddingTop: 40 }]}>Accessories</Text>
      {sortedAccessories.length > 0 ? (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexDirection: 'row', gap: 20 }}
          style={{ height: 250 }}
        >
          {sortedAccessories.map((accessory, index) => {
            const owned = ownedLevels.includes(accessory.asset_variation_level_id);
            return (
              <Pressable
                key={index}
                onPress={() => owned ? handleEquip(accessory) : handlePress(accessory)}
                style={{
                  marginTop: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 204,
                  width: 132,
                  borderColor: isEquipped(accessory) ? BubblColors.BubblPurple400 : BubblColors.BubblPurple200,
                  borderWidth: 3,
                  backgroundColor: BubblColors.BubblPurple100,
                  borderRadius: 24
                }}
              >
                <Text style={[fontStyles.bodyMedium, { color: BubblColors.BubblPurple950 }]}>
                  {accessory.ref_asset_variation.asset_variation_name}
                </Text>
                <Image
                  source={{ uri: accessory.asset_image_url }}
                  style={{ width: 60, height: 80, resizeMode: 'contain' }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                  {owned ? (
                    <Text style={[{ color: BubblColors.BubblPurple900 }, fontStyles.heading3]}>Owned</Text>
                  ) : (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                      <Text style={[{ color: BubblColors.BubblPurple900 }, fontStyles.heading3]}>{accessory.ref_asset_variation.asset_variation_price}</Text>
                      <Image
                        source={starIcon}
                        style={{ width: 20, height: 20, resizeMode: 'contain' }}
                      />
                    </View>
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

})