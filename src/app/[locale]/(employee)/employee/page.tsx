import { Stack } from '@mantine/core';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import PageHeader from '../../../../../lib/components/pages/PageHeader';
import EmployeeHomePageContent from './EmployeeHomePageContent';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.home")

  return {
    title: t("title"),
    description: t("description"),
  }
}

const EmployeeHomePage = () => {
  const tE = useTranslations("employee")

  return (
    <Stack p={25}>
      <PageHeader 
      title={tE("title")}

      />
      <EmployeeHomePageContent />
    </Stack>
  )
}

export default EmployeeHomePage