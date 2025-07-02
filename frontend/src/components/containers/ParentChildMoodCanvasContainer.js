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
import { useNavigation } from '@react-navigation/native';

import BubblYearMonthPicker from '../forms/BubblYearMonthPicker';


const moodIcons = {
  Happy: require('../../assets/icons/Moods/Happy.png'),
  Mad: require('../../assets/icons/Moods/Mad.png'),
  Sad: require('../../assets/icons/Moods/Sad.png'),
};

const ParentChildMoodCanvasContainer = () => {
  const navigation = useNavigation();

  const [drawings, setDrawings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const fetchDrawings = async (year = selectedYear, month = selectedMonth) => {
    const childUserId = await AsyncStorage.getItem('selected_child_user_id');
    if (!childUserId) return;

    try {
      setLoading(true);

      const { data: { session } } = await supabase.auth.getSession();

      const response = await fetch(
        `${BubblConfig.BACKEND_URL}/api/drawings/getByChild/${childUserId}?month=${month}&year=${year}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok && Array.isArray(result)) {
        const signedDrawings = await Promise.all(result.map(async (item) => {
          const { data: signedUrlData, error } = await supabase.storage
            .from('drawings')
            .createSignedUrl(item.drawing_url, 60 * 60);

          if (error) {
            console.error('[Signed URL error]', error.message);
            return item;
          }

          return { ...item, signedUrl: signedUrlData?.signedUrl };
        }));

        setDrawings(signedDrawings);
      } else {
        console.error('[Fetch failed]', result?.error || 'Unknown error');
        setDrawings([]);
      }
    } catch (err) {
      console.error('[Fetch error]', err.message);
      setDrawings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrawings(); 
  }, []);

  const handleApplyCalendar = () => {
    fetchDrawings(selectedYear, selectedMonth);
    setCalendarVisible(false);
  };

  const handleDrawingPress = (item) => {
    navigation.navigate('ParentSelectedDrawingScreen', { drawing: item });
  };

  const renderDrawingCard = ({ item }) => {
    const moodKey = item.mood?.charAt(0).toUpperCase() + item.mood?.slice(1).toLowerCase();
    const date = new Date(item.created_at);
    const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

    return (
      <TouchableOpacity style={styles.card} onPress={() => handleDrawingPress(item)}>
        <View style={styles.purpleBox}>
          <Image
            source={{ uri: item.signedUrl }}
            style={styles.drawingImage}
            onError={(e) => console.log('[Image Load error]', e.nativeEvent.error)}
          />

          {moodIcons[moodKey] && (
            <View style={styles.moodIconWrapper}>
              <Image source={moodIcons[moodKey]} style={styles.moodIcon} />
            </View>
          )}

          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mood Canvas</Text>
        <TouchableOpacity onPress={() => setCalendarVisible(true)}>
          <Ionicons name="calendar-outline" size={24} color="#8361E4" />
        </TouchableOpacity>
      </View>

      {/* Drawings list */}
      <FlatList
        data={drawings}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContent, { justifyContent: 'center', alignItems: 'center' }]}
        renderItem={renderDrawingCard}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No drawings found.</Text>
            </View>
          )
        }
      />

      {/* Calendar modal */}
      <BubblYearMonthPicker
        visible={calendarVisible}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        onYearChange={(val) => setSelectedYear(val)}
        onMonthChange={(val) => setSelectedMonth(val)}
        onApply={handleApplyCalendar}
        onClose={() => setCalendarVisible(false)}
      />
    </View>
  );
};

export default ParentChildMoodCanvasContainer;


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 12,
    flex: 1,
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
    width: 180,
    margin: 8,
  },
  purpleBox: {
    backgroundColor: '#2E195C',
    borderRadius: 20,
    overflow: 'hidden',
    paddingTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 8,
    position: 'relative',
    paddingBottom: 12,
  },
  drawingImage: {
    width: '100%',
    height: 140,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  moodIconWrapper: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#2E195C',
    borderRadius: 50,
    padding: 4,
    borderWidth: 2,
    borderColor: '#2E195C',
  },
  moodIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  dateText: {
    marginTop: 13,
    color: '#fff',
    fontSize: 14,
    // alignSelf: 'flex-start',
    marginLeft: 4,
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