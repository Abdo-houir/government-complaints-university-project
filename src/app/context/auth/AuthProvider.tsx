"use client"
import { REFRESH_TOKEN } from '@/constants';
import { useRouter } from '@/i18n/navigation';
import PATHS from '@/paths';
import { useLocalStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { handleErrorMessageDecider } from '../../../../lib/api/handleErrorMessageDecider';
import useAxiosMutation from '../../../../lib/api/react-query/useAxiosMutation';
import useAxiosQuery from '../../../../lib/api/react-query/useAxiosQuery';
import { useMutate } from '../../../../lib/api/react-query/useMutate';
import { setHeaderToken } from '../../../../lib/api/setup/api';
import endpoints from '../../../../lib/api/setup/ebdpoints';
import useBoolean from '../../../../lib/hooks/useBoolean';

type Props = {
  children: ReactNode
}
export type AuthContextType = {
  user: UserType | null,
  token: string | null,
  login: {
    mutate: (input: unknown) => void,
    loading: boolean,
  },
  register: {
    mutate: (input: unknown, withNotification?: boolean) => void,
    loading: boolean,
  },
  logout: (input: unknown, withNotification?: boolean) => void,
  status: AuthType
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: Props) => {
  const { replace } = useRouter();

  const [refreshToken, setRefreshToken] = useLocalStorage<string>({
    key: REFRESH_TOKEN,
    defaultValue: undefined
  });

  const [user, setUser] = useState<UserType | null>(null);
  const [status, setStatus] = useState<AuthType>("unauthenticated");
  const isLoading = useBoolean({ initialState: true });

  const onLoginSuccess = () => { }

  const login = useAxiosMutation(endpoints.auth.login, "post");

  const tempF = {

  }

  const logoutCallback = () => {
    replace(PATHS.home.index);
    setUser(null);
    setStatus("unauthenticated")
    setRefreshToken("");
  }

  const logout = useMutate(endpoints.auth.logout, [], "post", "Logout successfully", logoutCallback, () => { }, false, true);

  const initUser = useAxiosQuery(endpoints.auth.getProfile);

  useEffect(() => {
    if (initUser.isSuccess) {
      type initDataType = {
        data: UserType
      }
      const data = initUser.data as initDataType
      setStatus("authenticated");
      setUser(data.data);
    }

    isLoading.onFalse()
  }, [initUser.status]);

  const data: AuthContextType = {
    login: {
      mutate: (input: unknown) => {
        isLoading.onTrue();
        const id = notifications.show({
          position: "top-right",
          draggable: true,
          id: endpoints.auth.login,
          title: 'Loading',
          message: "please wait a moment",
          autoClose: false,
          withCloseButton: false,
          loading: true
        })
        notifications.update({
          id,
          title: 'Loading',
          message: "please wait a moment",
          autoClose: false,
          withCloseButton: false,
          loading: true
        })

        login.mutate(input, {
          onSuccess: (data) => {
            const resolvedData = data as LoginREturnType
            setHeaderToken(resolvedData.data.tokens.access_token)
            setRefreshToken(resolvedData.data.tokens.refresh_token)
            initUser.refetch();

            notifications.update({
              id,
              color: "green",
              title: 'Success',
              message: "message",
              withCloseButton: true,
              loading: false
            })

            replace(PATHS.home.index);
          },
          onError: (error: unknown) => {
            notifications.update({
              id,
              color: "red",
              position: "top-right",
              draggable: true,
              title: 'Error',
              message: handleErrorMessageDecider(error as Error | AxiosError),
              autoClose: false,
              withCloseButton: true,
              loading: false
            })
          }
        })
      },
      loading: login.isPending
    },
    logout: logout.mutate,
    register: {
      mutate: (input: unknown, withNotification?: boolean) => { },
      loading: false,
    },
    token: refreshToken,
    status: status,
    user: user,
    isLoading: isLoading.value
  }

  return (
    <AuthContext.Provider value={data} >
      {children}
    </AuthContext.Provider >
  )
}

export default AuthProvider