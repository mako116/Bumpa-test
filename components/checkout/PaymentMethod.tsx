import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';
import { ThemedText } from '@/components/themed-text';
import { PaymentInfo } from '@/types';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';

interface PaymentMethodProps {
  selectedMethod: PaymentInfo['method'];
  onChangeMethod: (method: PaymentInfo['method']) => void;
}

export function PaymentMethod({ selectedMethod, onChangeMethod }: PaymentMethodProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const handleSelect = (method: PaymentInfo['method']) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChangeMethod(method);
  };

  const methods: { id: PaymentInfo['method']; label: string; icon: string }[] = [
    { id: 'visa', label: 'Visa', icon: 'credit-card-outline' },
    { id: 'mastercard', label: 'Mastercard', icon: 'credit-card-multiple-outline' },
    { id: 'paypal', label: 'PayPal', icon: 'paypal' },
    { id: 'apple_pay', label: 'Apple Pay', icon: 'apple' },
  ];

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title} type="defaultSemiBold">
        Payment Method
      </ThemedText>
      
      <View style={styles.grid}>
        {methods.map((item) => {
          const isSelected = selectedMethod === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => handleSelect(item.id)}
              style={[
                styles.methodCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: isSelected ? colors.primary : colors.border,
                  borderWidth: isSelected ? 2 : 1,
                },
              ]}
            >
              <MaterialCommunityIcons
                name={item.icon as any}
                size={24}
                color={isSelected ? colors.primary : colors.textSecondary}
              />
              <ThemedText
                style={[
                  styles.label,
                  {
                    color: isSelected ? colors.primary : colors.textSecondary,
                    fontWeight: isSelected ? '600' : '400',
                  },
                ]}
              >
                {item.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 15,
    marginBottom: Spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  methodCard: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  label: {
    ...Typography.smallBold,
  },
});
