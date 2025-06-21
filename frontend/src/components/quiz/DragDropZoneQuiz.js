import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import QuizQuestion from '../components/QuizQuestion';
import TrueFalseQuiz from '../components/TrueFalseQuiz';
import FillInTheBlankQuiz from '../components/FillInTheBlankQuiz';
import ChooseImageQuiz from '../components/ChooseImageQuiz';
import DragDropZoneQuiz from '../components/DragDropZoneQuiz';

const BASE_URL = 'http://192.168.1.68:3001/api';

export default function TopicScreen({ route, navigation }) {
  const { topicId } = route.params;
  const [topic, setTopic] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [energy, setEnergy] = useState(3);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/topics/${topicId}`);
        setTopic(res.data);
      } catch (err) {
        console.error('Error loading topic:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopic();
  }, [topicId]);

  const handleAnswer = (userResponse, isCorrect, message) => {
    if (isCorrect) {
      if (currentIndex + 1 < topic.topic_activities.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        navigation.navigate('TopicComplete', {
          heading: topic.topic_completion_heading,
          text: topic.topic_completion_text,
          topicId: topic.topic_id,
        });
      }
    } else {
      if (energy > 1) {
        setEnergy(energy - 1);
        const updated = [...topic.topic_activities];
        const failed = updated.splice(currentIndex, 1)[0];
        updated.push(failed);
        setTopic({ ...topic, topic_activities: updated });
      } else {
        navigation.navigate('GameOver');
      }
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (!topic) return <Text>Topic not found.</Text>;

  const currentActivity = topic.topic_activities[currentIndex];
  let quizComponent;

  switch (currentActivity.type) {
    case 'multiple_choice':
      quizComponent = <QuizQuestion data={currentActivity} onAnswer={handleAnswer} />;
      break;
    case 'true_false':
      quizComponent = <TrueFalseQuiz data={currentActivity} onAnswer={handleAnswer} />;
      break;
    case 'fill_blank':
      quizComponent = <FillInTheBlankQuiz data={currentActivity} onAnswer={handleAnswer} />;
      break;
    case 'choose_image':
      quizComponent = <ChooseImageQuiz data={currentActivity} onAnswer={handleAnswer} />;
      break;
    case 'drag_drop':
      quizComponent = <DragDropZoneQuiz data={currentActivity} onAnswer={handleAnswer} />;
      break;
    default:
      quizComponent = <Text>Unsupported activity type: {currentActivity.type}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.energy}>Energy: {energy}</Text>
      {quizComponent}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  energy: { fontSize: 16, marginBottom: 10, fontWeight: 'bold' }
});
