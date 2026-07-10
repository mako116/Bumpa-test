

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  rating: number;
  ratingCount: number;
  reviews: Review[];
  genre: string;
  isbn: string;
  pages: number;
  publishDate: string;
  publisher: string;
  inStock: boolean;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface BookListResponse {
  books: Book[];
  totalCount: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export interface SerperShoppingItem {
  title: string;
  source: string;
  link: string;
  price: string;
  imageUrl: string;
  rating?: number;
  ratingCount?: number;
  productId?: string;
  position: number;
}

export interface SerperResponse {
  searchParameters: {
    q: string;
    type: string;
    num: number;
    page: number;
    engine: string;
  };
  shopping: SerperShoppingItem[];
  credits: number;
}

export type Genre =
  | 'All'
  | 'Fiction'
  | 'Non-Fiction'
  | 'Science Fiction'
  | 'Mystery'
  | 'Romance'
  | 'Self-Help'
  | 'Biography'
  | 'Fantasy'
  | 'Technology'
  | 'History'
  | 'Children';

export const GENRES: Genre[] = [
  'All',
  'Fiction',
  'Non-Fiction',
  'Science Fiction',
  'Mystery',
  'Romance',
  'Self-Help',
  'Biography',
  'Fantasy',
  'Technology',
  'History',
  'Children',
];
