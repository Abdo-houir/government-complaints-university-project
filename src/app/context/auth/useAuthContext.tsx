"use client"

import { useContext } from 'react';
import { AuthContext, AuthContextType } from './AuthProvider';


const useAuthContext = () => {
    const context:AuthContextType | null = useContext(AuthContext);

    if (!context) throw new Error('useAuthContext context must be use inside AuthProvider');

  return context
}

export default useAuthContext