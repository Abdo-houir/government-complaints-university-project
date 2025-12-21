import { Stack } from '@mantine/core';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.home")

  return {
    title: t("title"),
    description: t("description"),
  }
}

const Home = () => {

  return (
    <Stack mb={20} gap={0}>
     ssss
    </Stack>
  )
}

export default Home