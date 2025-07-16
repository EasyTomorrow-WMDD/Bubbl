import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'; 
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
import alertIcon from '../assets/icons/alert_icon.png';

const Previsualization = ({ route }) => {
  const navigation = useNavigation();
  const { item, userId, userLevel, userStars } = route.params;
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const insets = useSafeAreaInsets(); // ✅

  const assetType = item?.ref_asset_variation?.ref_asset?.asset_type;
  const assetName = item?.ref_asset_variation?.asset_variation_name;

  const assetMap = {};
  let currentSkinName = null;

  assets.forEach((asset) => {
    const type = asset.ref_asset.asset_type;
    const levelAsset = asset.ref_asset_variation?.ref_asset_variation_level?.find(
      (img) => img.user_level === userLevel
    );
    if (levelAsset) {
      assetMap[type] = levelAsset.asset_image_url;
      if (type === 'skin') currentSkinName = asset.ref_asset_variation.asset_variation_name;
    }
  });

  let overrideStyle = {};
  if (assetType !== 'skin' && assetName && currentSkinName) {
    const styleBySkin = assetPositionMap[assetName];
    if (styleBySkin) {
      overrideStyle = styleBySkin[currentSkinName] || styleBySkin["default"] || {};
    }
  }

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
        setErrorMessage('');
        navigation.navigate('PurchaseSuccess', {
          item,
          userStars: userStars - item.ref_asset_variation.asset_variation_price,
          userId
        });
      } else {
        setErrorMessage(response.data.message || 'No se pudo completar la compra.');
      }
    } catch (error) {
      const backendMessage = error.response?.data?.error;
      if (backendMessage === 'Insufficient stars') {
        setErrorMessage('Ops! You need more stars to get this item');
      } else if (backendMessage === 'User not found') {
        setErrorMessage('User not found. Please check your session.');
      } else {
        setErrorMessage('Unexpected error. Please try again.');
      }
    }
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: BubblColors.BubblPurple500 }}> 
      <View style={{ flex: 1, backgroundColor: BubblColors.BubblPurple500 }}>
        <ShopHeader title={'Summary'} childProfileId={userId} />
        <ScrollView
          style={{
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            backgroundColor: 'white',
          }}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 40, 
          }}
        >
          {errorMessage !== '' && (
            <View style={{
              borderWidth: 1,
              borderColor: BubblColors.BubblOrange500,
              backgroundColor: BubblColors.BubblOrange100,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 15,
              marginHorizontal: 15,
              paddingVertical: 16,
              paddingHorizontal: 12,
              borderRadius: 20,
              marginTop: 20
            }}>
              <Image source={alertIcon} style={{ height: 45, width: 45 }} />
              <Text style={[fontStyles.bodyMedium, { flexWrap: 'wrap', flex: 1 }]}>{errorMessage}</Text>
            </View>
          )}

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, padding: 20 }}>
            <Text style={fontStyles.heading3}>{item.ref_asset_variation.asset_variation_name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={fontStyles.heading3}>{item.ref_asset_variation.asset_variation_price}</Text>
              <Image source={starIcon} style={{ width: 18, height: 18 }} />
            </View>
          </View>

          {/* Avatar */}
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
                <Image
                  source={{ uri: item.asset_image_url }}
                  style={[styles.accessory, overrideStyle]}
                  resizeMode="contain"
                />
              </>
            )}
          </View>

          {/* Summary */}
          <View style={{
            backgroundColor: BubblColors.BubblPurple100,
            marginTop: 60,
            borderColor: BubblColors.BubblPurple200,
            borderWidth: 2,
            marginHorizontal: 15,
            borderRadius: 24
          }}>
            <View style={styles.row}>
              <Text style={[fontStyles.bodyMedium, { color: BubblColors.BubblBlack }]}>Your current stars</Text>
              <View style={styles.inline}>
                <Text style={[fontStyles.bodyMedium, { color: BubblColors.BubblBlack }]}>{userStars}</Text>
                <Image source={starIcon} style={styles.starIcon} />
              </View>
            </View>
            <View style={styles.row}>
              <Text style={[fontStyles.bodyMedium, { color: BubblColors.BubblBlack }]}>Purchase total</Text>
              <View style={styles.inline}>
                <Text style={[fontStyles.bodyMedium, { color: BubblColors.BubblBlack }]}>{item.ref_asset_variation.asset_variation_price}</Text>
                <Image source={starIcon} style={styles.starIcon} />
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={[fontStyles.bodyMedium, { color: BubblColors.BubblBlack }]}>You will have</Text>
              <View style={styles.inline}>
                <Text style={[fontStyles.bodyMedium, { color: BubblColors.BubblBlack }]}>
                  {userStars - item.ref_asset_variation.asset_variation_price}
                </Text>
                <Image source={starIcon} style={styles.starIcon} />
              </View>
            </View>
          </View>

          {/* Buy button */}
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
    </SafeAreaView>
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
    marginTop:40,
    width: 300,
    height: 300,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -150 }],
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
