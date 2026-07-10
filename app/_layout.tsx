import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  const customTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      primary: Colors[colorScheme].primary,
      background: Colors[colorScheme].background,
      card: Colors[colorScheme].surface,
      text: Colors[colorScheme].text,
      border: Colors[colorScheme].border,
    },
  };

  return (
    <ThemeProvider value={customTheme}>
      <Stack screenOptions={{ headerTitleStyle: { fontWeight: '600' } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="book/[id]" options={{ title: 'Book Details', headerBackTitle: 'Back' }} />
        <Stack.Screen name="checkout" options={{ title: 'Checkout', presentation: 'card' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
