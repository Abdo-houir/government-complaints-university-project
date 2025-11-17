import { Stack } from '@mantine/core';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import HeroSection from './components/HeroSection';
import HowWeWorks from './components/HowWeWorks';
import OurServices from './components/OurServices';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.home")

  return {
    title: t("title"),
    description:  t("description"),
  }
}

const Home = () => {

  return (
    <Stack gap={0}>
      <HeroSection />
      <OurServices />
      <HowWeWorks />
    </Stack>
  )
}

export default Home