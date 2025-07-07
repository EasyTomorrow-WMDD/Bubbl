const supabase = require('../utils/supabaseClient');

exports.getDashboard = async (req, res) => {
  const userId = req.params.userId;

  try {
    const { data, error } = await supabase
      .from("user")
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    const userData = data[0];

    const { count: badgeCount, error: badgeCountError } = await supabase
      .from('user_badge')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (badgeCountError) throw badgeCountError;

    const userWithBadges = {
      ...userData,
      user_badge: badgeCount || 0,
    };

    res.json(userWithBadges); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.getAllModulesAndTopics = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('ref_module')
      .select(`
        module_id,
        module_number,
        module_name,
        ref_topic (
          topic_id,
          topic_number,
          topic_title,
          topic_description,
          topic_xp,
          topic_star
        )
      `)
      .order('module_number', { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getChildProgress = async (req, res) => {
  const userId = req.params.userId;

  if (!userId) return res.status(400).json({ error: 'Missing user ID' });

  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select(`
        topic_id,
        user_topic_completed,
        user_topic_available,
        user_last_attempted,
        user_topic_fail_count
      `)
      .eq('user_id', userId);

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.saveProgress = async (req, res) => {
  const { user_id, topic_id } = req.body;

  if (!user_id || !topic_id) {
    return res.status(400).json({ error: 'Missing user_id or topic_id' });
  }

  try {
    const { data: existing, error: fetchError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user_id)
      .eq('topic_id', topic_id);

    if (fetchError) throw fetchError;

    const currentTime = new Date().toISOString();
    const isFirstCompletion = existing.length === 0;

    if (isFirstCompletion) {
      const { error: insertError } = await supabase
        .from('user_progress')
        .insert([{
          user_id,
          topic_id,
          user_topic_completed: true,
          user_last_attempted: currentTime
        }]);

      if (insertError) throw insertError;
    } else {
      const { error: updateError } = await supabase
        .from('user_progress')
        .update({
          user_topic_completed: true,
          user_last_attempted: currentTime
        })
        .eq('user_id', user_id)
        .eq('topic_id', topic_id);

      if (updateError) throw updateError;
    }

    
    const { data: topicData, error: topicError } = await supabase
      .from('ref_topic')
      .select('topic_xp, topic_star')
      .eq('topic_id', topic_id)
      .single();

    if (topicError) throw topicError;

    const { topic_xp, topic_star } = topicData;

    console.log(`Adding XP/Stars for user ${user_id}, topic ${topic_id}: XP=${topic_xp}, Stars=${topic_star}`);

    const { data: currentUser, error: getCurrentUserError } = await supabase
      .from('user')
      .select('user_xp, user_star, user_level')
      .eq('user_id', user_id)
      .single();

    if (getCurrentUserError) throw getCurrentUserError;

    const previousLevel = currentUser.user_level;
    const newXP = (currentUser.user_xp || 0) + (topic_xp || 0);
    const newStars = (currentUser.user_star || 0) + (topic_star || 0);

    const { error: updateUserError } = await supabase
      .from('user')
      .update({ 
        user_xp: newXP,
        user_star: newStars 
      })
      .eq('user_id', user_id);

    if (updateUserError) throw updateUserError;

    console.log(`XP/Stars updated successfully: New XP=${newXP}, New Stars=${newStars}`);

    ///// Determine level /////
    function getLevelFromXp(xp) {
      if (xp >= 150) return 4;
      if (xp >= 100) return 3;
      if (xp >= 50) return 2;
      return 1;
    }

    const correctLevel = getLevelFromXp(newXP);
    let levelChanged = false;

    if (previousLevel !== correctLevel) {
      levelChanged = true;

      const { error: levelUpdateError } = await supabase
        .from('user')
        .update({ user_level: correctLevel })
        .eq('user_id', user_id);

      if (levelUpdateError) throw levelUpdateError;

      ///// Skin level /////////
      const { data: skinAssetData, error: assetError } = await supabase
        .from('ref_asset')
        .select('asset_id')
        .eq('asset_type', 'skin')
        .single();

      if (assetError) throw assetError;
      const skinAssetId = skinAssetData.asset_id;

      ///////////skin name by level/////////
      let skinName;
      switch (correctLevel) {
        case 1:
          skinName = "Gotie";
          break;
        case 2:
          skinName = "Gotie Gold";
          break;
        case 3:
          skinName = "Youngie";
          break;
        case 4:
          skinName = "Bubblgom";
          break;
        default:
          skinName = "Gotie";
      }

      const { data: variationData, error: variationError } = await supabase
        .from('ref_asset_variation')
        .select('asset_variation_id')
        .eq('asset_variation_name', skinName)
        .single();

      if (variationError) throw variationError;
      const variationId = variationData.asset_variation_id;

      ///// Delete any existing active skin rows for this user////
      await supabase
        .from('user_asset')
        .delete()
        .eq('user_id', user_id)
        .eq('asset_id', skinAssetId);

      ////// Insert new skin /////
      const { error: insertAssetError } = await supabase
        .from('user_asset')
        .insert([{
          user_id: user_id,
          asset_id: skinAssetId,
          asset_variation_id: variationId,
          user_asset_active: true
        }]);

      if (insertAssetError) throw insertAssetError;

      console.log(`Skin created for user ${user_id} at level ${correctLevel}: ${skinName}`);
    }

    res.json({
      message: 'Progress saved!',
      levelChanged,
      previousLevel,
      newLevel: correctLevel,
      newXP,
      newStars
    });

  } catch (err) {
    console.error('Save progress error:', err);
    res.status(500).json({ error: 'Failed to save progress' });
  }
};

// ==========================================================================
// Save drawing progress — Add stars for drawing
// Route: POST /api/progress/saveDrawingProgress
exports.saveDrawingProgress = async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: 'Missing user_id' });
  }

  try {
    const starsToAdd = 3;
    const xpToAdd = 0;

    const { error: xpError } = await supabase.rpc('add_xp_and_stars', {
      p_user_id: user_id,
      p_xp: xpToAdd,
      p_star: starsToAdd,
    });

    if (xpError) throw xpError;

    console.log(`[saveDrawingProgress] Added stars for user ${user_id}`);

    res.json({ message: 'Drawing progress saved (stars added)' });
  } catch (err) {
    console.error('[saveDrawingProgress] Error:', err);
    res.status(500).json({ error: 'Failed to save drawing progress' });
  }
};

exports.getChildAvatar = async (req, res) => {
  const userId = req.params.userId;

  if (!userId) return res.status(400).json({ error: 'Missing user ID' });

  try {
    const { data, error } = await supabase
      .from('user_asset')
      .select(`
        ref_asset(asset_type, asset_priority),
        ref_asset_variation (
          asset_variation_name,
          ref_asset_variation_level (user_level, asset_image_url)
        )
      `)
      .eq('user_id', userId)
      .eq('user_asset_active', true)
      .order('ref_asset(asset_priority)', { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
