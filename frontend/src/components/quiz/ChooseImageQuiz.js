import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import BubblColors from '../../styles/BubblColors';

export default function ChooseImageQuiz({ data, onSelect, disabled }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(null);
  }, [data]);

  const handlePress = (img) => {
    if (disabled) return;
    setSelected(img.label);

    const isCorrect = img.is_correct;
    const message = isCorrect ? data.quiz.message_correct : data.quiz.message_wrong;

    onSelect(img.label, isCorrect, message);
  };

  return (
    <View style={styles.container}>
      
      {data.text && <Text style={styles.typeText}>{data.text}</Text>}

      
      {data.quiz?.question && <Text style={styles.questionText}>{data.quiz.question}</Text>}

      <View style={styles.gridContainer}>
        {data.quiz.images.map((img, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(img)}
            disabled={disabled}
            style={[
              styles.gridItem,
              selected === img.label && styles.selectedItem
            ]}
          >
            <Image source={{ uri: img.url }} style={styles.image} />
            <Text style={styles.label}>{img.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 10,
  },
  typeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: BubblColors.BubblNeutralDark,
    textAlign: 'left',
  },
  questionText: {
    fontSize: 16,
    marginBottom: 40,
    color: BubblColors.BubblNeutralDark,
    textAlign: 'left',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 12,
    alignItems: 'center',
    backgroundColor: BubblColors.BubblPurple100,
    borderRadius: 8,
    padding: 8,
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: BubblColors.BubblNeutralDark,
    backgroundColor: BubblColors.BubblPurple300,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 8,
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    textAlign: 'center',
  },
});
