"use client";

import useAuthContext from "@/app/context/auth/useAuthContext";
import Loading from "@/app/loading";
import { useRouter } from "@/i18n/navigation";
import PATHS from "@/paths";
import { notifications } from "@mantine/notifications";
import { ReactNode } from "react";

type AuthGuardProps = {
    children: ReactNode;
    roles?: RoleType[];   // optional role-based guard
};

const AuthGuard = ({ children, roles }: AuthGuardProps) => {
    const { status, isLoading, role } = useAuthContext();
    const { replace } = useRouter();

    // While loading, you can show a spinner or skeleton
    if (isLoading) {
        return <Loading />;
    }

    // If not authenticated, redirect or show fallback
    if (status === "unauthenticated") {
        notifications.show({
            position: "top-right",
            draggable: true,
            title: 'unauthenticated',
            message: "unauthenticated please login first",
            autoClose: false,
        })
        replace(PATHS.auth.login); // redirect to login
        return null;
    }

    // If roles are required, check them
    if (roles && role) {
        const hasRole = roles.some(r => role.find(rr => rr.name === r.name));
        if (!hasRole) {
            notifications.show({
                position: "top-right",
                draggable: true,
                title: 'unauthenticated',
                message: "unauthenticated please login firsttttttttt",
                autoClose: false,
            })
            replace(PATHS.home.index); // redirect to home if role mismatch
            return null;
        }
    }

    // Otherwise, render protected children
    return <>{children}</>;
};

export default AuthGuard;
