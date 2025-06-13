const supabase = require('../utils/supabaseClient');

exports.getDashboard = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("user")   
      .select('*')     
      .eq('user_nickname', 'Andres');       

    if (error) throw error;

    res.json({ users: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};


