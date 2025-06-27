import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
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

const ParentChildActivityContainer = () => {

  // State to manage activity logs and month picker visibility
  const [userId, setUserId] = useState(null);
  const [activityLogs, setActivityLogs] = useState([]);
  const [searchYearMonth, setSearchYearMonth] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

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

  // Fetch activity logs when userId is set or searchYearMonth changes
  useEffect(() => {
    if (userId) {
      fetchActivityLog(userId);
    }
  }, [userId, searchYearMonth]);

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

  // Method to handle month picker date change
  const handleDateChange = (event, newDate) => {
    if (event === 'dateSetAction') {
      const selected = format(newDate, 'yyyyMM');
      setSearchYearMonth(selected);
    }
    setShowMonthPicker(false);
  };

  // Render each activity log item
  const renderItem = ({ item, index }) => {
    const previousItem = index > 0 ? activityLogs[index - 1] : null;
    return <ActivityLogCard item={item} index={index} previousItem={previousItem} />;
  };

  // Render the main component
  return (
    <View style={styles.container}>
      {/* Heading Area */}
      <View style={styles.headingRow}>
        <Text style={styles.headingText}>Activity Log</Text>
        <TouchableOpacity 
          onPress={() => { setShowPicker(!showPicker); }}
        >
          <Ionicons name="calendar-outline" size={24} color="black" />
        </TouchableOpacity>

      </View>

      {/* Log List */}
      {activityLogs.length === 0 ? (
        <Text style={styles.noResultsText}>No results found</Text>
      ) : (
        <FlatList
          data={activityLogs}
          keyExtractor={(item, index) => `${item.log_timestamp}_${index}`}
          renderItem={({ item, index }) => renderItem({ item, index })}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

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

    </View>
  );
};

export default ParentChildActivityContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#fff',
  },
  headingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
  dateDividerContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 6,
  },
  dateDividerText: {
    backgroundColor: '#eee',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardSummary: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  cardDetail: {
    fontSize: 14,
    color: '#555',
  },
  // Modal & Calendar Picker Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  pickerContainer: {
    width: '90%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
    pickerContainer: {
    marginTop: 10,
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#f0f0f0',
  },
  picker: {
    height: 160,
    width: '100%',
    marginBottom: 8,
  },
  applyButton: {
    marginTop: 8,
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

});

