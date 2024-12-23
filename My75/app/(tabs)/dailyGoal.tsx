//@refresh reset
import React from 'react';
import { RefreshControl, ScrollView, View, Text, StyleSheet } from 'react-native';
import WaterTracker from '../checker/waterChecker';
import MileTracker from '../checker/milesChecker';
import BookTracker from '../checker/bookChecker';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

//@refresh reset
export default function DailyGoals() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <WaterTracker />
          <MileTracker />
          <BookTracker />
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
