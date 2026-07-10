import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View, RefreshControl } from "react-native";
import AppLayout from "@/components/layout/AppLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { CategorySection } from "@/components/home/CategorySection";
import { TrendingBooks } from "@/components/home/TrendingBooks";
import { BookCard } from "@/components/books/BookCard";
import { ThemedText } from "@/components/themed-text";
import { ErrorState } from "@/components/ui/ErrorState";
import { HomeShimmer } from "@/components/ui/PageShimmers";
import { useBookStore } from "@/lib/stores/book.store";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, Spacing } from "@/constants/theme";

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const {
    featuredBook,
    trendingBooks,
    homeGenreBooks: genreBooks,
    homeSelectedGenre: selectedGenre,
    homeLoading: loading,
    homeRefreshing: refreshing,
    homeError: error,
    fetchHomeData,
    setHomeSelectedGenre,
  } = useBookStore();

  useEffect(() => {
    fetchHomeData();
  }, [selectedGenre, fetchHomeData]);

  const handleRefresh = () => {
    fetchHomeData(true);
  };

  if (loading) {
    return (
      <AppLayout>
        <HomeShimmer />
      </AppLayout>
    );
  }

  if (error && !genreBooks.length) {
    return (
      <AppLayout>
        <View style={styles.center}>
          <ErrorState message={error} onRetry={() => fetchHomeData()} />
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      >
        <HeroSection featuredBook={featuredBook} />

        <CategorySection
          selectedGenre={selectedGenre}
          onSelectGenre={setHomeSelectedGenre}
        />

        <TrendingBooks books={trendingBooks} />

        <View style={styles.gridSection}>
          <ThemedText style={styles.sectionTitle} type="defaultSemiBold">
            {selectedGenre === "All"
              ? "New Arrivals"
              : `${selectedGenre} Books`}
          </ThemedText>

          <View style={styles.grid}>
            {genreBooks.map((book, index) => (
              <View key={book.id} style={styles.gridItem}>
                <BookCard book={book} index={index} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gridSection: {
    paddingVertical: Spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: Spacing.sm,
  },
  gridItem: {
    width: "50%",
  },
});
