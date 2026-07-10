import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { CategoryPill } from '@/components/books/CategoryPill';
import { Genre, GENRES } from '@/types';
import { Spacing } from '@/constants/theme';

interface CategorySectionProps {
  selectedGenre: Genre;
  onSelectGenre: (genre: Genre) => void;
}

export function CategorySection({ selectedGenre, onSelectGenre }: CategorySectionProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title} type="defaultSemiBold">
        Browse by Genre
      </ThemedText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {GENRES.map((genre) => (
          <CategoryPill
            key={genre}
            genre={genre}
            isSelected={selectedGenre === genre}
            onPress={onSelectGenre}
          />
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
    marginBottom: Spacing.sm,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
  },
});
