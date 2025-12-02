import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { privateAxiosInstance } from '../setup/api';


function useAxiosMutation<TData = unknown, TVariables = unknown>(
    url: string,
    method: MethodType,
    axiosOptions?: AxiosRequestConfig,
    mutationOptions?: UseMutationOptions<TData, unknown, TVariables>
): UseMutationResult<TData, unknown, TVariables> {
    return useMutation<TData, unknown, TVariables>({
        mutationKey: [url],
        mutationFn: async (formData: TVariables) => {
            try {
                let response: AxiosResponse<TData>;

                switch (method) {
                    case "post":
                        response = await privateAxiosInstance.post(url, formData, axiosOptions);
                        break;
                    case "put":
                        response = await privateAxiosInstance.put(url, formData, axiosOptions);
                        break;
                    case "patch":
                        response = await privateAxiosInstance.patch(url, formData, axiosOptions);
                        break;
                    case "delete":
                        response = await privateAxiosInstance.delete(url, { ...axiosOptions, data: formData });
                        break;
                    case "get":
                        response = await privateAxiosInstance.get(url, axiosOptions);
                        break;
                    default:
                        throw new Error('Invalid or missing HTTP method');
                }

                return response.data;
            } catch (error:  unknown) {
                if (error instanceof AxiosError && error.response?.data) throw error.response.data;
                if (error instanceof AxiosError && error.response) throw error.response;
                throw error;
            }
        },
        ...mutationOptions,
    });
}

export default useAxiosMutation;
