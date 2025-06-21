const supabase = require('../utils/supabaseClient');

exports.getAllTopics = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('ref_topic')
      .select('*')
      .order('topic_number');

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Error fetching topics:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getTopicsByModule = async (req, res) => {
  const { moduleId } = req.params;
  try {
    const { data, error } = await supabase
      .from('ref_topic')
      .select('*')
      .eq('module_id', moduleId)
      .order('topic_number');

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Error fetching topics by module:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getTopicById = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('ref_topic')
      .select('*')
      .eq('topic_id', id)
      .single();

    if (error) return res.status(404).json({ error: 'Topic not found' });
    res.json(data);
  } catch (err) {
    console.error('Error fetching topic by ID:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.addTopic = async (req, res) => {
  const {
    module_id,
    topic_number,
    topic_title,
    topic_description,
    topic_activities,
    topic_completion_heading,
    topic_completion_text,
    topic_xp,
    topic_star
  } = req.body;

  try {
    const { error } = await supabase.from('ref_topic').insert([
      {
        module_id,
        topic_number,
        topic_title,
        topic_description,
        topic_activities,
        topic_completion_heading,
        topic_completion_text,
        topic_xp,
        topic_star
      }
    ]);

    if (error) throw error;
    res.json({ message: 'Topic added successfully' });
  } catch (err) {
    console.error('Error adding topic:', err);
    res.status(500).json({ error: err.message });
  }
};
