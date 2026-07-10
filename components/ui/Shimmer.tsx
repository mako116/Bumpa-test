import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface ShimmerProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: any;
}

export function Shimmer({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
}: ShimmerProps) {
  const colorScheme = useColorScheme() ?? 'light';

  const shimmerColors: [string, string, string] = colorScheme === 'dark'
    ? ['#1e2130', '#2d3348', '#1e2130']
    : ['#ebe7e2', '#f5f3f0', '#ebe7e2'];

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      false
    );
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const translationX = interpolate(
      progress.value,
      [0, 1],
      [-300, 300]
    );
    return {
      transform: [{ translateX: translationX }],
    };
  });

  return (
    <View
      style={[
        styles.container,
        {
          width: width as any,
          height: height as any,
          borderRadius,
          backgroundColor: colorScheme === 'dark' ? '#1a1d26' : '#ebe7e2',
        } as any,
        style,
      ]}
    >
      <Animated.View style={[styles.shimmerWrapper, animatedStyle]}>
        <LinearGradient
          colors={shimmerColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  shimmerWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 300,
  },
});
