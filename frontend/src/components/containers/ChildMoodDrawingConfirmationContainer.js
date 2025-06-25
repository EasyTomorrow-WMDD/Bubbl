// import React, { useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ImageBackground,
//   Dimensions,
// } from 'react-native';
// import LottieView from 'lottie-react-native';
// import Header from '../layout/Header';
// import ChildNavbar from '../layout/ChildNavbar';
// import supabase from '../../services/supabase';
// import BubblConfig from '../../config/BubblConfig';

// const { height } = Dimensions.get('window');

// export default function ChildDrawingConfirmation({ navigation, route }) {
//   const { childProfileId } = route.params || {};

//   console.log('[addStars] childProfileId:', childProfileId);

//   useEffect(() => {
//     const addStars = async () => {
//       if (!childProfileId) {
//         console.warn('[addStars] No childProfileId provided');
//         return;
//       }

//       try {
//         const { data: { session } } = await supabase.auth.getSession();

//         const response = await fetch(`${BubblConfig.BACKEND_URL}/api/users/addStars`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${session.access_token}`,
//           },
//           body: JSON.stringify({ childProfileId }),
//         });

//         const result = await response.json();
//         console.log('[addStars] Response:', result);

//       } catch (err) {
//         console.error('[addStars] Error:', err);
//       }
//     };

//     addStars();
//   }, [childProfileId]);

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <Header title="Mood" />

//       {/* Mood Canvas Title */}
//       <View style={styles.titleContainer}>
//         <Text style={styles.canvasTitle}>Mood Canvas</Text>
//       </View>

//       {/* Purple content box with background image */}
//       <ImageBackground
//         source={require('../../assets/images/DrawingCanvas/Done_Background.png')}
//         style={styles.contentBox}
//         imageStyle={styles.imageBackgroundImage}
//       >
//         <View style={styles.contentInner}>
//           {/* Stars animation */}
//           <LottieView
//             source={require('../../assets/animations/Stars.json')}
//             autoPlay
//             loop={false}
//             style={styles.starsAnimation}
//           />

//           {/* Title */}
//           <Text style={styles.title}>Awesome Drawing!</Text>
//           <Text style={styles.subtitle}>You got 3 stars today.</Text>

//           {/* Middle Lottie */}
//           <LottieView
//             source={require('../../assets/animations/char_2.json')}
//             autoPlay
//             loop
//             style={styles.animation}
//           />

//           {/* Button */}
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => navigation.navigate('ChildMain')}
//           >
//             <Text style={styles.buttonText}>Back to journey</Text>
//           </TouchableOpacity>
//         </View>
//       </ImageBackground>

//       {/* Navbar */}
//       <ChildNavbar navigation={navigation} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   titleContainer: {
//     backgroundColor: '#EDEBFC',
//     paddingVertical: 20,
//     alignItems: 'center',
//     paddingBottom: 15,
//   },
//   canvasTitle: {
//     fontSize: 34,
//     fontWeight: 'bold',
//     color: '#2E195C',
//   },
//   contentBox: {
//     flex: 1,
//     width: '100%',
//     height: height * 0.8,
//     backgroundColor: '#8361E4',
//     borderTopLeftRadius: 40,
//     borderTopRightRadius: 40,
//     overflow: 'hidden',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     paddingVertical: 20,
//   },
//   imageBackgroundImage: {
//     resizeMode: 'contain',
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     top: 0,
//     left: 0,
//   },
//   contentInner: {
//     flexGrow: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   starsAnimation: {
//     width: 220 * 0.7,
//     height: 220 * 0.7,
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 34,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: 'white',
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 18,
//     color: 'white',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   animation: {
//     width: 200,
//     height: 200,
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderColor: '#AAAAAA',
//     paddingVertical: 14,
//     paddingHorizontal: 40,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: 'black',
//     fontWeight: '600',
//     fontSize: 18,
//   },
// });




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

const { height } = Dimensions.get('window');

export default function ChildDrawingConfirmation({ navigation, route }) {
  const { childProfileId } = route.params || {};

  console.log('[addStars] childProfileId:', childProfileId);

  useEffect(() => {
    const addStars = async () => {
      if (!childProfileId) {
        console.warn('[addStars] No childProfileId provided');
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();

        const response = await fetch(`${BubblConfig.BACKEND_URL}/api/users/addStars`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ 
            user_id: childProfileId, 
            starsToAdd: 3 
          }),
        });

        const result = await response.json();
        console.log('[addStars] Response:', result);

      } catch (err) {
        console.error('[addStars] Error:', err);
      }
    };

    addStars();
  }, [childProfileId]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="Mood" />

      {/* Mood Canvas Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.canvasTitle}>Mood Canvas</Text>
      </View>

      {/* Purple content box with background image */}
      <ImageBackground
        source={require('../../assets/images/DrawingCanvas/Done_Background.png')}
        style={styles.contentBox}
        imageStyle={styles.imageBackgroundImage}
      >
        <View style={styles.contentInner}>
          {/* Stars animation */}
          <LottieView
            source={require('../../assets/animations/Stars.json')}
            autoPlay
            loop={false}
            style={styles.starsAnimation}
          />

          {/* Title */}
          <Text style={styles.title}>Awesome Drawing!</Text>
          <Text style={styles.subtitle}>You got 3 stars today.</Text>

          {/* Middle Lottie */}
          <LottieView
            source={require('../../assets/animations/char_2.json')}
            autoPlay
            loop
            style={styles.animation}
          />

          {/* Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ChildMain')}
          >
            <Text style={styles.buttonText}>Back to journey</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Navbar */}
      <ChildNavbar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    backgroundColor: '#EDEBFC',
    paddingVertical: 20,
    alignItems: 'center',
    paddingBottom: 15,
  },
  canvasTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#2E195C',
  },
  contentBox: {
    flex: 1,
    width: '100%',
    height: height * 0.8,
    backgroundColor: '#8361E4',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
  },
  imageBackgroundImage: {
    resizeMode: 'contain',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  contentInner: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
  },
  starsAnimation: {
    width: 220 * 0.7,
    height: 220 * 0.7,
    marginBottom: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  animation: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#AAAAAA',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 18,
  },
});