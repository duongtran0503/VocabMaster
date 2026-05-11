'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // Khởi tạo QueryClient trong useState để tránh tạo lại khi re-render
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 360 * 1000, // Dữ liệu được coi là "mới" trong 1 phút
            retry: 1,             // Thử lại 1 lần nếu lỗi
            refetchOnWindowFocus: false, // Không fetch lại khi chuyển tab
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}