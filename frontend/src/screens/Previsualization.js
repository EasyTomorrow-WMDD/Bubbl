import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import Avatar from '../components/containers/Avatar';
import ShopHeader from '../components/layout/ShopHeader';
import ChildNavbar from '../components/layout/ChildNavbar';
import axios from 'axios';
import { BASE_URL } from '../utils/config';
import { useNavigation } from '@react-navigation/native';
import starIcon from '../assets/icons/star.png';
import BubblColors from '../styles/BubblColors';
import { fontStyles } from '../styles/BubblFontStyles';
import { assetPositionMap } from '../styles/assetPosition'; 

const Previsualization = ({ route }) => {
  const navigation = useNavigation();
  const { item, userId, userLevel, userStars } = route.params;
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const assetType = item?.ref_asset_variation?.ref_asset?.asset_type;
  const assetName = item?.ref_asset_variation?.asset_variation_name;
  const overrideStyle = assetPositionMap[assetName] || {};

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

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/childProgress/userAvatar/${userId}`);
        setAssets(response.data);
      } catch (error) {
        console.error('Error fetching avatar:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvatar();
  }, [userId, userLevel]);

  const buyItem = async (item) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/shop/buy`, {
        userId,
        assetVariationLevelId: item.asset_variation_level_id,
      });

      if (response.data.success) {
        navigation.navigate('PurchaseSuccess', {
          item,
          userStars: userStars - item.ref_asset_variation.asset_variation_price,
          userId
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
    <View style={{ backgroundColor: BubblColors.BubblPurple500 }}>
      <ShopHeader title={'Summary'} childProfileId={userId} />
      <ScrollView style={{ borderTopLeftRadius: 32, borderTopRightRadius: 32, backgroundColor: 'white', height: '100%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, padding: 20 }}>
          <Text style={fontStyles.heading3}>{item.ref_asset_variation.asset_variation_name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={fontStyles.heading3}>{item.ref_asset_variation.asset_variation_price}</Text>
            <Image source={starIcon} style={{ width: 18, height: 18 }} />
          </View>
        </View>

        {/* RENDER AVATAR */}
        <View style={styles.avatarContainer}>
          {assetType === 'skin' ? (
            <>
              <Image source={{ uri: item.asset_image_url }} style={styles.skin} resizeMode="contain" />
              {assetMap.hat && <Image source={{ uri: assetMap.hat }} style={styles.hat} resizeMode="contain" />}
              {assetMap.glasses && <Image source={{ uri: assetMap.glasses }} style={styles.glasses} resizeMode="contain" />}
              {assetMap.scarf && <Image source={{ uri: assetMap.scarf }} style={styles.scarf} resizeMode="contain" />}
            </>
          ) : (
            <>
              {assetMap.skin && (
                <Image source={{ uri: assetMap.skin }} style={styles.skin} resizeMode="contain" />
              )}

              {/* Aquí aplicas el estilo por nombre del accesorio */}
              <Image
                source={{ uri: item.asset_image_url }}
                style={[styles.accessory, overrideStyle]}
                resizeMode="contain"
              />
            </>
          )}
        </View>

        {/* SUMMARY */}
        <View style={{ backgroundColor: BubblColors.BubblPurple100, marginTop: 60, borderColor: BubblColors.BubblPurple200, borderWidth: 2, marginHorizontal: 15, borderRadius: 24 }}>
          <View style={styles.row}>
            <Text style={[fontStyles.bodyMedium, {color: BubblColors.BubblBlack}]}>Your current stars</Text>
            <View style={styles.inline}>
              <Text style={[fontStyles.bodyMedium, {color: BubblColors.BubblBlack}]}>{userStars}</Text>
              <Image source={starIcon} style={styles.starIcon} />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={[fontStyles.bodyMedium, {color: BubblColors.BubblBlack}]}>Purchase total</Text>
            <View style={styles.inline}>
              <Text style={[fontStyles.bodyMedium, {color: BubblColors.BubblBlack}]}>{item.ref_asset_variation.asset_variation_price}</Text>
              <Image source={starIcon} style={styles.starIcon} />
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={[fontStyles.bodyMedium, {color: BubblColors.BubblBlack}]}>You will have</Text>
            <View style={styles.inline}>
              <Text style={[fontStyles.bodyMedium, {color: BubblColors.BubblBlack}]}>
                {userStars - item.ref_asset_variation.asset_variation_price}
              </Text>
              <Image source={starIcon} style={styles.starIcon} />
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => buyItem(item)}
          style={{
            backgroundColor: BubblColors.BubblPurple300,
            alignItems: 'center',
            margin: 20,
            borderRadius: 12,
            paddingVertical: 15,
            paddingHorizontal: 24,
            borderWidth: 1,
            borderColor: BubblColors.BubblPurple400,
          }}
        >
          <Text style={[fontStyles.bodyMedium, { color: BubblColors.BubblPurple500 }]}>Buy!</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default Previsualization;

const styles = StyleSheet.create({
  avatarContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  label: {
    color: 'black',
  },
  starIcon: {
    width: 20,
    height: 20,
  },
  divider: {
    height: 1,
    borderWidth: 1,
    borderColor: BubblColors.BubblPurple400,
    borderStyle: 'dashed',
    width: '90%',
    alignSelf: 'center',
  },
});
