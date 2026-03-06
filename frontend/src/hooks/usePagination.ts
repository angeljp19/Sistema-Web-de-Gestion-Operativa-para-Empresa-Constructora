import { useState, useMemo } from "react";

/**
 * A simple hook to paginate an array of items.
 *
 * @param items the full list of data
 * @param itemsPerPage how many items to show on each page (default 10)
 */
export function usePagination<T>(items: T[], itemsPerPage: number = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = useMemo(() => {
    return items.length === 0 ? 1 : Math.ceil(items.length / itemsPerPage);
  }, [items.length, itemsPerPage]);

  const currentData = useMemo(() => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return items.slice(begin, end);
  }, [items, currentPage, itemsPerPage]);

  const next = () => setCurrentPage((p) => Math.min(p + 1, maxPage));
  const prev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const jump = (page: number) => {
    const p = Math.max(1, Math.min(page, maxPage));
    setCurrentPage(p);
  };

  // reset when items change
  useMemo(() => {
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [maxPage, currentPage]);

  return {
    currentData,
    currentPage,
    maxPage,
    next,
    prev,
    jump,
    setCurrentPage,
  };
}
