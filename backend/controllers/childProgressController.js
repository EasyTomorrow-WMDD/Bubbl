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
      .eq('user_id', userId)


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

    // ///////////////////// TESTING ONLY ////////////////////////
    // Comented only if we don't want to add XP/Stars multiple times

    // const isFirstCompletion = existing.length === 0;
    // if (isFirstCompletion) {

    // always add XP/Stars for testing purposes
    const { data: topicData, error: topicError } = await supabase
      .from('ref_topic')
      .select('topic_xp, topic_star')
      .eq('topic_id', topic_id)
      .single();

    if (topicError) throw topicError;

    const { topic_xp, topic_star } = topicData;

    const { error: xpError } = await supabase.rpc('add_xp_and_stars', {
      p_user_id: user_id,
      p_xp: topic_xp,
      p_star: topic_star
    });

    if (xpError) throw xpError;

    // } // ← close - if (isFirstCompletion)

    /////////////////////////////////////////////////////////////

    res.json({ message: 'Progress saved!' });

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
    const starsToAdd = 3;  // Add 3 stars for drawing
    const xpToAdd = 0;     // No XP (or change this if you want!)

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


