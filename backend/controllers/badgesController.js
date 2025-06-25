const supabase = require('../utils/supabaseClient');

exports.getAllBadgesWithUserStatus = async (req, res) => {
  const { userId } = req.params;

  // 1. Get all available badges
  const { data: allBadges, error: badgeError } = await supabase
    .from('ref_badge')
    .select('badge_id, badge_name, badge_image_url');

  if (badgeError) return res.status(500).json({ error: badgeError.message });

  // 2. Get the badges that the user has earned
  const { data: userBadges, error: userBadgeError } = await supabase
    .from('user_badge')
    .select('badge_id, user_badge_active')
    .eq('user_id', userId);

  if (userBadgeError) return res.status(500).json({ error: userBadgeError.message });

  // 3. Create quick map and array for active order
  const userBadgeMap = {};
  const activeBadgesOrdered = [];

  userBadges.forEach((b) => {
    userBadgeMap[b.badge_id] = b.user_badge_active;
    if (b.user_badge_active) {
      activeBadgesOrdered.push(b.badge_id);
    }
  });

  // 4. Combine everything with order
  const result = allBadges.map((badge) => {
    const isEarned = badge.badge_id in userBadgeMap;
    const isActive = userBadgeMap[badge.badge_id] || false;
    const order = isActive ? activeBadgesOrdered.indexOf(badge.badge_id) + 1 : null;

    return {
      ...badge,
      has_earned: isEarned,
      badge_active: isActive,
      selection_order: order,
    };
  });

  return res.json(result);
};

exports.saveUserBadges = async (req, res) => {
  const { userId } = req.params;
  const { activeBadgeIds } = req.body;

  if (!Array.isArray(activeBadgeIds) || activeBadgeIds.length > 3) {
    return res.status(400).json({ error: 'activeBadgeIds must be an array with max 3 items' });
  }

  try {
    // Desactivar todos los badges del usuario
    const { error: deactivateError } = await supabase
      .from('user_badge')
      .update({ user_badge_active: false })
      .eq('user_id', userId);

    if (deactivateError) throw deactivateError;

    // Activar solo los seleccionados
    const { error: activateError } = await supabase
      .from('user_badge')
      .update({ user_badge_active: true })
      .in('badge_id', activeBadgeIds)
      .eq('user_id', userId);

    if (activateError) throw activateError;

    res.json({ message: '✅ Badges updated successfully' });
  } catch (err) {
    console.error('❌ Error saving badges:', err.message);
    res.status(500).json({ error: 'Failed to save badges' });
  }
};
