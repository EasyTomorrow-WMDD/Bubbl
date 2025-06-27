import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const BubblYearMonthPicker = ({ visible, selectedYear, selectedMonth, onYearChange, onMonthChange, onApply, onClose, }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={selectedYear} style={styles.picker} onValueChange={onYearChange}>
            {Array.from({ length: 6 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return <Picker.Item key={year} label={year.toString()} value={year} />;
            })}
          </Picker>
          <Picker selectedValue={selectedMonth} style={styles.picker} onValueChange={onMonthChange}>
            {[
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December',
            ].map((month, index) => (
              <Picker.Item key={index} label={month} value={index + 1} />
            ))}
          </Picker>
          <TouchableOpacity style={styles.applyButton} onPress={onApply}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default BubblYearMonthPicker;




const styles = StyleSheet.create({
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
