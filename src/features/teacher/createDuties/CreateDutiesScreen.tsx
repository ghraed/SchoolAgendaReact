import React, { useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../theme/colors";

type DutyItem = {
  id: string;
  title: string;
  description?: string;
};

const CLASS_OPTIONS = ["Grade 7", "Grade 8", "Grade 9"];
const SUBJECT_OPTIONS = ["Math", "Phy"];

export default function CreateDutiesScreen() {
  const [selectedClass, setSelectedClass] = useState<string | null>(CLASS_OPTIONS[0]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(SUBJECT_OPTIONS[0]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [items, setItems] = useState<DutyItem[]>([]);

  const [openClassModal, setOpenClassModal] = useState(false);
  const [openSubjectModal, setOpenSubjectModal] = useState(false);

  const [publishing, setPublishing] = useState(false);
  const addScale = useRef(new Animated.Value(1)).current;

  const disabledAdd = useMemo(() => !title.trim(), [title]);

  const handleAdd = () => {
    if (disabledAdd) return;

    Animated.sequence([
      Animated.spring(addScale, { toValue: 0.98, useNativeDriver: true }),
      Animated.spring(addScale, { toValue: 1, useNativeDriver: true }),
    ]).start();

    const newItem: DutyItem = {
      id: Math.random().toString(36).slice(2),
      title: title.trim(),
      description: desc.trim() || undefined,
    };
    setItems((prev) => [newItem, ...prev]);
    setTitle("");
    setDesc("");
  };

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handlePublish = () => {
    if (!selectedClass || !selectedSubject || items.length === 0) {
      Alert.alert("Missing info", "Please choose a class & subject and add at least one duty.");
      return;
    }
    setPublishing(true);

    // simulate submit
    setTimeout(() => {
      setPublishing(false);
      Alert.alert(
        "Duties published",
        `${selectedSubject} — ${selectedClass}\n\n• ${items.map((i) => i.title).join("\n• ")}`
      );
      setItems([]);
    }, 900);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: "padding", android: undefined })}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 28 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={{ paddingVertical: 10, alignItems: "center" }}>
            <Text style={{ color: colors.text, fontSize: 22, fontWeight: "700" }}>
              Create Duties
            </Text>
            <Text style={{ color: colors.textSecondary, marginTop: 4, fontSize: 12 }}>
              Assign duties with clear bullet points and descriptions
            </Text>
          </View>

          {/* Selectors */}
          <View style={{ flexDirection: "row", gap: 12, marginTop: 8 }}>
            <SelectField
              label="Class"
              value={selectedClass ?? "Select class"}
              onPress={() => setOpenClassModal(true)}
            />
            <SelectField
              label="Subject"
              value={selectedSubject ?? "Select subject"}
              onPress={() => setOpenSubjectModal(true)}
            />
          </View>

          {/* Add duty card */}
          <View
            style={{
              marginTop: 16,
              backgroundColor: colors.surface,
              borderColor: colors.surfaceBorder,
              borderWidth: 1,
              borderRadius: 14,
              padding: 14,
            }}
          >
            <Text style={{ color: colors.textSecondary, marginBottom: 6, fontSize: 12 }}>
              Duty point (required)
            </Text>
            <TextInput
              placeholder="e.g., Solve exercises 1–10 from chapter 3"
              placeholderTextColor={colors.textSecondary}
              value={title}
              onChangeText={setTitle}
              style={{
                color: colors.text,
                fontSize: 16,
                paddingVertical: 10,
                borderRadius: 10,
              }}
            />

            <Text style={{ color: colors.textSecondary, marginTop: 12, marginBottom: 6, fontSize: 12 }}>
              Description (optional)
            </Text>
            <TextInput
              placeholder="Extra context for students…"
              placeholderTextColor={colors.textSecondary}
              value={desc}
              onChangeText={setDesc}
              multiline
              style={{
                color: colors.text,
                fontSize: 15,
                paddingVertical: 10,
                minHeight: 80,
                textAlignVertical: "top",
                borderRadius: 10,
              }}
            />

            <Animated.View style={{ transform: [{ scale: addScale }], marginTop: 12 }}>
              <TouchableOpacity
                onPress={handleAdd}
                disabled={disabledAdd}
                style={{
                  backgroundColor: disabledAdd ? colors.surfaceTrack : colors.primary,
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 8,
                }}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={20}
                  color={disabledAdd ? colors.textSecondary : colors.secondary}
                />
                <Text
                  style={{
                    color: disabledAdd ? colors.textSecondary : colors.secondary,
                    fontWeight: "700",
                  }}
                >
                  Add duty
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* List of duties */}
          <View style={{ marginTop: 18, gap: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ color: colors.text, fontSize: 16, fontWeight: "700" }}>
                Bullet points ({items.length})
              </Text>
              {items.length > 0 && (
                <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
                  Tap bin to remove
                </Text>
              )}
            </View>

            {items.length === 0 ? (
              <EmptyState
                title="No duties yet"
                subtitle="Add bullet points above. Each can include a description."
              />
            ) : (
              items.map((it) => (
                <View
                  key={it.id}
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: colors.surfaceBorder,
                    borderWidth: 1,
                    borderRadius: 12,
                    padding: 12,
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <Text style={{ color: colors.primary, fontSize: 18, marginTop: 2 }}>•</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: colors.text, fontSize: 15, fontWeight: "600" }}>
                      {it.title}
                    </Text>
                    {!!it.description && (
                      <Text style={{ color: colors.textSecondary, marginTop: 4, fontSize: 13 }}>
                        {it.description}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity onPress={() => handleRemove(it.id)} hitSlop={10}>
                    <Ionicons name="trash-outline" size={20} color={colors.danger} />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>

          {/* Publish button */}
          <View style={{ height: 18 }} />
          <TouchableOpacity
            onPress={handlePublish}
            disabled={publishing}
            style={{
              backgroundColor: colors.primary,
              borderRadius: 14,
              paddingVertical: 14,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 10,
              shadowColor: colors.black,
              shadowOpacity: 0.3,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 6 },
              elevation: 6,
              marginBottom: 28,
            }}
          >
            {publishing && <ActivityIndicator size="small" color={colors.secondary} />}
            <Text
              style={{
                color: colors.secondary,
                fontSize: 16,
                fontWeight: "700",
                marginLeft: publishing ? 8 : 0,
              }}
            >
              {publishing ? "Publishing…" : "Publish duties"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Class modal */}
      <PickerModal
        visible={openClassModal}
        title="Select Class"
        options={CLASS_OPTIONS}
        selected={selectedClass}
        onClose={() => setOpenClassModal(false)}
        onSelect={(val) => {
          setSelectedClass(val);
          setOpenClassModal(false);
        }}
      />

      {/* Subject modal */}
      <PickerModal
        visible={openSubjectModal}
        title="Select Subject"
        options={SUBJECT_OPTIONS}
        selected={selectedSubject}
        onClose={() => setOpenSubjectModal(false)}
        onSelect={(val) => {
          setSelectedSubject(val);
          setOpenSubjectModal(false);
        }}
      />
    </SafeAreaView>
  );
}

/* ---------- Tiny shared bits (local to this file) ---------- */

function SelectField({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        backgroundColor: colors.surface,
        borderColor: colors.surfaceBorder,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 12,
      }}
    >
      <Text style={{ color: colors.textSecondary, fontSize: 12, marginBottom: 4 }}>{label}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ color: colors.text, fontSize: 15 }}>{value}</Text>
        <Ionicons name="chevron-down" size={18} color={colors.textSecondary} />
      </View>
    </Pressable>
  );
}

