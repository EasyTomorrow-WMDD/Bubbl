import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import CircularProgress from './Circle';
import { useNavigation } from '@react-navigation/native';
import { getBgClass, getTopicBg, textColor, currentTopicColor } from '../../styles/BubblColors';
import { fontStyles } from '../../styles/BubblFontStyles';


export default function Module({ modules, progress = [], onTopicPress, currentTopicId }) {


  return (
    <View style={{ width: '100%' }}>
      {modules.map((item) => (
        <View key={item.module_id} style={{ gap: 30, }}>
          <View style={{ backgroundColor: getTopicBg(item.module_number), padding: 15, paddingVertical: 20 }}>
            <Text style={[fontStyles.heading1, { color: textColor(item.module_number), paddingVertical: 20, fontSize: 30 }]}>
              Module {item.module_number} - {item.module_name}
            </Text>

            <View style={[styles.container, { backgroundColor: getBgClass(item.module_number), }]}>
              {item.ref_topic
                .sort((a, b) => a.topic_number - b.topic_number)
                .map((topic, index, topicsArray) => {
                  const progressItem = progress.find((p) => p.topic_id === topic.topic_id);
                  const isCompleted = progressItem?.user_topic_completed === true;
                  const isCurrent = topic.topic_id === currentTopicId;

                  let isLocked = false;
                  if (index > 0) {
                    const prevTopic = topicsArray[index - 1];
                    const prevProgress = progress.find((p) => p.topic_id === prevTopic.topic_id);
                    isLocked = !(prevProgress?.user_topic_completed === true);
                  }

                  return (
                    <Pressable
                      key={topic.topic_id}
                      disabled={isLocked}
                      style={[
                        styles.card,
                        {
                          backgroundColor:
                            isCurrent ? currentTopicColor(item.module_number) :
                              getTopicBg(item.module_number),
                          opacity: isLocked ? 0.4 : 1,
                        }
                      ]}
                      onPress={() => {
                        if (!isLocked && onTopicPress) onTopicPress(topic);
                      }}
                    >
                      <View style={{ paddingRight:25 }}>
                        <CircularProgress topic_number={topic.topic_number} completed={isCompleted} moduleNumber={item.module_number} isCurrent={isCurrent} />
                      </View>

                      <View style={styles.textContainer}>
                        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }} >
                          <View style={{ flex: 1,  }}>
                            <Text style={[{ color: isCurrent ? 'white' : textColor(item.module_number), }, fontStyles.heading3]} numberOfLines={2}
                              ellipsizeMode="tail">
                              {topic.topic_title}
                            </Text>
                          </View>

                          <Text style={[{ color: isCurrent ? 'white' : textColor(item.module_number), marginRight:5, alignSelf:'flex-end' }, fontStyles.bodySmall]}>{isCompleted ? 'Completed ✅' : null}</Text>
                        </View>

                        <Text style={[{ color: isCurrent ? 'white' : textColor(item.module_number), marginTop:5 }, fontStyles.bodyMedium]} numberOfLines={2} ellipsizeMode="tail">
                          {topic.topic_description}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}

            </View>
          </View>
        </View>
      ))}
    </View>
  )
};

const styles = StyleSheet.create({

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
    minHeight: 101,
    flexWrap: 'wrap',
  },

  textContainer: {
    flex: 1,
  },
})
