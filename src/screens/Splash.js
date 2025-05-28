import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import tw from "twrnc";

const Splash = ({ navigation }) => {
  return (
    <View style={tw`flex-1 bg-yellow-100 items-center justify-center p-4`}>
      <Image
        source={require("../../assets/images/img_1.png")}
        style={tw.style(tw`h-2/5 mb-6`, { aspectRatio: 1 })}
      />

      <Text style={tw`text-3xl font-bold text-pink-600 mb-4 text-center`}>
        🎉 Welcome to Bubbl Quiz! 🎈
      </Text>

      <View
        style={tw`bg-pink-400 p-4 rounded-xl w-80 items-center shadow-lg`}
      >
        <Text style={tw`text-white text-lg mb-2 text-center`}>
          🧠 Let's play and learn!
        </Text>
        <Text style={tw`text-white text-base mb-1 text-center`}>
          ⭐ Watch your progress at the top!
        </Text>
        <Text style={tw`text-white text-base text-center`}>
          🏆 See your score at the end!
        </Text>
      </View>

      <Pressable
        style={tw`bg-green-400 mt-8 px-8 py-3 rounded-full shadow`}
        onPress={() => navigation.navigate("Question")}
      >
        <Text style={tw`text-white text-xl font-bold`}>🚀 Start Quiz</Text>
      </Pressable>
    </View>
  );
};


export default Splash;

const styles = StyleSheet.create({});
