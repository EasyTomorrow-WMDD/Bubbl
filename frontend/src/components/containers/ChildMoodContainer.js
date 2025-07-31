import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import ChildNavbar from '../layout/ChildNavbar';
import LottieView from 'lottie-react-native';
import Header from '../layout/Header';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontStyles } from '../../styles/BubblFontStyles';

const moods = {
  happy: {
    icon: require('../../assets/icons/Moods/Happy.png'),
    animation: require('../../assets/animations/Happy_Mood.json'),
    label: 'Happy',
    messageLine1: 'Yay!',
    messageLine2: "You're feeling happy",
  },
  sad: {
    icon: require('../../assets/icons/Moods/Sad.png'),
    animation: require('../../assets/animations/Sad_Mood.json'),
    label: 'Sad',
    messageLine1: 'Oh, feeling',
    messageLine2: 'a little sad?',
  },
  mad: {
    icon: require('../../assets/icons/Moods/Mad.png'),
    animation: require('../../assets/animations/Mad_Mood.json'),
    label: 'Mad',
    messageLine1: "It's okay",
    messageLine2: 'to feel angry',
  },
};

export default function ChildMoodContainer({ navigation, childProfileId }) {
  const [selected, setSelected] = useState(null);
  const [showDrawPrompt, setShowDrawPrompt] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (selected) {
      setShowDrawPrompt(false);
      const timer = setTimeout(() => {
        setShowDrawPrompt(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [selected]);

  return (
    <>
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#8361E4' }} />

      <View style={{ flex: 1, backgroundColor: '#8361E4' }}>
        <Header title="Mood Canvas" />

        <ImageBackground
          source={require('../../assets/images/DrawingCanvas/Done_Background.png')}
          style={styles.purpleBox}
          imageStyle={styles.imageBackgroundImage}
        >
          {!selected && (
            <>
              <View style={styles.feelTodayContainer}>
                <Text style={[fontStyles.display1, { textAlign: 'center', color: 'white' }]}>How do you</Text>
                <Text style={[fontStyles.display1, { textAlign: 'center', color: 'white' }]}>feel today?</Text>
              </View>

              <View style={styles.moodsPyramid}>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                  <TouchableOpacity onPress={() => setSelected('happy')}>
                    <Image source={moods.happy.icon} style={styles.moodIcon} />
                  </TouchableOpacity>
                  <View style={styles.moodLabelWrapper}>
                    <Text style={styles.moodLabel}>{moods.happy.label}</Text>
                  </View>
                </View>

                <View style={styles.moodsRow}>
                  <View style={{ alignItems: 'center', marginLeft: -80 }}>
                    <TouchableOpacity onPress={() => setSelected('mad')}>
                      <Image source={moods.mad.icon} style={styles.moodIcon} />
                    </TouchableOpacity>
                    <View style={styles.moodLabelWrapper}>
                      <Text style={styles.moodLabel}>{moods.mad.label}</Text>
                    </View>
                  </View>

                  <View style={{ alignItems: 'center', marginRight: -80 }}>
                    <TouchableOpacity onPress={() => setSelected('sad')}>
                      <Image source={moods.sad.icon} style={styles.moodIcon} />
                    </TouchableOpacity>
                    <View style={styles.moodLabelWrapper}>
                      <Text style={styles.moodLabel}>{moods.sad.label}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </>
          )}

          {selected && (
            <View style={styles.messageBox}>
              {!showDrawPrompt && (
                <>
                <Text style={[fontStyles.display1, { textAlign: 'center', color: 'white' }]}>{moods[selected].messageLine1}</Text>
                  <Text style={[fontStyles.display1, { textAlign: 'center', color: 'white', marginBottom: 12 }]}>{moods[selected].messageLine2}</Text>
                  <Image source={moods[selected].icon} style={styles.moodIconSelected} />
                </>
              )}

              {showDrawPrompt && (
                <>
                  <Text style={[fontStyles.display1, { textAlign: 'center', color: 'white' }]}>Draw how your</Text>
                  <Text style={[fontStyles.display1, { textAlign: 'center', color: 'white' }]}>day feels!</Text>
                  <TouchableOpacity
                    style={styles.drawButton}
                    onPress={() =>
                      navigation.navigate('ChildDrawing', {
                        mood: selected,
                        childProfileId: childProfileId,
                      })
                    }
                  >
                    <Text style={styles.drawButtonText}>Let's Draw</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}

          <View style={styles.animationContainer}>
            <LottieView
              source={
                selected
                  ? moods[selected].animation
                  : require('../../assets/animations/Happy_Mood.json')
              }
              autoPlay
              loop
              style={styles.lottie}
            />
          </View>
        </ImageBackground>

        <View style={{ paddingBottom: insets.bottom }}>
          <ChildNavbar navigation={navigation} childProfileId={childProfileId} />
        </View>
      </View>

      <SafeAreaView edges={['bottom']} style={{ backgroundColor: 'white' }} />
    </>
  );
}

const styles = StyleSheet.create({
  purpleBox: {
    flex: 1,
    width: '100%',
    backgroundColor: '#8361E4',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 30,
  },
  imageBackgroundImage: {
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  feelTodayContainer: {
    marginTop: -25,
    marginBottom: 20,
    alignItems: 'center',
  },
  moodsPyramid: {
    alignItems: 'center',
    marginTop: -15,
    ...(Platform.OS === 'android' && { marginTop: 15 }),
  },
  moodsRow: {
    flexDirection: 'row',
    marginTop: -50,
    gap: 120,
    justifyContent: 'center',
  },
  moodIcon: {
    width: 100,
    height: 100,
  },
  moodLabelWrapper: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'black',
  },
  moodLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E195C',
  },
  moodIconSelected: {
    width: 140,
    height: 140,
    marginBottom: 15,
  },
  messageBox: {
    alignItems: 'center',
    marginVertical: 20,
  },
  drawButton: {
    backgroundColor: '#FFC670',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 25,
    marginTop: 40,
  },
  drawButtonText: {
    color: '#2E195C',
    fontSize: 20,
    fontWeight: 'bold',
  },
  animationContainer: {
    position: 'absolute',
    bottom: 35,
    width: '100%',
    alignItems: 'center',
  },
  lottie: {
    width: 300,
    height: 300,
    transform: [{ scale: 0.8 }],
     ...(Platform.OS === 'android' && { marginBottom: 15 }),
  },
});