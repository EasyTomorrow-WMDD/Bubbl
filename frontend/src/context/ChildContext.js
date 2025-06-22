import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../utils/config';

const ChildContext = createContext();

export const ChildProvider = ({ children }) => {
  const [currentChild, setCurrentChild] = useState(null);

  useEffect(() => {
    const loadChild = async () => {
      try {
        const stored = await AsyncStorage.getItem('currentChild');
        if (stored) {
          setCurrentChild(JSON.parse(stored));
          return;
        }

      
        const session = await AsyncStorage.getItem('supabaseSession');
        if (!session) return;
        const token = JSON.parse(session).access_token;

      
        // Fetching Profiles of the user
        const res = await axios.get(`${BASE_URL}/api/users/profiles`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const children = res.data.children || [];
        if (children.length === 0) return;

        const firstChild = children[0];
        const userId = firstChild.user_id;

        
        const energyRes = await axios.get(`${BASE_URL}/api/energy/status`, {
          params: { user_id: userId }
        });

        const { user_energy, time_to_next_recharge_ms } = energyRes.data;

        // profile completed
        const loadedChild = {
          user_id: userId,
          user_nickname: firstChild.user_nickname,
          avatar_id: firstChild.avatar_id,
          user_xp: firstChild.user_xp || 0,
          user_star: firstChild.user_star || 0,
          user_energy: user_energy ?? 0,
          time_to_next_recharge_ms: time_to_next_recharge_ms ?? null,
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

