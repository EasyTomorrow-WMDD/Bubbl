import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RewardsPanel from '../components/containers/RewardsPanel';
import TemporaryMainContainer from '../components/containers/TemporaryMainContainer';


export default function TopicComplete({ route }) {
  const navigation = useNavigation(); 
  const { heading, text, topic_xp, topic_star } = route.params;

  console.log('TopicComplete → topic_xp:', topic_xp);
  console.log('TopicComplete → topic_star:', topic_star);

  const handleBackToHome = () => {
    navigation.navigate('Modules');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          //source={require('../../assets/images/confetti.png')}
          style={styles.image}
        />
        <Text style={styles.heading}>{heading || 'Well Done!'}</Text>
        <Text style={styles.message}>{text || 'You finished this topic! Great job!'}</Text>

        <RewardsPanel xp={topic_xp} star={topic_star} />

        <TouchableOpacity style={styles.button} onPress={handleBackToHome}>
          <Text style={styles.buttonText}>Claim Rewards</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#EFE8FF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#7C4DFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    marginTop: 40,
    backgroundColor: '#FFC670',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});
