import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';

interface AddToCartButtonProps {
  isInCart: boolean;
  onPress: () => void;
  loading?: boolean;
}

export function AddToCartButton({ isInCart, onPress, loading = false }: AddToCartButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const scale = useSharedValue(1);

  const handlePress = () => {
    if (loading) return;

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    scale.value = withSequence(
      withSpring(0.9, { damping: 5, stiffness: 200 }),
      withSpring(1.15, { damping: 5, stiffness: 200 }),
      withSpring(1, { damping: 10, stiffness: 150 })
    );

    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: isInCart ? colors.success : colors.primary,
    };
  });

  return (
    <Pressable style={styles.pressable} onPress={handlePress} disabled={loading}>
      <Animated.View
        style={[
          styles.button,
          animatedStyle,
        ]}
      >
        <MaterialIcons
          name={isInCart ? 'shopping-cart' : 'add-shopping-cart'}
          size={20}
          color="#fff"
          style={styles.icon}
        />
        <ThemedText style={styles.text}>
          {isInCart ? 'In Cart' : 'Add to Cart'}
        </ThemedText>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
  },
  button: {
    height: 54,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  text: {
    color: '#fff',
    ...Typography.bodyBold,
  },
});
