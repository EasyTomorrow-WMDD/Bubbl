import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';

const { height } = Dimensions.get('window');

export default function MoodScreenDone({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/DrawingCanvas/Done_Background.png')}
        style={styles.background}
      >
        {/* Title on top of background */}
        <Text style={styles.header}>Mood Canvas</Text>

        {/* White rectangle content */}
        <View style={styles.contentBox}>
          <View style={styles.contentInner}>
            <Text style={styles.title}>Great Job!</Text>
            <Text style={styles.subtitle}>Thanks for drawing with us.</Text>

            <LottieView
              source={require('../../assets/animations/char_2.json')}
              autoPlay
              loop
              style={styles.animation}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ChildMain')}
            >
              <Text style={styles.buttonText}>Back to journey</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  header: {
    position: 'absolute',
    top: 90,
    alignSelf: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
  },
  contentBox: {
    width: '100%',
    height: height * 0.82,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 10,
    alignItems: 'center',
  },
  contentInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 34, // bigger
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18, // slightly larger
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  animation: {
    width: 220, // bigger
    height: 220,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#5756a5',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
});