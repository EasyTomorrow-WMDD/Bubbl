import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import supabase from '../lib/supabase';

const Page2 = ({ navigation }) => {

  // State variable to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // --------------------------------------------------------------------------
  // Check if user is logged in when this component mounts
  useEffect(() => {

    const getSession = async () => {
      // Get the current session from Supabase
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    getSession();
  }, []);


  // --------------------------------------------------------------------------
  // Handle logout
  const handleLogout = async () => {
    // Call Supabase signOut method
    await supabase.auth.signOut();
    navigation.navigate('Page1');
  };

  // --------------------------------------------------------------------------
  // Render the component
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Login status</Text>
      <Text style={styles.status}>{isLoggedIn ? 'You are logged in!' : 'You are not logged in!'}</Text>

      <Text style={styles.label}>Logout</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Page2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 16,
  },
  status: {
    marginBottom: 20,
    fontSize: 18,
  },
});
