import { createClient } from '@supabase/supabase-js'
import * as SecureStore from 'expo-secure-store'
import BubblConfig from '../config/BubblConfig';

// This is a temporary information with my sample supabase project. It will be deleted later + the final one for the project will be handled properly with environment variables + in the backend.
const supabaseUrl = BubblConfig.SUPABASE_URL;
const supabaseAnonKey = BubblConfig.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: {
      getItem: SecureStore.getItemAsync,
      setItem: SecureStore.setItemAsync,
      removeItem: SecureStore.deleteItemAsync,
    },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;
