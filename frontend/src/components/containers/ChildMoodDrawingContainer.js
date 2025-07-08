// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Modal, Image, Alert
// } from 'react-native';
// import { Canvas, Path, Skia } from '@shopify/react-native-skia';
// import { captureRef } from 'react-native-view-shot';
// import * as FileSystem from 'expo-file-system';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import supabase from '../../services/supabase';
// import { Ionicons } from '@expo/vector-icons';
// import BubblConfig from '../../config/BubblConfig';

// const COLORS = [
//   '#FFCE48',  // yellow (was black)
//   '#4FC3F7',  // red (now blue)
//   '#F75C4C',  // yellow (now red)
//   '#7ED957',  // green
//   '#B39DDB',  // purple
//   'black'     // was blue, now black
// ];

// export default function ChildMoodDrawingContainer({ navigation, route }) {
//   const { mood } = route.params;
//   console.log('[DEBUG] Mood selected:', mood);

//   const [paths, setPaths] = useState([]);
//   const [currentPath, setCurrentPath] = useState(null);
//   const [currentColor, setCurrentColor] = useState('#FFCE48');
//   const [isEraser, setIsEraser] = useState(false);
//   const [showExitModal, setShowExitModal] = useState(false);
//   const [accountId, setAccountId] = useState(null);
//   const [childProfileId, setChildProfileId] = useState(null);

//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const storedAccountId = await AsyncStorage.getItem('selected_account_id');
//         const storedProfileId = await AsyncStorage.getItem('selected_user_id');
//         console.log('[DEBUG] Loaded from storage:', { storedAccountId, storedProfileId });

//         setAccountId(storedAccountId);
//         setChildProfileId(storedProfileId);
//       } catch (err) {
//         console.error('[ERROR] Failed to load profile from AsyncStorage:', err);
//       }
//     };

//     loadProfile();
//   }, []);

//   const onTouchStart = (x, y) => {
//     const path = Skia.Path.Make();
//     path.moveTo(x, y);
//     setCurrentPath({ path, color: currentColor, strokeWidth: isEraser ? 9 : 8 }); // updated stroke size
//   };

//   const onTouchMove = (x, y) => {
//     if (!currentPath) return;
//     currentPath.path.lineTo(x, y);
//     setCurrentPath({ ...currentPath });
//   };

//   const onTouchEnd = () => {
//     if (!currentPath) return;
//     setPaths([...paths, currentPath]);
//     setCurrentPath(null);
//   };

// const saveDrawing = async () => {
//   try {
//     const { data: { session }, error: sessionError } = await supabase.auth.getSession();
//     if (sessionError || !session) throw new Error('No valid session found');

//     const uri = await captureRef(canvasRef, {
//       format: 'jpg',
//       quality: 1,
//     });

//     const base64 = await FileSystem.readAsStringAsync(uri, {
//       encoding: FileSystem.EncodingType.Base64,
//     });

//     if (!accountId || !childProfileId) {
//       throw new Error('Missing accountId or childProfileId');
//     }

//     const response = await fetch(`${BubblConfig.BACKEND_URL}/api/drawings/upload`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${session.access_token}`,
//       },
//       body: JSON.stringify({
//         imageBase64: base64,
//         user_profile_id: childProfileId,
//         account_id: accountId,
//         mood: mood,
//       }),
//     });

//     const resultText = await response.text();

//     try {
//       const result = JSON.parse(resultText);

//       if (!response.ok) {
//         throw new Error(result.error || 'Upload failed');
//       }

//       console.log('✅ Drawing uploaded!', result);

//       // Go to confirmation screen
//       navigation.navigate('ChildDrawingConfirmation', { childProfileId: childProfileId });

//     } catch (parseError) {
//       console.error('[saveDrawing] Failed to parse JSON:', parseError);
//       console.error('[saveDrawing] Response text:', resultText);
//       throw new Error('Server returned invalid JSON');
//     }

