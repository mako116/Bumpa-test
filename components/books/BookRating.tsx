import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "@/components/themed-text";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, Spacing, Typography } from "@/constants/theme";

interface BookRatingProps {
  rating: number;
  count?: number;
  showCount?: boolean;
  size?: number;
  style?: ViewStyle;
}

export function BookRating({
  rating,
  count,
  showCount = true,
  size = 16,
  style,
}: BookRatingProps) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <MaterialIcons
          key={`full-${i}`}
          name="star"
          size={size}
          color={colors.accent}
        />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <MaterialIcons
          key="half"
          name="star-half"
          size={size}
          color={colors.accent}
        />,
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <MaterialIcons
          key={`empty-${i}`}
          name="star-border"
          size={size}
          color={colors.accent}
        />,
      );
    }

    return stars;
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.starsContainer}>{renderStars()}</View>
      {showCount && (
        <ThemedText
          style={[styles.ratingText, { color: colors.textSecondary }]}
        >
          {rating.toFixed(1)} {count !== undefined && `(${count})`}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: Spacing.xs,
  },
  ratingText: {
    ...Typography.smallBold,
  },
});
