import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router'; 
import { Provider } from 'react-redux';
import { store } from '../store';
import * as Font from 'expo-font';

export default function Index() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load custom fonts
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'CuteFont': require('../../assets/fonts/Balonku-Regular.ttf'),
        'SpaceMono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFB6C1" />
        <Text style={styles.loadingText}>Loading awesomeness...</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        {/* Motivational Header */}
        <View style={styles.card}>
          <Text style={styles.heading}>Hi Tia!</Text>
          <Text style={styles.subHeading}>75 to go!</Text>
          <Text style={styles.motivation}>
            You’re doing amazing! Keep going, one day at a time. 💪
          </Text>
        </View>

        {/* Panda Image */}
        <Image
          source={require('../../assets/images/cut.gif')}
          style={styles.pandaImage}
        />

        {/* Navigation Button */}
        <Link href="/about" style={styles.button}>
          See your progress!
        </Link>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7', // Soft pastel pink
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5F7',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: 'CuteFont',
    color: '#FFB6C1', // Soft pink
  },
  card: {
    backgroundColor: '#FFFFFF', // White card
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  heading: {
    fontSize: 42,
    fontFamily: 'CuteFont',
    color: '#FF69B4', // Hot pink
    marginBottom: 5,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 28,
    fontFamily: 'CuteFont',
    color: '#FF69B4',
    marginBottom: 15,
  },
  motivation: {
    fontSize: 20,
    fontFamily: 'SpaceMono',
    color: '#555', 
    textAlign: 'center',
    lineHeight: 28,
  },
  pandaImage: {
    width: 220,
    height: 220,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  button: {
    fontSize: 18,
    fontFamily: 'CuteFont',
    color: '#fff',
    backgroundColor: '#FF69B4', 
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    textAlign: 'center',
    shadowColor: '#FF69B4',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    letterSpacing: 1.2,
  },
});
