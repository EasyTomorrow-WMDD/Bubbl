import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button, ScrollView } from 'react-native';
import QuizQuestion from '../quiz/quizQuestion';
import axios from 'axios';
import { useCurrentChild } from '../../context/ChildContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../utils/config';
import EnergyBarContainer from './EnergyBarContainer';
import { useFocusEffect } from '@react-navigation/native';

const FOUR_IN_A_ROW_BADGE_ID = 'e80e94c4-9fb1-4984-b401-783a5bcca719';

export default function TopicScreen({ route, navigation }) {
  const { topicId } = route.params;
  const { currentChild, isLoadingChild } = useCurrentChild();

  const [topic, setTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [timeToNext, setTimeToNext] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [showRestart, setShowRestart] = useState(false);

  const [isLoadingTopic, setIsLoadingTopic] = useState(true);
  const [isLoadingEnergy, setIsLoadingEnergy] = useState(true);

  if (isLoadingChild) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading child profile...</Text>
      </View>
    );
  }

  if (!currentChild?.user_id) {
    return (
      <View style={styles.loaderContainer}>
        <Text>No child profile available.</Text>
      </View>
    );
  }

  useEffect(() => {
    if (topicId) {
      fetchTopicData();
    }
  }, [topicId]);

  useFocusEffect(
    useCallback(() => {
      if (correctStreak === 0 && topic && questions.length === 0) {
        setShowRestart(true);
      }
    }, [correctStreak, topic, questions])
  );

  const fetchTopicData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/topics/${topicId}`);
      setTopic(res.data);
    } catch (err) {
      navigation.goBack();
    } finally {
      setIsLoadingTopic(false);
    }
  };

  useEffect(() => {
    if (currentChild?.user_id && topic) {
      fetchEnergy();
    }
  }, [topic, currentChild]);

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
      navigation.goBack();
    } finally {
      setIsLoadingEnergy(false);
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

    try {
      const saved = await AsyncStorage.getItem(savedKey);
      const correctIds = saved ? JSON.parse(saved) : [];
      const filtered = allQuestions.filter(q => !correctIds.includes(q.id));
      setQuestions(filtered);

      if (filtered.length === 0) {
        setShowRestart(true);
      } else {
        setShowRestart(false);
      }

    } catch (err) {
      setQuestions(allQuestions);
      setShowRestart(false);
    }
  };

  const awardBadge = async () => {
    try {
      await axios.post(`${BASE_URL}/api/users/${currentChild.user_id}/badges`, {
        badge_id: FOUR_IN_A_ROW_BADGE_ID,
        user_badge_active: true
      });
    } catch (error) {
      console.error('[TopicScreen] Error awarding badge:', error);
    }
  };

  const checkIfBadgeAlreadyEarned = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/users/${currentChild.user_id}/badges`);
      const badges = res.data;
      const alreadyEarned = badges.find(
        (b) => b.badge_id === FOUR_IN_A_ROW_BADGE_ID && b.badge_active === true
      );
      return !!alreadyEarned;
    } catch (error) {
      console.error('[TopicScreen] Error checking badge:', error);
      return false;
    }
  };

  const handleWrongAnswer = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/energy/reduce`, {
        user_id: currentChild.user_id,
      });

      const newEnergy = res.data.user_energy;
      setEnergy(newEnergy);

      if (newEnergy === 0) {
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      } else {
        const updated = [...questions];
        const failed = updated.splice(currentIndex, 1)[0];
        updated.push(failed);
        setQuestions(updated);
        setCurrentIndex(0);
      }
    } catch (err) {
      console.error('[TopicScreen] Error reducing energy:', err.response?.data || err.message);
    }
  };

  const handleAnswer = async (isCorrect) => {
    if (isCorrect) {
      const newStreak = correctStreak + 1;
      setCorrectStreak(newStreak);

      if (newStreak >= 4) {
        const alreadyHasBadge = await checkIfBadgeAlreadyEarned();
        if (!alreadyHasBadge) {
          await awardBadge();
          setCorrectStreak(0);
          navigation.navigate('Streak');
          return;
        } else {
          console.log('Badge already earned. Not showing Streak screen again.');
        }
        setCorrectStreak(0);
      }

      const updated = [...questions];
      updated.splice(currentIndex, 1);

      const key = `correctAnswers_${currentChild.user_id}_${topic.topic_id}`;
      try {
        const saved = await AsyncStorage.getItem(key);
        const savedIds = saved ? JSON.parse(saved) : [];
        const updatedIds = [...savedIds, questions[currentIndex].id];
        await AsyncStorage.setItem(key, JSON.stringify(updatedIds));
      } catch (err) {
        console.error('[TopicScreen] Error saving correct answer:', err);
      }

      if (updated.length === 0) {
        try {
          await axios.post(`${BASE_URL}/api/childProgress/saveProgress`, {
            user_id: currentChild.user_id,
            topic_id: topic.topic_id
          });
        } catch (error) {
          console.error('[TopicScreen] Error saving progress:', error);
        }

        navigation.navigate('TopicComplete', {
          topicId: topic.topic_id,
          heading: topic.topic_completion_heading,
          text: topic.topic_completion_text,
          topic_xp: topic.topic_xp,
          topic_star: topic.topic_star,
        });
      } else {
        setQuestions(updated);
        setCurrentIndex(0);
      }
    } else {
      setCorrectStreak(0);
      handleWrongAnswer();
    }
  };

  const resetTopicForTest = async () => {
    const key = `correctAnswers_${currentChild.user_id}_${topic.topic_id}`;
    await AsyncStorage.removeItem(key);
    await loadQuestions();
  };

  if (isLoadingTopic || isLoadingEnergy || !topic) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (energy === 0) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.energyZero}>Energy: 0</Text>
        <Text style={styles.countdownText}>
          {countdown ? `You will regain 1 energy in ${countdown}` : 'Please wait...'}
        </Text>
      </View>
    );
  }

  if (showRestart || !questions.length) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.completedText}>You have already completed this topic!</Text>
        <Button title="Restart Quiz" onPress={resetTopicForTest} />
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingTop: 40, paddingHorizontal: 20 }}>
        <EnergyBarContainer energy={energy} maxEnergy={3} />
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <QuizQuestion
            data={currentQuestion}
            onAnswer={(isCorrect) => handleAnswer(isCorrect)}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  energyZero: { fontSize: 20, color: 'red', textAlign: 'center', marginBottom: 10 },
  countdownText: { fontSize: 16, textAlign: 'center', color: '#555' },
  completedText: { fontSize: 18, textAlign: 'center', marginBottom: 20 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: 20,
  },
});
