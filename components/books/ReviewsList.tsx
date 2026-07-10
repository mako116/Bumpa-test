import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { BookReview } from '@/components/books/BookReview';
import { Review } from '@/types';
import { Spacing } from '@/constants/theme';

interface ReviewsListProps {
  reviews: Review[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <ThemedText style={styles.emptyText}>No reviews yet. Be the first to review!</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {reviews.map((review) => (
        <BookReview key={review.id} review={review} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.sm,
  },
  emptyContainer: {
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
  emptyText: {
    fontStyle: 'italic',
    fontSize: 14,
  },
});
