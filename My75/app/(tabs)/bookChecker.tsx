import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../features/bookSlice';
import { RootState } from '../store';

export default function BookTracker() {
  const dispatch = useDispatch();

  // Access the book count from the Redux store
  const bookCount = useSelector((state: RootState) => state.book.count);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Tracker</Text>
      <Text style={styles.count}>Books Page Read: {bookCount}</Text>

     
      <View style={styles.buttons}>
        <Button title="Add Book Page" onPress={() => dispatch(increment())} />
        <Button title="Remove book " onPress={() => dispatch(decrement())} />
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