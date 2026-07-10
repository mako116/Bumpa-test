import { useEffect } from 'react';
import { useBookStore } from '@/lib/stores/book.store';
import { useDebounce } from '@/hooks/useDebounce';

export function useBookSearch() {
  const {
    searchQuery,
    searchBooks,
    searchLoading,
    searchLoadingMore,
    searchError,
    searchHasMore,
    searchGenre,
    setSearchQuery,
    setSearchGenre,
    performSearch,
    loadMoreSearch,
    clearSearch,
  } = useBookStore();

  const debouncedQuery = useDebounce(searchQuery, 300);

  
  useEffect(() => {
    performSearch(1, true);
  }, [debouncedQuery, searchGenre]);

  return {
    query: searchQuery,
    setQuery: setSearchQuery,
    genre: searchGenre,
    setGenre: setSearchGenre,
    books: searchBooks,
    loading: searchLoading,
    loadingMore: searchLoadingMore,
    error: searchError,
    hasMore: searchHasMore,
    loadMore: loadMoreSearch,
    clear: clearSearch,
    retry: () => useBookStore.getState().performSearch(1, true),
  };
}
