
import AuthProvider from '@/app/context/auth/AuthProvider';
import { routing } from '@/i18n/routing';
import dayjs from 'dayjs';
import "dayjs/locale/ar";
import "dayjs/locale/en";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import localFont from "next/font/local";
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import "../../src/app/globals.css";
import ClientSideInterceptor from '../api/setup/ClientRefresher';
import AppMantineProvider from './mantine/AppMantineProvider';
import MyQueryClient from './MyQueryClient';

type Props = {
    children: ReactNode,
    locale: string
}

dayjs.extend(customParseFormat);


const arabicFont = localFont({
    src: "../../public/fonts/Ar-ScheherazadeNew-Regular.ttf",
    variable: "--font-arabic",
});

const englishFont = localFont({
    src: "../../public/fonts/Ar-ScheherazadeNew-Regular.ttf",
    variable: "--font-english",
});



const AppProvider = ({ children, locale }: Props) => {
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    const font = locale === 'ar' ? arabicFont.className : englishFont.className;
    return (
        <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} >
            <body className={font}>
                <AppMantineProvider>
                    <NextIntlClientProvider>
                        <MyQueryClient>
                            <AuthProvider>
                                <ClientSideInterceptor />
                                    {children}
                            </AuthProvider>
                        </MyQueryClient>
                    </NextIntlClientProvider>
                </AppMantineProvider>
            </body>
        </html>

    )
}

export default AppProvider