import { Box } from '@mantine/core';
import "dayjs/locale/ar";
import "dayjs/locale/en";
import { ReactNode } from 'react';
import AltMainLayout from '../../../../lib/components/layout/main/alt';
import Footer from '../../../../lib/components/layout/main/Footer';
import AppProvider from '../../../../lib/context/AppProvider';
import "../../globals.css";

type Props = {
  children: ReactNode,
  params: Promise<{ locale: string; }>
}



const RootLayout = async ({ children, params }: Props) => {
  const { locale } = await params
  return (
    <AppProvider locale={locale}>
      <AltMainLayout>
        <Box mih={"calc(100vh - 80px)"}>
          {children}
        </Box>
        <Footer />
      </AltMainLayout>
    </AppProvider>
  )
}

export default RootLayout;

