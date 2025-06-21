const supabase = require('../utils/supabaseClient');

exports.getAllModules = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('ref_module')
      .select('*')
      .order('module_number');

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('Error fetching modules:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
};
