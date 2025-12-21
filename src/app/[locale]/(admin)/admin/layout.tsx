import { Box } from '@mantine/core';
import "dayjs/locale/ar";
import "dayjs/locale/en";
import { ReactNode } from 'react';
import ServicesLayout from '../../../../../lib/components/layout/services';
import AppProvider from '../../../../../lib/context/AppProvider';
import "../../../globals.css";

type Props = {
  children: ReactNode,
  params: Promise<{ locale: string; }>
}



const AdminLayout = async ({ children, params }: Props) => {
  const { locale } = await params
  return (
    <AppProvider locale={locale}>
      <ServicesLayout>
        <Box mih={"calc(100vh - 80px)"}>
          {children}
        </Box>
      </ServicesLayout>
    </AppProvider>
  )
}

export default AdminLayout;

