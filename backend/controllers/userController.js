const { DateTime } = require('luxon');
const supabase = require('../utils/supabaseClient');

// ## just FYI import in ESM mode - but I guess we can use CommonJS for now 
// import { DateTime } from 'luxon';
// import supabase from '../utils/supabaseClient.js';
// ## we also need to update all the exports.functionName to use ESM syntax: export default async functionName() { ... }

// ==========================================================================
// checkUserExists
// Route: GET /api/users/exists
// Description: Check if the auth user exists in the 'public.user' table by userId (in user_auth_id column).
// Returns: 200 with { exists: true/false } or 500 with error message
exports.checkUserExists = async (req, res) => {

  // Extract userId from request parameters
  const userAuthId = req.user.sub; // from verified JWT token payload via middleware
    console.log('[DEBUG] checkUserExists - userAuthId:', userAuthId);

  try {
    // Check if userId exists in the 'public.user' table
    const { data, error } = await supabase
      .from('user')
      .select('user_id')
      .eq('user_auth_id', userAuthId)
      .single();

    console.log('[DEBUG] checkUserExists - results:', !!data);

    // Return 500 error if there is an error other than 'PGRST116' (which indicates no data found)
    if (error && error.code !== 'PGRST116') {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Database error' });
    }


    // Otherwise, return 200 with the existence status (something or null)
    return res.status(200).json({ exists: !!data });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: 'Unexpected error' });
  }
};


// ==========================================================================
// generateInviteCode
// Function to generate a random invite code of specified length
// The code consists of uppercase letters and digits
// This is used in the registration process when creating a new account
const generateInviteCode = (length = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};


// ==========================================================================
// registerUser
// Route: POST /api/users/registerUser
// Description: Register a new user or add an existing user to an account.
// If isCreatingAccount is true, a new account is created with a unique invitation code.
// If isCreatingAccount is false, the user is added to an existing account using the provided invitation code.
exports.registerUser = async (req, res) => {
  // Extract user details from request body
  const {
    nickname,
    userType,
    dob,
    avatar_id,
    isCreatingAccount,
    accountName,
    invitationCode,
  } = req.body;

  const userAuthId = req.user.sub; // from JWT

  try {
    let accountId;

    // Route for creating a new account -------------------
    if (isCreatingAccount) {
      let inviteCode;
      let success = false;
      let retries = 5;

      // Attempt to create an account with a unique invitation code. 
      while (!success && retries > 0) {        
        inviteCode = generateInviteCode();  // Generate a random invite code
        // Try inserting a new account with the generated invite code
        const { data: account, error: accErr } = await supabase
          .from('account')
          .insert({
            account_name: accountName,
            account_invitation: inviteCode,
            account_invitation_expiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          })
          .select('account_id')
          .single();

        if (!accErr && account) {
          accountId = account.account_id;
          success = true;
        } else {
          retries--;
        }
      }

      if (!success) {
        return res.status(500).json({ error: 'Failed to create unique invitation code' });
      }

      // If account creation is successful, insert the user into the 'user' table
      const { data: user, error: userErr } = await supabase
        .from('user')
        .insert({
          account_id: accountId,
          user_auth_id: userAuthId,
          user_type: userType,
          user_access_type: 'user', 
          user_nickname: nickname,
          user_dob: dob,
          avatar_id,
        })
        .select('user_id')
        .single();

      if (userErr) throw userErr;

      // Update the account to set the user as the account owner
      await supabase
        .from('account')
        .update({ account_owner: user.user_id })
        .eq('account_id', accountId);

      return res.status(200).json({ success: true });
    } 
    // Route for joining an existing account --------------
    else {
      // Get an account by invitation code and validity date
      const { data: account, error: accErr } = await supabase
        .from('account')
        .select('account_id')
        .eq('account_invitation', invitationCode)
        .gte('account_invitation_expiry', new Date().toISOString())
        .single();

      // If no such account exists, or if invitation code is expired, return error.
      if (accErr || !account) {
        return res.status(400).json({ error: 'Invalid or expired invitation code' });
      }

      // If account is found, create a new user in the 'user' table with the same account_id
      accountId = account.account_id;

      const { error: userErr } = await supabase.from('user').insert({
        account_id: accountId,
        user_auth_id: userAuthId,
        user_access_type: 'user', 
        user_type: userType,
        user_nickname: nickname,
        user_dob: dob,
        avatar_id,
      });

      if (userErr) throw userErr;

      return res.status(200).json({ success: true });
    }
  } catch (err) {
    console.error('[ERROR][registerUser] Error:', err);
    return res.status(500).json({ error: 'Registration failed' });
  }
};


