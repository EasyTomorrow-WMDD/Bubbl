import { View, Text, Image, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/BubblStyles';
import BubblButton from '../forms/BubblButton';
import DividerWithText from '../layout/DividerWithText';

const AuthWelcomeContainer = ({navigation}) => {

  // This component serves as the welcome screen for authentication.
  // Here, users are navigating to either login or signup. There is no state management or logic for the moment. 

  // ==========================================================================
  // Render the welcome screen
  return (
    <View style={globalStyles.welcomeContainer}>
      <Image
        source={require('../../assets/images/welcome.png')} 
        style={globalStyles.image}
      />
      <Text style={globalStyles.title}>Bubbl is happy to see you!</Text>
      <Text style={globalStyles.subtitle}>Let's go on a fun adventure to learn how to stay safe!</Text>

      {/* Login button */}
      <BubblButton 
        label="Login" 
        onPress={() => navigation.replace('Login')} 
      />

      {/* Divider with text */}
      <DividerWithText text="or" />
      
      {/* Signup button */}
      <BubblButton 
        label="Don't have an account?" 
        onPress={() => navigation.replace('Signup')} 
      />

    </View>
  );

};

export default AuthWelcomeContainer;
