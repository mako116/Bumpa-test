import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '../themed-text';
import { Button } from './Button';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/constants/theme';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  style?: ViewStyle;
}

export function ErrorState({ message, onRetry, style }: ErrorStateProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.iconContainer, { backgroundColor: colors.errorLight }]}>
        <MaterialIcons name="error-outline" size={48} color={colors.error} />
      </View>
      <ThemedText style={styles.title} type="subtitle">
        Something went wrong
      </ThemedText>
      <ThemedText style={[styles.message, { color: colors.textSecondary }]}>
        {message || 'We encountered an error loading the data. Please try again.'}
      </ThemedText>
      <Button
        style={styles.button}
        variant="primary"
        title="Try Again"
        onPress={onRetry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing['2xl'],
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  button: {
    minWidth: 150,
  },
});
