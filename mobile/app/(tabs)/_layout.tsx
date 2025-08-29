import { View, Text, Platform } from "react-native";
import React from "react";
import { Redirect, Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@clerk/clerk-expo";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  const { isSignedIn } = useAuth();
  if (!isSignedIn) return <Redirect href="/(auth)" />;

  // reusable custom icon renderer
  const renderIcon = (name: keyof typeof Feather.glyphMap) => {
    // eslint-disable-next-line react/display-name
    return ({
      focused,
      color,
      size,
    }: {
      focused: boolean;
      color: string;
      size: number;
    }) => {
      if (focused) {
        return (
          <LinearGradient
            colors={["#36D1DC", "#5B86E5"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather name={name} size={18} color="#fff" />
          </LinearGradient>
        );
      }

      return <Feather name={name} size={18} color={color} />;
    };
  };

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#1da1f2",
        tabBarInactiveTintColor: "#aab8c2",
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: insets.bottom + 10,
          left: 20,
          right: 20,
          height: 65,
          borderRadius: 25,
          backgroundColor: "#fff",
          borderWidth: 1,
          paddingBottom: Platform.OS === "ios" ? 10 : 8,
          marginLeft: 5,
          marginRight: 5,
          paddingTop: 12,

          elevation: 0,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ tabBarIcon: renderIcon("home") }} />
      <Tabs.Screen
        name="search"
        options={{ tabBarIcon: renderIcon("search") }}
      />
      <Tabs.Screen
        name="messages"
        options={{ tabBarIcon: renderIcon("mail") }}
      />
      <Tabs.Screen
        name="profile"
        options={{ tabBarIcon: renderIcon("user") }}
      />
      <Tabs.Screen
        name="notifications"
        options={{ tabBarIcon: renderIcon("bell") }}
      />
    </Tabs>
  );
}
