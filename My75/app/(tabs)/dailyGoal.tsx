import React, { useState, useEffect, useCallback } from 'react';
import {
    RefreshControl,
    ScrollView,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Goal = {
    target: number;
    achieved: number;
};

type DailyProgress = {
    day: number;
    water: Goal;
    miles: Goal;
    book: Goal;
};

const DEFAULT_GOALS: Goal = { target: 0, achieved: 0 };

export default function DailyGoals() {
    const [refreshing, setRefreshing] = useState(false);
    const [currentDay, setCurrentDay] = useState(1); // Track the current day (1-75)
    const [progress, setProgress] = useState<DailyProgress[]>([]);

    const DAYS_TO_TRACK = 75;

    // Default daily goals
    const dailyGoals: DailyProgress = {
        day: currentDay,
        water: { target: 2.7, achieved: 0 }, 
        miles: { target: 3, achieved: 0 }, 
        book: { target: 10, achieved: 0 }, 
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const storeData = async (key: string, value: DailyProgress[]): Promise<void> => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
            console.log(`Saved ${key}:`, value);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const retrieveData = async (key: string): Promise<DailyProgress[]> => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value) {
                console.log(`Retrieved ${key}:`, JSON.parse(value));
                return JSON.parse(value) as DailyProgress[];
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
        return [];
    };

    useEffect(() => {
        const fetchData = async () => {
            const savedProgress = await retrieveData('@DailyGoalsProgress');
            if (savedProgress.length) {
                setProgress(savedProgress);
            } else {
                // Initialize progress for 75 days
                const initialProgress = Array.from({ length: DAYS_TO_TRACK }, (_, i) => ({
                    day: i + 1,
                    water: { ...dailyGoals.water },
                    miles: { ...dailyGoals.miles },
                    book: { ...dailyGoals.book },
                }));
                setProgress(initialProgress);
                await storeData('@DailyGoalsProgress', initialProgress);
            }
        };
        fetchData();
    }, []);

    const updateGoalProgress = (goalType: keyof DailyProgress, value: number) => {
        setProgress((prev) =>
            prev.map((day) =>
                day.day === currentDay
                    ? {
                          ...day,
                          [goalType]: {
                              ...day[goalType],
                              achieved: Math.min(day[goalType].achieved + value, day[goalType].target),
                          },
                      }
                    : day
            )
        );
    };

    const saveProgress = async () => {
        await storeData('@DailyGoalsProgress', progress);
        console.log('Progress saved!');
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <Text style={styles.heading}>Day {currentDay} of {DAYS_TO_TRACK}</Text>

                    <View style={styles.gridContainer}>
                        <TouchableOpacity style={[styles.card, styles.waterCard]} onPress={() => updateGoalProgress('water', 0.5)}>
                            <Image source={require('../../assets/images/water.png')} style={styles.icon} />
                            <Text style={styles.cardText}>Water</Text>
                            <Text style={styles.cardProgress}>{progress[currentDay - 1]?.water.achieved || 0} / {dailyGoals.water.target} L</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.card, styles.milesCard]} onPress={() => updateGoalProgress('miles', 1)}>
                            <Image source={require('../../assets/images/run.png')} style={styles.icon} />
                            <Text style={styles.cardText}>Miles</Text>
                            <Text style={styles.cardProgress}>{progress[currentDay - 1]?.miles.achieved || 0} / {dailyGoals.miles.target} miles</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.card, styles.bookCard]} onPress={() => updateGoalProgress('book', 1)}>
                            <Image source={require('../../assets/images/book.png')} style={styles.icon} />
                            <Text style={styles.cardText}>Book</Text>
                            <Text style={styles.cardProgress}>{progress[currentDay - 1]?.book.achieved || 0} / {dailyGoals.book.target} pages</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.customButton}>
                    <TouchableOpacity
                            style={[styles.saveButton]}
                            onPress={saveProgress}
                        >
                            <Text style={styles.customButtonText}>Save Progress</Text>
                        </TouchableOpacity>
                        </View>

                    <View style={styles.navigationContainer}>
                        <TouchableOpacity
                            style={[styles.navButton, styles.prevButton]}
                            onPress={() => setCurrentDay((prev) => Math.max(prev - 1, 1))}
                        >
                            <Text style={styles.navButtonText}>◀ Previous Day</Text>
                        </TouchableOpacity>

                       

                        <TouchableOpacity
                            style={[styles.navButton, styles.nextButton]}
                            onPress={() => setCurrentDay((prev) => Math.min(prev + 1, DAYS_TO_TRACK))}
                        >
                            <Text style={styles.navButtonText}>Next Day ▶</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF5F7',
    },
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontFamily: 'CuteFont',
        color: '#FF69B4',
        marginVertical: 10,
        textAlign: 'center',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    card: {
        width: '40%',
        aspectRatio: 1,
        margin: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },
    waterCard: {
        backgroundColor: '#AEE2FF',
    },
    milesCard: {
        backgroundColor: '#FFC6FF',
    },
    bookCard: {
        backgroundColor: '#FFDAC1',
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    cardText: {
        fontSize: 16,
        fontFamily: 'CuteFont',
        color: '#333',
    },
    cardProgress: {
        fontSize: 14,
        fontFamily: 'Arial',
        color: '#555',
        marginTop: 5,
    },
    customButton: {
        backgroundColor: '#FF69B4',
        padding: 15,
        borderRadius: 30,
        marginVertical: 10,
        alignItems: 'center',
    },
    customButtonText: {
        fontSize: 18,
        fontFamily: 'CuteFont',
        color: '#FFF',
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
        width: '90%',
        alignSelf: 'center',
    },
    navButton: {
        backgroundColor: '#FFD700',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    prevButton: {
        marginRight: 10,
    },
    nextButton: {
        marginLeft: 10,
    },
    navButtonText: {
        fontSize: 14,
        fontFamily: 'CuteFont',
        color: '#333',
    },
    saveButton: {
        backgroundColor: '#FF69B4',
    },
});
