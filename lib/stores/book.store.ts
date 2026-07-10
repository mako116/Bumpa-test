import { create } from 'zustand';
import { Book, Genre } from '@/types';
import {
  getFeaturedBooks,
  getTrendingBooks,
  getBooks,
  getBookById,
  searchBooks,
} from '@/lib/services/bookApi';

interface BookStoreState {
  
  featuredBook: Book | null;
  trendingBooks: Book[];
  homeGenreBooks: Book[];
  homeSelectedGenre: Genre;
  homeLoading: boolean;
  homeRefreshing: boolean;
  homeError: string | null;
  fetchHomeData: (isRefresh?: boolean) => Promise<void>;
  setHomeSelectedGenre: (genre: Genre) => void;

  
  books: Book[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  genre: Genre;
  fetchBooks: (pageNum: number, isRefresh?: boolean) => Promise<void>;
  loadMore: () => void;
  refresh: () => void;
  setGenre: (genre: Genre) => void;

  
  searchQuery: string;
  searchBooks: Book[];
  searchLoading: boolean;
  searchLoadingMore: boolean;
  searchError: string | null;
  searchPage: number;
  searchHasMore: boolean;
  searchGenre: Genre;
  setSearchQuery: (query: string) => void;
  setSearchGenre: (genre: Genre) => void;
  performSearch: (pageNum: number, isInitial?: boolean) => Promise<void>;
  loadMoreSearch: () => void;
  clearSearch: () => void;

  
  details: Record<string, Book>;
  detailsLoading: Record<string, boolean>;
  detailsError: Record<string, string | null>;
  fetchBookDetails: (id: string) => Promise<void>;
}

export const useBookStore = create<BookStoreState>((set, get) => ({
  
  featuredBook: null,
  trendingBooks: [],
  homeGenreBooks: [],
  homeSelectedGenre: 'All',
  homeLoading: true,
  homeRefreshing: false,
  homeError: null,

  fetchHomeData: async (isRefresh = false) => {
    try {
      set({ homeError: null });
      if (isRefresh) {
        set({ homeRefreshing: true });
      } else {
        set({ homeLoading: true });
      }

      const selectedGenre = get().homeSelectedGenre;
      const [featured, trending, genreResult] = await Promise.all([
        getFeaturedBooks(),
        getTrendingBooks(),
        getBooks(1, 6, selectedGenre),
      ]);

      set({
        featuredBook: featured && featured.length > 0 ? featured[0] : null,
        trendingBooks: trending || [],
        homeGenreBooks: genreResult.books || [],
      });
    } catch (err: any) {
      set({ homeError: err.message || 'Failed to load home page data.' });
    } finally {
      set({ homeLoading: false, homeRefreshing: false });
    }
  },

  setHomeSelectedGenre: (genre: Genre) => {
    set({ homeSelectedGenre: genre });
    get().fetchHomeData(false);
  },

  
  books: [],
  loading: true,
  refreshing: false,
  error: null,
  page: 1,
  hasMore: true,
  genre: 'All',

  fetchBooks: async (pageNum: number, isRefresh = false) => {
    
    const { loading: currentLoading, refreshing: currentRefreshing } = get();
    if (pageNum > 1 && (currentLoading || currentRefreshing)) return;

    try {
      set({ error: null });
      if (pageNum === 1 && !isRefresh) {
        set({ loading: true });
      } else if (isRefresh) {
        set({ refreshing: true });
      }

      const response = await getBooks(pageNum, 10, get().genre);

      set((state) => {
        let newBooks = response.books;
        if (pageNum > 1 && !isRefresh) {
          const existingIds = new Set(state.books.map((b) => b.id));
          const filteredNew = response.books.filter((b) => !existingIds.has(b.id));
          newBooks = [...state.books, ...filteredNew];
        }
        return {
          books: newBooks,
          page: response.page,
          hasMore: response.hasMore,
        };
      });
    } catch (err: any) {
      set({ error: err.message || 'An error occurred while fetching books.' });
    } finally {
      set({ loading: false, refreshing: false });
    }
  },

  loadMore: () => {
    const { loading, refreshing, hasMore, page } = get();
    if (loading || refreshing || !hasMore) return;
    get().fetchBooks(page + 1);
  },

  refresh: () => {
    get().fetchBooks(1, true);
  },

  setGenre: (genre: Genre) => {
    set({ genre, page: 1, books: [], hasMore: true });
    get().fetchBooks(1);
  },

  
  searchQuery: '',
  searchBooks: [],
  searchLoading: false,
  searchLoadingMore: false,
  searchError: null,
  searchPage: 1,
  searchHasMore: false,
  searchGenre: 'All',

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setSearchGenre: (genre: Genre) => {
    set({ searchGenre: genre });
    get().performSearch(1, true);
  },

  performSearch: async (pageNum: number, isInitial = false) => {
    const { searchLoading, searchLoadingMore, searchQuery, searchGenre } = get();
    if (isInitial && searchLoading) return;
    if (!isInitial && searchLoadingMore) return;

    try {
      set({ searchError: null });
      if (isInitial) {
        set({ searchLoading: true, searchPage: 1 });
      } else {
        set({ searchLoadingMore: true });
      }

      let response;
      const queryTrimmed = searchQuery.trim();

      if (queryTrimmed.length > 0) {
        response = await searchBooks(queryTrimmed, pageNum);
        if (searchGenre !== 'All') {
          response.books = response.books.filter((b) => b.genre === searchGenre);
        }
      } else {
        response = await getBooks(pageNum, 10, searchGenre);
      }

      set((state) => {
        let newBooks = response.books;
        if (!isInitial) {
          const existingIds = new Set(state.searchBooks.map((b) => b.id));
          const filteredNew = response.books.filter((b) => !existingIds.has(b.id));
          newBooks = [...state.searchBooks, ...filteredNew];
        }
        return {
          searchBooks: newBooks,
          searchPage: response.page,
          searchHasMore: response.hasMore,
        };
      });
    } catch (err: any) {
      set({ searchError: err.message || 'An error occurred during search.' });
    } finally {
      set({ searchLoading: false, searchLoadingMore: false });
    }
  },

  loadMoreSearch: () => {
    const { searchLoading, searchLoadingMore, searchHasMore, searchPage } = get();
    if (searchLoading || searchLoadingMore || !searchHasMore) return;
    get().performSearch(searchPage + 1, false);
  },

  clearSearch: () => {
    set({ searchQuery: '', searchPage: 1, searchBooks: [], searchHasMore: false });
    get().performSearch(1, true);
  },

  
  details: {},
  detailsLoading: {},
  detailsError: {},

  fetchBookDetails: async (id: string) => {
    if (!id) return;
    
    if (get().details[id] && !get().detailsError[id]) return;

    set((state) => ({
      detailsLoading: { ...state.detailsLoading, [id]: true },
      detailsError: { ...state.detailsError, [id]: null },
    }));

    try {
      const data = await getBookById(id);
      set((state) => ({
        details: { ...state.details, [id]: data },
      }));
    } catch (err: any) {
      set((state) => ({
        detailsError: { ...state.detailsError, [id]: err.message || 'Failed to fetch details.' },
      }));
    } finally {
      set((state) => ({
        detailsLoading: { ...state.detailsLoading, [id]: false },
      }));
    }
  },
}));
