import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { BookRating } from '@/components/books/BookRating';
import { Review } from '@/types';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';

interface BookReviewProps {
  review: Review;
}

export function BookReview({ review }: BookReviewProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
      <View style={styles.header}>
        <ThemedText style={styles.userName} type="defaultSemiBold">
          {review.userName}
        </ThemedText>
        <ThemedText style={[styles.date, { color: colors.textTertiary }]}>
          {review.date}
        </ThemedText>
      </View>
      <BookRating style={styles.rating} rating={review.rating} showCount={false} size={14} />
      <ThemedText style={[styles.comment, { color: colors.textSecondary }]}>
        {review.comment}
      </ThemedText>
      {review.helpful > 0 && (
        <ThemedText style={[styles.helpful, { color: colors.textTertiary }]}>
          {review.helpful} people found this helpful
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  userName: {
    fontSize: Typography.captionBold.fontSize,
  },
  date: {
    fontSize: Typography.small.fontSize,
  },
  rating: {
    marginBottom: Spacing.xs,
  },
  comment: {
    fontSize: Typography.caption.fontSize,
    lineHeight: 20,
  },
  helpful: {
    fontSize: 10,
    marginTop: Spacing.xs,
    fontStyle: 'italic',
  },
});
