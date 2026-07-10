import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ThemedText } from '@/components/themed-text';
import { BookCard } from '@/components/books/BookCard';
import { Book } from '@/types';
import { Spacing } from '@/constants/theme';

interface TrendingBooksProps {
  books: Book[];
}

export function TrendingBooks({ books }: TrendingBooksProps) {
  if (!books || books.length === 0) return null;

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title} type="defaultSemiBold">
        Trending Books
      </ThemedText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {books.map((book, index) => (
          <View key={book.id} style={styles.cardContainer}>
            <BookCard book={book} index={index} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.md,
  },
  title: {
    fontSize: 16,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
  },
  cardContainer: {
    width: wp(38),
  },
});
