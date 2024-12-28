//@refresh reset
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../features/bookSlice';
import { RootState } from '../store';

interface Goal {
  target: number;
  achieved: number;
}

interface BookTrackerProps {
  goal: Goal;
}

export default function BookTracker({ goal }: BookTrackerProps) {
  const dispatch = useDispatch();

  // Access the book count from the Redux store
  const bookCount = useSelector((state: RootState) => state.book.count);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Tracker</Text>

      {/* Display Goal Information */}
      <Text style={styles.text}>Target Pages: {goal?.target || 0}</Text>
      <Text style={styles.text}>Pages Achieved: {goal?.achieved || 0}</Text>

      {/* Redux-Managed Count */}
      <Text style={styles.count}>Current Page Count: {bookCount}</Text>

      {/* Buttons for Increment, Decrement, and Reset */}
      <View style={styles.buttons}>
        <Button title="Add Book Page" onPress={() => dispatch(increment())} />
        <Button title="Remove Book Page" onPress={() => dispatch(decrement())} />
        <Button title="Reset" onPress={() => dispatch(reset())} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  count: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttons: {
    width: '60%',
    justifyContent: 'space-between',
    height: 150,
  },
});
