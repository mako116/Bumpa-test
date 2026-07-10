import React, { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { useCart } from "@/hooks/useCart";
import { CartBadge } from "@/components/cart/CartBadge";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, Spacing } from "@/constants/theme";

export function HeaderCart() {
  const router = useRouter();
  const { totalItems } = useCart();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const scale = useSharedValue(1);

  useEffect(() => {
    if (totalItems > 0) {
      scale.value = withSequence(
        withSpring(1.2, { damping: 4, stiffness: 300 }),
        withSpring(1, { damping: 10, stiffness: 200 }),
      );
    }
  }, [totalItems, scale]);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/cart");
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <Animated.View style={animatedStyle}>
        <Ionicons name="cart-outline" size={24} color={colors.text} />
        <CartBadge />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: Spacing.sm,
    paddingVertical: Spacing.xs,
    paddingLeft: Spacing.xs,
    paddingRight: Spacing.md,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
});
