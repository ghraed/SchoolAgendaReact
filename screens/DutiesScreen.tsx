import React, { useState } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { colors } from '../src/theme/colors';
const data = [
    {
        subject: 'Mathematics',
        duties: ['Complete exercises', 'Review notes'],
    },
    {
        subject: 'English',
        duties: ['Read chapter', 'Write essay'],
    },
    {
        subject: 'History',
        duties: ['Study for test', 'Research topic'],
    },
    {
        subject: 'Biology',
        duties: ['Finish lab report', 'Revise diagrams'],
    },
];

export default function DutiesScreen() {
    const [checked, setChecked] = useState<{ [key: string]: boolean }>({});

    const toggleDuty = (subject: string, duty: string) => {
        const key = `${subject}-${duty}`;
        setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg, paddingHorizontal: 16 }}>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 16, marginTop: 8 }}>
                Today's Duties
            </Text>

            <ScrollView style={{ flex: 1 }}>
                {data.map((item, idx) => (
                    <View
                        key={idx}
                        style={{
                            backgroundColor: colors.black,
                            padding: 16,
                            borderRadius: 12,
                            marginBottom: 16,
                        }}
                    >
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
                            {item.subject}
                        </Text>
                        {item.duties.map((duty, index) => {
                            const key = `${item.subject}-${duty}`;
                            const isChecked = checked[key] || false;

                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
                                    onPress={() => toggleDuty(item.subject, duty)}
                                    activeOpacity={0.7}
                                >
                                    <Checkbox
                                        value={isChecked}
                                        onValueChange={() => toggleDuty(item.subject, duty)}
                                        color={isChecked ? colors.primary : undefined}
                                        style={{ marginRight: 10 }}
                                    />
                                    <Text style={{ color: 'white' }}>{duty}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
    Duties: 'checkmark-circle-outline',
    Calendar: 'calendar-outline',
    Profile: 'person-outline',
    Marks: 'bar-chart-outline',
};
