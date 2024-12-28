import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../features/waterSlice';
import { RootState } from '../store';

interface Goal {
  target: number;
  achieved: number;
}

interface TrackerProps {
  goal: Goal;
}

export default function WaterTracker({ goal }: TrackerProps) {
  const dispatch = useDispatch();

  // Access the water count from the Redux store
  const waterCount = useSelector((state: RootState) => state.water.count);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Water Tracker</Text>

      {/* Display Goal Information */}
      <Text style={styles.text}>Target: {goal?.target || 0} glasses</Text>
      <Text style={styles.text}>Achieved: {goal?.achieved || 0} glasses</Text>

      {/* Redux-Managed Count */}
      <Text style={styles.count}>Current Glasses: {waterCount}</Text>

      {/* Buttons for Increment, Decrement, and Reset */}
      <View style={styles.buttons}>
        <Button title="Add Glass" onPress={() => dispatch(increment())} />
        <Button title="Remove Glass" onPress={() => dispatch(decrement())} />
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
