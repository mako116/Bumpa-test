import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  minQuantity?: number;
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  minQuantity = 0,
}: QuantitySelectorProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const plusScale = useSharedValue(1);
  const minusScale = useSharedValue(1);

  const handlePressInPlus = () => {
    plusScale.value = withSpring(0.85, { damping: 10, stiffness: 200 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOutPlus = () => {
    plusScale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };

  const handlePressInMinus = () => {
    minusScale.value = withSpring(0.85, { damping: 10, stiffness: 200 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOutMinus = () => {
    minusScale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };

  const plusStyle = useAnimatedStyle(() => ({
    transform: [{ scale: plusScale.value }],
  }));

  const minusStyle = useAnimatedStyle(() => ({
    transform: [{ scale: minusScale.value }],
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
      <Pressable
        testID="decrease-button"
        onPress={onDecrease}
        onPressIn={handlePressInMinus}
        onPressOut={handlePressOutMinus}
        disabled={quantity <= minQuantity}
      >
        <Animated.View
          style={[
            styles.button,
            { opacity: quantity <= minQuantity ? 0.3 : 1 },
            minusStyle,
          ]}
        >
          <MaterialIcons name="remove" size={18} color={colors.text} />
        </Animated.View>
      </Pressable>

      <View style={styles.quantityContainer}>
        <ThemedText style={styles.quantityText} type="defaultSemiBold">
          {quantity}
        </ThemedText>
      </View>

      <Pressable
        testID="increase-button"
        onPress={onIncrease}
        onPressIn={handlePressInPlus}
        onPressOut={handlePressOutPlus}
      >
        <Animated.View style={[styles.button, plusStyle]}>
          <MaterialIcons name="add" size={18} color={colors.text} />
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    padding: 2,
    alignSelf: 'flex-start',
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityContainer: {
    paddingHorizontal: Spacing.md,
    minWidth: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: Typography.bodyBold.fontSize,
    textAlign: 'center',
  },
});
