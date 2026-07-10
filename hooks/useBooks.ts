import { useEffect } from 'react';
import { useBookStore } from '@/lib/stores/book.store';
import { Genre } from '@/types';

export function useBooks(genre: Genre = 'All') {
  const {
    books,
    loading,
    error,
    hasMore,
    refreshing,
    loadMore,
    refresh,
    setGenre,
  } = useBookStore();

  useEffect(() => {
    setGenre(genre);
  }, [genre, setGenre]);

  return {
    books,
    loading,
    error,
    hasMore,
    refreshing,
    loadMore,
    refresh,
    retry: () => useBookStore.getState().fetchBooks(1),
  };
}
