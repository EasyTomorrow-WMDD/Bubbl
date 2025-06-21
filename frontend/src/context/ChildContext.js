import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ogbfgllkkyehcurolhjf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nYmZnbGxra3llaGN1cm9saGpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxOTA0NTMsImV4cCI6MjA2NDc2NjQ1M30.VIU3Wj-qyaRl4wT9wXGLFflrqooF58-SS8kZq9K8cBU' // ⚠️ Reemplaza con tu clave real
);

const ChildContext = createContext();

export const ChildProvider = ({ children }) => {
  const [currentChild, setCurrentChild] = useState(null);

  useEffect(() => {
    const loadChild = async () => {
      try {
        const stored = await AsyncStorage.getItem('currentChild');

        let userId = 'f954d892-69f4-4b4c-87cf-eb8729854dd4'; // fallback :)
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.user_id) userId = parsed.user_id;
        }

        // Get child data 
        const { data, error } = await supabase
          .from('user')
          .select('user_nickname, avatar_id, user_xp, user_star, user_energy')
          .eq('user_id', userId)
          .single();

        const loadedChild = {
          user_id: userId,
          user_nickname: data?.user_nickname || 'Demo Kid',
          avatar_id: data?.avatar_id || null,
          user_xp: data?.user_xp || 0,
          user_star: data?.user_star || 0,
          user_energy: data?.user_energy ?? null,
        };

        setCurrentChild(loadedChild);
        await AsyncStorage.setItem('currentChild', JSON.stringify(loadedChild));
      } catch (err) {
        console.error('Error loading child profile:', err);
      }
    };

    loadChild();
  }, []);

  const selectChild = async (child) => {
    setCurrentChild(child);
    await AsyncStorage.setItem('currentChild', JSON.stringify(child));
  };

  return (
    <ChildContext.Provider value={{ currentChild, selectChild }}>
      {children}
    </ChildContext.Provider>
  );
};

export const useCurrentChild = () => useContext(ChildContext);