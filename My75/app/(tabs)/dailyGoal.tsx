import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WaterTracker from './waterChecker';
import MileTracker from './milesChecker';
import BookTracker from './bookChecker';

export default function DailyGoals() {
  return (
    <View style={styles.container}>
        <WaterTracker/>
        <MileTracker/>
        <BookTracker/>
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});