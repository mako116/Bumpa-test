import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import { ThemedText } from '@/components/themed-text';
import { QuantitySelector } from '@/components/cart/QuantitySelector';
import { BookPrice } from '@/components/books/BookPrice';
import { CartItem as CartItemType } from '@/types';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

interface CartItemProps {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export function CartItem({ item, onIncrease, onDecrease, onRemove }: CartItemProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { book, quantity } = item;

  const handleRemove = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    onRemove();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: book.imageUrl }}
          style={styles.image}
          contentFit="cover"
          cachePolicy="memory-disk"
          transition={200}
        />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <View style={styles.titleWrapper}>
            <ThemedText numberOfLines={1} style={styles.title} type="defaultSemiBold">
              {book.title}
            </ThemedText>
            <ThemedText numberOfLines={1} style={[styles.author, { color: colors.textSecondary }]}>
              by {book.author}
            </ThemedText>
          </View>
          <Pressable testID="remove-item-button" onPress={handleRemove} style={styles.removeButton}>
            <MaterialIcons name="delete-outline" size={22} color={colors.error} />
          </Pressable>
        </View>

        <View style={styles.footer}>
          <BookPrice size="sm" price={book.price} />
          <QuantitySelector
            quantity={quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            minQuantity={1}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  imageContainer: {
    width: 75,
    aspectRatio: 2.3 / 3,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    backgroundColor: '#eaeaea',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: Spacing.md,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleWrapper: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
  },
  author: {
    fontSize: 13,
    marginTop: 2,
  },
  removeButton: {
    padding: Spacing.xs,
    alignSelf: 'flex-start',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
});
