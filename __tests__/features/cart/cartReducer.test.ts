import { useCartStore } from '@/lib/stores/cart.store';
import { Book } from '@/types';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('Cart Store', () => {
  const mockBook: Book = {
    id: '1',
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'A book about habits',
    price: 16.99,
    imageUrl: 'https://example.com/cover.jpg',
    rating: 4.8,
    ratingCount: 1200,
    reviews: [],
    genre: 'Self-Help',
    isbn: '1234567890',
    pages: 320,
    publishDate: '2018-10-16',
    publisher: 'Avery',
    inStock: true,
  };

  const mockBook2: Book = {
    id: '2',
    title: 'Dune',
    author: 'Frank Herbert',
    description: 'Sci-Fi masterpiece',
    price: 12.99,
    imageUrl: 'https://example.com/dune.jpg',
    rating: 4.6,
    ratingCount: 9500,
    reviews: [],
    genre: 'Science Fiction',
    isbn: '0987654321',
    pages: 688,
    publishDate: '1965-08-01',
    publisher: 'Ace Books',
    inStock: true,
  };

  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('should start with an empty cart', () => {
    expect(useCartStore.getState().items).toEqual([]);
  });

  it('should add a new item to the cart', () => {
    useCartStore.getState().addItem(mockBook);
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0]).toEqual({ book: mockBook, quantity: 1 });
  });

  it('should increment quantity when adding an existing item', () => {
    useCartStore.getState().addItem(mockBook);
    useCartStore.getState().addItem(mockBook);
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].quantity).toBe(2);
  });

  it('should remove item from cart', () => {
    useCartStore.getState().addItem(mockBook);
    useCartStore.getState().addItem(mockBook2);
    useCartStore.getState().removeItem('1');
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].book.id).toBe('2');
  });

  it('should update quantity correctly', () => {
    useCartStore.getState().addItem(mockBook);
    useCartStore.getState().updateQuantity('1', 5);
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it('should remove item if quantity is set to 0 or less', () => {
    useCartStore.getState().addItem(mockBook);
    useCartStore.getState().updateQuantity('1', 0);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('should clear the cart', () => {
    useCartStore.getState().addItem(mockBook);
    useCartStore.getState().addItem(mockBook2);
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
