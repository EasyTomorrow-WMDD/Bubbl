const { createClient } = require('@supabase/supabase-js');

// Main uploadDrawing controller
exports.uploadDrawing = async (req, res) => {
  try {
    const { imageBase64, account_id, user_profile_id, mood } = req.body;

    console.log('[uploadDrawing] Incoming:', { account_id, user_profile_id, mood });

    if (!imageBase64 || !account_id || !user_profile_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Extract Bearer token from frontend
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    console.log('[uploadDrawing] Bearer token:', token);

    if (!token) {
      return res.status(401).json({ error: 'Missing Bearer token' });
    }

    // Create Supabase client using the user token (not service_role)
    const supabase = createClient(
      process.env.SUPABASE_URL,
      token
    );

    // Prepare upload
    const fileBuffer = Buffer.from(imageBase64, 'base64');
    // const filename = `drawing-${Date.now()}.jpg`;
    const filename = `${mood}-drawing-${Date.now()}.jpg`;

    const fullPath = `${account_id}/${user_profile_id}/${filename}`;

    console.log('[uploadDrawing] Uploading to:', fullPath);

    const { data, error } = await supabase.storage
      .from('drawings')
      .upload(fullPath, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: false, // prevent overwrite
      });

    if (error) {
      console.error('[uploadDrawing] Upload failed:', error);
      return res.status(500).json({ error: 'Upload failed' });
    }

    console.log('[uploadDrawing] Upload successful:', data);

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