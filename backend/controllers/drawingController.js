// controllers/drawingController.js
const supabase = require('../utils/supabaseClient');

exports.uploadDrawing = async (req, res) => {
  try {
    const { imageBase64, user_profile_id, account_id, mood } = req.body;

    if (!imageBase64 || !user_profile_id || !account_id || !mood) {
      return res.status(400).json({ error: 'Missing image, profile ID, account ID, or mood' });
    }

    const buffer = Buffer.from(imageBase64, 'base64');
    const filename = `drawing-${Date.now()}.jpg`;
    const path = `${account_id}/${user_profile_id}/${mood}-${filename}`;

    const { error: uploadError } = await supabase.storage
      .from('drawings')
      .upload(path, buffer, {
        contentType: 'image/jpeg',
        upsert: false,
      });

    if (uploadError) {
      console.error(uploadError);
      return res.status(500).json({ error: 'Upload failed' });
    }

    return res.status(200).json({ message: 'Drawing uploaded!', path });
  } catch (err) {
    console.error('[uploadDrawing] Unexpected error:', err.message);
    res.status(500).json({ error: 'Unexpected server error' });
  }
};