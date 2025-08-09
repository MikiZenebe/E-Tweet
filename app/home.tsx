import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";
import { Link } from "expo-router";

const { width } = Dimensions.get("window");

// Create animated circle component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const QUICK_ACTIONS = [
  {
    icon: "add-circle-outline" as const,
    label: "Add\nMedication",
    route: "/medications/add" as const,
    color: "#2E7D32",
    gradient: ["#4CAF50", "#2E7D32"] as [string, string],
  },
  {
    icon: "calendar-outline" as const,
    label: "Calendar\nView",
    route: "/calendar" as const,
    color: "#1976D2",
    gradient: ["#2196F3", "#1976D2"] as [string, string],
  },
  {
    icon: "time-outline" as const,
    label: "History\nLog",
    route: "/history" as const,
    color: "#C2185B",
    gradient: ["#E91E63", "#C2185B"] as [string, string],
  },
  {
    icon: "medical-outline" as const,
    label: "Refill\nTracker",
    route: "/refills" as const,
    color: "#E64A19",
    gradient: ["#FF5722", "#E64A19"] as [string, string],
  },
];

interface CircularProgressProps {
  progress: number;
  totalDoses: number;
  completedDoses: number;
}

function CircularProgress({
  progress,
  totalDoses,
  completedDoses,
}: CircularProgressProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const size = width * 0.55;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [progress]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View
      className="items-center justify-center"
      style={{ marginVertical: 10 }}
    >
      <View className="absolute items-center justify-center z-10">
        <Text className="text-[36px] font-bold text-white">
          {Math.round(progress * 100)}%
        </Text>
        <Text className="text-[14px] text-[#ffffffcc] mt-[4px]">
          {completedDoses} of {totalDoses} doses
        </Text>
      </View>

      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="white"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <ScrollView
      className="flex-1 bg-[#f8f9fa]"
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        style={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
        className="pt-[50px] pb-[25px]"
        colors={["#1a8e2d", "#146922"]}
      >
        <View className="items-center px-[20px]">
          <View className="flex-row items-center w-full mb-[20px]">
            <View className="flex-1">
              <Text className="text-[18px] font-bold text-white opacity-[0.9]">
                Daily Progress
              </Text>
            </View>

            <TouchableOpacity
              className="relative p-[8px] bg-[#ffffff26] rounded-[12px] ml-[8px]"
              onPress={() => {}}
            >
              <Ionicons name="notifications-outline" size={24} color="white" />

              <View className="absolute top-[-4px] right-[-4px] bg-[#ff5252] min-w-[20px] h-[20px] rounded-[10px] justify-center items-center border-[2px] border-[#146922] px-[4px]">
                <Text className="text-[11px] text-white font-bold">5</Text>
              </View>
            </TouchableOpacity>
          </View>

          <CircularProgress progress={0.5} totalDoses={10} completedDoses={5} />
        </View>
      </LinearGradient>

      <View className="flex-1 pt-[12px]">
        <View className="px-[20px] mb-[2px]">
          <Text className="text-[20px] font-bold text-[#1a1a1a] mb-[3px]">
            Quick Actions
          </Text>

          <View className="flex-row flex-wrap gap-[12px] mt-[15px]">
            {QUICK_ACTIONS.map((action) => (
              <Link href={"/"} key={action.label} asChild>
                <TouchableOpacity
                  style={{ width: (width - 52) / 2 }}
                  className="h-[110px] rounded-2xl overflow-hidden"
                >
                  <LinearGradient
                    colors={action.gradient}
                    className="flex-1 p-[15px]"
                  >
                    <View className="flex-1 justify-between">
                      <View className="w-[40px] h-[40px] rounded-[12px] bg-[#ffffff33] justify-center items-center">
                        <Ionicons name={action.icon} size={28} color="white" />
                      </View>
                      <Text className="text-[14px] font-semibold text-white mt-[8px]">
                        {action.label}
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
