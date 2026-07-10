import { useEffect } from 'react';
import { useBookStore } from '@/lib/stores/book.store';

export function useBookDetails(id: string) {
  const {
    details,
    detailsLoading,
    detailsError,
    fetchBookDetails,
  } = useBookStore();

  useEffect(() => {
    if (id) {
      fetchBookDetails(id);
    }
  }, [id, fetchBookDetails]);

  const book = details[id] || null;
  
  const loading = detailsLoading[id] === undefined ? true : detailsLoading[id];
  const error = detailsError[id] || null;

  return {
    book,
    loading,
    error,
    retry: () => useBookStore.getState().fetchBookDetails(id),
  };
}
