import React, { useEffect } from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { ThemedText } from '../themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';

interface BadgeProps {
  count: number;
  maxCount?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Badge({ count, maxCount = 99, style, textStyle }: BadgeProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const scale = useSharedValue(1);

  useEffect(() => {
    if (count > 0) {
      scale.value = withSequence(
        withSpring(1.3, { damping: 5, stiffness: 200 }),
        withSpring(1, { damping: 10, stiffness: 150 })
      );
    }
  }, [count, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: count > 0 ? 1 : 0,
    };
  });

  const displayCount = count > maxCount ? `${maxCount}+` : String(count);

  if (count <= 0) return null;

  return (
    <Animated.View
      style={[
        styles.badge,
        {
          backgroundColor: colors.primary,
        },
        animatedStyle,
        style,
      ]}
    >
      <ThemedText style={[styles.text, textStyle]}>
        {displayCount}
      </ThemedText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xs,
    position: 'absolute',
    right: -6,
    top: -4,
    borderWidth: 1.5,
    borderColor: '#fff',
    zIndex: 10,
  },
  text: {
    color: '#fff',
    ...Typography.smallBold,
    fontSize: 9,
    lineHeight: 10,
    textAlign: 'center',
  },
});
