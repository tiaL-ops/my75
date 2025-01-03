import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from 'react-native';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF69B4', 
        tabBarInactiveTintColor: '#C0C0C0', 
        tabBarStyle: {
          backgroundColor: '#FFF5F8', 
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Arial',
          fontWeight: 'bold',
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        headerStyle: {
          backgroundColor: '#FFB6C1', // Light pink header
        },
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'Arial',
          fontWeight: 'bold',
          color: '#fff',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              color={color}
              size={30}
              style={{
                shadowColor: '#FFD700', 
                shadowOpacity: 0.8,
                shadowRadius: 5,
                shadowOffset: { width: 0, height: 2 },
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused
                  ? 'information-circle'
                  : 'information-circle-outline'
              }
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="dailyGoal"
        options={{
          title: 'Today',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'calendar' : 'calendar-outline'}
              color={color}
              size={30}
            />
          ),
          tabBarBadge: () => (
            <Text
              style={{
                backgroundColor: '#FFD700',
                color: '#fff',
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 'bold',
              }}
            >
              75
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
