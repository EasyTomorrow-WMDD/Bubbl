import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { globalStyles } from '../../styles/BubblStyles';

// ==========================================================================
// BubblDatePicker component
// A reusable date picker component for Bubbl app
// Props:
// - label: Text label for the date picker
// - value: Selected date value (Date object)
// - onChange: Function to call when the date is changed
const BubblDatePicker = ({ label, value, onChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); // keep open for iOS
    if (selectedDate) onChange(selectedDate);
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={globalStyles.label}>{label}</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={globalStyles.input}>
        <Text>{value ? value.toDateString() : 'Select birth date'}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default BubblDatePicker;
