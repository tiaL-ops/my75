import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, updateProgress } from '../store';

export default function CalendarTracker() {
  const dispatch = useDispatch();
  const progress = useSelector((state: RootState) => state.progress);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);

  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  const addProgress = (type: 'books' | 'water' | 'miles', value: number) => {
    if (!selectedDate) {
      Alert.alert('Error', 'Please select a date first');
      return;
    }
    dispatch(updateProgress({ date: selectedDate, type, value }));
  };

  const markedDates = Object.keys(progress).reduce((acc, date) => {
    acc[date] = { marked: true };
    return acc;
  }, {} as Record<string, { marked: boolean }>);

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
      />
      {selectedDate && (
        <View style={styles.tracker}>
          <Text style={styles.date}>Selected Date: {selectedDate}</Text>
          <Text style={styles.progress}>
            Books: {progress[selectedDate]?.books || 0}, Water: {progress[selectedDate]?.water || 0}, Miles: {progress[selectedDate]?.miles || 0}
          </Text>
          <Button title="Add Book" onPress={() => addProgress('books', 1)} />
          <Button title="Add Water" onPress={() => addProgress('water', 1)} />
          <Button title="Add Mile" onPress={() => addProgress('miles', 1)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  tracker: { marginTop: 20 },
  date: { fontSize: 18, fontWeight: 'bold' },
  progress: { fontSize: 16, marginVertical: 10 },
});
