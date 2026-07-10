import React from 'react';
import { StyleSheet, ViewStyle, View, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface SafeScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
  lightColor?: string;
  darkColor?: string;
}

export function SafeScreen({ children, style, lightColor, darkColor }: SafeScreenProps) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? 'light';
  
  const backgroundColor = lightColor || darkColor 
    ? (colorScheme === 'dark' ? darkColor || Colors.dark.background : lightColor || Colors.light.background)
    : Colors[colorScheme].background;

  return (
    <View 
      style={[
        styles.container, 
        { 
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor 
        }, 
        style
      ]}
    >
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
