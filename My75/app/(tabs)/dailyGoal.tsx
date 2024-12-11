import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DailyGoals() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Goals</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Water Drank Today</Text>
        <Text style={styles.cardValue}>2 Liters</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Miles Run Today</Text>
        <Text style={styles.cardValue}>5 Miles</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Books Read Today</Text>
        <Text style={styles.cardValue}>50 Pages</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#555',
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
});
