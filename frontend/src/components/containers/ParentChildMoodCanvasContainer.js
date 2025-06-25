// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import supabase from '../../services/supabase';
// import BubblConfig from '../../config/BubblConfig';
// import { Ionicons } from '@expo/vector-icons';

// const ParentChildMoodCanvasContainer = ({ navigation }) => {
//   const [drawings, setDrawings] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchDrawings = async () => {
//       const childUserId = await AsyncStorage.getItem('selected_child_user_id');
//       console.log('[ParentChildMoodCanvasContainer] Fetching drawings for:', childUserId);

//       if (!childUserId) return;

//       try {
//         setLoading(true);

//         const { data: { session } } = await supabase.auth.getSession();

//         const response = await fetch(`${BubblConfig.BACKEND_URL}/api/drawings/getByChild/${childUserId}`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${session.access_token}`,
//           },
//         });

//         const result = await response.json();
//         console.log('[ParentChildMoodCanvasContainer] Raw drawings:', result);

//         if (response.ok && Array.isArray(result)) {
//           const signedDrawings = await Promise.all(result.map(async (item) => {
//             const { data: signedUrlData, error } = await supabase.storage
//               .from('drawings')
//               // .createSignedUrl(`drawings/${item.drawing_url}`, 60 * 60); // add "drawings/"
//               .createSignedUrl(item.drawing_url, 60 * 60); // 1 hour

//             if (error) {
//               console.error('[ParentChildMoodCanvasContainer] Signed URL error:', error.message);
//               return item;
//             }

//             return { ...item, signedUrl: signedUrlData?.signedUrl };
//           }));

//           console.log('[ParentChildMoodCanvasContainer] Signed drawings:', signedDrawings);
//           setDrawings(signedDrawings);
//         } else {
//           console.error('[ParentChildMoodCanvasContainer] Fetch failed:', result?.error || 'Unknown error');
//         }
//       } catch (err) {
//         console.error('[ParentChildMoodCanvasContainer] Fetch error:', err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDrawings();
//   }, []);

// const handleDrawingPress = (item) => {
//   navigation.navigate('ParentSelectedDrawingScreen', { drawing: item });
// };

//   const renderDrawingCard = ({ item }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => handleDrawingPress(item)}
//     >
//       {/* <Image
//         source={{ uri: item.signedUrl }}
//         style={styles.drawingImage}
//       /> */}


// <Image
//   source={{ uri: item.signedUrl }}
//   style={styles.drawingImage}
//   onError={(e) => console.log('[Image] Load error:', e.nativeEvent.error)}
// />



//       <Text style={styles.moodLabel}>{item.mood}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Top header with calendar */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Mood Canvas</Text>
//         <TouchableOpacity>
//           <Ionicons name="calendar-outline" size={24} color="#8361E4" />
//         </TouchableOpacity>
//       </View>

//       {/* FlatList */}
//       <FlatList
//         data={drawings}
//         keyExtractor={(item, index) => index.toString()}
//         numColumns={2}
//         contentContainerStyle={styles.listContent}
//         renderItem={renderDrawingCard}
//         ListEmptyComponent={
//           !loading && (
//             <View style={styles.emptyContainer}>
//               <Text style={styles.emptyText}>No drawings found.</Text>
//             </View>
//           )
//         }
//       />
//     </View>
//   );
// };

// export default ParentChildMoodCanvasContainer;

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     backgroundColor: '#fff',
//     padding: 12,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#2E195C',
//   },
//   listContent: {
//     paddingBottom: 20,
//   },
// card: {
//   width: '48%',         // 2 columns (48% + margins)
//   backgroundColor: '#8361E4',
//   borderRadius: 16,
//   margin: '1%',         // small margin between cards
//   overflow: 'hidden',
// },
// drawingImage: {
//   width: '100%',        // full card width
//   height: 160,
//   borderTopLeftRadius: 16,
//   borderTopRightRadius: 16,
//   backgroundColor: '#ccc',   // TEMP for debugging
// },
//   moodLabel: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//     padding: 8,
//     textAlign: 'right',
//   },
//   emptyContainer: {
//     marginTop: 50,
//     alignItems: 'center',
//   },
//   emptyText: {
//     color: '#999',
//     fontSize: 16,
//   },
// });























import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../../services/supabase';
import BubblConfig from '../../config/BubblConfig';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';  // ✅ Add this!

const ParentChildMoodCanvasContainer = () => {
  const navigation = useNavigation();  // ✅ Hook to get navigation

  const [drawings, setDrawings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDrawings = async () => {
      const childUserId = await AsyncStorage.getItem('selected_child_user_id');
      console.log('[ParentChildMoodCanvasContainer] Fetching drawings for:', childUserId);

      if (!childUserId) return;

      try {
        setLoading(true);

        const { data: { session } } = await supabase.auth.getSession();

        const response = await fetch(`${BubblConfig.BACKEND_URL}/api/drawings/getByChild/${childUserId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
          },
        });

        const result = await response.json();
        console.log('[ParentChildMoodCanvasContainer] Raw drawings:', result);

        if (response.ok && Array.isArray(result)) {
          const signedDrawings = await Promise.all(result.map(async (item) => {
            const { data: signedUrlData, error } = await supabase.storage
              .from('drawings')
              .createSignedUrl(item.drawing_url, 60 * 60); // 1 hour

            if (error) {
              console.error('[ParentChildMoodCanvasContainer] Signed URL error:', error.message);
              return item;
            }

            return { ...item, signedUrl: signedUrlData?.signedUrl };
          }));

          console.log('[ParentChildMoodCanvasContainer] Signed drawings:', signedDrawings);
          setDrawings(signedDrawings);
        } else {
          console.error('[ParentChildMoodCanvasContainer] Fetch failed:', result?.error || 'Unknown error');
        }
      } catch (err) {
        console.error('[ParentChildMoodCanvasContainer] Fetch error:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrawings();
  }, []);

  const handleDrawingPress = (item) => {
    navigation.navigate('ParentSelectedDrawingScreen', { drawing: item });  // ✅ Screen name is correct here
  };

  const renderDrawingCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleDrawingPress(item)}
    >
      <Image
        source={{ uri: item.signedUrl }}
        style={styles.drawingImage}
        onError={(e) => console.log('[Image] Load error:', e.nativeEvent.error)}
      />
      <Text style={styles.moodLabel}>{item.mood}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top header with calendar */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mood Canvas</Text>
        <TouchableOpacity>
          <Ionicons name="calendar-outline" size={24} color="#8361E4" />
        </TouchableOpacity>
      </View>

      {/* FlatList */}
      <FlatList
        data={drawings}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        renderItem={renderDrawingCard}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No drawings found.</Text>
            </View>
          )
        }
      />
    </View>
  );
};

export default ParentChildMoodCanvasContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E195C',
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    width: '48%',         // 2 columns (48% + margins)
    backgroundColor: '#8361E4',
    borderRadius: 16,
    margin: '1%',         // small margin between cards
    overflow: 'hidden',
  },
  drawingImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#ccc',
  },
  moodLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    padding: 8,
    textAlign: 'right',
  },
  emptyContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },
});