import { Stack } from '@mantine/core';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AccessAppNow from './components/AccessAppNow';
import Faq from './components/Faq';
import HeroSection from './components/HeroSection';
import HowWeWorks from './components/HowWeWorks';
import OurServices from './components/OurServices';
import ParallaxSection from './components/Parallax';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.home")

  return {
    title: t("title"),
    description:  t("description"),
  }
}

const Home = () => {

  return (
    <Stack  mb={20} gap={0}>
      <HeroSection />
      <OurServices />
      <HowWeWorks />
      <ParallaxSection />
      <AccessAppNow />
      <Faq />
    </Stack>
  )
}

export default Home