// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import ChildNavbar from '../layout/ChildNavbar';
// import LottieView from 'lottie-react-native';
// import Header from '../layout/Header';

// const moods = {
//   happy: {
//     icon: require('../../assets/icons/Moods/Happy.png'),
//     message1: 'Yay!',
//     message2: "You're feeling happy.",
//   },
//   sad: {
//     icon: require('../../assets/icons/Moods/Sad.png'),
//     message1: 'Oh, feeling',
//     message2: 'a little sad?',
//   },
//   mad: {
//     icon: require('../../assets/icons/Moods/Mad.png'),
//     message1: "It's okay",
//     message2: 'to feel angry.',
//   },
// };

// export default function ChildMoodContainer({ navigation, childProfileId }) {
//   const [selected, setSelected] = useState(null);
//   const [showDrawPrompt, setShowDrawPrompt] = useState(false);


//   useEffect(() => {
//     if (selected) {
//       setShowDrawPrompt(false);
//       const timer = setTimeout(() => {
//         setShowDrawPrompt(true);
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [selected]);

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <Header title="Mood" />

//       {/* Mood Canvas Title */}
//       <View style={styles.titleContainer}>
//         <Text style={styles.canvasTitle}>Mood Canvas</Text>
//       </View>

//       {/* Purple box */}
//       <View style={styles.purpleBox}>
//         {/* How do you feel today? or Mood message */}
//         <View style={styles.feelTodayContainer}>
//           {!selected ? (
//             <>
//               <Text style={styles.feelTodayLine1}>How do you</Text>
//               <Text style={styles.feelTodayLine2}>feel today?</Text>
//             </>
//           ) : !showDrawPrompt ? (
//             <>
//               <Text style={styles.feelTodayLine1}>{moods[selected].message1}</Text>
//               <Text style={styles.feelTodayLine2}>{moods[selected].message2}</Text>
//             </>
//           ) : (
//             <>
//               <Text style={styles.feelTodayLine1}>Draw how you</Text>
//               <Text style={styles.feelTodayLine2}>day feels!</Text>
//             </>
//           )}
//         </View>

//         {/* Moods pyramid */}
//         {!selected && (
//           <View style={styles.moodsPyramid}>
//             {/* Top - Happy */}
//             <TouchableOpacity onPress={() => setSelected('happy')}>
//               <Image source={moods.happy.icon} style={styles.moodIcon} />
//             </TouchableOpacity>

//             {/* Bottom Row - Mad + Sad */}
//             <View style={styles.moodsRow}>
//               <TouchableOpacity onPress={() => setSelected('mad')} style={styles.moodButton}>
//                 <Image source={moods.mad.icon} style={styles.moodIcon} />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => setSelected('sad')} style={styles.moodButton}>
//                 <Image source={moods.sad.icon} style={styles.moodIcon} />
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}

//         {/* Show selected mood image */}
//         {selected && (
//           <View style={styles.selectedMoodBox}>
//             <Image source={moods[selected].icon} style={styles.moodIcon} />
//           </View>
//         )}

//         {/* After 2s → Show Let's Draw */}
//         {showDrawPrompt && (
//           <TouchableOpacity
//             style={styles.drawButton}
//             onPress={() =>
//               navigation.navigate('ChildDrawing', {
//                 mood: selected,
//                 childProfileId: childProfileId,
//               })
//             }
//           >
//             <Text style={styles.drawButtonText}>Let's Draw</Text>
//           </TouchableOpacity>
//         )}

//         {/* Animation at bottom */}
//         <View style={styles.animation}>
//           <LottieView
//             source={require('../../assets/animations/optimized-lottie.json')}
//             autoPlay
//             loop
//             style={{ width: 250, height: 250 }}
//           />
//         </View>
//       </View>

//       {/* Navbar */}
//       <ChildNavbar navigation={navigation} childProfileId={childProfileId} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: 'white' },

//   titleContainer: {
//     backgroundColor: '#EDEBFC',
//     paddingVertical: 30,
//     alignItems: 'center',
//     paddingBottom: 50,
//   },
//   canvasTitle: {
//     fontSize: 34,
//     fontWeight: 'bold',
//     color: '#2E195C',
//   },

//   purpleBox: {
//     flex: 1,
//     backgroundColor: '#6A0DAD',
//     marginTop: -35,
//     borderRadius: 45,
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },

