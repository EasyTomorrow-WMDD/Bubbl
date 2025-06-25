const supabase = require('../utils/supabaseClient');

// GET /api/users/:userId/badges
exports.getAllBadgesWithUserStatus = async (req, res) => {
  const { userId } = req.params;

  // 1. Obtener todos los badges disponibles
  const { data: allBadges, error: badgeError } = await supabase
    .from('ref_badge')
    .select('badge_id, badge_name, badge_image_url');

  if (badgeError) return res.status(500).json({ error: badgeError.message });

  // 2. Obtener los badges que el usuario ha ganado
  const { data: userBadges, error: userBadgeError } = await supabase
    .from('user_badge')
    .select('badge_id, user_badge_active')
    .eq('user_id', userId);

  if (userBadgeError) return res.status(500).json({ error: userBadgeError.message });

  // 3. Crear mapa rápido y array para el orden de los activos
  const userBadgeMap = {};
  const activeBadgesOrdered = [];

  userBadges.forEach((b) => {
    userBadgeMap[b.badge_id] = b.user_badge_active;
    if (b.user_badge_active) {
      activeBadgesOrdered.push(b.badge_id);
    }
  });

  // 4. Combinar todo con orden
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
