'use client';

import * as Sentry from '@sentry/nextjs';
import Link from 'next/link';
import { useEffect } from 'react';
import './globals.css';
import './theme-config.css';

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold mb-4">Something went wrong</h1>
      <h2 className="text-2xl mb-4">An unexpected error occurred.</h2>
      <p className="text-gray-600 mb-8">{error?.message || 'Please try again later.'}</p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
