import React, { useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useCurrentChild } from '../context/ChildContext';

const BASE_URL = 'http://192.168.1.72:3000';

export default function TopicComplete({ route, navigation }) {
  const { heading, text, topicId } = route.params;
  const { currentChild } = useCurrentChild();

  useEffect(() => {
    const saveProgress = async () => {
      try {
        await axios.post(`${BASE_URL}/api/progress`, {
          user_id: currentChild.user_id,
          topic_id: topicId,
        });
      } catch (err) {
        console.error('Error saving progress:', err);
        Alert.alert('Error', 'Unable to save progress.');
      }
    };

    if (currentChild?.user_id && topicId) {
      saveProgress();
    }
  }, [currentChild, topicId]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.text}>{text}</Text>

      <Button title="Back to Topics" onPress={() => navigation.navigate('Topics')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  text: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
});
