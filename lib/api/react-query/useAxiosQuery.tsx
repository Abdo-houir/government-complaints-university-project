import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { privateAxiosInstance } from '../setup/api';

function useAxiosQuery<TData = unknown>(
    url: string,
    enabled: boolean = true,
    axiosOptions?: AxiosRequestConfig,
): UseQueryResult<TData, unknown> {
    const query = useQuery<TData, unknown>({
        queryKey: [url],
        enabled: enabled,
        queryFn: async () => {
            try {
                const response = await privateAxiosInstance.get<TData>(url, axiosOptions);
                return structuredClone(response.data);
            } catch (error: unknown | Error | AxiosError) {
                if (error instanceof AxiosError && error.response?.data) throw error.response.data;
                if (error instanceof AxiosError && error.response) throw error.response;
                throw error;
            }
        },
    });

    return query
}

export default useAxiosQuery;
