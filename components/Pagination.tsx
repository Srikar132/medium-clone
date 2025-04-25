"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ 
  totalPages = 10,
  currentPage = 1,
  baseUrl = '',
  className = ''
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageUrl = (pageNumber : number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(pageNumber) );
    return `${baseUrl}?${params.toString()}`;
  };

  const handlePageChange = (pageNumber : number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    router.push(createPageUrl(pageNumber));
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3; 
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex items-center justify-center gap-2 py-8 ${className}`}>
      <Button 
        variant="ghost" 
        className="gap-1 px-4 py-2 text-gray-400 transition-colors hover:text-gray-100 disabled:opacity-50"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </Button>
      
      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          variant={pageNumber === currentPage ? "secondary" : "ghost"}
          className={`w-10 h-10 ${
            pageNumber === currentPage 
              ? 'bg-secondary-dark text-white border-b-2 border-red-400 rounded-none' 
              : 'text-gray-400 hover:text-gray-100'
          }`}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}
      
      <Button 
        variant="ghost" 
        className="gap-1 px-4 py-2 text-gray-400 transition-colors hover:text-gray-100 disabled:opacity-50"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}