
import axios, { AxiosError, AxiosResponse } from 'axios';

import { SERVER_URL } from '@/config-global';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { refreshToken } from './tokenRefresher';

//# for refreshing token if needed
const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true
});

//$ interceptors setup
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => Promise.reject(error.response || "some thing went wrong!")
);
//# the main axios instance 
export const privateAxiosInstance = axios.create({
    baseURL: SERVER_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    withCredentials: true
});
//# to set  Authorization header when refreshing
export const setHeaderToken = (token: string | null) => {
    if (token) {
        privateAxiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete privateAxiosInstance.defaults.headers.common.Authorization;
    }
};

privateAxiosInstance.defaults.headers.common['Accept-Language'] = "Ar"

export const setHeaderLang = (locale: string | null) => {
    if (locale) {
        if (locale === "ar") {
            privateAxiosInstance.defaults.headers.common['Accept-Language'] = "Ar"
        } else {
            privateAxiosInstance.defaults.headers.common['Accept-Language'] = "En"
        }
    } else {
        privateAxiosInstance.defaults.headers.common['Accept-Language'] = "Ar"
    }
};

export async function fetchImage(endpoint: string) {
    const res = await privateAxiosInstance.get(endpoint, { responseType: "blob" });
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    return url
}


// //! create Auth Refresh Interceptor
createAuthRefreshInterceptor(privateAxiosInstance, refreshToken, {
    statusCodes: [401],
    pauseInstanceWhileRefreshing: true
});
