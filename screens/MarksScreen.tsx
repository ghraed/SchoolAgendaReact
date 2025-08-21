import React, { useMemo } from "react";
import { View, Text, ScrollView, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from '../src/theme/colors';

type SemesterKey = "First" | "Middle" | "Last";
type SubjectKey = "Arabic" | "English" | "Math" | "Physics" | "Chemistry" | "Biology";

type Grades = Record<SubjectKey, number>;
type Data = Record<SemesterKey, Grades>;

const SUBJECTS: SubjectKey[] = ["Arabic", "English", "Math", "Physics", "Chemistry", "Biology"];

// Dummy data (feel free to tweak)
const DEMO: Data = {
  First: { Math: 100, Arabic: 72, English: 66, Physics: 61, Chemistry: 70, Biology: 74 },
  Middle: { Math: 95, Arabic: 81, English: 73, Physics: 69, Chemistry: 77, Biology: 80 },
  Last: { Math: 98, Arabic: 10, English: 9, Physics: 55, Chemistry: 63, Biology: 68 },
};

const PASS_RULE = {
  minAvg: 60,
  minPerSubject: 50,
};

function sum(grades: Grades) {
  return SUBJECTS.reduce((acc, s) => acc + (grades[s] ?? 0), 0);
}

function average(grades: Grades) {
  return Math.round((sum(grades) / SUBJECTS.length) * 10) / 10; // 1 decimal
}

function isPass(grades: Grades) {
  const avg = average(grades);
  const allAboveMin = SUBJECTS.every((s) => grades[s] >= PASS_RULE.minPerSubject);
  return avg >= PASS_RULE.minAvg && allAboveMin;
}

function Bar({ value }: { value: number }) {
  // value from 0..100
  return (
    <View style={styles.barTrack}>
      <View style={[styles.barFill, { width: `${Math.min(Math.max(value, 0), 100)}%` }]} />
    </View>
  );
}

function Badge({ text, type }: { text: string; type: "pass" | "fail" | "info" }) {
  return (
    <View
      style={[
        styles.badge,
        type === "pass" && styles.badgePass,
        type === "fail" && styles.badgeFail,
        type === "info" && styles.badgeInfo,
      ]}
    >
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
}

export default function MarksScreen() {
  const insets = useSafeAreaInsets();
  const totals = useMemo(() => {
    const t: Record<SemesterKey, number> = { First: 0, Middle: 0, Last: 0 };
    (Object.keys(DEMO) as SemesterKey[]).forEach((k) => (t[k] = sum(DEMO[k])));
    return t;
  }, []);

  const avgs = useMemo(() => {
    const a: Record<SemesterKey, number> = { First: 0, Middle: 0, Last: 0 };
    (Object.keys(DEMO) as SemesterKey[]).forEach((k) => (a[k] = average(DEMO[k])));
    return a;
  }, []);

  // Overall (optional)
  const overallAvg = useMemo(() => {
    const all: Grades = {
      Arabic: Math.round((DEMO.First.Arabic + DEMO.Middle.Arabic + DEMO.Last.Arabic) / 3),
      English: Math.round((DEMO.First.English + DEMO.Middle.English + DEMO.Last.English) / 3),
      Math: Math.round((DEMO.First.Math + DEMO.Middle.Math + DEMO.Last.Math) / 3),
      Physics: Math.round((DEMO.First.Physics + DEMO.Middle.Physics + DEMO.Last.Physics) / 3),
      Chemistry: Math.round((DEMO.First.Chemistry + DEMO.Middle.Chemistry + DEMO.Last.Chemistry) / 3),
      Biology: Math.round((DEMO.First.Biology + DEMO.Middle.Biology + DEMO.Last.Biology) / 3),
    };
    return average(all);
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      {/* Solid, non-translucent status bar matching header bg */}
      <StatusBar barStyle="light-content" backgroundColor={colors.secondary} translucent={false} />

      <View style={[styles.headerWrap, { paddingTop: insets.top }]}>
        <View style={styles.topHeader}>
          <Text style={styles.title}>Marks</Text>
          <View style={styles.avgChip}>
            <Text style={styles.avgChipText}>Overall Avg: {overallAvg}</Text>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Sections */}
        <SemesterCard
          name="First"
          grades={DEMO.First}
          total={totals.First}
          avg={avgs.First}
          pass={isPass(DEMO.First)}
        />
        <SemesterCard
          name="Middle"
          grades={DEMO.Middle}
          total={totals.Middle}
          avg={avgs.Middle}
          pass={isPass(DEMO.Middle)}
        />
        <SemesterCard
          name="Last"
          grades={DEMO.Last}
          total={totals.Last}
          avg={avgs.Last}
          pass={isPass(DEMO.Last)}
        />

        <View style={{ height: 16 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function SemesterCard({
  name,
  grades,
  total,
  avg,
  pass,
}: {
  name: SemesterKey;
  grades: Grades;
  total: number;
  avg: number;
  pass: boolean;
}) {
  const totalOutOf = SUBJECTS.length * 100;

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{name} Semester</Text>
        <Badge text={pass ? "Passed" : "Failed"} type={pass ? "pass" : "fail"} />
      </View>

      {/* Table header */}
      <View style={[styles.row, styles.rowHeader]}>
        <Text style={[styles.colSubject, styles.headerText]}>Subject</Text>
        <Text style={[styles.colMark, styles.headerText]}>Mark</Text>
      </View>

      {/* Subject rows */}
      {SUBJECTS.map((s) => (
        <View key={s} style={styles.row}>
          <Text style={styles.colSubject}>{s}</Text>
          <View style={styles.colMark}>
            <Text style={styles.markText}>{grades[s]}/100</Text>
            <Bar value={grades[s]} />
          </View>
        </View>
      ))}

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={styles.summaryValue}>
            {total} / {totalOutOf}
          </Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Average</Text>
          <Text style={styles.summaryValue}>{avg}</Text>
        </View>
      </View>

      {/* Rule hint */}
      <Text style={styles.ruleHint}>
        Rule: average ≥ {PASS_RULE.minAvg} and no subject &lt; {PASS_RULE.minPerSubject}.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.secondary },
  headerWrap: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  avgChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.info,
  },
  avgChipText: { color: colors.secondary, fontWeight: "800", fontSize: 12 },

  container: {
    padding: 16,
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: { color: colors.white, fontSize: 22, fontWeight: "800", letterSpacing: 0.4 },

  card: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: { color: colors.white, fontSize: 16, fontWeight: "800" },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 12,
  },
  rowHeader: {
    paddingTop: 4,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceBorder,
  },
  headerText: { color: colors.textSecondary, fontWeight: "700", fontSize: 12 },

  colSubject: { flex: 1.1, color: colors.white, fontSize: 14, fontWeight: "600" },
  colMark: { flex: 1, gap: 6 },
  markText: { color: colors.white, fontWeight: "700" },

  barTrack: {
    height: 6,
    backgroundColor: colors.surfaceTrack,
    borderRadius: 999,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: colors.primary, // accent (matches your tab highlight vibe)
  },

  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
    marginBottom: 4,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: colors.surfaceBorder,
    padding: 10,
    borderRadius: 14,
  },
  summaryLabel: { color: colors.textSecondary, fontWeight: "700", fontSize: 12 },
  summaryValue: { color: colors.white, fontWeight: "800", fontSize: 16, marginTop: 2 },

  ruleHint: { marginTop: 6, color: colors.textSecondary, fontSize: 11 },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  badgeText: { color: colors.secondary, fontWeight: "800", fontSize: 12 },
  badgePass: { backgroundColor: colors.success, borderColor: colors.success },
  badgeFail: { backgroundColor: colors.danger, borderColor: colors.danger },
  badgeInfo: { backgroundColor: colors.info, borderColor: colors.info },
});