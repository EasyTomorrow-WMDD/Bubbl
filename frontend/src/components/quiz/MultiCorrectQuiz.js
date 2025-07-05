import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import BubblColors from '../../styles/BubblColors';

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
      {/* ✅ 1. TYPE */}
      {data.text && <Text style={styles.typeText}>{data.text}</Text>}

      {/* ✅ 2. QUESTION */}
      {quiz.question && <Text style={styles.questionText}>{quiz.question}</Text>}

      {/* ✅ 3. IMAGE (optional) */}
      {quiz.image && (
        <Image source={{ uri: quiz.image }} style={styles.image} />
      )}

      {/* ✅ 4. OPTIONS */}
      <View style={styles.optionsRow}>
        <View style={styles.column}>{renderOptions(0, 3)}</View>
        <View style={styles.column}>{renderOptions(3, 6)}</View>
      </View>

      {/* ✅ 5. SELECTED BOX */}
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

  typeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'left',
    color: '#333',
  },

  questionText: {
    fontSize: 18,
    marginBottom: 32,
    color: '#000',
    textAlign: 'left',
  },

  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
    borderRadius: 12,
    marginBottom: 12,
  },

  optionsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginTop: 10,
  },

  column: { 
    flex: 1, 
    gap: 10 
  },

  option: {
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 12,
    margin: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BubblColors.BubblPurple400
  },

  selectedOption: {
    backgroundColor: BubblColors.BubblPurple200,
  },

  selectedBox: {
    marginTop: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  selectedItem: {
    borderWidth: 1,
    borderColor: BubblColors.BubblPurple400,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    margin: 5,
    backgroundColor: BubblColors.BubblPurple700,
    // minWidth: '45%',
    alignItems: 'center',
  },

  selectedText: {
    color: BubblColors.BubblNeutralWhite,
    fontSize: 12,
    fontWeight: '400',
  },
});
