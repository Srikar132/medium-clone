"use server";

import React from 'react';
import { SanityError } from '@/types/sanity';

interface ErrorFallbackProps {
  error: Error;
  reset: () => void;
}

export async function ErrorFallback({ error, reset }: ErrorFallbackProps) {
  const isSanityError = error instanceof SanityError;
  
  return (
    <div className="p-6 bg-red-50 rounded-lg">
      <h2 className="text-xl font-bold text-red-700">Something went wrong</h2>
      <p className="mt-2 text-red-600">{error.message}</p>
      {isSanityError && error.status !== 500 && (
        <p className="mt-1 text-sm text-red-500">Status: {error.status}</p>
      )}
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}