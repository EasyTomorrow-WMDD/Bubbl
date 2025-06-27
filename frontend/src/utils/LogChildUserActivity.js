import supabase from '../services/supabase';
import axios from 'axios';
import BubblConfig from '../config/BubblConfig';


// Utility function to log child user activity
// This function takes the child user's user_id, a summary of the activity, and detailed information
// about the activity. It posts this information to the backend API to log the activity.
//
// Sample usage:
// import LogChildUserActivity from '../../utils/LogChildUserActivity';
// ...
// await LogChildUserActivity(childUserId, 'Completed a story', 'User completed story ID abc123 at level 2.');

export async function LogChildUserActivity(user_id, summary, details) {

  if (!user_id || !summary || !details) {
    console.warn('[WARNING][LogChildUserActivity] Missing arguments:', { user_id, summary, details });
    return;
  }

  try {
    // Step 1: Get the current session to retrieve access token
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session || !session.access_token) {
      console.warn('[WARNING][LogChildUserActivity] No active session found.');
      return;
    }

    // Step 3: Call the backend API
    const response = await axios.post(`${BubblConfig.BACKEND_URL}/api/log/childActivityLog`, {
        user_id,
        summary,
        details,
      },
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    if (!response.data.success) {
      console.warn('[WARNING][LogChildUserActivity] Log failed:', response.data);
    }

  } catch (err) {
    console.error('[ERROR][LogChildUserActivity] Error posting activity log:', err);
  }
}
