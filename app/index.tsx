import { Text, View, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useEffect } from "react";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 2,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace("/auth");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-[#4caf50] items-center justify-center ">
      <Animated.View
        className="items-center"
        style={[{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
      >
        <Ionicons name="medical" size={100} color="white" />
        <Text className="text-white text-3xl font-bold mt-[20px] tracking-widest">
          MedRemind
        </Text>
      </Animated.View>
    </View>
  );
}
