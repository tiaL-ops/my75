import React from 'react';
import { RefreshControl, ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import WaterTracker from '../checker/waterChecker';
import MileTracker from '../checker/milesChecker';
import BookTracker from '../checker/bookChecker';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DailyGoals() {
    const [refreshing, setRefreshing] = React.useState(false);
    const [waterGoal, setWaterGoal] = React.useState({ target: 0, achieved: 0 });
    const [mileGoal, setMileGoal] = React.useState({ target: 0, achieved: 0 });
    const [bookGoal, setBookGoal] = React.useState({ target: 0, achieved: 0 });

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const _storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const _retrieveData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    };

    React.useEffect(() => {
        const fetchData = async () => {
            const water = await _retrieveData('@WaterGoal');
            const mile = await _retrieveData('@MileGoal');
            const book = await _retrieveData('@BookGoal');
            setWaterGoal(water || { target: 0, achieved: 0 });
            setMileGoal(mile || { target: 0, achieved: 0 });
            setBookGoal(book || { target: 0, achieved: 0 });
        };
        fetchData();
    }, []);

    const saveWaterGoal = async () => {
        const newGoal = { target: 8, achieved: 3 };
        setWaterGoal(newGoal);
        await _storeData('@WaterGoal', newGoal);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <WaterTracker goal={waterGoal} />
                    <MileTracker goal={mileGoal} />
                    <BookTracker goal={bookGoal} />
                    <Button title="Save Water Goal" onPress={saveWaterGoal} />
                    <Text>Pull down to see RefreshControl indicator</Text>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
