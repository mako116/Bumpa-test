import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book, CartItem } from '@/types';
import { STORAGE_KEYS } from '@/constants/storageKeys';

interface CartStoreState {
  items: CartItem[];
  addItem: (book: Book) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (book: Book) => {
        const items = get().items;
        const existingIndex = items.findIndex(item => item.book.id === book.id);
        
        let newItems;
        if (existingIndex > -1) {
          newItems = items.map((item, idx) =>
            idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          newItems = [...items, { book, quantity: 1 }];
        }
        
        set({ items: newItems });
      },
      
      removeItem: (bookId: string) => {
        set({ items: get().items.filter(item => item.book.id !== bookId) });
      },
      
      updateQuantity: (bookId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(bookId);
          return;
        }
        set({
          items: get().items.map(item =>
            item.book.id === bookId ? { ...item, quantity } : item
          ),
        });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: STORAGE_KEYS.cart,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
