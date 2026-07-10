import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { formatPrice } from '@/utils/formatPrice';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';

interface CartSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
  shipping?: number;
}

export function CartSummary({ subtotal, tax, total, shipping = 0 }: CartSummaryProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
      <ThemedText style={styles.title} type="defaultSemiBold">
        Order Summary
      </ThemedText>

      <View style={styles.row}>
        <ThemedText style={{ color: colors.textSecondary }}>Subtotal</ThemedText>
        <ThemedText style={{ color: colors.text }}>{formatPrice(subtotal)}</ThemedText>
      </View>

      <View style={styles.row}>
        <ThemedText style={{ color: colors.textSecondary }}>Estimated Tax (8%)</ThemedText>
        <ThemedText style={{ color: colors.text }}>{formatPrice(tax)}</ThemedText>
      </View>

      <View style={styles.row}>
        <ThemedText style={{ color: colors.textSecondary }}>Shipping</ThemedText>
        <ThemedText style={{ color: shipping === 0 ? colors.success : colors.text }}>
          {shipping === 0 ? 'FREE' : formatPrice(shipping)}
        </ThemedText>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

      <View style={styles.totalRow}>
        <ThemedText type="defaultSemiBold">Order Total</ThemedText>
        <ThemedText style={[styles.totalPrice, { color: colors.primary }]}>
          {formatPrice(total + shipping)}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: 16,
    marginBottom: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  divider: {
    height: 1,
    marginVertical: Spacing.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPrice: {
    ...Typography.price,
  },
});
