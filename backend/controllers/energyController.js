const supabase = require('../utils/supabaseClient');

const MINUTES_TO_RECHARGE = 30;
const MAX_ENERGY = 3;

exports.getEnergyStatus = async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) return res.status(400).json({ error: 'user_id is required' });

    const now = new Date();
    const { data: user, error } = await supabase
      .from('user')
      .select('user_energy, user_energy_last_lost')
      .eq('user_id', user_id)
      .single();

    if (error) return res.status(500).json({ error: error.message });
    if (!user) return res.status(404).json({ error: 'User not found' });

    let { user_energy, user_energy_last_lost } = user;
    let updatedEnergy = user_energy;
    let updatedLastLost = user_energy_last_lost;
    let needsUpdate = false;

    if (user_energy_last_lost && user_energy < MAX_ENERGY) {
      const lastLost = new Date(user_energy_last_lost);
      const minutesPassed = Math.floor((now - lastLost) / (1000 * 60));
      const recoverable = Math.floor(minutesPassed / MINUTES_TO_RECHARGE);
      const energyToApply = Math.min(recoverable, MAX_ENERGY - user_energy);

      if (energyToApply > 0) {
        updatedEnergy += energyToApply;
        updatedLastLost = updatedEnergy === MAX_ENERGY
          ? null
          : new Date(lastLost.getTime() + energyToApply * MINUTES_TO_RECHARGE * 60000).toISOString();
        needsUpdate = true;
      }
    }

    if (needsUpdate) {
      const { error: updateErr } = await supabase
        .from('user')
        .update({
          user_energy: updatedEnergy,
          user_energy_last_lost: updatedLastLost,
        })
        .eq('user_id', user_id);
      if (updateErr) return res.status(500).json({ error: updateErr.message });
    }

    let timeToNextRecharge = null;
    if (updatedEnergy < MAX_ENERGY && updatedLastLost) {
      const msPassed = now - new Date(updatedLastLost);
      timeToNextRecharge = Math.max(MINUTES_TO_RECHARGE * 60000 - msPassed, 0);
    }

    res.json({ user_energy: updatedEnergy, time_to_next_recharge_ms: timeToNextRecharge });
  } catch (err) {
    console.error('Energy status error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.reduceEnergy = async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) return res.status(400).json({ error: 'user_id is required' });

    const now = new Date();
    const { data: user, error } = await supabase
      .from('user')
      .select('user_energy, user_energy_last_lost')
      .eq('user_id', user_id)
      .single();

    if (error) return res.status(500).json({ error: error.message });
    if (!user) return res.status(404).json({ error: 'User not found' });

    let { user_energy, user_energy_last_lost } = user;
    if (user_energy > 0) {
      user_energy--;
      if (user_energy < MAX_ENERGY && !user_energy_last_lost) {
        user_energy_last_lost = now.toISOString();
      }
    }

    const { error: updateErr } = await supabase
      .from('user')
      .update({ user_energy, user_energy_last_lost })
      .eq('user_id', user_id);
    if (updateErr) return res.status(500).json({ error: updateErr.message });

    res.json({ user_energy });
  } catch (err) {
    console.error('Reduce energy error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
