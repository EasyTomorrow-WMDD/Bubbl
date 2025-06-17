import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { globalStyles } from '../../styles/BubblStyles';

// ==========================================================================
// BubblPicker component
// A reusable picker component for Bubbl app
// Props:
// - label: Text label for the picker
// - selectedValue: Currently selected value
// - onValueChange: Function to call when the value changes
// - items: Array of items to display in the picker, each with a label and value
const BubblPicker = ({ label, selectedValue, onValueChange, items }) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={globalStyles.label}>{label}</Text>
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={globalStyles.input}
    >
      {items.map((item) => (
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </Picker>
  </View>
);

export default BubblPicker;
