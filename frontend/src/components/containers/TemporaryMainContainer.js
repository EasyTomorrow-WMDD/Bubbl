import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StatsPanel from './StatCards';
import Module from './ModulesDashboard';
import PatthernHeader from '../layout/PatternHeader';
import ChildNavbar from '../layout/ChildNavbar';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../utils/config';
import Avatar from './Avatar';
import EnergyTimer from './Timer';
import { fontStyles } from '../../styles/BubblFontStyles';
import BubblColors from '../../styles/BubblColors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { assetPositionMap } from '../../styles/assetPositionMain';

export default function TemporaryMainContainer() {
  const [user, setUser] = useState(null);
  const [modules, setModules] = useState([]);
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const [progress, setProgress] = useState([]);
  const navigation = useNavigation();
  const [userEnergy, setUserEnergy] = useState(null);
  const [nextRechargeTime, setNextReachargeTime] = useState(null);
  const [assets, setAssets] = useState([]);
  const [level, setLevel] = useState(null);

  // ================= Check onboarding status ====================
  useEffect(() => {
    if (!userId) return;
    const checkOnboardingStatus = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/onboarding/status`, {
          headers: { 'x-user-id': userId }
        });
        if (res.data && res.data.completed === false) {
          navigation.replace('OnboardingSlides');
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      }
    };
    checkOnboardingStatus();
  }, [userId, navigation]);

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
  // ================= Fetch ref level data ====================

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/childProgress/levels`);
        setLevel(response.data);
        console.log('Levels data fetched:', response.data);
      } catch (error) {
        console.error('Error fetching levels data:', error);
      }
    };
    fetchLevels();
  }, []);

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
        setProgress(response.data);
      } catch (error) {
        console.error('Error fetching child progress:', error);
      }
    };
    fetchChildProgress();
  }, [userId]);

  // =============== Fetch Energy (once on mount) =======================
  useEffect(() => {
    const fetchEnergyStatus = async () => {
      try {
        if (!userId) return;
        const res = await axios.get(`${BASE_URL}/api/energy/status`, {
          params: { user_id: userId }
        });
        const data = res.data;
        setUserEnergy(data.user_energy);
        if (data.time_to_next_recharge_ms !== null) {
          setNextReachargeTime(Date.now() + data.time_to_next_recharge_ms);
        } else {
          setNextReachargeTime(null);
        }
        setUser(prev => prev ? { ...prev, user_energy: data.user_energy } : prev);
      } catch (err) {
        console.error('Error fetching energy status:', err);
      }
    };
    fetchEnergyStatus();
  }, [userId]);

  // =============== Energy Polling =======================
  useEffect(() => {
    if (!userId) return;
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/energy/status`, {
          params: { user_id: userId }
        });
        const data = res.data;
        if (data && data.user_energy !== undefined) {
          setUser(prev => prev ? { ...prev, user_energy: data.user_energy } : prev);
          if (data.time_to_next_recharge_ms !== null) {
            setNextReachargeTime(Date.now() + data.time_to_next_recharge_ms);
          } else {
            setNextReachargeTime(null);
          }
        }
      } catch (err) {
        console.error('Error polling energy status:', err);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  // =================== Calculate currentTopicId ========================
  let currentTopicId = null;
  for (const mod of modules) {
    const sortedTopics = mod.ref_topic.sort((a, b) => a.topic_number - b.topic_number);
    for (const topic of sortedTopics) {
      const progressItem = progress.find((p) => p.topic_id === topic.topic_id);
      if (!progressItem?.user_topic_completed) {
        currentTopicId = topic.topic_id;
        break;
      }
    }
    if (currentTopicId) break;
  }

  const handleTopicPress = (topic) => {
    navigation.navigate('TopicScreen', {
      topicId: topic.topic_id,
      childProfileId: userId
    });
  };

  // ============ Build positionOverrides dynamically ============
  let currentSkinName = null;
  const positionOverrides = {};

  assets.forEach((asset) => {
    const type = asset.ref_asset.asset_type;
    const assetName = asset.ref_asset_variation.asset_variation_name;

    if (type === 'skin') {
      currentSkinName = assetName;
    }
  });

  assets.forEach((asset) => {
    const type = asset.ref_asset.asset_type;
    const assetName = asset.ref_asset_variation.asset_variation_name;

    if (type !== 'skin' && currentSkinName) {
      const map = assetPositionMap[assetName];
      if (map && map[currentSkinName]) {
        positionOverrides[assetName] = map[currentSkinName];
      }
    }
  });

  return (
    <>
      <SafeAreaView edges={['top']} style={{ backgroundColor: BubblColors.BubblPurple500 }} />
      <View style={{ flex: 1, backgroundColor: BubblColors.BubblPurple500 }}>
        <PatthernHeader />
        <ScrollView contentContainerStyle={{ paddingBottom: 80, paddingTop: 20, backgroundColor: BubblColors.BubblPurple50 }}>
          <View style={{ flex: 1, backgroundColor: '#DFDAFAA' }}>
            <StatusBar style="auto" />
            <ImageBackground
              source={require('../../assets/images/Background_Purple.png')}
              resizeMode="cover"
              style={[styles.background, {flexGrow:1, }]}>
              <View />
              <View style={styles.container}>
                <View style={{ zIndex: 1, marginTop:20, }}>
                  <Avatar
                    userId={userId}
                    userLevel={user ? user.user_level : null}
                    skinSize={200}
                    skinWidth={200}
                    assets={assets}
                    setAssets={setAssets}
                    hatSize={130}
                    top={-40}
                    positionOverrides={positionOverrides}
                  />
                </View>
                <Image source={require('../../assets/images/shadow.png')} style={{ position: 'relative', bottom: 40, width: 178, height: 18, zIndex: 0 }} />
                <Text style={[styles.title, fontStyles.display1]}>Hi, {user ? user.user_nickname : '...'}</Text>
                <StatsPanel user={user} level={level} />
                <View>{user?.user_energy < 3 ? <EnergyTimer userId={userId} /> : <Text style={{marginTop:-10}}></Text>}</View>

              </View>

              <Pressable
                style={{
                  backgroundColor: "#FFCE48",
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5,
                  marginHorizontal: 20,
                  marginBottom: 40,
                  marginTop: 20,
                  padding: 20,
                  borderRadius: 15,
                  borderWidth: 2,
                  borderColor: '#FFBA20'
                }}
                onPress={() => {
                  if (currentTopicId) {
                    handleTopicPress({ topic_id: currentTopicId });
                  }
                }}>
                <Text style={[fontStyles.bodyMedium, { color: '#7A310D' }]}>Continue from where you left</Text>
                <Image source={require('../../assets/icons/play_icon.png')} style={{ height: 20, width: 20 }} />
              </Pressable>
            </ImageBackground>
            <View>
              <Module modules={modules} progress={progress} onTopicPress={handleTopicPress} currentTopicId={currentTopicId} />
            </View>
          </View>
        </ScrollView>
        <ChildNavbar navigation={navigation} childProfileId={userId} />
      </View>
      <SafeAreaView edges={['bottom']} style={{ backgroundColor: 'white' }} />
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    overflow: 'hidden',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    padding: 0,
    marginBottom: -20,
    transform: [{ translateY: -20 }],

  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 30,
    // paddingVertical: 20,
    // marginBottom:0,
    // gap: 10,
    // position: 'relative',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 5
  },
});
