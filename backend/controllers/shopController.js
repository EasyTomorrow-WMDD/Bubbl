const supabase = require('../utils/supabaseClient');

exports.getAllSkinsByLevel = async (req, res) => {
  const userLevel = parseInt(req.query.userLevel);

  if (isNaN(userLevel)) {
    return res.status(400).json({ error: 'Invalid user level' });
  }

  try {
    const { data, error } = await supabase
      .from('ref_asset_variation_level')
      .select(`
    asset_image_url,
    user_level,
    asset_variation_level_id,
    ref_asset_variation (
      asset_variation_name,
      asset_variation_price,
      asset_variation_id,
      ref_asset (
        asset_type
      )
    )
  `)
      .eq('user_level', userLevel);

    if (error) {
      console.error('Error fetching skins:', error);
      return res.status(500).json({ error: 'Failed to fetch skins' });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
};


exports.getAllAccessories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('ref_asset_variation_level')
      .select(`
         asset_variation_level_id,
        asset_image_url,
        user_level,
        ref_asset_variation (
          asset_variation_name,
          asset_variation_price,
          asset_variation_id,
          ref_asset (
            asset_type
          )
        )
      `)
    if (error) throw error;

    const accessories = data.filter(item =>
      item.ref_asset_variation?.ref_asset?.asset_type !== 'skin'
    );

    return res.json(accessories);
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Failed to get accessories' });
  }
}


exports.postPurchaseAsset = async (req, res) => {
  const { userId, assetVariationLevelId } = req.body;

  if (!userId || !assetVariationLevelId) {
    return res.status(400).json({ error: 'User ID and Variation Level ID are required' });
  }

  try {
    //Get asset_variation_id, asset_id
    const { data: levelData, error: levelError } = await supabase
      .from('ref_asset_variation_level')
      .select(`
        asset_variation_id,
        ref_asset_variation (
          asset_id,
          asset_variation_price
        )
      `)
      .eq('asset_variation_level_id', assetVariationLevelId)
      .single();

    if (levelError || !levelData) {
      console.error('Nivel no encontrado:', levelError);
      return res.status(404).json({ error: 'Asset variation level not found' });
    }

    const assetVariationId = levelData.asset_variation_id;
    const assetId = levelData.ref_asset_variation.asset_id;
    const assetPrice = levelData.ref_asset_variation.asset_variation_price;

    // Check if the user own the item based on the level
    const { data: existing, error: existError } = await supabase
      .from('user_asset')
      .select('user_asset_id')
      .eq('user_id', userId)
      .eq('ref_asset_variation_level_id', assetVariationLevelId)
      .limit(1);

    if (existError) {
      console.error('🔍 Error consultando existencia:', existError);
      return res.status(500).json({ error: 'Error checking previous ownership' });
    }

    if (existing && existing.length > 0) {
      return res.status(400).json({ error: 'You already own this variation level' });
    }

    // Get User Stars
    const { data: userData, error: userError } = await supabase
      .from('user')
      .select('user_star')
      .eq('user_id', userId)
      .single();

    if (userError || !userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (userData.user_star < assetPrice) {
      return res.status(400).json({ error: 'Insufficient stars' });
    }

    // Discount Stars
    const { error: updateError } = await supabase
      .from('user')
      .update({ user_star: userData.user_star - assetPrice })
      .eq('user_id', userId);

    if (updateError) {
      console.error('Error al descontar estrellas:', updateError);
      return res.status(500).json({ error: 'Error updating stars' });
    }

    // Submit the purchase
    const { data: inserted, error: insertError } = await supabase
      .from('user_asset')
      .insert([{
        user_id: userId,
        asset_id: assetId,
        asset_variation_id: assetVariationId,
        ref_asset_variation_level_id: assetVariationLevelId,
        user_asset_active: false
      }])
      .select();

    if (insertError) {
      console.error('Error al insertar user_asset:', insertError);
      return res.status(500).json({ error: 'Failed to insert user_asset' });
    }

    return res.status(201).json({
      success: true,
      message: 'Purchase successful',
      asset: inserted[0]
    });

  } catch (err) {
    console.error('💥 Unexpected error:', err);
    return res.status(500).json({ error: 'Unexpected server error' });
  }
};

exports.getOwnedAssets = async (req, res) => {
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: 'Missing userId' });

  try {
    const { data, error } = await supabase
      .from('user_asset')
      .select('ref_asset_variation_level_id')
      .eq('user_id', userId);

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('Error fetching owned assets:', err);
    res.status(500).json({ error: 'Failed to fetch owned assets' });
  }
};

exports.activateAsset = async (req, res) => {
  const { userId, assetVariationLevelId } = req.body;

  if (!userId || !assetVariationLevelId) {
    return res.status(400).json({ error: 'Missing userId or assetVariationLevelId' });
  }

  try {
    // Get variation base on asset
    const { data: variationLevelData, error: variationLevelError } = await supabase
      .from('ref_asset_variation_level')
      .select(`asset_variation_id, ref_asset_variation(asset_variation_id, ref_asset(asset_id, asset_type))`)
      .eq('asset_variation_level_id', assetVariationLevelId)
      .single();

    if (variationLevelError) throw variationLevelError;

    const assetType = variationLevelData?.ref_asset_variation?.ref_asset?.asset_type;

    if (!assetType) {
      return res.status(400).json({ error: 'Asset type not found for the variation level' });
    }

    // Get diffeent variation  based on type
    const { data: variationData, error: variationError } = await supabase
      .from('ref_asset_variation')
      .select(`asset_variation_id, ref_asset(asset_id, asset_type)`);

    if (variationError) throw variationError;

    const variationIds = variationData
      .filter(v => v.ref_asset?.asset_type === assetType)
      .map(v => v.asset_variation_id);

    // Get level associate to variations
    const { data: levelData, error: levelError } = await supabase
      .from('ref_asset_variation_level')
      .select('asset_variation_level_id')
      .in('asset_variation_id', variationIds);

    if (levelError) throw levelError;

    const levelIds = levelData.map(l => l.asset_variation_level_id);

    // Deactivate items with the same type, so it makes sure the user do not use two same type, which is weird
    const { error: deactivateError } = await supabase
      .from('user_asset')
      .update({ user_asset_active: false })
      .eq('user_id', userId)
      .in('ref_asset_variation_level_id', levelIds);

    if (deactivateError) throw deactivateError;

    // Activate only the item that was chose
    const { error: activateError } = await supabase
      .from('user_asset')
      .update({ user_asset_active: true })
      .eq('user_id', userId)
      .eq('ref_asset_variation_level_id', assetVariationLevelId);

    if (activateError) throw activateError;

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error activating asset:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
};

