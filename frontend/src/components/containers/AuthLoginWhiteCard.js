import React from 'react';
import { View, Text} from 'react-native';
import { globalStyles } from '../../styles/BubblStyles';
import BubblButton from '../forms/BubblButton';
import DividerWithText from '../layout/DividerWithText';
import BubblButtonLogin from '../forms/BubblButtonLogin';
import BubblButtonLoginOutline from '../forms/BubblButtonLoginOutline';

export default function AuthLoginWhiteCard({ navigation }) {
  return (
    <View style={globalStyles.loginWrapper}>
      <View style={globalStyles.loginCard}>
        <Text style={globalStyles.title}>Bubbl is happy to see you!</Text>
        <Text style={globalStyles.subtitle}>
          Let's go on a fun adventure to learn how to stay safe!
        </Text>

        {/* Login button */}
        <BubblButtonLogin
          label="Login"
          onPress={() => navigation.replace('Login')}
        />

        {/* Divider with text */}
        <DividerWithText text="or" />

        {/* Signup button */}
        <BubblButtonLoginOutline
          label="Don't have an account?"
          onPress={() => navigation.replace('Signup')}
        />
      </View>
    </View>
  );
}
