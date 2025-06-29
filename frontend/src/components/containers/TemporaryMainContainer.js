import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StatsPanel from './StatCards';
import Module from './ModulesDashboard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../styles/BubblStyles';
// import Header from '../layout/Header';
import PatthernHeader from '../layout/PatternHeader';
import ChildNavbar from '../layout/ChildNavbar';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../utils/config';
import Avatar from './Avatar';

export default function TemporaryMainContainer() {
  const [user, setUser] = useState(null);
  const [modules, setModules] = useState([]);
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const [progress, setProgress] = useState([]);
  const navigation = useNavigation();
  console.log('USER ID:', userId);

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

  // ================= Fetch modules data ====================
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`${BASE_URL}/api/childProgress/modules?userId=${userId}`)
      .then((response) => setModules(response.data))
      .catch((error) => console.error('Error fetching modules:', error));
  }, [userId]);

  // ================= Fetch progress ====================
  useEffect(() => {
    if (!userId) return;

    const fetchChildProgress = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/childProgress/userProgress/${userId}`);
        console.log('Full response:', response)
        setProgress(response.data);
      } catch (error) {
        console.error('Error fetching child progress:', error);
      }
    }

    fetchChildProgress();
  }, [userId]);

  const handleTopicPress = (topic) => {
    navigation.navigate('TopicScreen', { topicId: topic.topic_id });
  };


  return (
    <View style={{ flex: 1,  }}>
      <PatthernHeader />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ flex: 1, backgroundColor: '#DFDAFAA' }}>
          <StatusBar style="auto" />
          <ImageBackground
            source={require('../../assets/images/Background_Purple.png')}
            resizeMode="cover"
            style={styles.background}
          >
            <View style={styles.backgroundOverlay} />
            <View style={styles.container}>
              <Image source={require('../../assets/images/yellow_bubbl.png')} style={styles.img} />
              {/* <Avatar userId={userId} userLevel={user ? user.user_level : null} /> */}
              <Text style={styles.title}>Hi, {user ? user.user_nickname : '...'}</Text>
              <StatsPanel user={user} />
              {user?.user_energy < 3 ? <Text style={styles.text}>Next HP refill in:</Text> : null }
            </View>

            <View style={{ backgroundColor: "#FFCE48", flexDirection: 'row' ,alignItems: 'center', justifyContent: 'center', gap: 5,marginHorizontal: 20, marginBottom: 20, padding: 20, borderRadius: 15, borderWidth: 2, borderColor: '#FFBA20' }}>
              <Text style={{ fontSize: 16, color: '#7A310D' }}>Continue from where you left</Text>
              <Image source={require('../../assets/icons/play_icon.png')} style={{height: 20, width: 20}}></Image>
            </View>
          </ImageBackground>

          <View>
            <Module modules={modules} progress={progress} onTopicPress={handleTopicPress} />
          </View>
        </View>
      </ScrollView>

      {/* Child Navbar */}
      <ChildNavbar navigation={navigation} childProfileId={userId} />
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
    transform: [{ translateY: -20 }]
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
    flexDirection: 'column',
    gap: 10,
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});

