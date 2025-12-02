"use client"
import useAuthContext from '@/app/context/auth/useAuthContext'
import { ReactNode } from 'react'

type Props = {
    loadingComponent: ReactNode,
    authenticatedComponent: ReactNode,
    unauthenticatedComponent: ReactNode,
}

const AuthSwitcher = ({ authenticatedComponent, unauthenticatedComponent, loadingComponent }: Props) => {
    const { isLoading, status } = useAuthContext();

    if (isLoading) return loadingComponent
    else if (status === "authenticated") return authenticatedComponent
    else if (status === "unauthenticated") return unauthenticatedComponent
}

export default AuthSwitcher