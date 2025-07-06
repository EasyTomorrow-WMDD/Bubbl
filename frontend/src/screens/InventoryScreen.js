import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Pressable } from 'react-native';
import { useState, useEffect, createContext } from 'react';
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



const InventoryScreen = ({ navigation, route }) => {
  const { childProfileId } = route.params || {};
  const [user, setUser] = useState(null);
  const [badges, setBadges] = useState([]);
  const [section, setSection] = useState('assets');
  const [assets, setAssets] = useState([]);


  const fetchUserAndBadges = async () => {
    const userUrl = `${BASE_URL}/api/childProgress/dashboard/${childProfileId}`;
    const badgeUrl = `${BASE_URL}/api/users/${childProfileId}/badges`;

    try {
      //console.log('Fetching user from:', userUrl);
      const userRes = await axios.get(userUrl);
      setUser(userRes.data);
    } catch (error) {
      console.error('Error fetching user:', error.response?.status, error.response?.data);
    }

    try {
      //console.log('Fetching badges from:', badgeUrl);
      const badgeRes = await axios.get(badgeUrl);
      setBadges(badgeRes.data);
    } catch (error) {
      console.error('Error fetching badges:', error.response?.status, error.response?.data);
    }
  };


  const [avatarKey, setAvatarKey] = useState(0);
  console.log('READING USER', user)
  useEffect(() => {
    if (!childProfileId) return;
    // console.log('childProfileId:', childProfileId);
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
    <>
      <ScrollView>
        <View>
          <Header title={'Shop'} />
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

              {section === 'assets' ? (
                <View>
                  <View style={{ alignItems: 'center', marginTop: 85 }}>
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
                        "red-hat": { top: -70, left: 100, width: 200, height: 170 },
                        "bow": { top: -25, left: 155,  },
                        "party": { left: 200, top: -30, transform: [{ rotate: "25deg" }]  },
                        "santa-hat": { left: 200, top: -30, transform: [{ rotate: "25deg" }] }
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
                <BadgesScreen userId={childProfileId} refreshBadges={refreshBadges} />
              )}
            </View>
          </View>
        </View>

      </ScrollView>
      <ChildNavbar navigation={navigation} />
    </>
  );

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: BubblColors.BubblPurple100,
    borderRadius: 12,
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
    ...fontStyles.bodyDefault,
    color: 'black',
  },

  toggle: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 12,
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: '50%'
  },
  activeToggle: {
    backgroundColor: BubblColors.BubblPurple300,
    borderWidth: 2,
    borderColor: '#A997EE',
  },
})

export default InventoryScreen;
