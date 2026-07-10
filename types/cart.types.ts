

import { Book } from './book.types';

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isLoading: boolean;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Book }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { bookId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'RESTORE_CART'; payload: CartItem[] }
  | { type: 'SET_LOADING'; payload: boolean };

export interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  totalItems: number;
  totalPrice: number;
  subtotal: number;
  tax: number;
  addItem: (book: Book) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (bookId: string) => boolean;
  getItemQuantity: (bookId: string) => number;
}
