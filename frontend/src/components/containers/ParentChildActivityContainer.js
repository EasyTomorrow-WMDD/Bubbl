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
    const currentDate = format(parseISO(item.log_timestamp), 'MMMM dd, yyyy');
    const previousItem = index > 0 ? activityLogs[index - 1] : null;
    const previousDate = previousItem
      ? format(parseISO(previousItem.log_timestamp), 'MMMM dd, yyyy')
      : null;

    const showDateDivider = currentDate !== previousDate;

    return (
      <View key={`${item.log_timestamp}_${index}`}>
        {showDateDivider && (
          <View style={styles.dateDividerContainer}>
            <Text style={styles.dateDividerText}>{currentDate}</Text>
          </View>
        )}
        <View style={styles.card}>
          <Text style={styles.cardSummary}>{item.log_event_summary}</Text>
          <Text style={styles.cardDetail}>{item.log_event}</Text>
        </View>
      </View>
    );
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

      {/* List Area */}
      {activityLogs.length === 0 ? (
        <Text style={styles.noResultsText}>No results found</Text>
      ) : (
        activityLogs.map((item, index) => renderItem({ item, index }))
      )}

      {/* Year & Month Picker */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPicker}
        onRequestClose={() => setShowPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedYear}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedYear(itemValue)}
            >
              {Array.from({ length: 6 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return <Picker.Item key={year} label={year.toString()} value={year} />;
              })}
            </Picker>

            <Picker
              selectedValue={selectedMonth}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            >
              {[
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December',
              ].map((month, index) => (
                <Picker.Item key={index} label={month} value={index + 1} />
              ))}
            </Picker>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => {
                console.log('[Apply Picker]', { selectedMonth, selectedYear });
                if (selectedMonth && selectedYear) {
                  setSearchYearMonth(`${selectedYear}${String(selectedMonth).padStart(2, '0')}`);
                  setShowPicker(false);
                }
              }}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


    </View>
  );
};

export default ParentChildActivityContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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

