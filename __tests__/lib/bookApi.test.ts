import { getBooks, getBookById, searchBooks } from '@/lib/services/bookApi';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('Book API Service', () => {
  it('fetches a list of books with default pagination parameters', async () => {
    const response = await getBooks();
    
    expect(response).toHaveProperty('books');
    expect(response).toHaveProperty('totalCount');
    expect(response).toHaveProperty('page', 1);
    expect(response.books.length).toBeLessThanOrEqual(10);
  });

  it('filters books by genre when specified', async () => {
    const response = await getBooks(1, 10, 'Fiction');
    
    expect(response.books.every(book => book.genre === 'Fiction')).toBe(true);
  });

  it('fetches a single book by ID successfully', async () => {
    const book = await getBookById('1');
    
    expect(book).toBeTruthy();
    expect(book.id).toBe('1');
    expect(book).toHaveProperty('title');
    expect(book).toHaveProperty('price');
  });

  it('throws an error for non-existent book ID', async () => {
    await expect(getBookById('non-existent-id')).rejects.toThrow();
  });

  it('searches books correctly matching queries', async () => {
    const response = await searchBooks('Atomic');
    
    expect(response.books.length).toBeGreaterThan(0);
    expect(
      response.books.some(book => 
        book.title.includes('Atomic') || book.description.includes('Atomic')
      )
    ).toBe(true);
  });
});
