const supabase = require('../utils/supabaseClient');

exports.getAllBadgesWithUserStatus = async (req, res) => {
  const { userId } = req.params;

  try {
    const { data: allBadges, error: badgeError } = await supabase
      .from('ref_badge')
      .select('badge_id, badge_name, badge_image_url');

    if (badgeError) throw badgeError;

    const { data: userBadges = [], error: userBadgeError } = await supabase
      .from('user_badge')
      .select('badge_id, user_badge_active, selection_order')
      .eq('user_id', userId);

    if (userBadgeError) throw userBadgeError;

    const userBadgeMap = {};
    userBadges.forEach(b => {
      userBadgeMap[b.badge_id] = {
        active: b.user_badge_active,
        selection_order: b.selection_order
      };
    });

    const result = allBadges.map(badge => {
      const userBadgeInfo = userBadgeMap[badge.badge_id];
      const hasEarned = badge.badge_id in userBadgeMap;
      const isActive = userBadgeInfo?.active === true;
      const selectionOrder = userBadgeInfo?.selection_order || null;

      return {
        id: badge.badge_id, 
        badge_id: badge.badge_id,
        badge_name: badge.badge_name,
        badge_image_url: badge.badge_image_url,
        has_earned: hasEarned,
        badge_active: isActive,
        selection_order: selectionOrder 
      };
    });

    return res.json(result);

  } catch (err) {
    console.error('Error in getAllBadgesWithUserStatus:', err);
    return res.status(500).json({ error: err.message || 'Failed to fetch badges' });
  }
};


exports.saveUserBadges = async (req, res) => {
  const { userId } = req.params;
  const favorites = req.body;

  if (!Array.isArray(favorites) || favorites.length > 3) {
    return res.status(400).json({ error: 'Favorites must be an array with max 3 items' });
  }

  for (const fav of favorites) {
    if (!fav.badge_id || !fav.selection_order || fav.selection_order < 1 || fav.selection_order > 3) {
      return res.status(400).json({ 
        error: 'Each favorite must have badge_id and selection_order (1-3)' 
      });
    }
  }

  try {
    await supabase
      .from('user_badge')
      .update({ 
        selection_order: null,
        user_badge_active: false 
      })
      .eq('user_id', userId);

    for (const fav of favorites) {
      await supabase
        .from('user_badge')
        .update({
          user_badge_active: true,
          selection_order: fav.selection_order
        })
        .eq('user_id', userId)
        .eq('badge_id', fav.badge_id);
    }

    return res.json({ message: 'Favorites saved successfully' });
  } catch (err) {
    console.error('Error saving badges:', JSON.stringify(err, null, 2));
    return res.status(500).json({ error: err.message || 'Failed to save badges' });
  }
};

exports.awardBadgeToUser = async (req, res) => {
  const { userId } = req.params;
  const { badge_name } = req.body;

  if (!badge_name) {
    return res.status(400).json({ error: 'badge_name is required' });
  }

  try {
    const { data: badgeData, error: badgeError } = await supabase
      .from('ref_badge')
      .select('badge_id')
      .eq('badge_name', badge_name)
      .single();

    if (badgeError || !badgeData) {
      return res.status(404).json({ error: 'Badge not found' });
    }

    const badge_id = badgeData.badge_id;

    const { data: existing, error: selectError } = await supabase
      .from('user_badge')
      .select('*')
      .eq('user_id', userId)
      .eq('badge_id', badge_id)
      .maybeSingle();

    if (selectError && selectError.code !== 'PGRST116') {
      throw selectError;
    }

    if (existing) {
      await supabase
        .from('user_badge')
        .update({ user_badge_active: false })
        .eq('user_id', userId)
        .eq('badge_id', badge_id);
    } else {
      await supabase
        .from('user_badge')
        .insert([
          { user_id: userId, badge_id, user_badge_active: false }
        ]);
    }

    return res.json({ message: 'Badge awarded successfully.' });

  } catch (error) {
    console.error('[awardBadgeToUser] Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to award badge' });
  }
};
