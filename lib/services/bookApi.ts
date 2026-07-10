

import { Book, BookListResponse, SerperResponse, Genre } from '@/types';
import { MOCK_BOOKS } from '@/lib/mockData';
import Axios from './apiClient';
import { SERPER_API_KEY } from '@/config/config';


const PAGE_SIZE = 10;


const USE_LIVE_API = false;




function simulateDelay(minMs = 300, maxMs = 800): Promise<void> {
  const delay = Math.floor(Math.random() * (maxMs - minMs)) + minMs;
  return new Promise((resolve) => setTimeout(resolve, delay));
}


function maybeThrowError(): void {
  if (process.env.NODE_ENV !== 'test' && Math.random() < 0.05) {
    throw new Error('Network request failed. Please try again.');
  }
}


function parsePrice(priceStr: string): number {
  const cleaned = priceStr.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
}


function mapSerperToBook(item: SerperResponse['shopping'][0], index: number): Book {
  const mockBook = MOCK_BOOKS[index % MOCK_BOOKS.length];
  return {
    id: item.productId || String(item.position),
    title: item.title,
    author: mockBook.author,
    description: mockBook.description,
    price: parsePrice(item.price),
    imageUrl: item.imageUrl,
    rating: item.rating || 4.0,
    ratingCount: item.ratingCount || 0,
    reviews: mockBook.reviews,
    genre: mockBook.genre,
    isbn: mockBook.isbn,
    pages: mockBook.pages,
    publishDate: mockBook.publishDate,
    publisher: item.source || mockBook.publisher,
    inStock: true,
  };
}




async function fetchFromSerper(query: string, num = 20): Promise<Book[]> {
  const response = await Axios.get<SerperResponse>('/shopping', {
    params: {
      q: query,
      num: num,
      apiKey: SERPER_API_KEY,
    },
  });

  const data = response.data;
  return (data.shopping || []).map((item, index) => mapSerperToBook(item, index));
}


export async function getBooks(
  page = 1,
  limit = PAGE_SIZE,
  genre?: Genre
): Promise<BookListResponse> {
  await simulateDelay();
  maybeThrowError();

  let books: Book[];

  if (USE_LIVE_API) {
    try {
      const query = genre && genre !== 'All' ? `${genre} books` : 'bestselling books';
      books = await fetchFromSerper(query, 40);
    } catch {
      
      books = [...MOCK_BOOKS];
    }
  } else {
    books = [...MOCK_BOOKS];
  }

  
  if (genre && genre !== 'All') {
    books = books.filter((book) => book.genre === genre);
  }

  const totalCount = books.length;
  const totalPages = Math.ceil(totalCount / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedBooks = books.slice(startIndex, endIndex);

  return {
    books: paginatedBooks,
    totalCount,
    page,
    totalPages,
    hasMore: page < totalPages,
  };
}

 
export async function getBookById(id: string): Promise<Book> {
  await simulateDelay(200, 500);
  maybeThrowError();

  const book = MOCK_BOOKS.find((b) => b.id === id);

  if (!book) {
    throw new Error(`Book with ID "${id}" not found.`);
  }

  return book;
}


export async function searchBooks(
  query: string,
  page = 1,
  limit = PAGE_SIZE
): Promise<BookListResponse> {
  await simulateDelay(200, 600);
  maybeThrowError();

  let matchingBooks: Book[];

  if (USE_LIVE_API && query.length >= 3) {
    try {
      matchingBooks = await fetchFromSerper(`${query} book`, 30);
    } catch {
      matchingBooks = filterLocalBooks(query);
    }
  } else {
    matchingBooks = filterLocalBooks(query);
  }

  const totalCount = matchingBooks.length;
  const totalPages = Math.ceil(totalCount / limit);
  const startIndex = (page - 1) * limit;
  const paginatedBooks = matchingBooks.slice(startIndex, startIndex + limit);

  return {
    books: paginatedBooks,
    totalCount,
    page,
    totalPages,
    hasMore: page < totalPages,
  };
}

 
function filterLocalBooks(query: string): Book[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return MOCK_BOOKS;

  return MOCK_BOOKS.filter(
    (book) =>
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery) ||
      book.description.toLowerCase().includes(lowerQuery) ||
      book.genre.toLowerCase().includes(lowerQuery)
  );
}

 
export async function getFeaturedBooks(): Promise<Book[]> {
  await simulateDelay(200, 400);
   return [...MOCK_BOOKS]
    .sort((a, b) => b.rating * b.ratingCount - a.rating * a.ratingCount)
    .slice(0, 5);
}

 
export async function getTrendingBooks(): Promise<Book[]> {
  await simulateDelay(200, 400);
   return [...MOCK_BOOKS]
    .sort((a, b) => b.ratingCount - a.ratingCount)
    .slice(0, 10);
}

 
export async function getNewArrivals(
  page = 1,
  limit = PAGE_SIZE
): Promise<BookListResponse> {
  await simulateDelay(200, 400);

  const sorted = [...MOCK_BOOKS].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  const totalCount = sorted.length;
  const totalPages = Math.ceil(totalCount / limit);
  const startIndex = (page - 1) * limit;
  const paginatedBooks = sorted.slice(startIndex, startIndex + limit);

  return {
    books: paginatedBooks,
    totalCount,
    page,
    totalPages,
    hasMore: page < totalPages,
  };
}


export async function getBooksByGenre(
  genre: Genre,
  page = 1,
  limit = PAGE_SIZE
): Promise<BookListResponse> {
  return getBooks(page, limit, genre);
}


export async function processCheckout(
  _orderData: Record<string, unknown>
): Promise<{ orderId: string; status: string; estimatedDelivery: string }> {
  await simulateDelay(1000, 2000);

  
  if (Math.random() < 0.05) {
    throw new Error('Payment processing failed. Please try again.');
  }

  const orderId = `BN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 5) + 3);

  return {
    orderId,
    status: 'success',
    estimatedDelivery: deliveryDate.toISOString().split('T')[0],
  };
}
