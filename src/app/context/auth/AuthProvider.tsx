"use client"
import { REFRESH_TOKEN, ROLE_STORAGE_KEY } from '@/constants';
import { useRouter } from '@/i18n/navigation';
import PATHS from '@/paths';
import { useLocalStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
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
  role: RoleType[] | null,
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
  const tApi = useTranslations("apiMessages");

  const [refreshToken, setRefreshToken] = useLocalStorage<string>({
    key: REFRESH_TOKEN,
    defaultValue: undefined
  });

  const [role, setRole] = useLocalStorage<RoleType[]>({
    key: ROLE_STORAGE_KEY,
    defaultValue: undefined
  });

  const [user, setUser] = useState<UserType | null>(null);
  const [status, setStatus] = useState<AuthType>("unauthenticated");
  const isLoading = useBoolean({ initialState: true });

  const login = useAxiosMutation(endpoints.auth.login, "post");


  const logoutCallback = () => {
    replace(PATHS.home.index);
    setUser(null);
    setStatus("unauthenticated")
    setRefreshToken("");
    setRefreshToken("")
    setRole([])
  }

  const logout = useMutate(endpoints.auth.logout, [], "post", "Logout successfully", () => { }, () => { }, false,false);

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

  useEffect(() => {
    if (initUser.isLoading) {
      isLoading.onTrue()
    }
  }, [initUser.isLoading])

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
            setHeaderToken(resolvedData.data.tokens.access_token);
            setRefreshToken(resolvedData.data.tokens.refresh_token);
            setRole(resolvedData.data.roles);
            initUser.refetch();

            notifications.update({
              id,
              color: "green",
              title: tApi('success'),
              message: tApi("loginSuccess"),
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
              title: tApi('failed'),
              message: handleErrorMessageDecider(error,tApi),
              autoClose: false,
              withCloseButton: true,
              loading: false
            })
          }
        })
      },
      loading: login.isPending
    },
    logout: () => {
      logout.mutate(null,false)
      logoutCallback()
    },
    register: {
      mutate: (input: unknown, withNotification?: boolean) => {
        console.log(input);
        console.log(withNotification);
      },
      loading: false,
    },
    token: refreshToken,
    status: status,
    user: user,
    role: role as RoleType[],
    isLoading: isLoading.value
  }

  return (
    <AuthContext.Provider value={data} >
      {children}
    </AuthContext.Provider >
  )
}

export default AuthProvider