import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator, StyleSheet, Button } from 'react-native';
import QuizQuestion from '../quiz/quizQuestion';
import axios from 'axios';
import { useCurrentChild } from '../../context/ChildContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../utils/config';


export default function TopicScreen({ route, navigation }) {
  const { topicId } = route.params;
  const { currentChild } = useCurrentChild();

  const [topic, setTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [energy, setEnergy] = useState(null);
  const [timeToNext, setTimeToNext] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [testReset, setTestReset] = useState(false);

  useEffect(() => {
    if (topicId) fetchTopicData();
  }, [topicId]);

  const fetchTopicData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/topics/${topicId}`);
      setTopic(res.data);
    } catch (err) {
      console.error('Error loading topic:', err);
      Alert.alert('Error', 'Could not load topic data.', [
        { text: 'Back', onPress: () => navigation.goBack() }
      ]);
    }
  };

  useEffect(() => {
    if (currentChild?.user_id && topic) {
      fetchEnergy();
    }
  }, [topic]);

  const fetchEnergy = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/energy/status`, {
        params: { user_id: currentChild.user_id }
      });

      const userEnergy = res.data.user_energy;
      const timeRemaining = res.data.time_to_next_recharge_ms;

      setEnergy(userEnergy);
      setTimeToNext(timeRemaining);

      if (userEnergy === 0) {
        startCountdown(timeRemaining);
      } else {
        await loadQuestions();
      }
    } catch (err) {
      console.error('Error fetching energy:', err);
      Alert.alert('Error', 'Unable to fetch your energy status.', [
        { text: 'Back', onPress: () => navigation.goBack() }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const startCountdown = (ms) => {
    if (!ms || ms <= 0) return;
    let remaining = ms;

    const interval = setInterval(() => {
      remaining -= 1000;
      if (remaining <= 0) {
        clearInterval(interval);
        fetchEnergy();
      } else {
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        setCountdown(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      }
    }, 1000);
  };

  const loadQuestions = async () => {
    const allQuestions = topic?.topic_activities || [];
    const savedKey = `correctAnswers_${currentChild.user_id}_${topic.topic_id}`;

    if (testReset) {
      setQuestions(allQuestions);
      return;
    }

    try {
      const saved = await AsyncStorage.getItem(savedKey);
      const correctIds = saved ? JSON.parse(saved) : [];
      const filtered = allQuestions.filter(q => !correctIds.includes(q.id));
      setQuestions(filtered);
    } catch (err) {
      console.error('Error loading saved questions:', err);
      setQuestions(allQuestions);
    }
  };

  const handleWrongAnswer = async () => {
    try {
      //console.log('Sending to /api/energy/reduce with user_id:', currentChild.user_id);
  
      const res = await axios.post(`${BASE_URL}/api/energy/reduce`, {
        user_id: currentChild.user_id,
      });
  
      //console.log('Energy response:', res.data);
  
      const newEnergy = res.data.user_energy;
      setEnergy(newEnergy);
  
      if (newEnergy === 0) {
        setTimeout(() => {
          Alert.alert('Energy depleted', 'You must wait 30 minutes to continue.', [
            { text: 'Back', onPress: () => navigation.goBack() }
          ]);
        }, 500);
      } else {
        const updated = [...questions];
        const failed = updated.splice(currentIndex, 1)[0];
        updated.push(failed);
        setQuestions(updated);
        setCurrentIndex(0);
      }
    } catch (err) {
      console.error('Error reducing energy:', err.response?.data || err.message);
    }
  };
  

  const handleAnswer = async (isCorrect, message) => {
    Alert.alert(isCorrect ? 'Correct!' : 'Wrong!', message);

    if (isCorrect) {
      const updated = [...questions];
      const answered = updated.splice(currentIndex, 1)[0];

      if (!testReset) {
        const key = `correctAnswers_${currentChild.user_id}_${topic.topic_id}`;
        try {
          const saved = await AsyncStorage.getItem(key);
          const savedIds = saved ? JSON.parse(saved) : [];
          const updatedIds = [...savedIds, answered.id];
          await AsyncStorage.setItem(key, JSON.stringify(updatedIds));
        } catch (err) {
          console.error(' Error saving correct answer:', err);
        }
      }

      if (updated.length === 0) {
        navigation.navigate('TopicComplete', {
          heading: topic.topic_completion_heading,
          text: topic.topic_completion_text,
          topicId: topic.topic_id,
        });
      } else {
        setQuestions(updated);
        setCurrentIndex(0);
      }
    } else {
      handleWrongAnswer();
    }
  };

  const resetTopicForTest = async () => {
    const key = `correctAnswers_${currentChild.user_id}_${topic.topic_id}`;
    await AsyncStorage.removeItem(key);
    setTestReset(true);
    await loadQuestions();
  };

  if (isLoading || energy === null || !topic) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (energy === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.energyZero}>Energy: 0</Text>
        <Text style={styles.countdownText}>
          {countdown ? `You will regain 1 energy in ${countdown}` : 'Please wait...'}
        </Text>
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];
  if (!currentQuestion) {
    return (
      <View style={styles.container}>
        <Text>No more questions available.</Text>
        <Button title="Reset Topic for Test" onPress={resetTopicForTest} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.energy, energy === 0 && styles.energyZero]}>
        Energy: {energy}
      </Text>
      <Text style={styles.question}>
        {currentQuestion.quiz?.question || currentQuestion.text}
      </Text>

      <QuizQuestion
        data={currentQuestion}
        onAnswer={(isCorrect, message) => handleAnswer(isCorrect, message)}
      />

      <View style={{ marginTop: 30 }}>
        <Button title="Reset Topic for Test" onPress={resetTopicForTest} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  question: { fontSize: 18, marginBottom: 20 },
  energy: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  energyZero: { fontSize: 20, color: 'red', textAlign: 'center', marginBottom: 10 },
  countdownText: { fontSize: 16, textAlign: 'center', color: '#555' },
});
