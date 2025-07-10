import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  Pressable
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from '../components/layout/Header';
import { BASE_URL } from '../utils/config';
import { StatsInventory } from '../components/containers/StatCards';
import Avatar from '../components/containers/Avatar';
import BadgesScreen from './BadgesScreen';
import Store from '../components/containers/Store';
import ChildNavbar from '../components/layout/ChildNavbar';
import { fontStyles } from '../styles/BubblFontStyles';
import BubblColors from '../styles/BubblColors';
import { useTab } from '../utils/TabContext';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const InventoryScreen = ({ navigation, route }) => {
  const { childProfileId } = route.params || {};
  const savedProfileId = useRef(childProfileId);
  const [user, setUser] = useState(null);
  const [badges, setBadges] = useState([]);
  const [section, setSection] = useState('assets');
  const [assets, setAssets] = useState([]);
  const { setActiveTab } = useTab();
  const insets = useSafeAreaInsets();
  const [avatarKey, setAvatarKey] = useState(0);

  const fetchUserAndBadges = async (id) => {
    try {
      const userRes = await axios.get(`${BASE_URL}/api/childProgress/dashboard/${id}`);
      setUser(userRes.data);
    } catch (error) {
      console.error('Error fetching user:', error.response?.status, error.response?.data);
    }

    try {
      const badgeRes = await axios.get(`${BASE_URL}/api/users/${id}/badges`);
      setBadges(badgeRes.data);
    } catch (error) {
      console.error('Error fetching badges:', error.response?.status, error.response?.data);
    }
  };

  useEffect(() => {
    const id = childProfileId || savedProfileId.current;
    if (!id) return;
    savedProfileId.current = id;
    fetchUserAndBadges(id);
  }, [childProfileId]);

  useEffect(() => {
    setActiveTab('shop');
  }, []);

  const refreshBadges = () => {
    axios
      .get(`${BASE_URL}/api/users/${savedProfileId.current}/badges`)
      .then(res => setBadges(res.data))
      .catch(err => console.error('Failed to refresh badges', err));
  };

  if (!user) return <Text>Loading...</Text>;

  return (
    <>
      <SafeAreaView edges={['top']} style={{ backgroundColor: BubblColors.BubblPurple500 }} />

      <View style={{ flex: 1, backgroundColor: BubblColors.BubblPurple500 }}>
        <Header title={'Shop'} />
        <ScrollView
          contentContainerStyle={{
            paddingBottom: insets.bottom + 50,
          }}
        >
          <View style={{ backgroundColor: BubblColors.BubblPurple500 }}>
            <View style={{ backgroundColor: 'white', borderTopRightRadius: 50, borderTopLeftRadius: 50 }}>
              <View style={{ alignItems: 'center', marginVertical: 20 }}>
                <StatsInventory user={user} badges={badges} section={section} />
              </View>

              <View style={styles.container}>
                <Pressable
                  style={[styles.toggle, section === 'assets' && styles.activeToggle]}
                  onPress={() => setSection('assets')}
                >
                  <Text style={[styles.text, section === 'assets' && styles.activeText]}>Assets</Text>
                </Pressable>
                <Pressable
                  style={[styles.toggle, section === 'badges' && styles.activeToggle]}
                  onPress={() => setSection('badges')}
                >
                  <Text style={[styles.text, section === 'badges' && styles.activeText]}>Badges</Text>
                </Pressable>
              </View>

              {section === 'assets' ? (
                <View>
                  <View style={{ alignItems: 'center', marginTop: 55 }}>
                    <Avatar
                      key={avatarKey}
                      userId={user.user_id}
                      userLevel={user.user_level}
                      skinSize={250}
                      skinWidth={250}
                      assets={assets}
                      setAssets={setAssets}
                      hatSize={165}
                      top={-80}
                      positionOverrides={{
                        "Beannie": { top: -40, left: 190, width: 120, height: 120, transform: [{ rotate: "25deg" }] },
                        "Bow": { top: -45, left: 205, width: 120, height: 120, transform: [{ rotate: "25deg" }] },
                        "Confetti": { left: 200, top: -60, width: 120, height: 120, transform: [{ rotate: "25deg" }] },
                        "Santa Hat": { left: 200, top: -50, width: 120, height: 120, transform: [{ rotate: "25deg" }] }
                      }}
                    />
                  </View>
                  <Store
                    userId={user.user_id}
                    userLevel={user.user_level}
                    userStars={user.user_star}
                    onAssetEquipped={() => setAvatarKey((prev) => prev + 1)}
                    assets={assets}
                  />
                </View>
              ) : (
                <BadgesScreen userId={savedProfileId.current} refreshBadges={refreshBadges} />
              )}
            </View>
          </View>
        </ScrollView>
        <ChildNavbar navigation={navigation} childProfileId={savedProfileId.current} />
      </View>

      <SafeAreaView edges={['bottom']} style={{ backgroundColor: 'white' }} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: BubblColors.BubblPurple100,
    borderRadius: 12,
    padding: 4,
    margin: 10,
  },
  text: {
    ...fontStyles.bodyDefault,
    color: 'black',
  },
  toggle: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 12,
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: '50%',
  },
  activeToggle: {
    backgroundColor: BubblColors.BubblPurple300,
    borderWidth: 2,
    borderColor: '#A997EE',
  },
});

export default InventoryScreen;