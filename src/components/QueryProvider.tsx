'use client';

import { getQueryClient } from '@/app/get-query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

export default function Provider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
