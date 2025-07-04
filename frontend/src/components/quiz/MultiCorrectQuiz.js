import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MultiCorrectQuiz({ data, onSelect, disabled }) {
  const { quiz } = data;
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected([]);
  }, [data]);

  useEffect(() => {
    if (selected.length === 3) {
      const selectedLabels = selected.map(o => o.label).sort();
      const correctLabels = quiz.correct.sort();
      const isCorrect = JSON.stringify(selectedLabels) === JSON.stringify(correctLabels);

      const message = isCorrect ? quiz.message_correct : quiz.message_wrong;

      onSelect(isCorrect, message);
    }
  }, [selected]);

  const handleSelect = (option) => {
    if (disabled || selected.find(item => item.label === option.label)) return;
    if (selected.length >= 3) return;

    setSelected([...selected, option]);
  };

  const renderOptions = (start, end) => quiz.options.slice(start, end).map((option, idx) => (
    <TouchableOpacity
      key={idx}
      style={[
        styles.option,
        selected.find(s => s.label === option.label) && styles.selectedOption
      ]}
      onPress={() => handleSelect(option)}
      disabled={disabled}
    >
      <Text>{option.label}</Text>
    </TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{quiz.question}</Text>

      <View style={styles.optionsRow}>
        <View style={styles.column}>{renderOptions(0, 3)}</View>
        <View style={styles.column}>{renderOptions(3, 6)}</View>
      </View>

      {selected.length > 0 && (
        <View style={styles.selectedBox}>
          {selected.map((s, idx) => (
            <View key={idx} style={styles.selectedItem}>
              <Text style={styles.selectedText}>{s.label}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  question: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  optionsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  column: { flex: 1, gap: 10 },
  option: {
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
    margin: 5,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#cdeffd',
  },
  selectedBox: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  selectedItem: {
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  selectedText: {
    fontSize: 16,
    fontWeight: '600'
  }
});