function PickerModal({
  visible,
  title,
  options,
  selected,
  onClose,
  onSelect,
}: {
  visible: boolean;
  title: string;
  options: string[];
  selected: string | null;
  onClose: () => void;
  onSelect: (val: string) => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.6)",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={{
            width: "100%",
            maxWidth: 480,
            backgroundColor: colors.secondary,
            borderRadius: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.surfaceBorder,
          }}
        >
          <Text style={{ color: colors.text, fontSize: 16, fontWeight: "700", marginBottom: 10 }}>
            {title}
          </Text>
          {options.map((opt) => {
            const active = selected === opt;
            return (
              <Pressable
                key={opt}
                onPress={() => onSelect(opt)}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 8,
                  borderRadius: 10,
                  backgroundColor: active ? colors.surfaceTrack : "transparent",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <Text style={{ color: colors.text, fontSize: 15 }}>{opt}</Text>
                {active && <Ionicons name="checkmark" size={18} color={colors.primary} />}
              </Pressable>
            );
          })}
          <TouchableOpacity
            onPress={onClose}
            style={{
              marginTop: 8,
              alignSelf: "flex-end",
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 10,
              backgroundColor: colors.surface,
              borderColor: colors.surfaceBorder,
              borderWidth: 1,
            }}
          >
            <Text style={{ color: colors.text }}>Close</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function EmptyState({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.surfaceBorder,
        borderWidth: 1,
        borderRadius: 14,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ionicons name="list-outline" size={28} color={colors.textSecondary} />
      <Text style={{ color: colors.text, marginTop: 8, fontWeight: "700" }}>{title}</Text>
      {!!subtitle && (
        <Text style={{ color: colors.textSecondary, textAlign: "center", marginTop: 4, fontSize: 12 }}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}
