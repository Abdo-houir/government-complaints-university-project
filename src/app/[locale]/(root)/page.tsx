import { Stack } from '@mantine/core';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import AccessAppNow from './components/AccessAppNow';
import Faq from './components/Faq';
import HeroSection from './components/HeroSection';
import HowWeWorks from './components/HowWeWorks';
import AccessAppNowSkeleton from './components/loadings/AccessAppNowSkeleton';
import FaqSkeleton from './components/loadings/FaqSkeleton';
import HeroSectionSkeleton from './components/loadings/HeroSectionSkeleton';
import HowWeWorksSkeleton from './components/loadings/HowWeWorksSkeleton';
import OurServicesSkeleton from './components/loadings/OurServicesSkeleton';
import ParallaxSectionSkeleton from './components/loadings/ParallaxSectionSkeleton';
import OurServices from './components/OurServices';
import ParallaxSection from './components/Parallax';

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
      {/* //# */}
      <Suspense fallback={<HeroSectionSkeleton />}>
        <HeroSection />
      </Suspense>
      {/*//#  */}
      <Suspense fallback={<OurServicesSkeleton />}>
        <OurServices />
      </Suspense>
      {/*//#  */}
      <Suspense fallback={<HowWeWorksSkeleton />}>
        <HowWeWorks />
      </Suspense>
      {/*//#  */}
      <Suspense fallback={<ParallaxSectionSkeleton />}>
        <ParallaxSection />
      </Suspense>
      {/*//#  */}
      <Suspense fallback={<AccessAppNowSkeleton />}>
        <AccessAppNow />
      </Suspense>
      {/*//#  */}
      <Suspense fallback={<FaqSkeleton />}>
        <Faq />
      </Suspense>
    </Stack>
  )
}

export default Home