import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ThemedText } from '@/components/themed-text';
import { BookRating } from '@/components/books/BookRating';
import { Book } from '@/types';
import { Spacing, BorderRadius, Shadows } from '@/constants/theme';

interface HeroSectionProps {
  featuredBook: Book | null;
}

export function HeroSection({ featuredBook }: HeroSectionProps) {
  if (!featuredBook) return null;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <Link href={{ pathname: '/book/[id]', params: { id: featuredBook.id } }} asChild>
      <Pressable onPress={handlePress} style={styles.container}>
        <View style={styles.card}>
          <Image
            source={{ uri: featuredBook.imageUrl }}
            style={styles.backgroundImage}
            contentFit="cover"
            cachePolicy="memory-disk"
          />
          
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.85)']}
            style={styles.gradient}
          >
            <View style={styles.content}>
              <View style={styles.badge}>
                <ThemedText style={styles.badgeText}>FEATURED BOOK</ThemedText>
              </View>

              <ThemedText numberOfLines={2} style={styles.title}>
                {featuredBook.title}
              </ThemedText>
              
              <ThemedText style={styles.author}>
                by {featuredBook.author}
              </ThemedText>

              <View style={styles.ratingRow}>
                <BookRating rating={featuredBook.rating} showCount={false} size={14} />
                <ThemedText style={styles.ratingText}>
                  {featuredBook.rating.toFixed(1)}
                </ThemedText>
              </View>
            </View>
          </LinearGradient>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(4),
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  card: {
    height: hp(26),
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000',
    ...Shadows.lg,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'flex-end',
  },
  content: {
    padding: wp(4),
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E67E22',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
    marginBottom: Spacing.sm,
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '700',
    marginBottom: 2,
  },
  author: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 14,
    marginBottom: Spacing.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
