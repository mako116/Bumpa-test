import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import AppLayout from "@/components/layout/AppLayout";
import { useBookDetails } from "@/hooks/useBookDetails";
import { useCart } from "@/hooks/useCart";
import { BookPrice } from "@/components/books/BookPrice";
import { BookRating } from "@/components/books/BookRating";
import { ReviewsList } from "@/components/books/ReviewsList";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Badge } from "@/components/ui/Badge";
import { ErrorState } from "@/components/ui/ErrorState";
import { DetailsShimmer } from "@/components/ui/PageShimmers";
import { ThemedText } from "@/components/themed-text";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  Colors,
  Spacing,
  BorderRadius,
  Shadows,
  Typography,
} from "@/constants/theme";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const { width } = Dimensions.get("window");

export default function BookDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const navigation = useNavigation();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const { book, loading, error, retry } = useBookDetails(id || "");
  const { addItem, isInCart, totalItems } = useCart();

  const [isFlying, setIsFlying] = useState(false);

  const flyX = useSharedValue(0);
  const flyY = useSharedValue(0);
  const flyScale = useSharedValue(1);
  const flyOpacity = useSharedValue(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => router.push("/cart")}
          style={styles.headerCart}
        >
          <Ionicons name="cart-outline" size={24} color={colors.text} />
          <Badge count={totalItems} />
        </Pressable>
      ),
    });
  }, [navigation, totalItems, colors.text, router]);

  const handleAddToCart = () => {
    if (!book) return;

    addItem(book);

    setIsFlying(true);
    flyX.value = 0;
    flyY.value = 0;
    flyScale.value = 1;
    flyOpacity.value = 1;

    flyX.value = withTiming(width * 0.4, { duration: 600 });
    flyY.value = withTiming(-hp(50), { duration: 600 });
    flyScale.value = withTiming(0.1, { duration: 600 });
    flyOpacity.value = withSequence(
      withTiming(1, { duration: 100 }),
      withTiming(0.8, { duration: 400 }),
      withTiming(0, { duration: 100 }, (finished) => {
        if (finished) {
          runOnJS(setIsFlying)(false);
        }
      }),
    );
  };

  const flyingStyle = useAnimatedStyle(() => {
    return {
      opacity: flyOpacity.value,
      transform: [
        { translateX: flyX.value },
        { translateY: flyY.value },
        { scale: flyScale.value },
      ],
    };
  });

  if (loading) {
    return (
      <AppLayout>
        <DetailsShimmer />
      </AppLayout>
    );
  }

  if (error || !book) {
    return (
      <AppLayout>
        <View style={[styles.center, { backgroundColor: colors.background }]}>
          <ErrorState
            message={error || "Book details not found"}
            onRetry={retry}
          />
        </View>
      </AppLayout>
    );
  }

  const isBookInCart = isInCart(book.id);

  return (
    <AppLayout>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.coverWrapper}>
            <Image
              source={{ uri: book.imageUrl }}
              style={styles.coverImage}
              contentFit="cover"
              cachePolicy="memory-disk"
            />
          </View>

          <View
            style={[
              styles.infoCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.borderLight,
              },
            ]}
          >
            <View style={styles.metaRow}>
              <View
                style={[
                  styles.genreBadge,
                  { backgroundColor: colors.primaryLight },
                ]}
              >
                <ThemedText
                  style={[styles.genreText, { color: colors.primary }]}
                >
                  {book.genre}
                </ThemedText>
              </View>
              <ThemedText
                style={[
                  styles.stockText,
                  { color: book.inStock ? colors.success : colors.error },
                ]}
              >
                {book.inStock ? "In Stock" : "Out of Stock"}
              </ThemedText>
            </View>

            <ThemedText style={styles.title} type="title">
              {book.title}
            </ThemedText>

            <ThemedText
              style={[styles.author, { color: colors.textSecondary }]}
            >
              by {book.author}
            </ThemedText>

            <View style={styles.ratingPriceRow}>
              <BookRating
                rating={book.rating}
                count={book.ratingCount}
                size={18}
              />
              <BookPrice
                size="lg"
                price={book.price}
                originalPrice={book.originalPrice}
              />
            </View>

            <View
              style={[styles.divider, { backgroundColor: colors.borderLight }]}
            />

            <View style={styles.detailsGrid}>
              <View style={styles.detailsItem}>
                <ThemedText
                  style={[styles.detailsLabel, { color: colors.textTertiary }]}
                >
                  Pages
                </ThemedText>
                <ThemedText style={styles.detailsVal} type="defaultSemiBold">
                  {book.pages}
                </ThemedText>
              </View>
              <View style={styles.detailsItem}>
                <PlatformDivider colors={colors} />
                <ThemedText
                  style={[styles.detailsLabel, { color: colors.textTertiary }]}
                >
                  Publisher
                </ThemedText>
                <ThemedText
                  style={styles.detailsVal}
                  numberOfLines={1}
                  type="defaultSemiBold"
                >
                  {book.publisher}
                </ThemedText>
              </View>
              <View style={styles.detailsItem}>
                <PlatformDivider colors={colors} />
                <ThemedText
                  style={[styles.detailsLabel, { color: colors.textTertiary }]}
                >
                  Published
                </ThemedText>
                <ThemedText style={styles.detailsVal} type="defaultSemiBold">
                  {book.publishDate.split("-")[0]}
                </ThemedText>
              </View>
            </View>
          </View>

          {}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle} type="defaultSemiBold">
              Synopsis
            </ThemedText>
            <ThemedText
              style={[styles.description, { color: colors.textSecondary }]}
            >
              {book.description}
            </ThemedText>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle} type="defaultSemiBold">
              Reviews
            </ThemedText>
            <ReviewsList reviews={book.reviews} />
          </View>
        </ScrollView>

        {isFlying && (
          <Animated.View style={[styles.flyingBook, flyingStyle]}>
            <Image source={{ uri: book.imageUrl }} style={styles.flyingImage} />
          </Animated.View>
        )}

        <View
          style={[
            styles.footer,
            { backgroundColor: colors.surface, borderTopColor: colors.border },
          ]}
        >
          <AddToCartButton isInCart={isBookInCart} onPress={handleAddToCart} />
        </View>
      </View>
    </AppLayout>
  );
}

