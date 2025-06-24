import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import Header from '../components/layout/Header';
import { BASE_URL } from '../utils/config';
import { StatsInventory } from '../components/containers/StatCards';
import Avatar from '../components/containers/Avatar';
import Skins from '../components/containers/Skins';


const InventoryScreen = ({ navigation, route }) => {
  const { childProfileId } = route.params || {};
  const [user, setUser] = useState(null);
  const [section, setSection] = useState('assets');
  console.log('READING USER', user)
  useEffect(() => {
    if (!childProfileId) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/childProgress/dashboard/${childProfileId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [childProfileId]);

  if (!user) return <Text>Loading...</Text>;

  return (
    <ScrollView>
    <View >
      <Header />
      <View>
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <Text style={styles.title}>Inventory</Text>
        </View>
        <View>
          <StatsInventory user={user} />
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
      {section === 'assets' ? <Pressable>
        <View>
          <Avatar userId={user.user_id} userLevel={user.user_level}/>
          <Skins userId={user.user_id} userLevel={user.user_level}/>
        </View>
      </Pressable> : <Text>Badges</Text>}


    </View>
    </ScrollView>
  )
}

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