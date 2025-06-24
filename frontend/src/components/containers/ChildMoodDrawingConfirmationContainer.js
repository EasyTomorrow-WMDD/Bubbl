// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ImageBackground,
//   Dimensions,
// } from 'react-native';
// import LottieView from 'lottie-react-native';

// const { height } = Dimensions.get('window');

// export default function MoodScreenDone({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         source={require('../../assets/images/DrawingCanvas/Done_Background.png')}
//         style={styles.background}
//       >
//         {/* Title on top of background */}
//         <Text style={styles.header}>Mood Canvas</Text>

//         {/* White rectangle content */}
//         <View style={styles.contentBox}>
//           <View style={styles.contentInner}>
//             <Text style={styles.title}>Great Job!</Text>
//             <Text style={styles.subtitle}>Thanks for drawing with us.</Text>

//             <LottieView
//               source={require('../../assets/animations/char_2.json')}
//               autoPlay
//               loop
//               style={styles.animation}
//             />

//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => navigation.navigate('ChildMain')}
//             >
//               <Text style={styles.buttonText}>Back to journey</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   background: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//     justifyContent: 'flex-end',
//   },
//   header: {
//     position: 'absolute',
//     top: 90,
//     alignSelf: 'center',
//     fontSize: 35,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   contentBox: {
//     width: '100%',
//     height: height * 0.82,
//     backgroundColor: 'white',
//     borderTopLeftRadius: 40,
//     borderTopRightRadius: 40,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: -2 },
//     shadowRadius: 10,
//     alignItems: 'center',
//   },
//   contentInner: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 30,
//   },
//   title: {
//     fontSize: 34, // bigger
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 18, // slightly larger
//     color: '#666',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   animation: {
//     width: 220, // bigger
//     height: 220,
//     marginBottom: 30,
//   },
//   button: {
//     backgroundColor: '#5756a5',
//     paddingVertical: 14,
//     paddingHorizontal: 40,
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 18,
//   },
// });



// import React from 'react';
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

// const { height } = Dimensions.get('window');

// export default function ChildMoodDrawingConfirmationContainer({ navigation }) {
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
//           <Text style={styles.title}>Awesome Drawing!</Text>
//           <Text style={styles.subtitle}>You got 3 stars today.</Text>

//           <LottieView
//             source={require('../../assets/animations/char_2.json')}
//             autoPlay
//             loop
//             style={styles.animation}
//           />

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
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//   },
//   imageBackgroundImage: {
//     resizeMode: 'cover',
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     top: 0,
//     left: 0,
//   },
//   contentInner: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
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
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   animation: {
//     width: 220,
//     height: 220,
//     marginBottom: 30,
//   },
//   button: {
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderColor: '#AAAAAA',
//     paddingVertical: 14,
//     paddingHorizontal: 40,
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: 'black',
//     fontWeight: '600',
//     fontSize: 18,
//   },
// });

















// import React from 'react';
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

// const { height } = Dimensions.get('window');

// export default function ChildMoodDrawingConfirmationContainer({ navigation }) {
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
//             loop={false}  // only once
//             style={styles.starsAnimation}
//           />

//           {/* Title */}
//           <Text style={styles.title}>Awesome Drawing!</Text>
//           <Text style={styles.subtitle}>You got 3 stars today.</Text>

//           {/* Character animation */}
//           <LottieView
//             source={require('../../assets/animations/char_2.json')}
//             autoPlay
//             loop
//             style={styles.animation}
//           />

//           {/* Back to journey button */}
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
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//   },
//   imageBackgroundImage: {
//     resizeMode: 'cover',
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     top: 0,
//     left: 0,
//   },
//   contentInner: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// starsAnimation: {
//   width: 200,
//   height: 200,
//   marginBottom: 10,
//   transform: [{ scale: 0.7 }], // scale to 70%
// },
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
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   animation: {
//     width: 220,
//     height: 220,
//     marginBottom: 30,
//   },
//   button: {
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderColor: '#AAAAAA',
//     paddingVertical: 14,
//     paddingHorizontal: 40,
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: 'black',
//     fontWeight: '600',
//     fontSize: 18,
//   },
// });








// import React from 'react';
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

// const { height } = Dimensions.get('window');

// export default function ChildMoodDrawingConfirmationContainer({ navigation }) {
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

//           {/* Spacer to push button down */}
//           <View style={{ flex: 1 }} />

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
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//   },
//   imageBackgroundImage: {
//     resizeMode: 'cover',
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
//     paddingVertical: 20,
//   },
//   starsAnimation: {
//     width: 220 * 0.7, // 70%
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
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   animation: {
//     width: 220,
//     height: 220,
//     marginBottom: 30,
//   },
//   button: {
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderColor: '#AAAAAA',
//     paddingVertical: 14,
//     paddingHorizontal: 40,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: 'black',
//     fontWeight: '600',
//     fontSize: 18,
//   },
// });





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
import Header from '../layout/Header';
import ChildNavbar from '../layout/ChildNavbar';

const { height } = Dimensions.get('window');

export default function ChildMoodDrawingConfirmationContainer({ navigation }) {
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

          {/* Spacer removed (to move button up) */}

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
    justifyContent: 'flex-start', // move content up
    // paddingHorizontal: 20,
    paddingVertical: 20, // reduce vertical padding
  },
 imageBackgroundImage: {
    resizeMode: 'contain', // <= this will show full image
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
    paddingVertical: 10, // reduce padding here
  },
  starsAnimation: {
    width: 220 * 0.7, // 70%
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
    width: 200, // slightly smaller to fit better
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
    marginBottom: 10, // bring closer to animation
  },
  buttonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 18,
  },
});