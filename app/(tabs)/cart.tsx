import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import AppLayout from '@/components/layout/AppLayout';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { useCart } from '@/hooks/useCart';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/constants/theme';

export default function CartScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();

  const {
    items,
    subtotal,
    tax,
    totalPrice,
    updateQuantity,
    removeItem,
  } = useCart();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const handleBrowse = () => {
    router.push('/search');
  };

  if (items.length === 0) {
    return (
      <AppLayout>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <EmptyState
            iconName="shopping-cart"
            title="Your Cart is Empty"
            description="Looks like you haven't added any books to your cart yet. Explore our catalog and find your next read!"
            actionTitle="Browse Books"
            onActionPress={handleBrowse}
          />
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.book.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onIncrease={() => updateQuantity(item.book.id, item.quantity + 1)}
              onDecrease={() => updateQuantity(item.book.id, item.quantity - 1)}
              onRemove={() => removeItem(item.book.id)}
            />
          )}
          ListFooterComponent={
            <CartSummary
              subtotal={subtotal}
              tax={tax}
              total={totalPrice}
            />
          }
        />

        <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
          <Button
            title="Proceed to Checkout"
            onPress={handleCheckout}
            style={styles.checkoutBtn}
          />
        </View>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.sm,
    paddingBottom: Spacing['5xl'],
  },
  footer: {
    padding: Spacing.md,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  checkoutBtn: {
    width: '100%',
  },
});
