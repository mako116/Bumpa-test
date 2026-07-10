import React from 'react';
import { StyleSheet, View, TextStyle, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { formatPrice } from '@/utils/formatPrice';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing, Typography } from '@/constants/theme';

interface BookPriceProps {
  price: number;
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg';
  containerStyle?: ViewStyle;
  priceStyle?: TextStyle;
  originalPriceStyle?: TextStyle;
}

export function BookPrice({
  price,
  originalPrice,
  size = 'md',
  containerStyle,
  priceStyle,
  originalPriceStyle,
}: BookPriceProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return Typography.priceSmall;
      case 'lg':
        return { fontSize: 24, lineHeight: 30, fontWeight: '700' as const };
      case 'md':
      default:
        return Typography.price;
    }
  };

  const originalFontSize = () => {
    switch (size) {
      case 'sm':
        return Typography.small;
      case 'lg':
        return Typography.body;
      case 'md':
      default:
        return Typography.caption;
    }
  };

  const hasDiscount = originalPrice !== undefined && originalPrice > price;

  return (
    <View style={[styles.container, containerStyle]}>
      <ThemedText
        testID="book-current-price"
        style={[
          styles.currentPrice,
          { color: colors.primary },
          getFontSize(),
          priceStyle,
        ]}
      >
        {formatPrice(price)}
      </ThemedText>
      
      {hasDiscount && (
        <ThemedText
          testID="book-original-price"
          style={[
            styles.originalPrice,
            { color: colors.textTertiary },
            originalFontSize(),
            originalPriceStyle,
          ]}
        >
          {formatPrice(originalPrice!)}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currentPrice: {
    fontWeight: '700',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    marginLeft: Spacing.sm,
  },
});
