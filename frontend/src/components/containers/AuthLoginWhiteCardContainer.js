import React from 'react';
import { View, Text} from 'react-native';
import { globalStyles } from '../../styles/BubblStyles';
import BubblButton from '../forms/BubblButton';
import DividerWithText from '../layout/DividerWithText';
import BubblButtonLogin from '../forms/BubblButtonLogin';
import BubblButtonLoginOutline from '../forms/BubblButtonLoginOutline';
import { fontStyles } from '../../styles/BubblFontStyles';

export default function AuthLoginWhiteCard({ navigation }) {
  return (
    <View style={globalStyles.loginWrapper}>
      <View style={globalStyles.loginCard}>
        <Text style={[fontStyles.display1, { textAlign: 'center', marginTop: -30, marginBottom: 10 }]}>
          Bubbl is happy to see you!
        </Text>
        <Text style={[fontStyles.bodyMedium, { textAlign: 'center', marginBottom: 10 }]}>
          Let's go on a fun adventure to learn how to stay safe!
        </Text>

        {/* Login button */}
        <BubblButtonLogin
          label="Login"
          onPress={() => navigation.replace('Login')}
        />

          {/* TEMP TO TEST MOOD AND DRAWING */}
          {/* <BubblButtonLogin
          label="ChildDrawing"
          onPress={() => navigation.replace('ChildDrawing')}
        /> */}

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
