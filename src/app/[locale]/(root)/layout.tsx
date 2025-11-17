import { routing } from '@/i18n/routing';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import localFont from "next/font/local";
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import AltMainLayout from '../../../../lib/components/layout/main/alt';
import AppProvider from '../../../../lib/context/AppProvider';
import "../../globals.css";

type Props = {
  children: ReactNode,
  params: Promise<{ locale: string }>
}

const arabicFont = localFont({
  src: "../../fonts/Ar-ScheherazadeNew-Regular.ttf",
  variable: "--font-arabic",
});

const englishFont = localFont({
  src: "../../fonts/En-Lugrasimo-Regular.ttf",
  variable: "--font-english",
});

const RootLayout = async ({ children, params }: Props) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const font = locale === 'ar' ? arabicFont.className : englishFont.className;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} >
      <body className={font}>
        <NextIntlClientProvider>
          <AppProvider>
            <AltMainLayout>
              {children}
            </AltMainLayout>
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout;
//! SSG
export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }))
}
