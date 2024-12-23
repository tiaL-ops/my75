import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../features/waterSlice';
import { RootState } from '../store';

export default function WaterTracker() {
  const dispatch = useDispatch();

  // Access the water count from the Redux store
  const waterCount = useSelector((state: RootState) => state.water.count);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Water Tracker</Text>
      <Text style={styles.count}>Glasses of Water: {waterCount}</Text>

     
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