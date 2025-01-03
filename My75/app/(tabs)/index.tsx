import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';

export default function Index() {
    // State management with type definition
    const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

    // Simulate font loading
    useEffect(() => {
        const loadFonts = async () => {
          await Font.loadAsync({
            'CuteFont': require('../../assets/fonts/Balonku-Regular.ttf'),
        });
        setFontsLoaded(true);
        };
        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading Awesomeness..</Text>
            </View>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
        
                <Text style={styles.temperature}>My 75</Text>
                <Text style={styles.condition}>One day at a time</Text>

                {/* Weather Icon */}
                <Image
                    source={require('../../assets/images/cut.gif')}
                    style={styles.weatherIcon}
                />

                {/* Location */}
                <View style={styles.locationContainer}>
                    <Image
                        source={require('../../assets/images/cut.gif')}
                        style={styles.locationIcon}
                    />
                    <Text style={styles.locationText}>Day...</Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DFF6F0', // Soft cyan
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DFF6F0',
    },
    loadingText: {
        fontSize: 10,
        fontFamily: 'Arial',
        color: '#555',
    },
    temperature: {
        fontSize: 64,
        fontFamily: 'CuteFont',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    condition: {
        fontSize: 20,
        fontFamily: 'Arial',
        color: '#666',
        marginBottom: 30,
    },
    weatherIcon: {
        width: 120,
        height: 120,
        marginBottom: 30,
        resizeMode: 'contain',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    locationIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
        resizeMode: 'contain',
    },
    locationText: {
        fontSize: 18,
        fontFamily: 'Arial',
        color: '#444',
    },
});


