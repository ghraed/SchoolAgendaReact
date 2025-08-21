import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, StatusBar } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

import { colors } from "../src/theme/colors";

const student = {
  name: "Valentino C",
  standard: "I Std",
  section: "A",
  gender: "Male",
  dob: "03 November 2012",
  blood: "A+",
  dayScholar: "Yes",
  busNo: "4",
  // fees
  totalFees: 1500,
  paid: 900,
};

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [avatarUri, setAvatarUri] = useState<string | null>("https://static.vecteezy.com/system/resources/previews/054/720/352/non_2x/student-3d-icon-for-education-projects-on-transparent-background-png.png");

  const remaining = Math.max(student.totalFees - student.paid, 0);

  const pickImage = async () => {
    // Ask permission on demand
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });

    if (!result.canceled) setAvatarUri(result.assets[0].uri);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} translucent={false} />
      {/* Top spacer so the avatar can overlap the card nicely */}
      <View style={{ height: insets.top,  }} />

      {/* Avatar */}
      <View style={styles.hero}>
        <Pressable onPress={pickImage} style={styles.avatarWrap}>
          <Image
            source={avatarUri ? { uri: avatarUri } : require("../assets/avatar.png")}
            style={styles.avatar}
          />
          <View style={styles.changeBadge}>
            <Text style={styles.changeText}>Change</Text>
          </View>
        </Pressable>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Student's Information</Text>

        <View style={styles.table}>
          <InfoRow label="Name" value={student.name} />
          <InfoRow label="Standard" value={student.standard} />
          <InfoRow label="Section" value={`'${student.section}'`} />
          <InfoRow label="Gender" value={student.gender} />
          <InfoRow label="Date of Birth" value={student.dob} />
          <InfoRow label="Blood Group" value={student.blood} />
          <InfoRow label="Is Day Scholar" value={student.dayScholar} />
          <InfoRow label="Bus No." value={student.busNo} />
        </View>

        {/* Fees block */}
        <View style={styles.feesRow}>
          <View style={styles.feesBox}>
            <Text style={styles.feesLabel}>Total Fees</Text>
            <Text style={styles.feesValue}>${student.totalFees}</Text>
          </View>
          <View style={styles.feesBox}>
            <Text style={styles.feesLabel}>Paid</Text>
            <Text style={styles.feesValue}>${student.paid}</Text>
          </View>
          <View style={[styles.feesBox, { borderColor: colors.primary }]}>
            <Text style={styles.feesLabel}>Remaining</Text>
            <Text style={[styles.feesValue, { color: colors.primary }]}>${remaining}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={rowStyles.row}>
      <Text style={rowStyles.label}>{label}</Text>
      <Text style={rowStyles.value}>{String(value)}</Text>
    </View>
  );
}

const AVATAR_SIZE = 120;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.secondary },
  hero: {
    alignItems: "center",
    marginTop: 12,
    // This margin ensures the avatar will overlap the card but not hide text inside it
    marginBottom: -(AVATAR_SIZE / 2),
  },
  avatarWrap: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: "#1a2335",
    overflow: "hidden",

    // Shadow
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: AVATAR_SIZE / 2,
  },
  changeBadge: {
    position: "absolute",
    bottom: 6,
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: colors.info,
  },
  changeText: {
    color: colors.bg,
    fontWeight: "800",
    fontSize: 12,
  },

  card: {
    marginHorizontal: 16,
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    padding: 16,
    paddingTop: 16 + AVATAR_SIZE / 2, // space so the overlapping avatar doesn't cover text
  },
  cardTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
  },
  table: {
    borderTopWidth: 1,
    borderTopColor: colors.info,
    marginTop: 4,
  },

  feesRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  feesBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: "rgba(255,255,0,0.06)",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  feesLabel: { color: colors.text, fontWeight: "700", fontSize: 12 },
  feesValue: { color: colors.text, fontWeight: "800", fontSize: 16, marginTop: 2 },
});

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceBorder,
  },
  label: { flex: 1, color: colors.text, fontWeight: "700", fontSize: 13 },
  value: { flex: 1, color: colors.text, fontWeight: "700", fontSize: 14, textAlign: "right" },
});


// const COLORS = {
//   bg: "#0b1220",
//   card: "rgba(255,255,255,0.04)",
//   cardBorder: "rgba(255,255,255,0.06)",
//   text: "#ffffff",
//   muted: "#b9c2d3",
//   accent: "#f2a900",
//   chip: "#7cc4ff",
// };