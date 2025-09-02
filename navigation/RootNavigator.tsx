// navigation/RootNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../src/features/auth/LoginScreen";
import TabNavigator from "./TabNavigator";                 // student tabs
import TabNavigatorTeacher, { TeacherTabParamList } from "./TabNavigatorTeacher";

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  TeacherMainTabs:
  | { screen?: keyof TeacherTabParamList }               // allow deep target tab
  | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="TeacherMainTabs" component={TabNavigatorTeacher} />
    </Stack.Navigator>
  );
}
