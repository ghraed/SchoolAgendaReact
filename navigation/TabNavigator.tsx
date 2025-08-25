import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MarkScreen from '../src/features/marks/MarksScreen';
import { Ionicons } from '@expo/vector-icons';
import DutiesScreen from '../src/features/duties/DutiesScreen';
import CalendarScreen from '../src/features/calendar/CalendarScreen';
import ProfileScreen from '../src/features/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: { backgroundColor: '#121212' },
                tabBarIcon: ({ color, size }) => {
                    const iconMap: any = {
                        Duties: 'checkmark-circle-outline',
                        Calendar: 'calendar-outline',
                        Profile: 'person-outline',
                        Marks: 'bar-chart-outline',
                    };
                    return <Ionicons name={iconMap[route.name]} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'orange',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Duties" component={DutiesScreen} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="Marks" component={MarkScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

// Temporary placeholder for Profile and Marks
function DummyScreen() {
    return null;
}
