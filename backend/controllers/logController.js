const { DateTime } = require('luxon');
const supabase = require('../utils/supabaseClient');

// Route: POST /api/log/childActivityLog
// Logs user activity in the user_child_activity_log table
// Expects body: { user_id, summary, details }
// Returns: { success: true } or error message
exports.postChildActivityLog = async (req, res) => {
  try {
    const { user_id, summary, details, clan_key } = req.body;
    
    // Basic validation
    if (!user_id || !summary || !details) {
      return res.status(400).json({ error: 'Missing required fields: user_id, summary, or details' });
    }
    if (!clan_key) {
      clan_key = 'clan06'; // Default clan key (Bubbl purple) if not provided
    }

    // Insert into user_child_activity_log
    const { error } = await supabase
      .from('user_child_activity_log')
      .insert({
        user_id,
        log_event_summary: summary,
        log_event: details,
        log_clan: clan_key,
      });

    if (error) {
      console.error('[ERROR][postChildActivityLog] Supabase insert error:', error);
      return res.status(500).json({ error: 'Failed to insert activity log' });
    }

    return res.status(201).json({ success: true });
  } catch (err) {
    console.error('[ERROR][postChildActivityLog] Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Route: GET /api/logs/getChildActivityLog
// Retrieves activity logs for a child user
// Expects query params: user_id, search_year_month (optional), user_timezone
// Returns: { success: true, logs: [...] } or error message
exports.getChildActivityLog = async (req, res) => {
  console.log('[getChildActivityLog] Incoming request:', req.query);
  try {
    const { user_id, search_year_month, user_timezone } = req.query;

    console.log('[getChildActivityLog] Fetching logs for user:', user_id, 'with timezone:', user_timezone, 'and search year month:', search_year_month);

    if (!user_id || !user_timezone) {
      return res.status(400).json({ error: 'Missing user_id or user_timezone' });
    }

    let fromDateUTC, toDateUTC; // date range variables for searching

    if (!search_year_month) {
      // Case 1: If search condition is not provided, then get log for the past 30 days (from now in user's timezone)
      // fromDateUTC = 30 days ago from now in user's timezone
      // toDateUTC = now
      const now = DateTime.now().setZone(user_timezone); 
      fromDateUTC = now.minus({ days: 30 }).toUTC();
      toDateUTC = now.toUTC();
    } else {
      // Case 2: If search condition is provided, then get logs from the specific year + month — expected format: 'YYYYMM'
      // fromDateUTC = start of the month specified in search_year_month in user's timezone
      // toDateUTC = start of the next month in user's timezone

      const parsed = DateTime.fromFormat(search_year_month, 'yyyyLL', { zone: user_timezone });
      if (!parsed.isValid) {
        return res.status(400).json({ error: 'Invalid search_year_month format. Expected YYYYMM.' });
      }

      const startOfMonthLocal = parsed.startOf('month');
      const startOfNextMonthLocal = startOfMonthLocal.plus({ months: 1 });

      fromDateUTC = startOfMonthLocal.toUTC();
      toDateUTC = startOfNextMonthLocal.toUTC();
    }

    // Fetch activity logs from Supabase
    const { data, error } = await supabase
      .from('user_child_activity_log')
      .select('log_timestamp, log_event_summary, log_event')
      .eq('user_id', user_id)
      .gte('log_timestamp', fromDateUTC.toISO())
      .lt('log_timestamp', toDateUTC.toISO())
      .order('log_timestamp', { ascending: false });

    if (error) {
      console.error('[getChildActivityLog] Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch activity logs' });
    }

    return res.status(200).json({ success: true, logs: data });
  } catch (err) {
    console.error('[getChildActivityLog] Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
