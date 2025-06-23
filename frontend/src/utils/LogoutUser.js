import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../services/supabase';

// ==========================================================================
// LogoutUser utility method
// A utility function to handle user logout in the Bubbl app
//
// Example usage:
// import LogoutUser from '../../utils/LogoutUser';
// const handleLogout = async () => {
//   const success = await LogoutUser(navigation);
//   if (success) {
//     console.log('[INFO] User logged out successfully');
//   } else {
//     console.error('[ERROR] Failed to log out user');
//   }
// };
// 
const LogoutUser = async (navigation) => {
  try {
    // Step 1: Clear AsyncStorage
    await AsyncStorage.clear();
    // console.log('[INFO][Logout] Cleared AsyncStorage');

    // Step 2: Sign out from Supabase
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('[ERROR][Logout] Error signing out from Supabase:', error.message);
      return false;
    }

    // Step 3: Navigate to welcome screen
    navigation.replace('Welcome');
    return true;
  } catch (err) {
    console.error('[ERROR][Logout] Unexpected error during logout:', err);
    return false;
  }
};

export default LogoutUser;
