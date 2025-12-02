
import { routing } from '@/i18n/routing';
import { ReactNode } from 'react';
import AuthLayout from '../../../../lib/components/layout/auth';
import AppProvider from '../../../../lib/context/AppProvider';



type Props = {
  children: ReactNode,
  params: Promise<{ locale: string; }>
}


const AuthRootLayout = async ({ children, params }: Props) => {
  const { locale } = await params;



  return (
    <AppProvider locale={locale}>
      <AuthLayout>
        {children}
      </AuthLayout>
    </AppProvider>
  )
}

export default AuthRootLayout;
//! SSG
export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }))
}
