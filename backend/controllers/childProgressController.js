const supabase = require('../utils/supabaseClient');

exports.getDashboard = async (req, res) => {

  const userId = req.params.userId;
  
  try {
    const { data, error } = await supabase
      .from("user")   
      .select('*')     
      .eq('user_id', userId);       

    if (error) throw error;

    res.json(data[0]);
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
  const userId = req.headers['x-user-id'];
  if (!userId) return res.status(400).json({ error: 'Missing user ID' });

  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select(`
        topic_id,
        user_topic_completed,
        user_topic_available,
        user_last_attempted,
        user_topic_fail_count,
      `)
      .eq('user_id', userId)
      .order('ref_topic.module_id')
      .order('ref_topic.topic_number');

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

