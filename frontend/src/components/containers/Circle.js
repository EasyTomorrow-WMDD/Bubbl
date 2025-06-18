
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CircularProgress = ({module_numer, completed}) => {
  const radius = 30;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = completed; 

  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View style={styles.wrapper}>
      <Svg height={radius * 2} width={radius * 2}>
        <Circle
          stroke="gray"
          fill="none"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="#75f0ff"
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
      </Svg>

      <View style={styles.center}>
        <Text style={styles.text}>{module_numer}</Text>
      </View>
    </View>
  );
};

export default CircularProgress;

const styles = StyleSheet.create({
  wrapper: {
    width: 30,
    height: 30,
    backgroundColor: '#000', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginLeft:15,
    marginTop:20
  },
  center: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
});
