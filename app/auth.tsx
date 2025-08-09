import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function AuthScreen() {
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasBiometrics, setHasBiometrics] = useState(false);

  useEffect(() => {
    checkBiometrics();
  }, []);

  const checkBiometrics = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    setHasBiometrics(hasHardware && isEnrolled);
  };

  const authenticate = async () => {
    try {
      setIsAuthenticating(true);
      setError(null);

      // Check if device has biometric hardware
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const supportedTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      const hasBiometrics = await LocalAuthentication.isEnrolledAsync();

      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage:
          hasHardware && hasBiometrics
            ? "Use Face ID or Touch ID"
            : "Enter yout PIN to access MedRemind",
        fallbackLabel: "Use PIN",
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
      });

      if (auth.success) {
        router.replace("/home");
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <LinearGradient colors={["#4caf50", "#2e7d32"]} className="flex-1">
      <View className="flex-1 p-[20px] justify-center items-center">
        <View className="w-[100px] h-[100px] bg-[#ffffff33] rounded-[60px] justify-center items-center mb-[20px]">
          <Ionicons name="medical" size={80} color="white" />
        </View>

        <Text
          className="text-[36px] font-bold text-white mb-[10px]"
          style={{
            textShadowColor: "rgba(0,0,0,0.2)",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 3,
          }}
        >
          MedRemind
        </Text>
        <Text className="text-[18px] text-[#ffffffe5] mb-[40px] text-center">
          Your Personal Medication Assistant
        </Text>

        <View
          className="bg-white rounded-[20px] p-[30px] items-center"
          style={{
            width: width - 40,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text className="text-[24px] font-bold text-[#333] mb-[10px]">
            Welcome Back!
          </Text>
          <Text className="text-[16px] text-[#666] text-center mb-[30px]">
            {" "}
            {hasBiometrics
              ? "Use Face ID/Touch ID or PIN to access your medications"
              : "Enter your PIN to access your medications"}
          </Text>

          <TouchableOpacity
            onPress={authenticate}
            disabled={isAuthenticating}
            className={`bg-[#4CAF50] py-[15px] px-[30px] rounded-[12px] w-full flex-row items-center justify-center ${
              isAuthenticating ? "opacity-70" : ""
            }`}
          >
            <Ionicons
              name={hasBiometrics ? "finger-print-outline" : "keypad-outline"}
              size={24}
              color="white"
              className="mr-[10px]"
            />
            <Text className="text-white text-[16px] font-semibold">
              {isAuthenticating
                ? "Verifying..."
                : hasBiometrics
                  ? "Authenticate"
                  : "Enter PIN"}
            </Text>
          </TouchableOpacity>

          {error && (
            <View className="flex flex-row items-center mt-[20px] p-[10px] bg-[#ffebee] rounded-[8px]">
              <Ionicons name="alert-circle" size={20} color="#f44336" />
              <Text className="text-[#f44336] ml-[8px] text-[14px]">
                {error}
              </Text>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
}
