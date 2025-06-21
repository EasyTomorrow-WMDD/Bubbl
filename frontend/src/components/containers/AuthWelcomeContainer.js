import { View, Text, Image, TouchableOpacity,  ImageBackground } from 'react-native';
import { globalStyles } from '../../styles/BubblStyles';
import BubblButton from '../forms/BubblButton';
import DividerWithText from '../layout/DividerWithText';
import AuthLoginAnimation from './AuthLoginAnimationContainer';
import AuthLoginWhiteCard from './AuthLoginWhiteCardContainer';
// import LottieView from 'lottie-react-native';

const AuthWelcomeContainer = ({navigation}) => {

  // This component serves as the welcome screen for authentication.
  // Here, users are navigating to either login or signup. There is no state management or logic for the moment. 

  // ==========================================================================
  // Render the welcome screen
  return (

    <ImageBackground
      source={require('../../assets/images/Login/Background.png')}
        style={globalStyles.backgroundLogin}
      // resizeMode="cover"
    >
      <View style={globalStyles.animationContainer}>
        <AuthLoginAnimation/>
      </View>

      <AuthLoginWhiteCard navigation={navigation} />

    </ImageBackground>
  );

};

export default AuthWelcomeContainer;
