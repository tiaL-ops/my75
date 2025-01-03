import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';

export default function AboutScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [days, setDays] = useState(
    Array.from({ length: 75 }, (_, index) => ({ day: index + 1, completed: false }))
  );

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'CuteFont': require('../../assets/fonts/Balonku-Regular.ttf'),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  const toggleDay = (dayIndex: number) => {
    setDays((prevDays) =>
      prevDays.map((day, index) =>
        index === dayIndex ? { ...day, completed: !day.completed } : day
      )
    );
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading My 75...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.title}>My 75 Progress</Text>
        <ScrollView contentContainerStyle={styles.gridContainer}>
          {days.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dayButton}
              onPress={() => toggleDay(index)}
            >
              <Image
                source={
                  day.completed
                    ? require('../../assets/images/happy.gif')
                    : require('../../assets/images/sad.gif')
                }
                style={styles.icon}
              />
              <Text style={styles.dayText}>Day {day.day}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCE4EC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCE4EC',
  },
  loadingText: {
    fontSize: 18,
    fontFamily: 'CuteFont',
    color: '#FF69B4',
  },
  title: {
    fontSize: 24,
    fontFamily: 'CuteFont',
    color: '#FF69B4',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  dayButton: {
    width: 80,
    height: 100,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  dayText: {
    fontSize: 14,
    fontFamily: 'CuteFont',
    color: '#333',
  },
});
