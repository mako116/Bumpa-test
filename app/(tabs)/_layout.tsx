import { Tabs } from "expo-router";
import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Image } from "expo-image";

import { HapticTab } from "@/components/haptic-tab";
import { HeaderCart } from "@/components/cart/HeaderCart";
import { CartBadge } from "@/components/cart/CartBadge";
import { ThemedText } from "@/components/themed-text";
import { Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          borderTopColor: colors.border,
          elevation: 8,
          shadowOpacity: 0.1,
          height:
            Platform.OS === "ios"
              ? 50 + (insets.bottom > 0 ? insets.bottom : 0)
              : 70 + (insets.bottom > 0 ? insets.bottom : 0),
        },
        headerStyle: {
          backgroundColor: colors.surface,
          shadowOpacity: 0.05,
          elevation: 2,
        },
        headerTitleStyle: {
          fontWeight: "700",
          color: colors.text,
        },
        headerShown: true,
        headerTitleAlign: "left",
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: Spacing.sm,
              }}
            >
              <Image
                source={require("@/assets/images/logos.png")}
                style={{ width: 28, height: 28, borderRadius: 6 }}
                contentFit="contain"
              />
              <ThemedText
                style={{ fontSize: 18, fontWeight: "700", color: colors.text }}
              >
                The Book Nook
              </ThemedText>
            </View>
          ),
          headerRight: () => <HeaderCart />,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerTitle: "Browse Books",
          headerRight: () => <HeaderCart />,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          headerTitle: "Shopping Cart",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name={focused ? "cart" : "cart-outline"}
                size={24}
                color={color}
              />
              <CartBadge />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: "relative",
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});
