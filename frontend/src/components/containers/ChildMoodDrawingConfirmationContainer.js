import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Header from '../layout/Header';
import ChildNavbar from '../layout/ChildNavbar';
import supabase from '../../services/supabase';
import BubblConfig from '../../config/BubblConfig';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTab } from '../../utils/TabContext';

const { height } = Dimensions.get('window');

export default function ChildMoodDrawingConfirmationContainer({ navigation, route }) {
  const { childProfileId } = route.params || {};
  const insets = useSafeAreaInsets();
  const { setActiveTab } = useTab();

  useEffect(() => {
    const addStars = async () => {
      if (!childProfileId) return;

      try {
        const { data: { session } } = await supabase.auth.getSession();

        const response = await fetch(`${BubblConfig.BACKEND_URL}/api/childProgress/saveDrawingProgress`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            user_id: childProfileId,
            starsToAdd: 3,
          }),
        });

        const text = await response.text();
        try {
          JSON.parse(text);
        } catch (err) {
          console.error('[addStars] JSON Parse Error:', err.message);
        }

      } catch (err) {
        console.error('[addStars] Error:', err);
      }
    };

    addStars();
  }, [childProfileId]);

  return (
    <>
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#8361E4' }}>
        <Header title="Mood" />
      </SafeAreaView>

      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/images/DrawingCanvas/Done_Background.png')}
          style={styles.backgroundImage}
          imageStyle={styles.imageBackground}
        >
      
          <LottieView
            source={require('../../assets/animations/DoneStars.json')}
            autoPlay
            loop={false}
            style={styles.starsAnimation}
          />

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.title}>Awesome Drawing!</Text>
            <Text style={styles.subtitle}>You got 3 stars today.</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setActiveTab('activities');
                navigation.navigate('ChildMain');
              }}
            >
              <Text style={styles.buttonText}>Claim Rewards</Text>
            </TouchableOpacity>
          </View>

          {/* Happy animation below the card */}
          <LottieView
            source={require('../../assets/animations/Happy_Mood.json')}
            autoPlay
            loop
            style={styles.happyAnimation}
          />
        </ImageBackground>

        <ChildNavbar navigation={navigation} />
      </View>

      <SafeAreaView edges={['bottom']} style={{ backgroundColor: 'white' }} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8361E4',
    // marginTop: -60,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageBackground: {
    resizeMode: 'cover',
  },
  starsAnimation: {
    width: 154,
    height: 154,
    position: 'absolute',
    top: -9,
    alignSelf: 'center',
    zIndex: 10,
    transform: [{ scale: 1.8 }],
  },
  card: {
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#FFC670',
    borderRadius: 20,
    padding: 20,
    paddingTop: 60,
    marginTop: 80, // enough room for stars above
    alignItems: 'center',
    width: '85%',
    zIndex: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#2E195C',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 45,
    color: '#2E195C',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#5931A6',
    paddingVertical: 20,
    paddingHorizontal: 65,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  happyAnimation: {
    position: 'absolute',
    bottom: 95,
    alignSelf: 'center',
    width: 200,
    height: 200,
  },
});