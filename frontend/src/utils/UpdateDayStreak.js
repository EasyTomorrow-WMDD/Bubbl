import supabase from '../services/supabase';
import axios from 'axios';
import BubblConfig from '../config/BubblConfig';

// Utility function to update the day streak for a user
// This function takes the child user's user_id as an argument, gets the user's timezone, and calls the backend API to
// update the day streak for that user. 
//
// Sample usage:
// import updateDayStreak from '../../utils/UpdateDayStreak';
// updateDayStreak('user_id_here');
//
const updateDayStreak = async (user_id) => {
  try {
    // Step 1: Get the current session to retrieve access token
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session || !session.access_token) {
      console.warn('[UpdateDayStreak] No active session found.');
      return;
    }

    // Step 2: Get user timezone from device
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

    // Step 3: Call the backend API
    const response = await axios.post(
      `${BubblConfig.BACKEND_URL}/api/users/updateDayStreak`,
      {
        user_id,
        user_timezone: timezone,
      },
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    if (response.data?.success) {
      console.log('[UpdateDayStreak] Success. Streak:', response.data.user_day_streak);
    } else {
      console.warn('[UpdateDayStreak] API response unsuccessful:', response.data);
    }
  } catch (err) {
    console.error('[UpdateDayStreak] Error:', err.message);
  }
};

export default updateDayStreak;
