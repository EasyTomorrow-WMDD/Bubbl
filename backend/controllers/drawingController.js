// const { createClient } = require('@supabase/supabase-js');

// // Main uploadDrawing controller
// exports.uploadDrawing = async (req, res) => {
//   try {
//     const { imageBase64, account_id, user_profile_id, mood } = req.body;

//     console.log('[uploadDrawing] Incoming:', { account_id, user_profile_id, mood });

//     if (!imageBase64 || !account_id || !user_profile_id) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     // Extract Bearer token from frontend
//     const authHeader = req.headers.authorization || '';
//     const token = authHeader.replace('Bearer ', '');
//     console.log('[uploadDrawing] Bearer token:', token);

//     if (!token) {
//       return res.status(401).json({ error: 'Missing Bearer token' });
//     }

//     // Create Supabase client using the user token (not service_role)
//     const supabase = createClient(
//       process.env.SUPABASE_URL,
//       token
//     );

//     // Prepare upload
//     const fileBuffer = Buffer.from(imageBase64, 'base64');
//     const filename = `${mood}-drawing-${Date.now()}.jpg`;

//     const fullPath = `${account_id}/${user_profile_id}/${filename}`;

//     console.log('[uploadDrawing] Uploading to:', fullPath);

//     const { data, error } = await supabase.storage
//       .from('drawings')
//       .upload(fullPath, fileBuffer, {
//         contentType: 'image/jpeg',
//         upsert: false, // prevent overwrite
//       });

//     if (error) {
//       console.error('[uploadDrawing] Upload failed:', error);
//       return res.status(500).json({ error: 'Upload failed' });
//     }

//     console.log('[uploadDrawing] Upload successful:', data);

//     // 1️⃣ Upload successful — now insert into drawing table (use service_role)
//     const serviceClient = createClient(
//       process.env.SUPABASE_URL,
//       process.env.SUPABASE_SERVICE_ROLE_KEY
//     );

//     const insertPayload = {
//       user_profile_id,
//       account_id,
//       mood,
//       drawing_url: fullPath,
//       created_at: new Date().toISOString(),
//     };

//     console.log('[uploadDrawing] Will insert to drawing table with service role:', insertPayload);

//     const { error: insertError } = await serviceClient
//       .from('drawing')
//       .insert(insertPayload);

//     if (insertError) {
//       console.error('[uploadDrawing] Insert failed:', insertError);
//       return res.status(500).json({ error: 'Insert to table failed' });
//     }

//     console.log('[uploadDrawing] Insert successful!');

//     // ✅ Final response
//     return res.status(200).json({
//       message: 'Drawing uploaded!',
//       path: fullPath,
//       mood: mood,
//     });

//   } catch (err) {
//     console.error('[uploadDrawing] Unexpected error:', err.message);
//     res.status(500).json({ error: 'Unexpected server error' });
//   }
// };






// // ==========================================================================
// // Retrieve Drawings
// // GET /api/drawings/retrieve?user_profile_id=xxx&month=yyyy-mm
// exports.retrieveDrawings = async (req, res) => {
//   try {
//     const user_profile_id = req.query.user_profile_id;
//     const month = req.query.month; // format: yyyy-mm (optional)

//     if (!user_profile_id) {
//       return res.status(400).json({ error: 'Missing user_profile_id' });
//     }

//     // Extract Bearer token from frontend
//     const authHeader = req.headers.authorization || '';
//     const token = authHeader.replace('Bearer ', '');

//     if (!token) {
//       return res.status(401).json({ error: 'Missing Bearer token' });
//     }

//     // Create Supabase client with user token
//     const supabase = createClient(
//       process.env.SUPABASE_URL,
//       token
//     );

//     // List all files in this user's folder
//     const { data, error } = await supabase.storage
//       .from('drawings')
//       .list(`${user_profile_id}`, {
//         limit: 1000,
//         offset: 0,
//         sortBy: { column: 'created_at', order: 'desc' },
//       });

//     if (error) {
//       console.error('[retrieveDrawings] Error listing files:', error.message);
//       return res.status(500).json({ error: 'Failed to list drawings' });
//     }

//     console.log(`[retrieveDrawings] Found ${data.length} files`);

//     // Filter + map results
//     const filtered = data
//       .filter((item) => {
//         if (!month) return true;
//         const itemDate = new Date(item.created_at);
//         const itemMonth = `${itemDate.getFullYear()}-${String(itemDate.getMonth() + 1).padStart(2, '0')}`;
//         return itemMonth === month;
//       })
//       .map((item) => {
//         // Extract mood from filename: mood-drawing-xxx.jpg
//         const match = item.name.match(/^(.+)-drawing-\d+\.jpg$/);
//         const mood = match ? match[1] : 'unknown';

//         return {
//           name: item.name,
//           path: `${user_profile_id}/${item.name}`,
//           mood: mood,
//           created_at: item.created_at,
//           publicUrl: `${process.env.SUPABASE_URL}/storage/v1/object/public/drawings/${user_profile_id}/${item.name}`
//         };
//       });

//     return res.status(200).json({ drawings: filtered });

//   } catch (err) {
//     console.error('[retrieveDrawings] Unexpected error:', err.message);
//     res.status(500).json({ error: 'Unexpected server error' });
//   }
// };



// // ==========================================================================
// // Get Drawings
// // GET /api/drawings/:user_profile_id
// exports.getDrawingsByUser = async (req, res) => {
//   const user_profile_id = req.params.user_profile_id;

//   try {
//     const serviceClient = createClient(
//       process.env.SUPABASE_URL,
//       process.env.SUPABASE_SERVICE_ROLE_KEY
//     );

//     const { data, error } = await serviceClient
//       .from('drawing')
//       .select('*')
//       .eq('user_profile_id', user_profile_id)
//       .order('created_at', { ascending: false });

//     if (error) throw error;

//     res.status(200).json(data);
//   } catch (err) {
//     console.error('[getDrawingsByUser] Error:', err.message);
//     res.status(500).json({ error: 'Failed to fetch drawings' });
//   }
// };




// // ==========================================================================
// // Get Drawings by Child
// // GET /api/drawings/getByChild/:userId

// exports.getDrawingsByChild = async (req, res) => {
//   const userId = req.params.userId;

//   console.log('[getDrawingsByChild] Fetching drawings for user_profile_id:', userId);

//   try {
//     const { data, error } = await supabase
//       .from('drawing')
//       .select('user_profile_id, account_id, mood, drawing_url, created_at')
//       .eq('user_profile_id', userId)
//       .order('created_at', { ascending: false });

//     if (error) {
//       console.error('[getDrawingsByChild] Fetch failed:', error.message);
//       return res.status(500).json({ error: 'Fetch failed' });
//     }

//     return res.status(200).json(data);
//   } catch (err) {
//     console.error('[getDrawingsByChild] Unexpected error:', err.message);
//     return res.status(500).json({ error: 'Server error' });
//   }
// };



























const { createClient } = require('@supabase/supabase-js');
const supabase = require('../utils/supabaseClient'); // for table inserts

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