//   } catch (err) {
//     console.error('[saveDrawing] Error:', err);
//     Alert.alert('Save Error', err.message);
//   }
// };



//   const toggleTool = (tool) => {
//     if (tool === 'eraser') {
//       setIsEraser(true);
//       setCurrentColor('white');
//     } else {
//       setIsEraser(false);
//       setCurrentColor(tool);
//     }
//   };

//   const handleGoBack = () => setShowExitModal(true);
//   const confirmExit = () => {
//     setShowExitModal(false);
//     navigation.navigate('ChildMood', { childProfileId: childProfileId });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Top controls */}
//       <View style={styles.topControls}>
//         <TouchableOpacity onPress={handleGoBack}>
//           <Ionicons name="arrow-back" size={28} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={saveDrawing}
//           style={styles.doneButton}
//         >
//           <Text style={styles.doneText}>Done</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Canvas */}
//       <View
//         ref={canvasRef}
//         style={styles.canvasContainer}
//         collapsable={false}
//         onStartShouldSetResponder={() => true}
//         onResponderGrant={evt => onTouchStart(evt.nativeEvent.locationX, evt.nativeEvent.locationY)}
//         onResponderMove={evt => onTouchMove(evt.nativeEvent.locationX, evt.nativeEvent.locationY)}
//         onResponderRelease={onTouchEnd}
//         onResponderTerminate={onTouchEnd}
//       >
//         <Canvas style={{ flex: 1 }}>
//           {paths.map(({ path, color, strokeWidth }, i) => (
//             <Path
//               key={i}
//               path={path}
//               color={color}
//               style="stroke"
//               strokeWidth={strokeWidth}
//               strokeJoin="round"
//               strokeCap="round"
//             />
//           ))}
//           {currentPath && (
//             <Path
//               path={currentPath.path}
//               color={currentPath.color}
//               style="stroke"
//               strokeWidth={currentPath.strokeWidth}
//               strokeJoin="round"
//               strokeCap="round"
//             />
//           )}
//         </Canvas>
//       </View>

//       {/* Bottom panel */}
//       <View style={styles.bottomPanel}>
//         <View style={styles.panelContent}>
//           {/* Tools */}
//           <View style={styles.toolArea}>
//             <TouchableOpacity onPress={() => toggleTool('#FFCE48')}>
//               <Image
//                 source={require('../../assets/images/DrawingCanvas/pencil.png')}
//                 style={[styles.toolIcon, !isEraser && styles.toolSelected]}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => toggleTool('eraser')}>
//               <Image
//                 source={require('../../assets/images/DrawingCanvas/eraser.png')}
//                 style={[styles.toolIcon, isEraser && styles.toolSelected]}
//               />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.divider} />