//   feelTodayContainer: {
//     marginTop: 10,
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   feelTodayLine1: {
//     fontSize: 30,
//     fontWeight: '600',
//     color: 'white',
//   },
//   feelTodayLine2: {
//     fontSize: 30,
//     fontWeight: '600',
//     color: 'white',
//   },

//   moodsPyramid: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   moodsRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 24,
//   },
//   moodButton: {
//     marginHorizontal: 40,
//   },
//   moodIcon: {
//     width: 100,
//     height: 100,
//   },

//   selectedMoodBox: {
//     marginVertical: 20,
//     alignItems: 'center',
//   },

//   drawButton: {
//     backgroundColor: '#FFC670',
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 25,
//     marginTop: 10,
//   },
//   drawButtonText: {
//     color: '#2E195C',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },

//   animation: {
//     marginTop: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import ChildNavbar from '../layout/ChildNavbar';
import LottieView from 'lottie-react-native';
import Header from '../layout/Header';

const moods = {
  happy: {
    icon: require('../../assets/icons/Moods/Happy.png'),
    messageLine1: "Yay!",
    messageLine2: "You're feeling happy.",
  },
  sad: {
    icon: require('../../assets/icons/Moods/Sad.png'),
    messageLine1: "Oh, feeling",
    messageLine2: "a little sad?",
  },
  mad: {
    icon: require('../../assets/icons/Moods/Mad.png'),
    messageLine1: "It's okay",
    messageLine2: "to feel angry.",
  },
};

export default function ChildMoodContainer({ navigation, childProfileId }) {
  const [selected, setSelected] = useState(null);
  const [showDrawPrompt, setShowDrawPrompt] = useState(false);

  // When a mood is selected → start timer for draw prompt
  useEffect(() => {
    if (selected) {
      setShowDrawPrompt(false);
      const timer = setTimeout(() => {
        setShowDrawPrompt(true);
      }, 2000); // 2 seconds
      return () => clearTimeout(timer);
    }
  }, [selected]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="Mood" />

      {/* Mood Canvas Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.canvasTitle}>Mood Canvas</Text>
      </View>

      {/* Purple box with background image */}
      <ImageBackground
        source={require('../../assets/images/DrawingCanvas/Done_Background.png')}
        style={styles.purpleBox}
        imageStyle={styles.imageBackgroundImage}
      >
        {/* Show pyramid when no mood selected */}
        {!selected && (
          <>
            {/* How do you feel today? */}
            <View style={styles.feelTodayContainer}>
              <Text style={styles.feelTodayLine1}>How do you</Text>
              <Text style={styles.feelTodayLine2}>feel today?</Text>
            </View>

            {/* Moods pyramid */}
            <View style={styles.moodsPyramid}>
              {/* Top - Happy */}
              <TouchableOpacity onPress={() => setSelected('happy')}>
                <Image source={moods.happy.icon} style={styles.moodIcon} />
              </TouchableOpacity>

              {/* Bottom Row - Mad + Sad */}
              <View style={styles.moodsRow}>
                <TouchableOpacity onPress={() => setSelected('mad')} style={styles.moodButton}>
                  <Image source={moods.mad.icon} style={styles.moodIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelected('sad')} style={styles.moodButton}>
                  <Image source={moods.sad.icon} style={styles.moodIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

        {/* Show selected mood + message */}
        {selected && (
          <View style={styles.messageBox}>
            {!showDrawPrompt && (
              <>
                <Image source={moods[selected].icon} style={styles.moodIconSelected} />
                <Text style={styles.messageLine1}>{moods[selected].messageLine1}</Text>
                <Text style={styles.messageLine2}>{moods[selected].messageLine2}</Text>
              </>
            )}

            {showDrawPrompt && (
              <>
                <Text style={styles.messageLine1}>Draw how you</Text>
                <Text style={styles.messageLine2}>day feels!</Text>
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

        {/* Animation at bottom */}
        <View style={styles.animation}>
          <LottieView
            source={require('../../assets/animations/optimized-lottie.json')}
            autoPlay
            loop
            style={{ width: 220, height: 220 }}
          />
        </View>
      </ImageBackground>

      {/* Navbar */}
      <ChildNavbar navigation={navigation} childProfileId={childProfileId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },

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

  purpleBox: {
    flex: 1,
    width: '100%',
    backgroundColor: '#8361E4',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // paddingHorizontal: 20,
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
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  feelTodayLine1: {
    fontSize: 30,
    fontWeight: '600',
    color: 'white',
  },
  feelTodayLine2: {
    fontSize: 30,
    fontWeight: '600',
    color: 'white',
  },

  moodsPyramid: {
    alignItems: 'center',
    marginBottom: 20,
  },
  moodsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  moodButton: {
    marginHorizontal: 40, // spacing between Mad and Sad
  },
  moodIcon: {
    width: 100,
    height: 100,
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
  messageLine1: {
    fontSize: 26,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  messageLine2: {
    fontSize: 22,
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
  },
  drawButton: {
    backgroundColor: '#FFC670',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
  },
  drawButtonText: {
    color: '#2E195C',
    fontSize: 16,
    fontWeight: 'bold',
  },

  animation: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});