const supabase = require('../utils/supabaseClient');

exports.getOnboardingStatus = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];

    if (!userId) {
      return res.status(400).json({ error: 'Missing user_id in header' });
    }

    const { data, error } = await supabase
      .from('user_onboarding')
      .select('completed')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      return res.status(500).json({ error: error.message });
    }

    // If no record found, assume first time → insert with completed = false
    if (!data) {
      await supabase
        .from('user_onboarding')
        .insert([{ user_id: userId, completed: false }]);

      return res.json({ completed: false });
    }

    return res.json({ completed: data.completed });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.completeOnboarding = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: 'Missing user_id in body' });
    }

    const { error } = await supabase
      .from('user_onboarding')
      .update({ completed: true, updated_at: new Date().toISOString() })
      .eq('user_id', user_id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ message: 'Onboarding marked as completed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
