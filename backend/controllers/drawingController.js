const { createClient } = require('@supabase/supabase-js');
const supabase = require('../utils/supabaseClient'); 

// Upload drawing to bucket + insert to 'drawing' table
exports.uploadDrawing = async (req, res) => {
  try {
    const { imageBase64, account_id, user_profile_id, mood } = req.body;

    console.log('[uploadDrawing] Incoming:', { account_id, user_profile_id, mood });

    if (!imageBase64 || !account_id || !user_profile_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Extract Bearer token
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    console.log('[uploadDrawing] Bearer token:', token);

    if (!token) {
      return res.status(401).json({ error: 'Missing Bearer token' });
    }

    // Create Supabase client with user token (for Storage upload)
    const supabaseStorage = createClient(
      process.env.SUPABASE_URL,
      token
    );

    // Prepare file upload
    const fileBuffer = Buffer.from(imageBase64, 'base64');
    const filename = `${mood}-drawing-${Date.now()}.jpg`;
    const fullPath = `${account_id}/${user_profile_id}/${filename}`;

    console.log('[uploadDrawing] Uploading to:', fullPath);

    const { data, error } = await supabaseStorage.storage
      .from('drawings')
      .upload(fullPath, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: false,
      });

    if (error) {
      console.error('[uploadDrawing] Upload failed:', error);
      return res.status(500).json({ error: 'Upload failed' });
    }

    console.log('[uploadDrawing] Upload successful:', data);

    // Insert to drawing table
    const drawingRecord = {
      user_profile_id,
      account_id,
      mood,
      drawing_url: fullPath,
      created_at: new Date().toISOString(),
    };

    console.log('[uploadDrawing] Will insert to drawing table:', drawingRecord);

    const { error: insertError } = await supabase
      .from('drawing')
      .insert(drawingRecord);

    if (insertError) {
      console.error('[uploadDrawing] Insert failed:', insertError);
      return res.status(500).json({ error: 'Insert to table failed' });
    }

    console.log('[uploadDrawing] Insert successful');

    return res.status(200).json({
      message: 'Drawing uploaded!',
      path: fullPath,
      mood: mood,
    });

  } catch (err) {
    console.error('[uploadDrawing] Unexpected error:', err.message);
    res.status(500).json({ error: 'Unexpected server error' });
  }
};

// Get all drawings for child
exports.getDrawingsByChild = async (req, res) => {
  const userId = req.params.userId;

  console.log('[getDrawingsByChild] Fetching drawings for user_profile_id:', userId);

  try {
    const { data, error } = await supabase
      .from('drawing')
      .select('user_profile_id, account_id, mood, drawing_url, created_at')
      .eq('user_profile_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[getDrawingsByChild] Fetch failed:', error.message);
      return res.status(500).json({ error: 'Fetch failed' });
    }

    console.log('[getDrawingsByChild] Fetched:', data.length, 'items');

    return res.status(200).json(data);
  } catch (err) {
    console.error('[getDrawingsByChild] Unexpected error:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};





// List drawings by user_profile_id
exports.listDrawings = async (req, res) => {
  const { userId } = req.params;

  console.log('[listDrawings] Fetching drawings for:', userId);

  try {
    const { data, error } = await supabase
      .from('drawing')
      .select('*')
      .eq('user_profile_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[listDrawings] DB error:', error.message);
      return res.status(500).json({ error: 'Failed to fetch drawings' });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('[listDrawings] Unexpected error:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};