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
      .select('badge_id, user_badge_active')
      .eq('user_id', userId);

    if (userBadgeError) throw userBadgeError;

  
    const userBadgeMap = {};
    userBadges.forEach(b => {
      userBadgeMap[b.badge_id] = b.user_badge_active;
    });

  
    const activeBadgeOrder = userBadges
      .filter(b => b.user_badge_active)
      .map(b => b.badge_id);

  
    const result = allBadges.map(badge => {
      const hasEarned = badge.badge_id in userBadgeMap;
      const isActive = userBadgeMap[badge.badge_id] === true;
      const order = isActive ? activeBadgeOrder.indexOf(badge.badge_id) + 1 : null;

      return {
        badge_id: badge.badge_id,
        badge_name: badge.badge_name,
        badge_image_url: badge.badge_image_url,
        has_earned: hasEarned,
        badge_active: isActive,
        selectionOrder: order
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
  const { activeBadgeIds } = req.body;

  if (!Array.isArray(activeBadgeIds) || activeBadgeIds.length > 3) {
    return res.status(400).json({ error: 'activeBadgeIds must be an array with max 3 items' });
  }

  try {
    
    const { error: deactivateError } = await supabase
      .from('user_badge')
      .update({ user_badge_active: false })
      .eq('user_id', userId);

    if (deactivateError) throw deactivateError;

  
    if (activeBadgeIds.length > 0) {
      const { error: activateError } = await supabase
        .from('user_badge')
        .update({ user_badge_active: true })
        .in('badge_id', activeBadgeIds)
        .eq('user_id', userId);

      if (activateError) throw activateError;
    }

    return res.json({ message: 'Badges updated successfully' });

  } catch (err) {
    console.error('Error saving badges:', err);
    return res.status(500).json({ error: err.message || 'Failed to save badges' });
  }
};


exports.awardBadgeToUser = async (req, res) => {
  const { userId } = req.params;
  const { badge_id, user_badge_active } = req.body;

  if (!badge_id) {
    return res.status(400).json({ error: 'badge_id is required' });
  }

  try {
  
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
    
      const { error: updateError } = await supabase
        .from('user_badge')
        .update({ user_badge_active })
        .eq('user_id', userId)
        .eq('badge_id', badge_id);

      if (updateError) throw updateError;

    } else {
    
      const { error: insertError } = await supabase
        .from('user_badge')
        .insert([
          { user_id: userId, badge_id, user_badge_active }
        ]);

      if (insertError) throw insertError;
    }

    return res.json({ message: 'Badge awarded successfully.' });

  } catch (error) {
    console.error('[awardBadgeToUser] Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to award badge' });
  }
};
