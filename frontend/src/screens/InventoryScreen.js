import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import Header from '../components/layout/Header';
import { BASE_URL } from '../utils/config';
import { StatsInventory } from '../components/containers/StatCards';
import Avatar from '../components/containers/Avatar';
import BadgesScreen from './BadgesScreen';

const InventoryScreen = ({ navigation, route }) => {
  const { childProfileId } = route.params || {};
  const [user, setUser] = useState(null);
  const [badges, setBadges] = useState([]);
  const [section, setSection] = useState('assets');

  const fetchUserAndBadges = async () => {
  const userUrl = `${BASE_URL}/api/childProgress/dashboard/${childProfileId}`;
  const badgeUrl = `${BASE_URL}/api/users/${childProfileId}/badges`;

  try {
    console.log('🔍 Fetching user from:', userUrl);
    const userRes = await axios.get(userUrl);
    setUser(userRes.data);
  } catch (error) {
    console.error('❌ Error fetching user:', error.response?.status, error.response?.data);
  }

  try {
    console.log('🔍 Fetching badges from:', badgeUrl);
    const badgeRes = await axios.get(badgeUrl);
    setBadges(badgeRes.data);
  } catch (error) {
    console.error('❌ Error fetching badges:', error.response?.status, error.response?.data);
  }
};


  useEffect(() => {
    if (!childProfileId) return;
    console.log('🔍 childProfileId:', childProfileId);
    fetchUserAndBadges();
  }, [childProfileId]);

  const refreshBadges = () => {
    axios
      .get(`${BASE_URL}/api/users/${childProfileId}/badges`)
      .then(res => setBadges(res.data))
      .catch(err => console.error('Failed to refresh badges', err));
  };

  if (!user) return <Text>Loading...</Text>;

  return (
    <View>
      <Header />
      <View>
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <Text style={styles.title}>Inventory</Text>
        </View>
        <View>
          <StatsInventory user={user} badges={badges} />
        </View>
      </View>

      <View style={styles.container}>
        <Pressable style={styles.text} onPress={() => setSection('assets')}>
          <Text style={styles.text}>Assets</Text>
        </Pressable>
        <Pressable style={styles.text} onPress={() => setSection('badges')}>
          <Text style={styles.text}>Badges</Text>
        </Pressable>
      </View>

      {section === 'assets' ? (
        <Pressable>
          <View>
            <Avatar />
          </View>
        </Pressable>
      ) : (
        <BadgesScreen userId={childProfileId} refreshBadges={refreshBadges} />
      )}
    </View>
  );
};

export default InventoryScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 30,
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
});
