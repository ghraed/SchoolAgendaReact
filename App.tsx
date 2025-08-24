import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import StudentHomeScreen from './src/screens/student/StudentHomeScreen'; // your existing "old layout"
import TeacherHomeScreen from './src/screens/teacher/TeacherHomeScreen'; // new layout
import colors from './src/theme/colors';

export type RootStackParamList = {
  Login: undefined;
  StudentStack: undefined;
  TeacherStack: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const StudentStackNav = createNativeStackNavigator();
const TeacherStackNav = createNativeStackNavigator();

function StudentStack() {
  return (
    <StudentStackNav.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.onPrimary,
      }}
    >
      <StudentStackNav.Screen
        name="StudentHome"
        component={StudentHomeScreen}
        options={{ title: 'Student' }}
      />
      {/* add the rest of your “old layout” student screens here */}
    </StudentStackNav.Navigator>
  );
}

function TeacherStack() {
  return (
    <TeacherStackNav.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.onPrimary,
      }}
    >
      <TeacherStackNav.Screen
        name="TeacherHome"
        component={TeacherHomeScreen}
        options={{ title: 'Teacher' }}
      />
      {/* add teacher-only pages here */}
    </TeacherStackNav.Navigator>
  );
}

function Router() {
  const { user } = useAuth();

  if (!user) {
    // not logged in: only login screen
    return (
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Login" component={LoginScreen} />
      </RootStack.Navigator>
    );
  }

  // role-based routing (hard separation)
  if (user.role === 'student') {
    return (
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="StudentStack" component={StudentStack} />
      </RootStack.Navigator>
    );
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="TeacherStack" component={TeacherStack} />
    </RootStack.Navigator>
  );
}

export default function App() {
  const scheme = useColorScheme();

  const ThemedNav = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
      card: colors.card,
      primary: colors.primary,
      text: colors.text,
      border: colors.border,
      notification: colors.accent,
    },
  };

  return (
    <AuthProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : ThemedNav}>
        <Router />
      </NavigationContainer>
    </AuthProvider>
  );
}
