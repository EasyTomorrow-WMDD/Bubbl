import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../utils/config';

const ChildContext = createContext();

export const ChildProvider = ({ children }) => {
  const [currentChild, setCurrentChild] = useState(null);
  const [isLoadingChild, setIsLoadingChild] = useState(true);

  useEffect(() => {
    const loadChild = async () => {
      console.log('[ChildContext] Starting loadChild()...');

      try {
        const stored = await AsyncStorage.getItem('currentChild');
        console.log('[ChildContext] Stored child:', stored);

        if (stored) {
          const parsed = JSON.parse(stored);
          setCurrentChild(parsed);
          console.log('[ChildContext] Loaded child from storage:', parsed);
          setIsLoadingChild(false);
          return;
        }

        const session = await AsyncStorage.getItem('supabaseSession');
        console.log('[ChildContext] Session:', session);

        if (!session) {
          console.log('[ChildContext] No session found');
          setIsLoadingChild(false);
          return;
        }

        const token = JSON.parse(session).access_token;
        console.log('[ChildContext] Using token:', token);

        const res = await axios.get(`${BASE_URL}/api/users/profiles`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('[ChildContext] Fetched profiles:', res.data);

        const children = res.data.children || [];
        if (children.length === 0) {
          console.log('[ChildContext] No children found in profile');
          setIsLoadingChild(false);
          return;
        }

        const firstChild = children[0];
        const userId = firstChild.user_id;

        const energyRes = await axios.get(`${BASE_URL}/api/energy/status`, {
          params: { user_id: userId }
        });

        console.log('[ChildContext] Fetched energy:', energyRes.data);

        const { user_energy, time_to_next_recharge_ms } = energyRes.data;

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
        console.log('[ChildContext] Loaded child from API:', loadedChild);
      } catch (err) {
        console.error('[ChildContext] Error loading child profile:', err);
      } finally {
        console.log('[ChildContext] Done loading child');
        setIsLoadingChild(false);
      }
    };

    loadChild();
  }, []);

  const selectChild = async (child) => {
    console.log('[ChildContext] selectChild:', child);
    setCurrentChild(child);
    await AsyncStorage.setItem('currentChild', JSON.stringify(child));
  };

  return (
    <ChildContext.Provider value={{ currentChild, selectChild, isLoadingChild }}>
      {children}
    </ChildContext.Provider>
  );
};


export const useCurrentChild = () => useContext(ChildContext);