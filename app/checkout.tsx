import { ThemedText } from "@/components/themed-text";
import { Button } from "@/components/ui/Button";
import AppLayout from "@/components/layout/AppLayout";
import { BorderRadius, Colors, Spacing } from "@/constants/theme";
import { useCart } from "@/hooks/useCart";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { CheckoutFormData } from "@/types";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { processCheckout } from "@/lib/services/bookApi";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import Animated, {
  FadeIn,
  ZoomIn,
} from "react-native-reanimated";

export default function CheckoutScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const router = useRouter();

  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handlePlaceOrder = async (formData: CheckoutFormData) => {
    try {
      setError(null);
      setLoading(true);

      const response = await processCheckout(formData as any);

      setOrderId(response.orderId);

      
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      setSuccess(true);
      clearCart();
    } catch (err: any) {
      setError(err.message || "An error occurred during payment processing.");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    router.replace("/");
  };

  if (success) {
    return (
      <AppLayout>
        <View
          style={[
            styles.successContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <Animated.View
            entering={ZoomIn.duration(400)}
            style={[styles.successCard, { backgroundColor: colors.surface }]}
          >
            <View
              style={[
                styles.checkmarkBg,
                { backgroundColor: colors.successLight },
              ]}
            >
              <Ionicons
                name="checkmark-circle"
                size={80}
                color={colors.success}
              />
            </View>

            <ThemedText style={styles.successTitle} type="title">
              Order Confirmed!
            </ThemedText>

            <ThemedText
              style={[styles.successSubtitle, { color: colors.textSecondary }]}
            >
              Thank you for shopping at The Book Nook. Your order has been placed
              successfully.
            </ThemedText>

            <View
              style={[
                styles.orderInfoBox,
                { backgroundColor: colors.backgroundSecondary },
              ]}
            >
              <ThemedText style={styles.orderLabel}>Order ID</ThemedText>
              <ThemedText type="defaultSemiBold">{orderId}</ThemedText>
            </View>

            <Button
              title="Back to Home"
              onPress={handleFinish}
              style={styles.homeBtn}
            />
          </Animated.View>
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={[styles.container, { backgroundColor: colors.background }]}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <OrderSummary items={items} totalPrice={totalPrice} />

          {error && (
            <Animated.View
              entering={FadeIn}
              style={[
                styles.errorBox,
                { backgroundColor: colors.errorLight, borderColor: colors.error },
              ]}
            >
              <ThemedText style={{ color: colors.error }}>{error}</ThemedText>
            </Animated.View>
          )}

          <CheckoutForm onSubmit={handlePlaceOrder} isLoading={loading} />
        </ScrollView>
      </KeyboardAvoidingView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.sm,
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.md,
  },
  successCard: {
    width: "100%",
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: "center",
    shadowOpacity: 0.1,
    elevation: 4,
  },
  checkmarkBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
  },
  successTitle: {
    fontSize: 22,
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  successSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    marginBottom: Spacing.xl,
  },
  orderInfoBox: {
    width: "100%",
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  orderLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    marginBottom: 4,
    opacity: 0.7,
  },
  homeBtn: {
    width: "100%",
  },
  errorBox: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.lg,
  },
});
