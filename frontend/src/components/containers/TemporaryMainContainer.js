import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StatsPanel from './StatCards';
import Module from './ModulesDashboard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../styles/BubblStyles';
import Header from '../layout/Header';
import ChildNavbar from '../layout/ChildNavbar';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../utils/config';


export default function TemporaryMainContainer() {
  const [user, setUser] = useState(null);
  const [modules, setModules] = useState([]);
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const navigation = useNavigation();

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

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`${BASE_URL}/api/childProgress/dashboard/${userId}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`${BASE_URL}/api/childProgress/modules?userId=${userId}`)
      .then((response) => setModules(response.data))
      .catch((error) => console.error('Error fetching modules:', error));
  }, [userId]);

  const handleTopicPress = (topic) => {
    navigation.navigate('TopicScreen', { topicId: topic.topic_id });
  };
  

  return (
    <View style={{ flex: 1 }}>
      <Header title="Home" />
      <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
        <View style={{ flex: 1, gap: 10 }}>
          <StatusBar style="auto" />
          <ImageBackground
            source={require('../../assets/images/Background_Purple.png')}
            resizeMode="cover"
            style={styles.background}
          >
            <View style={styles.container}>
              <Image source={require('../../assets/images/yellow_bubbl.png')} style={styles.img} />
              <Text style={styles.title}>Welcome, {user ? user.user_nickname : '...'}</Text>
              <StatsPanel user={user} />
              <Text style={styles.text}>Next HP refill in:</Text>
            </View>
          </ImageBackground>

          <View style={styles.cardContainer}>
            <Module modules={modules} onTopicPress={handleTopicPress} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.playTopic}>
        <Text>Keep Playing</Text>
      </View>

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
    bottom: 80,
    zIndex: 10,
    borderRadius: 12,
  },
});
