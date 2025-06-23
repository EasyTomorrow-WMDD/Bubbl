import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function MultiCorrectQuiz({ data, onAnswer }) {
  const { quiz } = data;
  const [selected, setSelected] = useState([]);
  const [feedbackShown, setFeedbackShown] = useState(false);

  const handleSelect = (option) => {
    if (feedbackShown || selected.find(item => item.label === option.label)) return;

    const updated = [...selected, option];
    setSelected(updated);

    if (updated.length === 3) {
      const selectedLabels = updated.map(o => o.label).sort();
      const correctLabels = quiz.correct.sort();
      const isCorrect = JSON.stringify(selectedLabels) === JSON.stringify(correctLabels);
      setFeedbackShown(true);
      onAnswer(isCorrect, isCorrect ? quiz.message_correct : quiz.message_wrong);
    }
  };

  const renderOptions = (start, end) => quiz.options.slice(start, end).map((option, idx) => (
    <TouchableOpacity
      key={idx}
      style={[styles.option, selected.find(s => s.label === option.label) && styles.selectedOption]}
      onPress={() => handleSelect(option)}
    >
      <Text>{option.label}</Text>
    </TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
      {quiz.image && <Image source={{ uri: quiz.image }} style={styles.image} />}
      <Text style={styles.question}>{quiz.question}</Text>

      <View style={styles.optionsRow}>
        <View style={styles.column}>{renderOptions(0, 3)}</View>
        <View style={styles.column}>{renderOptions(3, 6)}</View>
      </View>

      <View style={styles.selectedBox}>
        {selected.map((s, idx) => (
          <Text key={idx} style={styles.selectedText}>{s.label}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  question: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  image: { width: '100%', height: 180, marginBottom: 10 },
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
    padding: 10,
    backgroundColor: '#fff9c4',
    borderRadius: 10,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedText: {
    fontSize: 16,
    fontWeight: '600'
  }
});