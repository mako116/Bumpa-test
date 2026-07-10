import { useCartStore } from '@/lib/stores/cart.store';
import { Book } from '@/types';

const TAX_RATE = 0.08;

export function useCart() {
  const { items, addItem, removeItem, updateQuantity, clearCart } = useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const totalPrice = subtotal + tax;

  const isInCart = (bookId: string) => {
    return items.some(item => item.book.id === bookId);
  };

  const getItemQuantity = (bookId: string) => {
    const item = items.find(item => item.book.id === bookId);
    return item ? item.quantity : 0;
  };

  return {
    items,
    isLoading: false,
    totalItems,
    totalPrice,
    subtotal,
    tax,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };
}
