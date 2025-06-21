import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CircularProgress from './Circle';

export default function Module({ modules, onTopicPress }) {
  const [completed, setCompleted] = useState(true);

  return (
    <View style={{ width: '100%', gap: 30 }}>
      {modules.map(item => (
        <View key={item.module_id}>
          <Text style={styles.title}>Module {item.module_number} - {item.module_name}</Text>
          <View style={styles.container}>
            {item.ref_topic.map((topic) => (
              <TouchableOpacity
                key={topic.topic_id}
                style={styles.card}
                onPress={() => onTopicPress(topic)}
              >
                <View style={{ marginRight: 40 }}>
                  <CircularProgress module_numer={item.module_number} completed={completed} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{topic.topic_title}</Text>
                  <Text style={styles.text}>{topic.topic_description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  container: {
    backgroundColor: '#E78DA5',
    padding: 10,
    borderRadius: 25,
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    borderRadius: 25,
    height: 90,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  textContainer: {
    flex: 1,
  },
});
