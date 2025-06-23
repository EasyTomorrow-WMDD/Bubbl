const supabase = require('../utils/supabaseClient');

// ==========================================================================
// getEssentialsStoriesForUser
// Route: GET /api/stories/essentials/:user_id
// Description: Fetch all essentials stories for a specific user, including read status
// Returns: List of essentials stories with read status, total count, and completed count
exports.getEssentialsStoriesForUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    // Step 1: Get all essentials articles
    const { data: stories, error: storyError } = await supabase
      .from('ref_parent_story')
      .select('parent_story_id, parent_story_title, parent_story_summary, parent_story_featured_image_url')
      .eq('parent_story_type', 'essentials');

    if (storyError) throw storyError;

    const storyIds = stories.map(s => s.parent_story_id);

    // Step 2: Get read status for this user
    const { data: readStatus, error: statusError } = await supabase
      .from('user_read_status')
      .select('parent_story_id')
      .eq('user_id', user_id)
      .in('parent_story_id', storyIds);

    if (statusError) throw statusError;

    const readStoryIds = new Set(readStatus.map(r => r.parent_story_id));

    // Step 3: Combine read status into story objects
    const enrichedStories = stories.map(story => ({
      ...story,
      read: readStoryIds.has(story.parent_story_id)
    }));

    // Step 4: Count totals
    const totalCount = stories.length;
    const completedCount = readStoryIds.size;

    return res.json({
      totalCount,
      completedCount,
      stories: enrichedStories
    });
  } catch (err) {
    console.error('[ERROR][getEssentialsStoriesForUser]', err.message || err);
    res.status(500).json({ error: 'Failed to fetch essentials stories' });
  }
};

// ==========================================================================
// searchParentStories
// Route: GET /api/stories/search
// Description: Search for parent stories based on text and type
// Returns: List of parent stories matching the search criteria
exports.searchParentStories = async (req, res) => {
  const { user_id, text = '', type = 'all' } = req.query;

  try {
    let query = supabase
      .from('ref_parent_story')
      .select('parent_story_id, parent_story_title, parent_story_summary, parent_story_featured_image_url, parent_story_type')
      .neq('parent_story_type', 'essentials');

    if (type !== 'all') {
      query = query.eq('parent_story_type', type);
    }

    if (text.trim() !== '') {
      query = query.ilike('parent_story_details', `%${text}%`);
    }

    const { data, error } = await query;
    if (error) throw error;

    res.json({ stories: data });
  } catch (err) {
    console.error('[ERROR] searchParentStories:', err.message || err);
    res.status(500).json({ error: 'Failed to search stories' });
  }
};

// ==========================================================================
// getOneParentStory
// Route: GET /api/stories/getOneParentStory/:story_id
// Description: Fetch a single parent story by ID, including read status
// Returns: Parent story details with read status
exports.getOneParentStory = async (req, res) => {
  const { story_id } = req.params;

  try {
    // Step 1: Get the parent story details
    const { data: story, error: storyError } = await supabase
      .from('ref_parent_story')
      .select('parent_story_id, parent_story_title, parent_story_summary, parent_story_details, parent_story_featured_image_url, parent_story_type, parent_story_number')
      .eq('parent_story_id', story_id)
      .single();

    if (storyError) throw storyError;

    // Step 2: If the story type is 'essentials', fetch previous and next stories
    if (story.parent_story_type === 'essentials') {
      const { data: previous } = await supabase
        .from('ref_parent_story')
        .select('parent_story_id')
        .eq('parent_story_type', 'essentials')
        .lt('parent_story_number', story.parent_story_number)
        .order('parent_story_number', { ascending: false })
        .limit(1)
        .maybeSingle();

      const { data: next } = await supabase
        .from('ref_parent_story')
        .select('parent_story_id')
        .eq('parent_story_type', 'essentials')
        .gt('parent_story_number', story.parent_story_number)
        .order('parent_story_number', { ascending: true })
        .limit(1)
        .maybeSingle();

      story.previous_story_id = previous?.parent_story_id ?? null;
      story.next_story_id = next?.parent_story_id ?? null;
    }

    return res.json({ story });

  } catch (err) {
    console.error('[ERROR][getOneParentStory]', err.message || err);
    res.status(500).json({ error: 'Failed to fetch parent story' });
  }
}

// ==========================================================================
// markStoryAsRead
// Route: POST /api/stories/markStoryAsRead
// Description: Mark a parent story as read for the current user
// Returns: Success message
exports.markStoryAsRead = async (req, res) => {
  const { user_id, parent_story_id } = req.body;

  if (!user_id || !parent_story_id) {
    return res.status(400).json({ error: 'Missing user_id or parent_story_id' });
  }

  try {
    // Step 1: Insert or update the read status
    const { data, error } = await supabase
      .from('user_read_status')
      .upsert({ user_id, parent_story_id, user_parent_story_read: true }, { onConflict: ['user_id', 'parent_story_id'] });
    if (error) throw error;
    return res.json({ message: 'Story marked as read successfully' });
  } catch (err) {
    console.error('[ERROR][markStoryAsRead]', err.message || err);
    res.status(500).json({ error: 'Failed to mark story as read' });
  }
};

// ==========================================================================
// getRelatedStories
// Route: GET /api/stories/getRelatedStories
// Description: Randomly fetch up to 3 related stories based on type, excluding the current story ID
// Returns: List of related stories
exports.getRelatedStories = async (req, res) => {
  const { type, exclude } = req.query;

  if (!type || !exclude) {
    return res.status(400).json({ error: 'Missing type or exclude parameters' });
  }

  try {
    // Step 1: Fetch related stories based on type, excluding the current story ID. Get up to 10 stories.
    const { data, error } = await supabase
      .from('ref_parent_story')
      .select('parent_story_id, parent_story_title, parent_story_summary, parent_story_featured_image_url')
      .eq('parent_story_type', type)
      .neq('parent_story_id', exclude)
      .limit(10);

    if (error) throw error;

    // Step 2: Randomize and pick 3
    const shuffled = data.sort(() => 0.5 - Math.random());
    const stories = shuffled.slice(0, 3);

    return res.json({ stories });
  } catch (err) {
    console.error('[ERROR][getRelatedStories]', err.message || err);
    res.status(500).json({ error: 'Failed to fetch related stories' });
  }
};
