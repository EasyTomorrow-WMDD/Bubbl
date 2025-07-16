import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StatsPanel from '../components/containers/StatCards';
import Module from '../components/containers/ModulesDashboard';
import { useTab } from '../utils/TabContext';

export default function ChildHome() {
  const [user, setUser] = useState(null);
  const [modules, setModules] = useState([]);
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const { setActiveTab } = useTab();;

  // ================= Load profile info from AsyncStorage ====================
  useEffect(() => {
    const loadProfileInfo = async () => {
      try {
        const storedNickname = await AsyncStorage.getItem('selected_user_nickname');
        const storedUserId = await AsyncStorage.getItem('selected_user_id');
        if (storedNickname) setNickname(storedNickname);
        if (storedUserId) setUserId(storedUserId);
      } catch (error) {
        console.error('Error loading profile info:', error);
      }
    };

    loadProfileInfo();
  }, []);

  // ================= Fetch user data from backend ====================
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:3000/api/childProgress/dashboard?userId=${userId}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, [userId]);

  // ================= Fetch modules data ====================
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:3000/api/childProgress/modules?userId=${userId}`)
      .then((response) => setModules(response.data))
      .catch((error) => console.error('Error fetching modules:', error));
  }, [userId]);


// ================= forces navbar to update correctly ====================
useEffect(() => {
  setActiveTab('activities'); 
}, []);

  return (
    <View>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={{ flex: 1, gap: 10 }}>
          <StatusBar style="auto" />
          <ImageBackground
            source={require('../assets/images/Background_Purple.png')}
            resizeMode="cover"
            style={styles.background}
          >
            <View style={styles.container}>
              <Image source={require('../assets/images/yellow_bubbl.png')} style={styles.img} />
              <Text style={styles.title}>Welcome, {user ? user.user_nickname : '...'}</Text>
              <StatsPanel user={user} />
              <Text style={styles.text}>Next HP refill in:</Text>
            </View>
          </ImageBackground>

          <View style={styles.cardContainer}>
            <Module modules={modules} />
          </View>
        </View>
      </ScrollView>
      <View style={styles.playTopic}>
        <Text>Keep Playing</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    overflow: 'hidden',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    padding: 0,
    margin: 0,
  },
  container: {
    alignItems: 'center',
    padding: 30,
    gap: 10,
  },
  img: {
    height: 190,
    width: 140,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardContainer: {
    width: '100%',
    paddingTop: 30,
    paddingHorizontal: 30,
    flexDirection: 'column',
    gap: 10,
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  playTopic: {
    backgroundColor: '#FFC670',
    width: '95%',
    height: 90,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 160,
  },
});
