import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button, ScrollView } from 'react-native';
import QuizQuestion from '../quiz/quizQuestion';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../utils/config';
import EnergyBarContainer from './EnergyBarContainer';
import { useFocusEffect } from '@react-navigation/native';
import LogChildMilestone from '../../utils/LogChildMilestone';

export default function TopicContainer({ route, navigation }) {
  const { topicId, childProfileId } = route.params;

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
  const [showTryAgain, setShowTryAgain] = useState(false);

  const BADGE_RULES = [
    { 
      id: '659ff7d3-f4c1-4de5-9dd2-49b7b853fdc1', 
      check: ({ streak }) => streak >= 4 
    },
    { 
      id: 'b00a0ca3-cedc-4106-969d-592b64d8a0ec', 
      check: ({ remainingQuestions }) => remainingQuestions === 0 
    }
  ];

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
    if (childProfileId && topic) {
      fetchEnergy();
    }
  }, [topic, childProfileId]);

  const fetchEnergy = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/energy/status`, {
        params: { user_id: childProfileId }
      });

      const userEnergy = res.data.user_energy;
      const timeRemaining = res.data.time_to_next_recharge_ms;

      setEnergy(userEnergy);
      setTimeToNext(timeRemaining);

      if (userEnergy === 0) {
       
        navigation.navigate('EnergyZeroScreen', {
          timeToNextMs: timeRemaining,
          childId: childProfileId
        });
        return; 
      } else {
        await loadQuestions();
        setIsLoadingEnergy(false);
      }
    } catch (err) {
      setIsLoadingEnergy(false);
      navigation.goBack();
    }
  };

  const formatCountdown = (ms) => {
    if (!ms || ms <= 0) return null;
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
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
    const savedKey = `correctAnswers_${childProfileId}_${topic.topic_id}`;

    try {
      const saved = await AsyncStorage.getItem(savedKey);
      const correctIds = saved ? JSON.parse(saved) : [];
      const filtered = allQuestions.filter(q => !correctIds.includes(q.id));
      setQuestions(filtered);
      setShowRestart(filtered.length === 0);
      setShowTryAgain(false);
    } catch (err) {
      setQuestions(allQuestions);
      setShowRestart(false);
      setShowTryAgain(false);
    }
  };

  const awardBadge = async (badgeId) => {
    try {
      await axios.post(`${BASE_URL}/api/users/${childProfileId}/badges`, {
        badge_id: badgeId,
        user_badge_active: false
      });
    } catch (error) {
      console.error(`[TopicContainer] Error awarding badge (${badgeId}):`, error);
    }
  };

  const checkIfBadgeAlreadyEarned = async (badgeId) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/users/${childProfileId}/badges`);
      const badges = res.data;
      return badges.some(
        (b) => b.badge_id === badgeId && b.badge_active === true
      );
    } catch (error) {
      console.error('[TopicContainer] Error checking badge:', error);
      return false;
    }
  };

  const handleWrongAnswer = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/energy/reduce`, {
        user_id: childProfileId,
      });
  
      const newEnergy = res.data.user_energy;
      setEnergy(newEnergy);
  
      if (newEnergy === 0) {
        const statusRes = await axios.get(`${BASE_URL}/api/energy/status`, {
          params: { user_id: childProfileId }
        });
  
        const timeToNext = statusRes.data.time_to_next_recharge_ms;
  
        navigation.navigate('EnergyZeroScreen', {
          timeToNextMs: timeToNext,
          childId: childProfileId
        });
  
      } else {
        if (questions.length === 1) {
          setShowTryAgain(true);
        } else {
          const updated = [...questions];
          const failed = updated.splice(currentIndex, 1)[0];
          updated.push(failed);
          setQuestions(updated);
          setCurrentIndex(0);
        }
      }
    } catch (err) {
      console.error('Error reducing energy:', err);
    }
  };  

  const handleAnswer = async (isCorrect) => {
    if (isCorrect) {
      const newStreak = correctStreak + 1;
      setCorrectStreak(newStreak);

      const updated = [...questions];
      updated.splice(currentIndex, 1);
      const remainingQuestions = updated.length;

      for (const badge of BADGE_RULES) {
        let conditionMet = badge.check({ streak: newStreak, remainingQuestions });
        if (conditionMet) {
          const alreadyHasBadge = await checkIfBadgeAlreadyEarned(badge.id);
          if (!alreadyHasBadge) {
            await awardBadge(badge.id);
            if (badge.id === '659ff7d3-f4c1-4de5-9dd2-49b7b853fdc1') {
              setCorrectStreak(0);
              navigation.navigate('Streak');
              return;
            }
          }
        }
      }

      const key = `correctAnswers_${childProfileId}_${topic.topic_id}`;
      try {
        const saved = await AsyncStorage.getItem(key);
        const savedIds = saved ? JSON.parse(saved) : [];
        const updatedIds = [...savedIds, questions[currentIndex].id];
        await AsyncStorage.setItem(key, JSON.stringify(updatedIds));
      } catch (err) {
        console.error('[TopicContainer] Error saving correct answer:', err);
      }

      if (remainingQuestions === 0) {
        try {
          const response = await axios.post(`${BASE_URL}/api/childProgress/saveProgress`, {
            user_id: childProfileId,
            topic_id: topic.topic_id
          });

          const { levelChanged, newLevel } = response.data;

          const milestoneMap = {
            '48b355b6-85bf-4c32-ac99-0b920cf1dbcb': 1,
            '61ad4167-84a7-4865-b5bf-29a915a4d503': 2,
            '6493b507-bdce-4984-a4d8-9649be3d8bed': 3,
            'e36fc032-ca9d-4405-b7cc-9ab6b22cf1f5': 4
          };

          if (milestoneMap[topic.topic_id]) {
            await LogChildMilestone(childProfileId, 'Child', milestoneMap[topic.topic_id]);
          }

          if (levelChanged) {
            let animationType;
            switch (newLevel) {
              case 2:
                animationType = 'evolution1';
                break;
              case 3:
                animationType = 'evolution2';
                break;
              case 4:
                animationType = 'evolution3';
                break;
              default:
                animationType = 'evolution1';
            }

            navigation.navigate('EvolutionScreen', { animationType });
            return;
          }
        } catch (error) {
          console.error('[TopicContainer] Error saving progress:', error);
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
        setShowTryAgain(false);
      }
    } else {
      setCorrectStreak(0);
      handleWrongAnswer();
    }
  };

  const resetTopicForTest = async () => {
    const key = `correctAnswers_${childProfileId}_${topic.topic_id}`;
    await AsyncStorage.removeItem(key);
    setShowRestart(false);
    setShowTryAgain(false);
    await loadQuestions();
  };

  if (isLoadingTopic || (!topic)) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isLoadingEnergy && energy !== 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (energy === 0) {
    return null;
  }

  if (showRestart || questions.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.completedText}>You have already completed this topic!</Text>
        <Button title="Try Again" onPress={resetTopicForTest} />
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingTop: 55, paddingHorizontal: 20 }}>
        <EnergyBarContainer energy={energy} maxEnergy={3} />
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {currentQuestion && (
            <QuizQuestion
              data={currentQuestion}
              onAnswer={(isCorrect) => handleAnswer(isCorrect)}
              showTryAgain={showTryAgain}
              onTryAgain={() => setShowTryAgain(false)}
            />
          )}
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