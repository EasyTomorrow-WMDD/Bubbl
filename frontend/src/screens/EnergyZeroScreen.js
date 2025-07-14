import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image} from 'react-native';
import BubblColors from '../styles/BubblColors';
import BubblFonts from '../styles/BubblFonts';

export default function EnergyZeroScreen({ route, navigation }) {
  const { timeToNextMs, childId } = route.params || {};

  const formatCountdown = (ms) => {
    if (!ms || ms <= 0) return '00:00';
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const [countdown, setCountdown] = useState(formatCountdown(timeToNextMs));
  const intervalRef = useRef(null);

  useEffect(() => {
    let remaining = timeToNextMs;

    intervalRef.current = setInterval(() => {
      remaining -= 1000;
      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        setCountdown('00:00');
      } else {
        setCountdown(formatCountdown(remaining));
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [timeToNextMs]);

  return (
    <View style={styles.screenContainer}>
      <ImageBackground
        source={require('../assets/images/Background_Purple.png')}
        style={styles.background}
      >
        <View style={styles.container}>
          {/* Contenido principal */}
          <View style={styles.mainContent}>
            <Text style={styles.titleText}>Opps! No HP Left</Text>
            
            <View style={styles.countdownBox}>
                
            <View>
            <Image 
            source={require('../assets/icons/heart.png')}
            style={styles.imageHeart}
            />
          </View>



              <Text style={styles.countdownText}>
                {countdown ? `+1 HP in: ${countdown} Mins` : 'Please wait...'}
              </Text>
              <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.navigate('Modules')}>
                <Text style={styles.goBackButtonText}>Back To Home</Text>
              </TouchableOpacity>
            </View>
          </View>

         
          <View style={styles.bottomContainer}>
            <Image
              source={require('../assets/images/Asset.png')}
              style={styles.bottomImage}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginBottom: -40
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: BubblFonts.sizes.display3,
    color: BubblColors.BubblWhite,
    fontFamily: BubblFonts.headingTypeface,
    fontWeight: 'bold',
    marginBottom: 80,
  },
  countdownBox: {
    paddingVertical: 50,
    paddingHorizontal: 30,
    borderWidth: 6,
    borderColor: BubblColors.BubblOrange300,
    borderRadius: 12,
    backgroundColor: BubblColors.BubblWhite,
    alignItems: 'center',
    marginBottom: -150
  },
  countdownText: {
    fontSize: BubblFonts.sizes.heading2,
    fontFamily: BubblFonts.headingTypeface,
    fontWeight: 'bold',
    textAlign: 'center',
    color: BubblColors.BubblBlack,
    marginBottom: 12,
  },
  goBackButton: {
    marginTop: 12,
    marginBottom: -10,
    paddingVertical: 20,
    paddingHorizontal: 80,
    borderRadius: 8,
    backgroundColor: BubblColors.BubblPurple800,
    alignItems: 'center',
  },
  goBackButtonText: {
    color: BubblColors.BubblWhite,
    fontSize: BubblFonts.sizes.bodyLarge,
    fontFamily: BubblFonts.bodyTypeface,
    fontWeight: 'bold'
  },
  bottomContainer: {
    alignItems: 'center',
    alignSelf: 'stretch', 
  },
  bottomImage: {
    width: 300, 
    height: 300, 
  },
  imageHeart:{
    position: 'absolute',
    alignSelf: 'center',
    top: -100,
    width: 100,
    height: 100
  }
});