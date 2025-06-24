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
    ref_asset_variation (
      asset_variation_name,
      asset_variation_price,
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
