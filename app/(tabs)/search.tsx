import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppLayout from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/Input";
import { EmptyState } from "@/components/ui/EmptyState";
import { SearchShimmer } from "@/components/ui/PageShimmers";
import { BookCard } from "@/components/books/BookCard";
import { CategoryPill } from "@/components/books/CategoryPill";
import { GENRES } from "@/types";
import { useBookSearch } from "@/hooks/useBookSearch";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, Spacing } from "@/constants/theme";

export default function SearchScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const {
    query,
    setQuery,
    genre,
    setGenre,
    books,
    loading,
    loadingMore,
    hasMore,
    loadMore,
    clear,
  } = useBookSearch();

  const handleLoadMore = () => {
    if (loading || loadingMore || !hasMore) return;
    loadMore();
  };

  const handleClear = () => {
    clear();
  };

  return (
    <AppLayout>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Input
            placeholder="Search by title, author, or keyword..."
            value={query}
            onChangeText={setQuery}
            leftIcon={
              <Ionicons name="search" size={20} color={colors.textSecondary} />
            }
            rightIcon={
              query.length > 0 ? (
                <Pressable onPress={handleClear}>
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={colors.textSecondary}
                  />
                </Pressable>
              ) : null
            }
            containerStyle={styles.searchBar}
          />

          <FlatList
            data={GENRES}
            horizontal
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
            renderItem={({ item }) => (
              <CategoryPill
                genre={item}
                isSelected={genre === item}
                onPress={(selected) => setGenre(selected)}
              />
            )}
          />
        </View>

        {loading ? (
          <SearchShimmer />
        ) : books.length === 0 ? (
          <EmptyState
            iconName="search-off"
            title="No Books Found"
            description="Try modifying your keywords or selected genre filter to find books."
            actionTitle={query ? "Clear Search" : undefined}
            onActionPress={query ? handleClear : undefined}
          />
        ) : (
          <FlatList
            data={books}
            numColumns={2}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listContent}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            removeClippedSubviews={true}
            windowSize={5}
            renderItem={({ item, index }) => (
              <View style={styles.gridItem}>
                <BookCard book={item} index={index} />
              </View>
            )}
            ListFooterComponent={
              loadingMore ? (
                <View style={styles.loader}>
                  <ActivityIndicator color={colors.primary} />
                </View>
              ) : null
            }
          />
        )}
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.sm,
  },
  searchBar: {
    paddingHorizontal: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  categoryScroll: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  listContent: {
    paddingHorizontal: 0,
    paddingBottom: Spacing.xl,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  gridItem: {
    width: "50%",
  },
  loader: {
    paddingVertical: Spacing.lg,
    alignItems: "center",
  },
});
