// src/screens/LoginScreen.tsx
import React, { useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { colors } from "../../theme/colors";

export default function LoginScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const scale = useRef(new Animated.Value(1)).current;
  const spinnerOpacity = useRef(new Animated.Value(0)).current;

  const buttonTextColor = useMemo(() => ({ color: colors.secondary }), []);

  const onLogin = () => {
    const trimmed = name.trim();
    const isDemoUser = trimmed.toLowerCase() === "student";

    // start loading animation
    setLoading(true);
    Animated.parallel([
      Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }),
      Animated.timing(spinnerOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Simulate short delay
    setTimeout(() => {
      if (isDemoUser) {
        // success → go to tabs
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
        setLoading(false);
        navigation.reset({ index: 0, routes: [{ name: "MainTabs" }] });
      } else {
        // failure → stop animation and show error
        Animated.parallel([
          Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
          Animated.timing(spinnerOpacity, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start();
        setLoading(false);
        Alert.alert(
          "Invalid credentials",
          'For this demo, use name "student" with any password.'
        );
      }
    }, 800);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 24,
            justifyContent: "center",
            gap: 24,
          }}
        >
          {/* Header */}
          <View style={{ alignItems: "center", gap: 8 }}>
            <Text style={{ color: colors.text, fontSize: 28, fontWeight: "700" }}>
              Welcome back
            </Text>
            <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
              Sign in to your School Agenda
            </Text>
          </View>

          {/* Form */}
          <View style={{ gap: 14 }}>
            <View
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.surfaceBorder,
                borderWidth: 1,
                borderRadius: 12,
                paddingHorizontal: 14,
                paddingVertical: 12,
              }}
            >
              <TextInput
                placeholder="Name"
                placeholderTextColor={colors.textSecondary}
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
                style={{ color: colors.text, fontSize: 16 }}
              />
            </View>

            <View
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.surfaceBorder,
                borderWidth: 1,
                borderRadius: 12,
                paddingHorizontal: 14,
                paddingVertical: 12,
              }}
            >
              <TextInput
                placeholder="Password"
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ color: colors.text, fontSize: 16 }}
              />
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}
            >
              <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
                Demo login: name = student
              </Text>
              <Text style={{ color: colors.info, fontSize: 12 }}>
                Forgot password?
              </Text>
            </View>
          </View>

          {/* Button */}
          <Animated.View
            style={{
              transform: [{ scale }],
              shadowColor: colors.black,
              shadowOpacity: 0.3,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 6 },
              elevation: 6,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              disabled={loading}
              onPress={onLogin}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 14,
                paddingVertical: 14,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                columnGap: 10,
              }}
            >
              {loading && (
                <Animated.View style={{ opacity: spinnerOpacity, marginRight: 8 }}>
                  <ActivityIndicator size="small" color={colors.secondary} />
                </Animated.View>
              )}
              <Text style={[{ fontSize: 16, fontWeight: "700" }, buttonTextColor]}>
                {loading ? "Signing in..." : "Login"}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Footer */}
          <View style={{ alignItems: "center", marginTop: 8 }}>
            <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
              By continuing you agree to our Terms & Privacy.
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
