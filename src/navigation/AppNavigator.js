// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/Splash";
import Questions from "../screens/Questions";
import Score from "../screens/Score";

const Stack = createNativeStackNavigator();

function AppNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{ contentStyle: { backgroundColor: "white" } }}
			>
				<Stack.Screen name="Splash" component={Splash} />

				<Stack.Screen name="Question" component={Questions} />

				<Stack.Screen name="Score" component={Score} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default AppNavigator;