//           {/* Colors */}
//           <View style={styles.colorsAreaContainer}>
//             <View style={styles.colorRow}>
//               {COLORS.slice(0, 3).map(color => (
//                 <TouchableOpacity
//                   key={color}
//                   style={[
//                     styles.colorDot,
//                     { backgroundColor: color },
//                     currentColor === color && !isEraser && styles.selectedColor
//                   ]}
//                   onPress={() => toggleTool(color)}
//                 />
//               ))}
//             </View>
//             <View style={styles.colorRow}>
//               {COLORS.slice(3, 6).map(color => (
//                 <TouchableOpacity
//                   key={color}
//                   style={[
//                     styles.colorDot,
//                     { backgroundColor: color },
//                     currentColor === color && !isEraser && styles.selectedColor
//                   ]}
//                   onPress={() => toggleTool(color)}
//                 />
//               ))}
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* Exit modal */}
//       <Modal visible={showExitModal} transparent animationType="fade">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalBox}>
//             <Text style={styles.modalText}>Leave this drawing?</Text>
//             <View style={styles.modalButtons}>
//               <TouchableOpacity onPress={() => setShowExitModal(false)} style={styles.modalBtn}>
//                 <Text style={styles.modalBtnText}>Stay here</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={confirmExit} style={styles.modalBtn}>
//                 <Text style={styles.modalBtnText}>Go back</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: 'white' },
//   topControls: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 10,
//   },
//   doneButton: {
//     backgroundColor: '#FFCE48',
//     paddingVertical: 6,
//     paddingHorizontal: 14,
//     borderRadius: 8,
//   },
//   doneText: {
//     color: 'black',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   canvasContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   bottomPanel: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 40,
//     borderTopRightRadius: 40,
//     paddingBottom: 30,
//     marginBottom: -33,
//     paddingTop: 10,
//     width: '100%',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: -2 },
//     shadowRadius: 6,
//   },
//   panelContent: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 80,
//   },
//   toolArea: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingLeft: 35,
//   },
//   toolIcon: {
//     width: 60,
//     height: 150,
//     marginBottom: -85,
//     marginHorizontal: -15,
//     opacity: 0.6,
//   },
//   toolSelected: {
//     transform: [{ scale: 1.3 }],
//     opacity: 1,
//   },
//   divider: {
//     width: 3,
//     height: '100%',
//     backgroundColor: '#ccc',
//     marginHorizontal: 30,
//     alignSelf: 'center',
//   },
//   colorsAreaContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 50,
//   },
//   colorRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 7,
//   },
//   colorDot: {
//     width: 40,
//     height: 40,
//     borderRadius: 40,
//     marginHorizontal: 9,
//   },
//   selectedColor: {
//     borderWidth: 2,
//     borderColor: '#000',
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalBox: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     width: 260,
//   },
//   modalText: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   modalBtn: {
//     backgroundColor: '#eee',
//     padding: 10,
//     borderRadius: 6,
//   },
//   modalBtnText: {
//     fontWeight: '600',
//   },
// });




















import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Modal, Image, Alert, Platform
} from 'react-native';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../../services/supabase';
import { Ionicons } from '@expo/vector-icons';
import BubblConfig from '../../config/BubblConfig';

const COLORS = [
  '#FFCE48', '#4FC3F7', '#F75C4C', '#7ED957', '#B39DDB', 'black'
];

