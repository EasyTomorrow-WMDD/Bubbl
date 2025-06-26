import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Pressable } from 'react-native';
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import Header from '../components/layout/Header';
import { BASE_URL } from '../utils/config';
import { StatsInventory } from '../components/containers/StatCards';
import Avatar from '../components/containers/Avatar';
import Store from '../components/containers/Store';
import ChildNavbar from '../components/layout/ChildNavbar';


const InventoryScreen = ({ navigation, route }) => {
  const { childProfileId } = route.params || {};
  const [user, setUser] = useState(null);
  const [section, setSection] = useState('assets');
  const [avatarKey, setAvatarKey] = useState(0);
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
          <Pressable
            style={[styles.toggle, section === 'assets' && styles.activeToggle]}
            onPress={() => setSection('assets')}
          >
            <Text style={[styles.text, section === 'assets' && styles.activeText]}>
              Assets
            </Text>
          </Pressable>
          <Pressable
            style={[styles.toggle, section === 'badges' && styles.activeToggle]}
            onPress={() => setSection('badges')}
          >
            <Text style={[styles.text, section === 'badges' && styles.activeText]}>
              Badges
            </Text>
          </Pressable>
        </View>

        {section === 'assets' ? <Pressable>
          <View>
            <Avatar key={avatarKey} userId={user.user_id} userLevel={user.user_level} />
            <Store userId={user.user_id} userLevel={user.user_level} userStars={user.user_star} onAssetEquipped={() => setAvatarKey(prev => prev + 1)} />
          </View>
        </Pressable> : <Text>Badges</Text>}


      </View>
      <ChildNavbar navigation={navigation} />
    </ScrollView>
  )
}

export default InventoryScreen;

const styles = StyleSheet.create({
container: {
  flexDirection: 'row',
  justifyContent: 'center',
  backgroundColor: '#EEEDFE',
  borderRadius: 40,
  padding: 4,
  margin: 10,
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

toggle: {
  paddingVertical: 10,
  paddingHorizontal: 30,
  borderRadius: 12,
  backgroundColor: 'transparent',
  alignItems: 'center',
  width: '50%'
},
activeToggle: {
  backgroundColor: '#C5BDF5',
  borderWidth: 2,
  borderColor: '#A997EE',
},
})