import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { colors } from '../../theme/colors';

export default function TeacherHomeScreen() {
    const { logout } = useAuth();
    return (
        <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <Text style={[styles.title, { color: colors.text }]}>Teacher Dashboard</Text>
            <Text style={{ color: colors.success, marginTop: 8 }}>
                (New layout – teacher-only access)
            </Text>
            <TouchableOpacity onPress={logout} style={[styles.btn, { backgroundColor: colors.danger }]}>
                <Text style={{ color: colors.primary, fontWeight: '700' }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 22, fontWeight: '800' },
    btn: { marginTop: 24, paddingHorizontal: 16, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
});
