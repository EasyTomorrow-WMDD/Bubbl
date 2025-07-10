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

const { height } = Dimensions.get('window');

export default function ChildMoodDrawingConfirmationContainer({ navigation, route }) {
  const { childProfileId } = route.params || {};
  const insets = useSafeAreaInsets();

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
          JSON.parse(text); // just log parsing for debug
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
      {/* Safe area with Header */}
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#8361E4' }}>
        <Header title="Mood" />
      </SafeAreaView>

      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/images/DrawingCanvas/Done_Background.png')}
          style={styles.backgroundImage}
          imageStyle={styles.imageBackground}
        >
          <View style={styles.card}>
            <LottieView
              source={require('../../assets/animations/DoneStars.json')}
              autoPlay
              loop={false}
              style={styles.starsAnimation}
            />

            <Text style={styles.title}>Awesome Drawing!</Text>
            <Text style={styles.subtitle}>You got 3 stars today.</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ChildMain')}
            >
              <Text style={styles.buttonText}>Back to journey</Text>
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
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageBackground: {
    resizeMode: 'cover',
  },
  card: {
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#FFC670',
    borderRadius: 20,
    padding: 20,
    marginTop: 30,
    alignItems: 'center',
    width: '85%',
    zIndex: 2,
  },
  starsAnimation: {
    width: 154,
    height: 154,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#2E195C',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#2E195C',
    marginBottom: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#8361E4',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  happyAnimation: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 40,
    zIndex: 1,
  },
});
