// lib/tokenRefresher.ts
import { REFRESH_TOKEN, ROLE_STORAGE_KEY } from '@/constants';
import { readLocalStorageValue } from '@mantine/hooks';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { privateAxiosInstance, setHeaderToken } from './api';

// Prefer HTTP-only cookies for refresh tokens. If you must use localStorage:

function getRefreshTokenFromStorage(): unknown {
  const refreshToken = readLocalStorageValue({ key: REFRESH_TOKEN});

  return refreshToken
}

export async function fetchNewToken(): Promise<string | null> {
  const refreshToken = getRefreshTokenFromStorage();

  try {
    // Replace with your actual endpoint path
    const res = await privateAxiosInstance.post<LoginREturnType>(
      '/api/refreshToken',
      { refresh_token: refreshToken }
    );
    const newAccessToken = res.data.data.tokens.access_token;
    const newRefreshToken = res.data.data.tokens.refresh_token;
    const roles = res.data.data.roles;
    // Update in-memory and default header
    setHeaderToken(newAccessToken);
    localStorage.setItem(REFRESH_TOKEN, newRefreshToken);
    localStorage.setItem(ROLE_STORAGE_KEY, JSON.stringify(roles));
    return newAccessToken;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Axios-auth-refresh compatible handler
export async function refreshToken(failedRequest: AxiosError): Promise<void> {
  const newToken = await fetchNewToken();

  if (newToken) {
    if (failedRequest.config) {
      (failedRequest.config as AxiosRequestConfig).headers = {
        ...(failedRequest.config.headers || {}),
        Authorization: `Bearer ${newToken}`,
      };
    }
    return Promise.resolve();
  } else {
    return Promise.reject(failedRequest);
  }
}
