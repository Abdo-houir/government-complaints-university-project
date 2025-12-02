"use client"

import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { useEffect } from 'react';
import { privateAxiosInstance } from './api';
import { refreshToken } from './tokenRefresher';

const ClientSideInterceptor = () => {
  useEffect(() => {
    createAuthRefreshInterceptor(privateAxiosInstance, refreshToken, {
      statusCodes: [401],
      pauseInstanceWhileRefreshing: true
    });
    
  }, []);

  return null;
};

export default ClientSideInterceptor;
