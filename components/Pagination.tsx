'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // If there's only 1 page or none, don't show pagination controls
  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete('page'); // Default to page 1 by omitting parameter
    } else {
      params.set('page', page.toString());
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-2 mt-12 py-4" aria-label="Navegación de páginas">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`flex h-10 w-10 items-center justify-center rounded-xl border border-midnight-onyx/10 text-midnight-onyx transition-all hover:border-desert-gold hover:text-desert-gold cursor-pointer disabled:opacity-30 disabled:pointer-events-none`}
        aria-label="Página anterior"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`h-10 px-4 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              currentPage === page
                ? 'bg-midnight-onyx text-cloud-white shadow-md'
                : 'bg-frosted-pearl border border-midnight-onyx/5 text-midnight-onyx/75 hover:border-desert-gold hover:text-midnight-onyx'
            }`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`flex h-10 w-10 items-center justify-center rounded-xl border border-midnight-onyx/10 text-midnight-onyx transition-all hover:border-desert-gold hover:text-desert-gold cursor-pointer disabled:opacity-30 disabled:pointer-events-none`}
        aria-label="Página siguiente"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
};