// ==========================================================================
// getUserProfiles
// Route: GET /api/users/profiles
// Description: Fetch all user profiles associated with the authenticated user's account.
// Returns: List of parent and child profiles(users) in the account
exports.getUserProfiles = async (req, res) => {
  const userAuthId = req.user.sub;

  // Step 1: Get current user information
  const { data: currentUser, error } = await supabase
    .from('user')
    .select('user_id, user_type, account_id')
    .eq('user_auth_id', userAuthId)
    .single();

  if (error || !currentUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Step 2: Get all profiles associated with the current user's account
    const { data: profiles, error: profilesErr } = await supabase
    .from('user')
        // .select('*')
    //Jaime Change to get the Id to save on drawings and create the folder
    .select('user_id, user_type, user_nickname, avatar_id, user_dob, account_id')
    .eq('account_id', currentUser.account_id);

  if (profilesErr) {
    return res.status(500).json({ error: 'Could not fetch profiles' });
  }


  // Step 3: Get account owner
  const { data: accountData, error: accountError } = await supabase
    .from('account')
    .select('account_owner')
    .eq('account_id', currentUser.account_id)
    .single();

  if (accountError || !accountData) {
    return res.status(500).json({ error: 'Could not fetch account info' });
  }
  
  // Step 4: Filter profiles into parents and children
  const parents = profiles.filter(p => p.user_type === 'parent');
  const children = profiles.filter(p => p.user_type === 'kid');

  // Step 5: Return the profiles + account owner information
  return res.status(200).json({ 
    parents, 
    children, 
    current_user_id: currentUser.user_id,
    current_user_type: currentUser.user_type,
    account_id: currentUser.account_id,
    account_owner_id: accountData.account_owner,
  });
};


// ==========================================================================
// Add user profile
// Route: POST /api/users/addProfile
// Description: Add a new user profile to the account.
exports.addProfile = async (req, res) => {

  // Extract userId from request parameters
  const userAuthId = req.user.sub; // from verified JWT token payload via middleware

  try {

    // Step 1: Get the authenticated user's account_id
    const { data: user, error: userError } = await supabase
      .from('user')
      .select('account_id')
      .eq('user_auth_id', userAuthId)
      .single();
    if (userError || !user) {
      console.error('Error fetching user account:', userError ? userError.message : 'User not found');
      return res.status(404).json({ error: 'User not found' });
    }
    const accountId = user.account_id;

    // Step 2: Get the request body parameters
    const {
      user_auth_id,
      user_access_type,
      user_type,
      user_nickname,
      user_dob,
      avatar_id,
    } = req.body;

    // Step 3: Insert the new profile into the 'user' table
    const { data, error } = await supabase
      .from('user')
      .insert([{
        account_id : accountId,
        user_auth_id : null,
        user_access_type : 'sub',
        user_type,
        user_nickname,
        user_dob,
        avatar_id,
      }])
      .select();

    if (error) {
      console.error('Error inserting profile:', error.message);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ user: data[0] });
  } catch (err) {
    console.error('Unexpected error in addProfile:', err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ==========================================================================
// getChildById
// Route: GET /api/users/:userId
// Description: Fetches public child profile data by user_id
exports.getChildById = async (req, res) => {
  const { userId } = req.params;

  try {
    const { data, error } = await supabase
      .from('user')
      .select('user_nickname, avatar_id, user_xp, user_star, user_energy')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Child not found' });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('[getChildById] ❌ Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// ==========================================================================
// getChildProfiles
// Route: GET /api/users/getChildProfiles
// Description: Fetches all child profiles for the authenticated user
// Returns: List of child profiles (user_id, user_nickname, avatar_id)
exports.getChildProfiles = async (req, res) => {

  // console.log('[DEBUG] /getChildProfiles hit');

  try {
    const userAuthId = req.user.sub; // get authenticated user's ID from JWT token

    // Step 1: Get the requesting user's account_id
    const { data: userData, error: userError } = await supabase
      .from('user')
      .select('account_id')
      .eq('user_auth_id', userAuthId)
      .single();

    if (userError || !userData) {
      console.error('[ERROR][getChildProfiles] User fetch error:', userError?.message);
      return res.status(404).json({ error: 'User not found' });
    }

    const accountId = userData.account_id;

    // Step 2: Get all child profiles for that account
    const { data: children, error: childrenError } = await supabase
      .from('user')
      .select('user_id, user_nickname, avatar_id')
      .eq('account_id', accountId)
      .eq('user_type', 'kid')
      .order('user_nickname', { ascending: true });

    if (childrenError) {
      console.error('[ERROR][getChildProfiles] Child fetch error:', childrenError.message);
      return res.status(500).json({ error: 'Error retrieving child profiles' });
    }

    return res.status(200).json({ success: true, children });

  } catch (err) {
    console.error('[ERROR][getChildProfiles] Unexpected error:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

// ==========================================================================
// updateDayStreak
// Route: POST /api/users/updateDayStreak
// Description: Updates the day streak for a child profile
// Input:
//   - user_id: ID of the child profile
//   - user_timezone: Timezone of the user (e.g., 'America/Vancouver')
// Output: 200 with updated streak info or 500 with error message
exports.updateDayStreak = async (req, res) => {
  const { user_id, user_timezone } = req.body;

  try {
    // Step 1: Fetch the current user data from public.user
    const { data: userData, error: userError } = await supabase
      .from('user')
      .select('user_day_streak, user_last_login_date')
      .eq('user_id', user_id)
      .single();
    
    if (userError || !userData) {
      console.error('[ERROR][updateDayStreak] User fetch error:', userError?.message);
      return res.status(404).json({ error: 'User not found' });
    }

    // Step 2: Convert last login and now into local time zone
    const now = DateTime.now().setZone(user_timezone).startOf('day');
    const lastLogin = DateTime.fromISO(userData.user_last_login_date, { zone: 'utc' })
      .setZone(user_timezone)
      .startOf('day');

    // Step 3: Calculate the difference in days and decide on the streak update
    const diffDays = now.diff(lastLogin, 'days').days;

    let newStreak = userData.user_day_streak;
    if (diffDays === 1) {
      // If the last login was yesterday, increment the streak
      newStreak += 1;
    } else if (diffDays > 1) {
      // If the last login was more than a day ago, reset the streak
      newStreak = 1;
    } 
      // Otherwise if diffDays === 0 => do nothing

    // Step 4: Update user information inSupabase
    const { error: updateError } = await supabase
      .from('user')
      .update({
        user_day_streak: newStreak,
        user_last_login_date: new Date().toISOString(), // UTC
      })
      .eq('user_id', user_id);

    if (updateError) {
      throw updateError;
    }

    return res.json({ success: true, user_day_streak: newStreak });
  } catch (err) {
    console.error('[ERROR][updateDayStreak] error:', err.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// ==========================================================================
// getChildUserStats
// Route: GET /api/users/:userId/stats
// Description: Fetches child user stats by user_id
// Returns: Object with user stats (user_xp, user_star, user_energy)
exports.getChildUserStats = async (req, res) => {

  console.log('[DEBUG] /getChildUserStats hit');

  const { userId } = req.params;

  try {
    // Step 1: Fetch user core info (nickname, level, xp, etc.)
    const { data: userData, error: userError } = await supabase.rpc('get_user_progress_stats', { uid: userId });

    if (userError || !userData || userData.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found or stats unavailable.' });
    }

    const user = userData[0];
    
    // Step 2: Fetch avatar layers
    const { data: avatarAssets, error: avatarError } = await supabase.rpc('get_user_avatar_assets', { uid: userId });
    if (avatarError) throw avatarError;

    // Step 3: Fetch activated badges (max 3)
    const { data: badges, error: badgeError } = await supabase.rpc('get_user_active_badges', { uid: userId });
    if (badgeError) throw badgeError;

    // Step 4: Return the user stats along with avatar assets and badges
    res.json({
      success: true,
      user: userData[0],
      avatar_assets: avatarAssets,
      badges,
    });

  } catch (err) {
    console.error('[getChildUserStats] Error:', err.message);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
