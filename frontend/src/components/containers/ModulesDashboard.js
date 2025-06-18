import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';
import CircularProgress from './Circle';


export default function Module({ modules }) {
    console.log(typeof modules);
    const [completed, setCompleted] = useState(true);

    return (
        <View style={{ width: '100%', gap: 30 }}>
            {modules.map(item => (
                <View key={item.module_id}>
                    <Text style={styles.title}>Module {item.module_number} - {item.module_name}</Text>
                    <View style={styles.container}>
                        {item.ref_topic.map((topic) => (
                            <View key={topic.topic_id} style={styles.card}>
                                <View style={{ marginRight: 40 }}>
                                    <CircularProgress module_numer={item.module_number} completed={completed}></CircularProgress>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.title}>{topic.topic_title}</Text>
                                    <Text style={styles.text}>{topic.topic_description}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            ))}
        </View>

    )
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