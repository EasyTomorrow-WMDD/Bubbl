
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import {textColor, getCompleted, getTopicBg, getBgClass} from '../../styles/BubblColors'

const CircularProgress = ({ topic_number, completed, moduleNumber }) => {
  const radius = 30;
  const strokeWidth = 7;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = completed;

  const strokeDashoffset = circumference * (1 - progress);

return (
    <View style={[styles.wrapper, { backgroundColor: getBgClass(moduleNumber) }]}>
      <Svg height={radius * 2} width={radius * 2}>
        {/* This Validation Will Only Render The Circumference ring if it is completed */}
        {completed > 0 && (
          <Circle
            stroke={getCompleted(moduleNumber)}
            fill="none"
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${radius}, ${radius}`}
          />
        )}
      </Svg>

      <View style={styles.center}>
        <Text style={[styles.text, { color: textColor(moduleNumber) }]}>
          {topic_number}
        </Text>
      </View>
    </View>
  );
};

export default CircularProgress;

const styles = StyleSheet.create({
  wrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginLeft: 10,
    marginTop: 10,

  },
  center: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize:22,
    fontWeight: 'bold',
  },
});