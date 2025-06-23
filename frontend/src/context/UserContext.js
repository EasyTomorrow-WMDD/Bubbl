// frontend/src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect, use } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../utils/config';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [nickname, setNickname] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  console.log('USER CONTEXT:', userId, nickname, user); 

  useEffect(() => {
    const loadProfileInfo = async () => {
      try {
        const storedNickname = await AsyncStorage.getItem('selected_user_nickname');
        const storedUserId = await AsyncStorage.getItem('selected_user_id');
              console.log('Recuperado desde AsyncStorage:', storedUserId, storedNickname); 
        if (storedNickname) setNickname(storedNickname);
        if (storedUserId) setUserId(storedUserId);
      } catch (error) {
        console.error('Error loading user context:', error);
      }
    };

    loadProfileInfo();
  }, []);

    useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/childProgress/dashboard/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, user, setNickname, setUserId, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const userChildContext = () => useContext(UserContext);

