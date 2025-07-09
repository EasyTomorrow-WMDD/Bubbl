import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import supabase from '../../services/supabase';
import axios from 'axios';
import BubblConfig from '../../config/BubblConfig';
import { format, parseISO } from 'date-fns';
import { Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LoadChildInfo from '../../utils/LoadChildInfo';
import ActivityLogCard from '../cards/ActivityLogCard';
import BubblYearMonthPicker from '../forms/BubblYearMonthPicker';
import { childProgressStyles } from '../../styles/BubblParentChildProgressStyles';
import { fontStyles } from '../../styles/BubblFontStyles';
import BubblColors from '../../styles/BubblColors';
import ParentChildProgressNotFoundCard from '../cards/ParentChildProgressNotFoundCard';

const calendar_icon = require('../../assets/icons/search_calendar.png');

// ============================================================================
// ParentChildActivityContainer Component
const ParentChildActivityContainer = () => {

  // State to manage activity logs and month picker visibility
  const [userId, setUserId] = useState(null);
  const [activityLogs, setActivityLogs] = useState([]);
  const [searchYearMonth, setSearchYearMonth] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  // ----------------------------------------------------------------
  // Load child info and fetch activity logs on component mount
  useEffect(() => {
    const loadUser = async () => {
      const childInfo = await LoadChildInfo();
      // console.log('[ActivityLog] Loaded child info:', childInfo);
      if (!childInfo?.user_id) {
        console.warn('[ActivityLog] No selected child user_id found');
        return;
      }
      setUserId(childInfo.user_id);

      // Set initial search year and month
      const now = new Date();
      setSelectedMonth(selectedMonth ?? now.getMonth() + 1);
      setSelectedYear(selectedYear ?? now.getFullYear());
    };
    loadUser();
  }, []);

  // ----------------------------------------------------------------
  // Fetch activity logs when userId is set or searchYearMonth changes
  useEffect(() => {
    if (userId) {
      fetchActivityLog(userId);
    }
  }, [userId, searchYearMonth]);

  // ----------------------------------------------------------------
  // Method to fetch activity logs from the backend
  const fetchActivityLog = async (userId) => {
    try {
      // Step 1: Get the current session to retrieve access token
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session || !session.access_token) {
        console.warn('[ActivityLog] No active session found.');
        return;
      }
      const accessToken = session?.access_token;

      // Step 2: Get user timezone from device
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';


      // Step 3: Call the backend API to fetch logs
      const response = await axios.get(
        `${BubblConfig.BACKEND_URL}/api/logs/getChildActivityLog`,
        {
          params: {
            user_id: userId,
            search_year_month: searchYearMonth,
            user_timezone: timezone,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        setActivityLogs(response.data.logs);
        // console.log('[DEBUG][ActivityLog] Logs fetched successfully:', response.data.logs);
      } else {
        console.warn('[ActivityLog] Unexpected response', response.data);
        setActivityLogs([]);
      }
    } catch (err) {
      console.error('[ActivityLog] Error fetching logs:', err);
    }
  };

  // ----------------------------------------------------------------
  // Method to handle month picker date change
  const handleDateChange = (event, newDate) => {
    if (event === 'dateSetAction') {
      const selected = format(newDate, 'yyyyMM');
      setSearchYearMonth(selected);
    }
    setShowMonthPicker(false);
  };

  // ----------------------------------------------------------------
  // Render each activity log item
  const renderItem = ({ item, index }) => {
    const previousItem = index > 0 ? activityLogs[index - 1] : null;
    return <ActivityLogCard item={item} index={index} previousItem={previousItem} />;
  };

  const insets = useSafeAreaInsets(); // Get safe area insets for top and bottom padding

  // ----------------------------------------------------------------
  // Render the main component
  return (
    <View style={childProgressStyles.childActivityContainer}>
      {/* Heading Area */}
      <View style={childProgressStyles.childActivityHeadingRow}>
        <Text style={[
          fontStyles.heading1, 
          childProgressStyles.childActivityHeadingText
        ]}>
          Activity Log
        </Text>
        <TouchableOpacity 
          onPress={() => { setShowPicker(!showPicker); }}
        >
          {/* Image of calendar */}
          <Image 
            source={calendar_icon} 
            style={childProgressStyles.childActivityHeadingIcon}
          />
        </TouchableOpacity>

      </View>

      {/* Log List */}
      <View style={childProgressStyles.flatListContainer}>
      {activityLogs.length === 0 ? (
        <ParentChildProgressNotFoundCard/>
      ) : (
        <FlatList
          data={activityLogs}
          keyExtractor={(item, index) => `${item.log_timestamp}_${index}`}
          renderItem={({ item, index }) => renderItem({ item, index })}
          contentContainerStyle={{ paddingBottom: insets.bottom + 48 }}
        />
      )}
      </View>

      {/* Year & Month Picker */}
      <BubblYearMonthPicker
        visible={showPicker}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        onYearChange={setSelectedYear}
        onMonthChange={setSelectedMonth}
        onApply={() => {
          if (selectedMonth && selectedYear) {
            setSearchYearMonth(`${selectedYear}${String(selectedMonth).padStart(2, '0')}`);
            setShowPicker(false);
          }
        }}
        onClose={() => setShowPicker(false)}
      />

      {/* Safe area for bottom navigation */}
      <SafeAreaView edges={['bottom']} style={childProgressStyles.childProgressLayoutBottomSafeArea} />

    </View>
  );
};

export default ParentChildActivityContainer;
