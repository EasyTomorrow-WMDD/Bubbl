import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { assetPositionMap } from '../../styles/assetPosition';

const Avatar = ({
  userId,
  userLevel,
  skinSize,
  skinWidth,
  assets,
  setAssets,
  positionOverrides = {} // <- nuevo prop para sobrescribir posiciones
}) => {
  const [loading, setLoading] = useState(true);
  const assetMap = {};
  const nameMap = {};

  assets?.forEach((asset) => {
    const type = asset.ref_asset.asset_type;
    const variationName = asset.ref_asset_variation?.asset_variation_name;
    const levels = asset.ref_asset_variation?.ref_asset_variation_level;

    if (levels?.length > 0) {
      const levelAsset = levels.find(img => img.user_level === userLevel);

      if (levelAsset) {
        assetMap[type] = levelAsset.asset_image_url;
        nameMap[type] = variationName;
      } else if (['hat', 'glasses', 'scarf'].includes(type)) {
        assetMap[type] = levels[0].asset_image_url;
        nameMap[type] = variationName;
      }
    }
  });

  useEffect(() => {
    if (!userId) return;
    const fetchAvatar = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/childProgress/userAvatar/${userId}`);
        setAssets(response.data);
      } catch (error) {
        console.error('Error fetching avatar:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAvatar();
  }, [userId]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  // Combina estilos por asset name + overrides por pantalla
  const getStyle = (type) => {
    const name = nameMap[type];
    const baseStyle = assetPositionMap[name] || assetPositionMap.default || {};
    const override = positionOverrides[name] || {};
    return { ...baseStyle, ...override };
  };

  return (
    <View style={styles.avatarContainer}>
      {/* Skin */}
      {assetMap.skin && (
        <Image
          source={{ uri: assetMap.skin }}
          style={[
            styles.skin,
            {
              width: skinWidth || getStyle("skin").width,
              height: skinSize || getStyle("skin").height,
            }
          ]}
          resizeMode="contain"
        />
      )}

      {/* Hat */}
      {assetMap.hat && (
        <Image
          source={{ uri: assetMap.hat }}
          style={[
            styles.accessory,
            getStyle("hat")
          ]}
          resizeMode="contain"
        />
      )}

      {/* Glasses */}
      {assetMap.glasses && (
        <Image
          source={{ uri: assetMap.glasses }}
          style={[styles.accessory, getStyle("glasses")]}
          resizeMode="contain"
        />
      )}

      {/* Scarf */}
      {assetMap.scarf && (
        <Image
          source={{ uri: assetMap.scarf }}
          style={[styles.accessory, getStyle("scarf")]}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: '100%',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  skin: {
    position: 'absolute',
  },
  accessory: {
    position: 'absolute',
  }
});

export default Avatar;
