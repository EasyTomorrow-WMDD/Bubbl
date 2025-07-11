import supabase from '../services/supabase';
import axios from 'axios';
import BubblConfig from '../config/BubblConfig';
import { validClanKeys } from './ClanMappings';


// Utility function to log child user activity
// This function takes the child user's user_id, a summary of the activity, and detailed information
// about the activity. It posts this information to the backend API to log the activity.
//
// Sample usage:
// import LogChildUserActivity from '../../utils/LogChildUserActivity';
// ...
// await LogChildUserActivity(childUserId, 'Completed a story', 'User completed story ID abc123 at level 2.', 'clan06');

const LogChildUserActivity = async (user_id, summary, details, clan_key) => {

  // Validate mandatory input parameters
  if (!user_id || !summary || !details) {
    console.warn('[WARNING][LogChildUserActivity] Missing arguments:', { user_id, summary, details });
    return;
  }

  // Validate clan_key - if not provided or invalid, default to 'clan06'
  if (typeof clan_key !== 'string' || !validClanKeys.includes(clan_key)) {
    console.warn(`Invalid clan_key "${clan_key}" provided. Defaulting to "clan06".`);
    clan_key = 'clan06';
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
    console.log(`${BubblConfig.BACKEND_URL}/api/logs/childActivityLog`);
    const response = await axios.post(`${BubblConfig.BACKEND_URL}/api/logs/childActivityLog`, {
        user_id,
        summary,
        details,
        clan_key,
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

export default LogChildUserActivity;
