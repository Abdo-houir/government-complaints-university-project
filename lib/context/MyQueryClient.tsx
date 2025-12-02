"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';


type Props = {
    children: ReactNode,
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        }
    }
});
const MyQueryClient = ({ children }: Props) => {
    return (
        <QueryClientProvider client={queryClient} >
            {children}
            <ReactQueryDevtools client={queryClient} />
        </QueryClientProvider>

    )
}

export default MyQueryClient