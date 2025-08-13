import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  TextInput,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const FREQUENCIES = [
  {
    id: "1",
    label: "Once daily",
    icon: "sunny-outline" as const,
    times: ["09:00"],
  },
  {
    id: "2",
    label: "Twice daily",
    icon: "sync-outline" as const,
    times: ["09:00", "21:00"],
  },
  { id: "5", label: "As needed", icon: "calendar-outline" as const, times: [] },
  {
    id: "3",
    label: "Three times daily",
    icon: "time-outline" as const,
    times: ["09:00", "15:00", "21:00"],
  },
  {
    id: "4",
    label: "Four times daily",
    icon: "repeat-outline" as const,
    times: ["09:00", "13:00", "17:00", "21:00"],
  },
];

const DURATIONS = [
  { id: "1", label: "7 days", value: 7 },
  { id: "2", label: "14 days", value: 14 },
  { id: "3", label: "30 days", value: 30 },
  { id: "4", label: "90 days", value: 90 },
  { id: "5", label: "Ongoing", value: -1 },
];

export default function AddMedicationScreen() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [form, setForm] = useState({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
    startDate: new Date(),
    times: ["09:00"],
    notes: "",
    reminderEnabled: true,
    refillReminder: false,
    currentSupply: "",
    refillAt: "",
  });

  const router = useRouter();

  const renderFrequencyOptions = () => {
    return (
      <View className="flex-row flex-wrap mx-[-5px]">
        {FREQUENCIES.map((freq) => (
          <TouchableOpacity
            key={freq.id}
            className={`w-[calc((100%-60px)/2)] bg-white rounded-2xl p-[15px] m-[5px] items-center border border-[#e0e0e0] shadow-sm elevation-[2] ${selectedFrequency === freq.label && "bg-green-700 border-green-400"}`}
            onPress={() => {
              setSelectedFrequency(freq.label);
            }}
          >
            <View
              className={`w-[50px] h-[50px] rounded-[25px] bg-[#f5f5f5] justify-center items-center mb-[10px] ${selectedFrequency === freq.label && "bg-[#ffffff33]"}`}
            >
              <Ionicons
                name={freq.icon}
                size={24}
                color={selectedFrequency === freq.label ? "white" : "#666"}
              />
            </View>
            <Text
              className={`text-[14px] font-semibold text-[#333] text-center ${selectedFrequency === freq.label && "text-white"}`}
            >
              {freq.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderDurationOptions = () => {
    return (
      <View className="flex-row flex-wrap mx-[-5px]">
        {DURATIONS.map((dur) => (
          <TouchableOpacity
            key={dur.id}
            className={`w-[calc((100%-60px)/2)] bg-white rounded-2xl p-[15px] m-[5px] items-center border border-[#e0e0e0] shadow-sm elevation-[2] ${selectedDuration === dur.label && "bg-green-700 border-green-400"}`}
            onPress={() => {
              setSelectedDuration(dur.label);
            }}
          >
            <Text
              className={`text-[24px] font-bold text-[#1a8e2d] mb-[5px] ${selectedDuration === dur.label && "text-white"}`}
            >
              {dur.value > 0 ? dur.value : "∞"}
            </Text>
            <Text
              className={`text-[14px] font-semibold text-[#333] text-center ${selectedDuration === dur.label && "text-white"}`}
            >
              {dur.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#f8f9fa">
      <LinearGradient
        colors={["#1a8e2d", "#146922"]}
        className="absolute top-0 left-0 right-0"
        style={{
          height: Platform.OS === "ios" ? 140 : 120,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />

      <View
        className={`flex-1 ${Platform.OS === "ios" ? "pt-[50px]" : "pt-[30px]"}`}
      >
        <View className="flex-row items-center px-[20px] pb-[20px] z-10">
          <TouchableOpacity
            className="w-[40px] h-[40px] rounded-[20px] bg-white justify-center items-center "
            onPress={() => router.back()}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Ionicons name="chevron-back" size={28} color="#1a8e2d" />
          </TouchableOpacity>
          <Text className="text-[28px] font-bold text-white ml-[15px]">
            New Medication
          </Text>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 20,
          }}
        >
          <View className="mb-[25px]">
            <View
              className="bg-white rounded-2xl mb-[12px] border border-[#e0e0e0]"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <TextInput
                className={`text-[20px] text-[#333] p-[15px] ${errors?.name ? "border-[#ff5252]" : ""}`}
                placeholder="Medication Name"
                placeholderTextColor="#999"
              />
              {errors.name && (
                <Text className="text-[#ff5252] text-[12px] mt-[4px] ml-[12px]">
                  {errors.name}
                </Text>
              )}
            </View>

            <View
              className="bg-white rounded-2xl mb-[12px] border border-[#e0e0e0]"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <TextInput
                className={`text-[20px] text-[#333] p-[15px] ${errors?.dosage ? "border-[#ff5252]" : ""}`}
                placeholder="Dosage (e.g., 500mg)"
                placeholderTextColor="#999"
              />
              {errors.dosage && (
                <Text className="text-[#ff5252] text-[12px] mt-[4px] ml-[12px]">
                  {errors.dosage}
                </Text>
              )}
            </View>
          </View>

          {/* Schedule */}
          <View className="mb-[25px]">
            <Text className="text-[18px] font-bold text-[#1a1a1a] mb-[15px] mt-[10px]">
              How often?
            </Text>
            {errors.frequency && (
              <Text className="text-[#ff5252] text-[12px] mt-[4px] ml-[12px]">
                {errors.frequency}
              </Text>
            )}

            {renderFrequencyOptions()}

            <Text className="text-[18px] font-bold text-[#1a1a1a] mb-[15px] mt-[10px]">
              For how long?
            </Text>
            {errors.duration && (
              <Text className="text-[#ff5252] text-[12px] mt-[4px] ml-[12px]">
                {errors.duration}
              </Text>
            )}

            {renderDurationOptions()}

            <TouchableOpacity
              className="flex-row items-center bg-white rounded-2xl p-[15px] mt-[15px] border-[1px] border-[#e0e0e0]"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
              onPress={() => setShowDatePicker(true)}
            >
              <View className="w-[40px] h-[40px] rounded-[20px] bg-[#f5f5f5] justify-center items-center mr-[10px]">
                <Ionicons name="calendar" size={20} color="#1a8e2d" />
              </View>
              <Text className="flex-1 text-[16px] text-[#333]">
                Starts {form.startDate.toLocaleDateString()}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={form.startDate}
                mode="date"
                onChange={(event, date) => {
                  setShowDatePicker(false);
                  if (date) setForm({ ...form, startDate: date });
                }}
              />
            )}

            {form.frequency !== "As needed" && (
              <View className="mt-[20px]">
                <Text className="text-[16px] font-semibold text-[#333] mb-[10px]">
                  Medication Times
                </Text>

                {form.times.map((time, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setShowTimePicker(true);
                    }}
                    className="flex-row items-center bg-white rounded-2xl p-[15px] mb-[10px] border-[1px] border-[#e0e0e0]"
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.05,
                      shadowRadius: 8,
                      elevation: 2,
                    }}
                  >
                    <View className="w-[40px] h-[40px] rounded-[20px] bg-[#f5f5f5] justify-center items-center mr-[10px]">
                      <Ionicons name="time-outline" size={20} color="#1a8e2d" />
                    </View>
                    <Text className="flex-1 text-[16px] text-[#333]">
                      {time}
                    </Text>
                    <Ionicons name="chevron-forward" size={20} color="#666" />
                  </TouchableOpacity>
                ))}

                {showTimePicker && (
                  <DateTimePicker
                    value={(() => {
                      const [hours, minutes] = form.times[0]
                        .split(":")
                        .map(Number);
                      const date = new Date();
                      date.setHours(hours, minutes, 0, 0);
                      return date;
                    })()}
                    mode="time"
                    onChange={(event, date) => {
                      setShowTimePicker(false);
                      if (date) {
                        const newTime = date.toLocaleTimeString("default", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        });
                        setForm((prev) => ({
                          ...prev,
                          times: prev.times.map((t, i) =>
                            i === 0 ? newTime : t
                          ),
                        }));
                      }
                    }}
                  />
                )}
              </View>
            )}
          </View>

          {/* Reminders */}
          <View className="mb-[25px]">
            <View
              className="bg-white rounded-2xl p-5 border-[1px] border-[#e0e0e0]"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <View className="flex-row justify-center items-center">
                <View className="flex-row items-center flex-1">
                  <View className="w-[40px] h-[40px] rounded-[20px] bg-[#f5f5f5] justify-center items-center mr-[15px]">
                    <Ionicons name="notifications" size={20} color="#1a8e2d" />
                  </View>
                  <View>
                    <Text className="text-[16px] font-semibold text-[#333]">
                      Reminders
                    </Text>
                    <Text className="text-[13px] text-[#666] mt-[2px] w-[140px]">
                      Get notified when it&apos;s time to take your medication
                    </Text>
                  </View>
                </View>
                <Switch
                  value={form.reminderEnabled}
                  onValueChange={(value) =>
                    setForm({ ...form, reminderEnabled: value })
                  }
                  trackColor={{ false: "#ddd", true: "#1a8e2d" }}
                  thumbColor="white"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
