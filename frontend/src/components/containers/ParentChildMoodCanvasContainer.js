import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../../services/supabase';
import BubblConfig from '../../config/BubblConfig';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BubblYearMonthPicker from '../forms/BubblYearMonthPicker';
import { childProgressStyles } from '../../styles/BubblParentChildProgressStyles';
import { fontStyles } from '../../styles/BubblFontStyles';
import BubblColors from '../../styles/BubblColors';
import ParentChildProgressNotFoundCard from '../cards/ParentChildProgressNotFoundCard';

const calendar_icon = require('../../assets/icons/search_calendar.png');

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
          const filePath = item.drawing_url;
          const { data: signedUrlData, error } = await supabase.storage
            .from('drawings')
            .createSignedUrl(filePath, 60 * 60);

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
    const formattedDate = `${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()}`;
    return (
      <TouchableOpacity style={styles.card} onPress={() => handleDrawingPress(item)}>
        <View style={styles.purpleBox}>
          <Image
            source={item.signedUrl ? { uri: item.signedUrl } : require('../../assets/images/placeholder_parent_stories.png')}
            style={styles.drawingImage}
            onError={(e) => console.log('[Image Load error]', e.nativeEvent.error)}
          />

          {moodIcons[moodKey] && (
            <View style={styles.moodIconWrapper}>
              <Image source={moodIcons[moodKey]} style={styles.moodIcon} />
            </View>
          )}

          <Text style={[fontStyles.bodyTiny, styles.dateText]}>{formattedDate}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[fontStyles.heading1, styles.headerTitle]}>Mood Canvas</Text>
        <TouchableOpacity onPress={() => setCalendarVisible(true)}>
          <Image 
            source={calendar_icon} 
            style={childProgressStyles.childActivityHeadingIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.flatListContainer}>
        <FlatList
          data={drawings}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.listContent, { justifyContent: 'center', alignItems: 'center', paddingBottom: 100 }]}
          renderItem={renderDrawingCard}
          ListEmptyComponent={!loading && <ParentChildProgressNotFoundCard />}
        />
      </View>

      <BubblYearMonthPicker
        visible={calendarVisible}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        onYearChange={(val) => setSelectedYear(val)}
        onMonthChange={(val) => setSelectedMonth(val)}
        onApply={handleApplyCalendar}
        onClose={() => setCalendarVisible(false)}
      />

      <SafeAreaView edges={['bottom']} style={childProgressStyles.childProgressLayoutBottomSafeArea} />
    </View>
  );
};

export default ParentChildMoodCanvasContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: BubblColors.BubblPurple200,
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
    color: BubblColors.BubblPurple950,
  },
  flatListContainer: {
    height: 400,
    minHeight: 400,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    width: 180,
    margin: 8,
  },
  purpleBox: {
    backgroundColor: BubblColors.BubblPurple800,
    borderRadius: 20,
    overflow: 'hidden',
    paddingTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 12,
    position: 'relative',
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
    backgroundColor: BubblColors.BubblPurple800,
    borderRadius: 50,
    padding: 4,
    borderWidth: 4,
    borderColor: BubblColors.BubblPurple800,
  },
  moodIcon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  dateText: {
    marginTop: 13,
    color: '#fff',
    fontSize: 14,
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
