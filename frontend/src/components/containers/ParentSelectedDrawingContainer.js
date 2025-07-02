// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const ParentSelectedDrawingContainer = ({ navigation, route }) => {
//   const { drawing } = route.params;

//   console.log('[ParentSelectedDrawingContainer] Selected drawing:', drawing);

//   const formattedDate = new Date(drawing.created_at).toLocaleDateString();

//   return (
//     <View style={styles.container}>
//       {/* Top Header */}
//       <View style={styles.topHeader}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//       </View>

//       {/* Drawing */}
//       <Image
//         source={{ uri: drawing.signedUrl }}
//         style={styles.drawingImage}
//         resizeMode="contain"
//       />

//       {/* Bottom Info */}
//       <View style={styles.bottomBox}>
//         {/* Mood */}
//         <View style={styles.moodBox}>
//           {/* You can replace this with a PNG if you have mood icons */}
//           <Text style={styles.moodText}>{drawing.mood}</Text>
//         </View>

//         {/* Date */}
//         <Text style={styles.dateText}>{formattedDate}</Text>
//       </View>
//     </View>
//   );
// };

// export default ParentSelectedDrawingContainer;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   topHeader: {
//     backgroundColor: '#8361E4',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   drawingImage: {
//     flex: 1,
//     width: '100%',
//     marginVertical: 16,
//   },
//   bottomBox: {
//     backgroundColor: '#EDEBFC',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 16,
//     alignItems: 'center',
//   },
//   moodBox: {
//     backgroundColor: '#8361E4',
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginBottom: 10,
//   },
//   moodText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   dateText: {
//     fontSize: 16,
//     color: '#555',
//   },
// });
























import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const moodIcons = {
  Happy: require('../../assets/icons/Moods/Happy.png'),
  Mad: require('../../assets/icons/Moods/Mad.png'),
  Sad: require('../../assets/icons/Moods/Sad.png'),
};

const ParentSelectedDrawingContainer = ({ navigation, route }) => {
  const { drawing } = route.params;
  const [childNickname, setChildNickname] = useState('');

  const formattedDate = new Date(drawing.created_at).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const moodKey = drawing.mood?.charAt(0).toUpperCase() + drawing.mood?.slice(1).toLowerCase();

  useEffect(() => {
    const fetchChildNickname = async () => {
      const nickname = await AsyncStorage.getItem('selected_child_nickname');
      if (nickname) setChildNickname(nickname);
    };
    fetchChildNickname();
  }, []);

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Drawing Image */}
      <Image
        source={{ uri: drawing.signedUrl }}
        style={styles.drawingImage}
        resizeMode="contain"
      />

      {/* Mood Icon */}
      {moodIcons[moodKey] && (
        <View style={styles.moodIconWrapper}>
          <Image source={moodIcons[moodKey]} style={styles.iconImage} />
        </View>
      )}

      {/* Info Box */}
      <View style={styles.infoBox}>
        <Text style={styles.dateText}>Created by {childNickname}</Text>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>
    </View>
  );
};

export default ParentSelectedDrawingContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  topHeader: {
    backgroundColor: '#8361E4',
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  backButton: {
    padding: 8,
  },
  drawingImage: {
    flex: 1,
    width: '100%',
    marginTop: 10,
  },
moodIconWrapper: {
  position: 'absolute',
  top: '81%',
  left: '49%',
  transform: [{ translateX: -32 }],
  backgroundColor: '#2E195C',
  padding: 11,
  borderRadius: 50,
  zIndex: 10,
},
  iconImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  infoBox: {
    backgroundColor: '#2E195C',
    borderTopLeftRadius: 31,
    borderTopRightRadius: 31,
    paddingVertical: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 40,
    marginTop: -30,
  },
  dateText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 6,
    fontWeight: '600',
  },
});