import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useCurrentChild } from '../context/ChildContext';
import { BASE_URL } from '../utils/config';
import TemporaryMainContainer from '../components/containers/TemporaryMainContainer';

export default function TopicComplete({ route, navigation }) {
  const { heading, text, topicId } = route.params;
  const { currentChild } = useCurrentChild();
  const [rewardMessage, setRewardMessage] = useState('');

  useEffect(() => {
    const saveProgress = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/api/childProgress/saveProgress`, {
          user_id: currentChild.user_id,
          topic_id: topicId,
        });
        console.log('Progress response:', response.data);
        setRewardMessage(response.data.message);
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
      {rewardMessage !== '' && (
        <Text style={styles.reward}>{rewardMessage}</Text>
      )}
      <Button title="Back to Topics" onPress={() => navigation.navigate('Modules')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  text: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  reward: { fontSize: 16, color: 'green', marginBottom: 20, textAlign: 'center' },
});
