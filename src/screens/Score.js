import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import tw from "twrnc";

import { useRoute } from "@react-navigation/native";

const Score = ({ navigation }) => {
	const route = useRoute();

	const { score } = route.params;

	console.log(score);
 return (
    <View style={tw`flex-1 bg-yellow-100 items-center justify-center p-6`}>
      {/* Ilustración central */}
      <Image
        source={require("../../assets/images/score_image.png")}
        style={tw.style(tw`h-2/5 mb-6`, { aspectRatio: 1 })}
      />

      {/* Mensaje de felicitación */}
      <Text style={tw`text-3xl font-bold text-pink-600 mb-4 text-center`}>
        🎉 Congratulations! 🎉
      </Text>

      <View
        style={tw`bg-pink-400 p-4 rounded-xl w-80 items-center shadow-lg mb-6`}
      >
        <Text style={tw`text-white text-lg text-center`}>
          🏆 You scored {score} points!
        </Text>
      </View>

      {/* Botón para volver a jugar */}
      <Pressable
        style={tw`bg-green-400 px-8 py-3 rounded-full shadow`}
        onPress={() => navigation.navigate("Splash")}
      >
        <Text style={tw`text-white text-xl font-bold`}>🔁 Play Again</Text>
      </Pressable>
    </View>
  );
};

export default Score;

const styles = StyleSheet.create({});
