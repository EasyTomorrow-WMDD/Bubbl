import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/welcome.png')} 
        style={styles.image}
      />
      <Text style={styles.title}>Bubbl is happy to see you!</Text>
      <Text style={styles.subtitle}>Let's go on a fun adventure to learn how to stay safe!</Text>

      <Button title="Login" onPress={() => navigation.replace('Login')} />

      <Text style={styles.divider}>-------- or --------</Text>

      <Button
        title="Don't have an account?"
        onPress={() => navigation.replace('Signup')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  divider: {
    marginVertical: 20,
    color: '#999',
  },
});
