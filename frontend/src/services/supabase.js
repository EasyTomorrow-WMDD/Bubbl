import { createClient } from '@supabase/supabase-js'
import * as SecureStore from 'expo-secure-store'

// This is a temporary information with my sample supabase project. It will be deleted later + the final one for the project will be handled properly with environment variables + in the backend. 
const supabaseUrl = 'https://abdkngdxtrszvkwvqkmx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZGtuZ2R4dHJzenZrd3Zxa214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxODk1ODQsImV4cCI6MjA2NDc2NTU4NH0.9YxOPyYyA61hdOJx5GvuXti7118WI9kxcaO_Mia2PPI';

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
