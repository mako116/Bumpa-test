import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '../themed-text';
import { Button } from './Button';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing, Typography } from '@/constants/theme';

interface EmptyStateProps {
  iconName?: keyof typeof MaterialIcons.glyphMap;
  title: string;
  description: string;
  actionTitle?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
}

export function EmptyState({
  iconName = 'hourglass-empty',
  title,
  description,
  actionTitle,
  onActionPress,
  style,
}: EmptyStateProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.iconContainer, { backgroundColor: colors.backgroundSecondary }]}>
        <MaterialIcons name={iconName} size={48} color={colors.primary} />
      </View>
      <ThemedText style={styles.title} type="subtitle">
        {title}
      </ThemedText>
      <ThemedText style={[styles.description, { color: colors.textSecondary }]}>
        {description}
      </ThemedText>
      {actionTitle && onActionPress && (
        <Button
          style={styles.button}
          variant="outline"
          title={actionTitle}
          onPress={onActionPress}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing['2xl'],
    textAlign: 'center',
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
  description: {
    fontSize: Typography.body.fontSize,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  button: {
    minWidth: 150,
  },
});
