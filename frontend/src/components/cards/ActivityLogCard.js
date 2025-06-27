import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format, parseISO } from 'date-fns';

const ActivityLogCard = ({ item, index, previousItem }) => {
  const currentDate = format(parseISO(item.log_timestamp), 'MMMM dd, yyyy');
  const previousDate = previousItem
    ? format(parseISO(previousItem.log_timestamp), 'MMMM dd, yyyy')
    : null;
  const showDateDivider = currentDate !== previousDate;

  return (
    <View>
      {showDateDivider && (
        <View style={styles.dateDividerContainer}>
          <Text style={styles.dateDividerText}>{currentDate}</Text>
        </View>
      )}
      <View style={styles.card}>
        <Text style={styles.cardSummary}>{item.log_event_summary}</Text>
        <Text style={styles.cardDetail}>{item.log_event}</Text>
      </View>
    </View>
  );
};

export default ActivityLogCard;




const styles = StyleSheet.create({
  dateDividerContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 6,
  },
  dateDividerText: {
    backgroundColor: '#eee',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardSummary: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  cardDetail: {
    fontSize: 14,
    color: '#555',
  },
});

