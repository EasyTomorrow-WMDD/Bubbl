import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import CircularProgress from './Circle';
import { useNavigation } from '@react-navigation/native';
import { getBgClass, getTopicBg, textColor } from '../../styles/BubblColors';


export default function Module({ modules, progress = [], onTopicPress }) {

return (
  <View style={{ width: '100%'}}>
    {modules.map((item) => (
      <View key={item.module_id} style={{ gap: 30,  }}>
        <View style={{ backgroundColor: getTopicBg(item.module_number), padding: 10, paddingVertical: 20 }}>
          <Text style={[styles.title, {color: textColor(item.module_number)}]}>
            Module {item.module_number} - {item.module_name}
          </Text>

          <View style={[styles.container, { backgroundColor: getBgClass(item.module_number),  }]}>
            {item.ref_topic.map((topic) => {
              const progressItem = progress.find((p) => p.topic_id === topic.topic_id);
              const isCompleted = progressItem?.user_topic_completed === true;

              return (
                <Pressable
                  key={topic.topic_id}
                  style={[styles.card, {backgroundColor: getTopicBg(item.module_number), }]}
                  onPress={() => onTopicPress && onTopicPress(topic)}
                >
                  <View style={{ marginRight: 40 }}>
                    <CircularProgress topic_number={topic.topic_number} completed={isCompleted} moduleNumber={item.module_number} />
                  </View>

                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{topic.topic_title}</Text>
                    <Text style={styles.text}>{topic.topic_description}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    ))}
  </View>
)};

const styles = StyleSheet.create({
      title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 15,
      },
      container: {
        padding: 10,
        borderRadius: 25,
        gap: 10,
      },
      card: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        borderRadius: 25,
        height: 90,
      },
      text: {
        fontSize: 16,
        color: '#000',
      },
      textContainer: {
        flex: 1,
      },
    })
