import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { reactQuestions } from "../config/question";
import tw from "twrnc";
import * as Progress from "react-native-progress";

const Questions = ({ navigation }) => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [selectedOption, setSelectedOption] = useState(null);
	const [isCorrect, setIsCorrect] = useState(null);
	const [quizProgress, setQuizProgress] = useState(reactQuestions.length);

	const progress = (currentQuestionIndex + 1) / quizProgress;
	// Handle Next Press
	const handleNext = () => {
		if (currentQuestionIndex === reactQuestions.length - 1) {
			// return;

			navigation.navigate("Score", { score: score });
		} else {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
			setSelectedOption(null);
			setIsCorrect(null);
		}
	};

	// Handle Presed Option

	const handleOptionPress = (pressedOption) => {
		setSelectedOption(pressedOption);

		const isAnswerCorrect =
			reactQuestions[currentQuestionIndex].correctAnswer === pressedOption;

		setIsCorrect(isAnswerCorrect);

		if (isAnswerCorrect) {
			setScore((prevScore) => prevScore + 20);
		}
	};
return (
    <View style={tw`flex-1 bg-yellow-100 p-6 justify-center`}>
      {/* Progress bar */}
      <View style={tw`mb-6`}>
        <Progress.Bar
          progress={progress}
          width={null}
          height={20}
          color={"rgb(236 72 153)"} // pink-500
          borderRadius={10}
        />
      </View>

      {/* Question */}
      <Text style={tw`text-2xl font-bold text-pink-600 mb-4 text-center`}>
        {reactQuestions[currentQuestionIndex].question}
      </Text>

      {/* Options */}
      {reactQuestions[currentQuestionIndex].options.map((option, index) => (
        <Pressable
          key={index}
          style={tw.style(
            `p-4 my-2 w-full rounded-xl border-2`,
            selectedOption === option
              ? isCorrect
                ? "bg-green-200 border-green-500"
                : "bg-red-200 border-red-500"
              : "bg-white border-pink-400"
          )}
          onPress={() => handleOptionPress(option)}
          disabled={!!selectedOption}
        >
          <Text style={tw`text-lg text-center text-gray-800`}>{option}</Text>
        </Pressable>
      ))}

      {/* Next / Finish button */}
      <Pressable
        style={tw`bg-green-400 mt-8 px-8 py-3 rounded-full shadow items-center`}
        onPress={handleNext}
      >
        <Text style={tw`text-white text-xl font-bold`}>
          {currentQuestionIndex === reactQuestions.length - 1
            ? "🎉 Finish"
            : "➡️ Next"}
        </Text>
      </Pressable>
    </View>
  );
};

export default Questions;

const styles = StyleSheet.create({});
