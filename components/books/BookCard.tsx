import React from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeInDown,
} from "react-native-reanimated";
import { Link } from "expo-router";
import * as Haptics from "expo-haptics";
import { ThemedText } from "@/components/themed-text";
import { BookPrice } from "@/components/books/BookPrice";
import { BookRating } from "@/components/books/BookRating";
import { Book } from "@/types";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, Spacing, BorderRadius, Shadows } from "@/constants/theme";

interface BookCardProps {
  book: Book;
  index: number;
}

export function BookCard({ book, index }: BookCardProps) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 10, stiffness: 200 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Link href={{ pathname: "/book/[id]", params: { id: book.id } }} asChild>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.cardWrapper}
      >
        <Animated.View
          entering={FadeInDown.delay((index % 10) * 50).duration(400)}
          style={{ flex: 1 }}
        >
          <Animated.View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.borderLight,
                shadowColor: colors.cardShadow,
              },
              animatedStyle,
            ]}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: book.imageUrl }}
                style={styles.image}
                contentFit="cover"
                cachePolicy="memory-disk"
                transition={200}
              />
              {book.originalPrice && book.originalPrice > book.price && (
                <View
                  style={[
                    styles.saleBadge,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <ThemedText style={styles.saleText}>SALE</ThemedText>
                </View>
              )}
            </View>

            <View style={styles.details}>
              <ThemedText style={[styles.genre, { color: colors.primary }]}>
                {book.genre}
              </ThemedText>
              <ThemedText
                numberOfLines={1}
                style={styles.title}
                type="defaultSemiBold"
              >
                {book.title}
              </ThemedText>
              <ThemedText
                numberOfLines={1}
                style={[styles.author, { color: colors.textSecondary }]}
              >
                by {book.author}
              </ThemedText>
              <BookRating
                style={styles.rating}
                rating={book.rating}
                showCount={false}
                size={12}
              />
              <BookPrice
                size="sm"
                price={book.price}
                originalPrice={book.originalPrice}
              />
            </View>
          </Animated.View>
        </Animated.View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    margin: Spacing.sm,
  },
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: "hidden",
    ...Shadows.md,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 2.3 / 3,
    backgroundColor: "#eaeaea",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  saleBadge: {
    position: "absolute",
    top: Spacing.sm,
    left: Spacing.sm,
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.xs,
  },
  saleText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "700",
  },
  details: {
    padding: Spacing.md,
  },
  genre: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 2,
  },
  author: {
    fontSize: 12,
    marginBottom: Spacing.xs,
  },
  rating: {
    marginBottom: Spacing.sm,
  },
});
