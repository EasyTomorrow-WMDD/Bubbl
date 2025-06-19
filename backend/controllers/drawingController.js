const supabase = require('../utils/supabaseClient');

exports.uploadDrawing = async (req, res) => {
  try {
    const { imageBase64, user_profile_id } = req.body;

    if (!imageBase64 || !user_profile_id) {
      return res.status(400).json({ error: 'Missing image or profile ID' });
    }

    // Get current user's account_id
    const { data: currentUser, error } = await supabase
      .from('user')
      .select('account_id')
      .eq('user_auth_id', req.user.sub)
      .single();

    if (error || !currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const accountId = currentUser.account_id;
    const buffer = Buffer.from(imageBase64, 'base64');
    const filename = `drawing-${Date.now()}.jpg`;

    // Folder path: account_id / user_profile_id / filename
    const path = `${accountId}/${user_profile_id}/${filename}`;

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