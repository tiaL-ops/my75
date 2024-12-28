import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../features/milesSlice';
import { RootState } from '../store';

interface Goal {
  target: number;
  achieved: number;
}

interface MileTrackerProps {
  goal: Goal;
}

export default function MileTracker({ goal }: MileTrackerProps) {
  const dispatch = useDispatch();

  // Access the miles count from the Redux store
  const milesCount = useSelector((state: RootState) => state.miles.count);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Miles Tracker</Text>

      {/* Display Goal Information */}
      <Text style={styles.text}>Target Miles: {goal?.target || 0}</Text>
      <Text style={styles.text}>Achieved Miles: {milesCount}</Text>

      {/* Redux-Managed Count */}
      <Text style={styles.count}>Miles Run: {milesCount}</Text>

      {/* Buttons for Increment, Decrement, and Reset */}
      <View style={styles.buttons}>
        <Button title="Add Miles" onPress={() => dispatch(increment())} />
        <Button title="Remove Miles" onPress={() => dispatch(decrement())} />
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
