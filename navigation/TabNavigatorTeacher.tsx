// navigation/TabNavigatorTeacher.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../src/theme/colors";

import CreateDutiesScreen from "../src/features/teacher/createDuties/CreateDutiesScreen";
import TeacherCalendarScreen from "../src/features/teacher/calendar/TeacherCalendarScreen";
import TeacherMarksScreen from "../src/features/teacher/marks/TeacherMarksScreen";
import TeacherProfileScreen from "../src/features/teacher/profile/TeacherProfileScreen";

export type TeacherTabParamList = {
  Duties: undefined;
  Calendar: undefined;
  Marks: undefined;
  Profile: undefined;
};
const Tab = createBottomTabNavigator<TeacherTabParamList>();

export default function TabNavigatorTeacher() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.secondary },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarIcon: ({ color, size }) => {
          const iconMap: Record<keyof TeacherTabParamList, keyof typeof Ionicons.glyphMap> = {
            Duties: "create-outline",
            Calendar: "calendar-outline",
            Marks: "bar-chart-outline",
            Profile: "person-outline",
          };
          return <Ionicons name={iconMap[route.name as keyof TeacherTabParamList]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Duties" component={CreateDutiesScreen} />
      <Tab.Screen name="Calendar" component={TeacherCalendarScreen} />
      <Tab.Screen name="Marks" component={TeacherMarksScreen} />
      <Tab.Screen name="Profile" component={TeacherProfileScreen} />
    </Tab.Navigator>
  );
}
