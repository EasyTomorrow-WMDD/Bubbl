// controllers/levelController.js
const supabase = require('../utils/supabaseClient');

async function levelUp(req, res) {
  const { user_id } = req.params;
  const { xp = 0, stars = 0 } = req.body;
  try {
    // 1) Obtener datos actuales del usuario
    const { data: user, error: fetchErr } = await supabase
      .from('users')
      .select('total_xp, total_stars')
      .eq('id', user_id)
      .single();
    if (fetchErr) throw fetchErr;

    // 2) Sumar xp y stars
    const newXp = user.total_xp + xp;
    const newStars = user.total_stars + stars;

    // 3) Calcular nuevo nivel (ejemplo: 100 XP por nivel)
    const newLevel = Math.floor(newXp / 100);

    // 4) Actualizar registro del usuario
    const { error: updateErr } = await supabase
      .from('users')
      .update({ total_xp: newXp, total_stars: newStars, level: newLevel })
      .eq('id', user_id);
    if (updateErr) throw updateErr;

    return res.json({ level: newLevel, total_xp: newXp, total_stars: newStars });
  } catch (error) {
    console.error('Error en levelUp:', error);
    return res.status(500).json({ error: 'No se pudo procesar el level up' });
  }
}

module.exports = { levelUp };