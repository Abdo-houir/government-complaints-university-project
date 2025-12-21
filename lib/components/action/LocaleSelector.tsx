"use client"

import { usePathname, useRouter } from "@/i18n/navigation";
import { ActionIcon, Menu, MenuDropdown, MenuItem, MenuLabel, MenuTarget } from "@mantine/core";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { PiChecksBold } from "react-icons/pi";
import { setHeaderLang } from "../../api/setup/api";
import { setDayjsLocale } from "../../dayjs";

const SupportedLocales = [
    {
        flag: "/flags/sy.svg",
        value: "ar"
    },
    {
        flag: "/flags/gb.svg",
        value: "en"
    },
]


const LocaleSelector = () => {
    const locale = useLocale();
    const router = useRouter();
    const pathName = usePathname();

    const currentLocale = SupportedLocales.find((supportedLocale) => supportedLocale.value === locale)
    const switchLocale = (newLocale: string) => {
        if (newLocale !== locale) {
            setHeaderLang(newLocale);
            setDayjsLocale(newLocale as 'ar' | 'en');
            router.replace(pathName, { locale: newLocale });
            router.refresh();
        }
    }

    const t = useTranslations("locales")

    return (
        <Menu position="bottom">
            <MenuTarget>
                <ActionIcon>
                    <Image src={currentLocale?.flag || SupportedLocales[0].flag} alt={`${currentLocale?.value}-flag`} width={30} height={25} />

                </ActionIcon>
            </MenuTarget>
            <MenuDropdown >
                <MenuLabel></MenuLabel>
                {
                    SupportedLocales.map((supportedLocale) => {

                        return (
                            <MenuItem
                                leftSection={
                                    <Image src={supportedLocale.flag} alt={`${supportedLocale.value}-flag`} width={30} height={25} style={{ borderRadius: 5 }} />
                                }
                                rightSection={currentLocale?.value === supportedLocale.value && <PiChecksBold color="teal" />}
                                onClick={() => switchLocale(supportedLocale.value)}
                                key={supportedLocale.value}
                            >
                                {t(supportedLocale.value)}
                            </MenuItem>
                        );
                    })
                }
            </MenuDropdown>
        </Menu>
    )
}

export default LocaleSelector