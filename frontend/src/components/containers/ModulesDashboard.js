import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import CircularProgress from './Circle';
import { useNavigation } from '@react-navigation/native';

const renderTopic = (topic, module_number) => {
  const progressItem = progress.find(p => p.topic_id === topic.topic_id);
  const isCompleted = progressItem?.user_topic_completed === true;

  return (
    <View key={topic.topic_id} style={styles.card}>
      <View style={{ marginRight: 40 }}>
        <CircularProgress
          module_numer={module_number}
          completed={isCompleted}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{topic.topic_title}</Text>
        <Text style={styles.text}>{topic.topic_description}</Text>
      </View>
    </View>
  );
};


export default function Module({ modules, progress }) {
  return (
    <View style={{ width: '100%', gap: 30 }}>
      {modules.map(item => (
        <View key={item.module_id}>
          <Text style={styles.title}>Module {item.module_number} - {item.module_name}</Text>
          <View style={styles.container}>
            {item.ref_topic.map(topic => {
              const progressItem = progress.find(p => p.topic_id === topic.topic_id);
              const isCompleted = progressItem?.user_topic_completed === true;

              return (
                <View key={topic.topic_id} style={styles.card}>
                  <View style={{ marginRight: 40 }}>
                    <CircularProgress
                      module_numer={item.module_number}
                      completed={isCompleted}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{topic.topic_title}</Text>
                    <Text style={styles.text}>{topic.topic_description}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}


const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5
    },
    container: {
        backgroundColor: '#E78DA5',
        padding: 10,
        borderRadius: 25,
        gap: 10
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '100%',
        padding: 10,
        borderRadius: 25,
        height: 90
    },
    text: {
        fontSize: 16,
        color: '#000',
    },
    textContainer: {
        flex: 1, 
    },

});