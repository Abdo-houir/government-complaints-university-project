"use client"
import { ActionIcon, Button, MantineColorScheme, Menu, MenuDropdown, MenuItem, MenuLabel, MenuTarget, Tooltip, useMantineColorScheme } from "@mantine/core";
import { useTranslations } from "next-intl";
import { FaCloudMoon, FaCloudSun } from "react-icons/fa";
import { GrSystem } from "react-icons/gr";
import { PiChecksBold } from "react-icons/pi";

const ThemeMods = [
    {
        icon: <GrSystem />,
        color: "var(--mantine-primary-color-5)",
        key: "auto"
    },
    {
        icon: <FaCloudMoon />,
        color: "indigo",
        key: "dark"
    },
    {
        icon: <FaCloudSun />,
        color: "orange",
        key: "light"

    }
];

type Props = {
    asIcon?: boolean
}
const ThemeSelector = ({ asIcon = false }: Props) => {
    const { setColorScheme, colorScheme } = useMantineColorScheme();

    const t = useTranslations("theme")
    const currentThemeMode = ThemeMods.find((themeMode) => themeMode.key === colorScheme) || ThemeMods[0];

    return (
        <Menu position="bottom">
            <MenuTarget>
                {
                    asIcon
                        ?
                        <Tooltip label={t(`${currentThemeMode.key}.label`)}>
                            <ActionIcon
                                variant="transparent"
                                size="lg"
                                radius="xl"
                                aria-label="Toggle color scheme"
                                color={currentThemeMode.color}
                            >
                               {currentThemeMode.icon}
                            </ActionIcon>
                        </Tooltip>
                        :
                        <Button
                            variant="light"
                            style={{
                                textTransform: "capitalize"
                            }}
                            color={currentThemeMode.color}
                            leftSection={currentThemeMode.icon}
                            radius="md"
                        >
                            {t(`${currentThemeMode.key}.shotLabel`)}
                        </Button>
                }
            </MenuTarget>
            <MenuDropdown >
                <MenuLabel>{t("title")}</MenuLabel>
                {
                    ThemeMods.map((themeMode) => {

                        return (
                            <MenuItem
                                leftSection={themeMode.icon}
                                rightSection={currentThemeMode.key === themeMode.key && <PiChecksBold color="teal" />}
                                color={themeMode.color}
                                onClick={() => setColorScheme(themeMode.key as MantineColorScheme)}
                                key={themeMode.key}
                            >
                                {t(`${themeMode.key}.label`)}
                            </MenuItem>
                        );
                    })
                }
            </MenuDropdown>
        </Menu>
    )
}

export default ThemeSelector