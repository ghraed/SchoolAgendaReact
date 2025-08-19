import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const getDaysInMonth = (month: number, year: number) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

export default function CalendarScreen() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const days = getDaysInMonth(currentMonth, currentYear);
  const firstDayIndex = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7; // Monday as start

  const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const onDayPress = (date: Date) => {
    const dayName = date.toLocaleString('en-US', { weekday: 'short' });
    const formatted = `${dayName}, ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    Alert.alert(formatted);
  };

  const calendarCells = (() => {
    const leadingEmpty = Array(firstDayIndex).fill(null);
    const full = [...leadingEmpty, ...days];
    const remaining = 7 - (full.length % 7 || 7); // pad to full week
    return [...full, ...Array(remaining).fill(null)];
  })();

  const totalRows = Math.ceil(calendarCells.length / 7);
  const screenHeight = Dimensions.get('window').height;
  const headerHeight = 100; // Header + weekdays
  const cellHeight = (screenHeight - headerHeight) / totalRows;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' }}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Ionicons name="chevron-back" size={24} color="orange" />
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
          {monthName} {currentYear}
        </Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Ionicons name="chevron-forward" size={24} color="orange" />
        </TouchableOpacity>
      </View>

      {/* Weekday Headers */}
      <View style={{ flexDirection: 'row', paddingHorizontal: 8 }}>
        {weekDays.map((day) => (
          <View key={day} style={{ flex: 1, alignItems: 'center', paddingVertical: 8 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{day}</Text>
          </View>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          flex: 1,
        }}
      >
        {calendarCells.map((item, index) => {
          const dayOfWeek = index % 7;
          const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;
          const backgroundColor = isWeekend ? '#333' : '#000';
          const textColor = isWeekend ? '#777' : 'white';

          return (
            <TouchableOpacity
              key={index}
              onPress={() => !isWeekend && item && onDayPress(item)}
              disabled={isWeekend || !item}
              style={{
                width: `${100 / 7}%`,
                height: `${100 / totalRows}%`,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor,
                borderWidth: 0.5,
                borderColor: '#222',
              }}
            >
              <Text style={{ color: textColor }}>
                {item ? item.getDate() : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