export default function ChildMoodDrawingContainer({ navigation, route }) {
  const { mood } = route.params;
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState(null);
  const [currentColor, setCurrentColor] = useState('#FFCE48');
  const [isEraser, setIsEraser] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [childProfileId, setChildProfileId] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadProfile = async () => {
      const storedAccountId = await AsyncStorage.getItem('selected_account_id');
      const storedProfileId = await AsyncStorage.getItem('selected_user_id');
      setAccountId(storedAccountId);
      setChildProfileId(storedProfileId);
    };
    loadProfile();
  }, []);

  const onTouchStart = (x, y) => {
    const path = Skia.Path.Make();
    path.moveTo(x, y);
    setCurrentPath({ path, color: currentColor, strokeWidth: isEraser ? 9 : 8 });
  };

  const onTouchMove = (x, y) => {
    if (!currentPath) return;
    currentPath.path.lineTo(x, y);
    setCurrentPath({ ...currentPath });
  };

  const onTouchEnd = () => {
    if (!currentPath) return;
    setPaths([...paths, currentPath]);
    setCurrentPath(null);
  };

  const saveDrawing = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) throw new Error('No valid session found');
      const uri = await captureRef(canvasRef, { format: 'jpg', quality: 1 });
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      if (!accountId || !childProfileId) throw new Error('Missing accountId or childProfileId');

      const response = await fetch(`${BubblConfig.BACKEND_URL}/api/drawings/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          imageBase64: base64,
          user_profile_id: childProfileId,
          account_id: accountId,
          mood,
        }),
      });

      const resultText = await response.text();
      const result = JSON.parse(resultText);
      if (!response.ok) throw new Error(result.error || 'Upload failed');

      navigation.navigate('ChildDrawingConfirmation', { childProfileId });
    } catch (err) {
      Alert.alert('Save Error', err.message);
    }
  };

  const toggleTool = (tool) => {
    if (tool === 'eraser') {
      setIsEraser(true);
      setCurrentColor('white');
    } else {
      setIsEraser(false);
      setCurrentColor(tool);
    }
  };

  const handleGoBack = () => setShowExitModal(true);
  const confirmExit = () => {
    setShowExitModal(false);
    navigation.navigate('ChildMood', { childProfileId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.safeTopArea}>
        <View style={styles.topControls}>
          <TouchableOpacity onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={saveDrawing} style={styles.doneButton}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View
        ref={canvasRef}
        style={styles.canvasContainer}
        collapsable={false}
        onStartShouldSetResponder={() => true}
        onResponderGrant={evt => onTouchStart(evt.nativeEvent.locationX, evt.nativeEvent.locationY)}
        onResponderMove={evt => onTouchMove(evt.nativeEvent.locationX, evt.nativeEvent.locationY)}
        onResponderRelease={onTouchEnd}
        onResponderTerminate={onTouchEnd}
      >
        <Canvas style={{ flex: 1 }}>
          {paths.map(({ path, color, strokeWidth }, i) => (
            <Path key={i} path={path} color={color} style="stroke" strokeWidth={strokeWidth} strokeJoin="round" strokeCap="round" />
          ))}
          {currentPath && (
            <Path path={currentPath.path} color={currentPath.color} style="stroke" strokeWidth={currentPath.strokeWidth} strokeJoin="round" strokeCap="round" />
          )}
        </Canvas>
      </View>

      <View style={styles.bottomPanel}>
        <View style={styles.panelContent}>
          <View style={styles.toolArea}>
            <TouchableOpacity onPress={() => toggleTool('#FFCE48')}>
              <Image source={require('../../assets/images/DrawingCanvas/pencil.png')} style={[styles.toolIcon, !isEraser && styles.toolSelected]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleTool('eraser')}>
              <Image source={require('../../assets/images/DrawingCanvas/eraser.png')} style={[styles.toolIcon, isEraser && styles.toolSelected]} />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={styles.colorsAreaContainer}>
            <View style={styles.colorRow}>
              {COLORS.slice(0, 3).map(color => (
                <TouchableOpacity key={color} style={[styles.colorDot, { backgroundColor: color }, currentColor === color && !isEraser && styles.selectedColor]} onPress={() => toggleTool(color)} />
              ))}
            </View>
            <View style={styles.colorRow}>
              {COLORS.slice(3, 6).map(color => (
                <TouchableOpacity key={color} style={[styles.colorDot, { backgroundColor: color }, currentColor === color && !isEraser && styles.selectedColor]} onPress={() => toggleTool(color)} />
              ))}
            </View>
          </View>
        </View>
      </View>

      <Modal visible={showExitModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Leave this drawing?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setShowExitModal(false)} style={styles.modalBtn}>
                <Text style={styles.modalBtnText}>Stay here</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmExit} style={styles.modalBtn}>
                <Text style={styles.modalBtnText}>Go back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  safeTopArea: {
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  doneButton: {
    backgroundColor: '#FFCE48',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  doneText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
  canvasContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  bottomPanel: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingBottom: 30,
    marginBottom: -33,
    paddingTop: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    elevation: 5,
  },
  panelContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  toolArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 35,
  },
  toolIcon: {
    width: 60,
    height: 150,
    marginBottom: -85,
    marginHorizontal: -15,
    opacity: 0.6,
  },
  toolSelected: {
    transform: [{ scale: 1.3 }],
    opacity: 1,
  },
  divider: {
    width: 3,
    height: '100%',
    backgroundColor: '#ccc',
    marginHorizontal: 30,
    alignSelf: 'center',
  },
  colorsAreaContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  colorDot: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginHorizontal: 9,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#000',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 260,
  },
  modalText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalBtn: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
  },
  modalBtnText: {
    fontWeight: '600',
  },
});