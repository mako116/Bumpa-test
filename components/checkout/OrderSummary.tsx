import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { formatPrice } from '@/utils/formatPrice';
import { CartItem } from '@/types';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

interface OrderSummaryProps {
  items: CartItem[];
  totalPrice: number;
}

export function OrderSummary({ items, totalPrice }: OrderSummaryProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
      <ThemedText style={styles.title} type="defaultSemiBold">
        Items ({items.reduce((sum, i) => sum + i.quantity, 0)})
      </ThemedText>

      {items.map((item) => (
        <View key={item.book.id} style={styles.itemRow}>
          <ThemedText numberOfLines={1} style={[styles.itemText, { color: colors.textSecondary }]}>
            {item.quantity}x {item.book.title}
          </ThemedText>
          <ThemedText style={[styles.itemPrice, { color: colors.text }]}>
            {formatPrice(item.book.price * item.quantity)}
          </ThemedText>
        </View>
      ))}

      <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

      <View style={styles.totalRow}>
        <ThemedText type="defaultSemiBold">Total</ThemedText>
        <ThemedText style={[styles.totalPriceText, { color: colors.primary }]}>
          {formatPrice(totalPrice)}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 15,
    marginBottom: Spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  itemText: {
    fontSize: 13,
    flex: 1,
    marginRight: Spacing.sm,
  },
  itemPrice: {
    fontSize: 13,
  },
  divider: {
    height: 1,
    marginVertical: Spacing.sm,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPriceText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
