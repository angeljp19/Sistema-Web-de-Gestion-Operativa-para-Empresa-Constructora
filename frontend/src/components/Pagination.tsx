import { Button } from "flowbite-react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** how many page numbers to show around the current page */
  siblings?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblings = 1,
}) => {
  if (totalPages <= 1) return null;

  const createPageNumbers = () => {
    const pages: Array<number | string> = [];
    const left = Math.max(1, currentPage - siblings);
    const right = Math.min(totalPages, currentPage + siblings);

    if (left > 1) {
      pages.push(1);
      if (left > 2) pages.push("...");
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages) {
      if (right < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = createPageNumbers();

  return (
    <nav className="flex items-center justify-center space-x-2 mt-4">
      <Button
        color="light"
        size="xs"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &laquo;
      </Button>
      {pageNumbers.map((p, idx) =>
        typeof p === "string" ? (
          <span key={idx} className="px-2">
            {p}
          </span>
        ) : (
          <Button
            key={p}
            size="xs"
            color={p === currentPage ? "dark" : "light"}
            onClick={() => onPageChange(p)}
          >
            {p}
          </Button>
        ),
      )}
      <Button
        color="light"
        size="xs"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &raquo;
      </Button>
    </nav>
  );
};
