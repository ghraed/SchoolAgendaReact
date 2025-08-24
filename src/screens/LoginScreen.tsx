import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Easing,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors'; // make sure this default-exports an object

export default function LoginScreen() {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // button width animation
  const animWidth = useRef(new Animated.Value(1)).current; // 1 = full width, 0 = shrunk

  const handleLogin = async () => {
    setErr(null);
    setLoading(true);
    Animated.timing(animWidth, {
      toValue: 0,
      duration: 280,
      useNativeDriver: false,
      easing: Easing.out(Easing.quad),
    }).start();

    try {
      await login(name, password);
    } catch (e: any) {
      setErr(e.message ?? 'Login failed');
      setLoading(false);
      Animated.timing(animWidth, {
        toValue: 1,
        duration: 240,
        useNativeDriver: false,
        easing: Easing.out(Easing.quad),
      }).start();
    }
  };

  const btnWidth = animWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [56, 1], // 56 when loading (circle), 100% when idle
  });

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Welcome 👋</Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>
            Sign in to continue
          </Text>
        </View>

        <View style={styles.form}>
          <View style={[styles.inputWrap, { borderColor: colors.border, backgroundColor: colors.card }]}>
            <Ionicons name="person-outline" size={18} color={colors.muted} />
            <TextInput
              placeholder="Name (student or teacher)"
              placeholderTextColor={colors.muted}
              value={name}
              onChangeText={setName}
              autoCapitalize="none"
              style={[styles.input, { color: colors.text }]}
              returnKeyType="next"
            />
          </View>

          <View style={[styles.inputWrap, { borderColor: colors.border, backgroundColor: colors.card }]}>
            <Ionicons name="lock-closed-outline" size={18} color={colors.muted} />
            <TextInput
              placeholder="Password"
              placeholderTextColor={colors.muted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={[styles.input, { color: colors.text }]}
              returnKeyType="done"
            />
          </View>

          {err ? (
            <Text style={[styles.error, { color: colors.danger }]}>{err}</Text>
          ) : null}

          <Animated.View style={{ width: '100%' }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleLogin}
              disabled={loading || !name || !password}
            >
              <Animated.View
                style={[
                  styles.button,
                  {
                    backgroundColor: colors.primary,
                    width: btnWidth as any,
                    alignSelf: 'stretch',
                  },
                ]}
              >
                {loading ? (
                  <ActivityIndicator size="small" color={colors.onPrimary} />
                ) : (
                  <Text style={[styles.btnText, { color: colors.onPrimary }]}>Login</Text>
                )}
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.hintBox}>
            <Text style={{ color: colors.muted, fontSize: 12, textAlign: 'center' }}>
              Tip: use <Text style={{ fontWeight: 'bold' }}>student</Text> or <Text style={{ fontWeight: 'bold' }}>teacher</Text> as the name.
              Password for both is <Text style={{ fontWeight: 'bold' }}>'password'</Text>.
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 20, justifyContent: 'center' },
  header: { marginBottom: 28, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 14, marginTop: 6 },
  form: { width: '100%', gap: 14 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
  },
  input: { flex: 1, fontSize: 16 },
  error: { marginTop: 6 },
  button: {
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  btnText: { fontSize: 16, fontWeight: '700' },
  hintBox: { marginTop: 8 },
});