function PlatformDivider({ colors }: { colors: any }) {
  return (
    <View
      style={[styles.vertDivider, { backgroundColor: colors.borderLight }]}
    />
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
  scrollContent: {
    paddingBottom: hp(12),
  },
  headerCart: {
    position: "relative",
    marginRight: Spacing.sm,
    padding: Spacing.xs,
  },
  coverWrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(3),
    backgroundColor: "rgba(0,0,0,0.02)",
  },
  coverImage: {
    width: width * 0.45,
    aspectRatio: 2.3 / 3,
    borderRadius: BorderRadius.md,
    ...Shadows.lg,
  },
  infoCard: {
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  genreBadge: {
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.xs,
  },
  genreText: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  stockText: {
    ...Typography.smallBold,
  },
  title: {
    fontSize: 24,
    lineHeight: 28,
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    marginBottom: Spacing.md,
  },
  ratingPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.xs,
  },
  divider: {
    height: 1,
    marginVertical: Spacing.md,
  },
  detailsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  detailsItem: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  vertDivider: {
    position: "absolute",
    left: 0,
    top: "10%",
    bottom: "10%",
    width: 1,
  },
  detailsLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    fontWeight: "600",
    marginBottom: 2,
  },
  detailsVal: {
    fontSize: 14,
  },
  section: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  flyingBook: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    width: 80,
    aspectRatio: 2.3 / 3,
    borderRadius: BorderRadius.xs,
    overflow: "hidden",
    zIndex: 100,
    ...Shadows.md,
  },
  flyingImage: {
    width: "100%",
    height: "100%",
  },
  footer: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
