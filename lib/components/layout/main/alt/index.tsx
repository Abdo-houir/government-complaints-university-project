import { sidebarLinks } from '@/config-nav';
import PATHS from '@/paths';
import { AppShell, AppShellHeader, AppShellMain, Box, Flex, Group } from '@mantine/core';
import { ReactNode } from 'react';
import LocaleSelector from '../../../action/LocaleSelector';
import ThemeSelector from '../../../action/ThemeSelector';
import Logo from '../../../identity/Logo';
import AppNavigation from '../../../navigation/AppNavigation/AppNavigation';
import MenuNavigation from '../../../navigation/menuNavigation/MenuNavigation';

type props = {
    children: ReactNode
}
const AltMainLayout = ({ children }: props) => {

    return (
        <AppShell
            header={{ height: 65,offset: true }}
            layout='alt'
            padding={0}
            withBorder={true}
        >
            <AppShellHeader
                style={{
                    boxShadow: "var(--mantine-shadow-lg)",
                    borderRadius: "var(--mantine-radius-lg)",
                    backdropFilter: "blur(5px)",          // <-- blur effect
                    WebkitBackdropFilter: "blur(5px)",    // <-- Safari support
                    backgroundColor: "color-mix(in srgb, var(--color-background-card) 80%, transparent)",
                }}
                mx={"10vw"}
                mt={15}
            >
                <Flex justify="space-between" align="center" h="100%" px="lg">
                    <Logo
                        width={50}
                        height={50}
                        isLink
                        href={PATHS.home.index}
                    />
                    <Box visibleFrom='md'>
                        <AppNavigation
                            links={sidebarLinks}
                            navLinkProps={{
                                styles: {
                                    root: {
                                        transition: 'background-color 150ms ease',
                                        '&:hover': {
                                            backgroundColor: '#e6e6ff !important',
                                        },
                                        '&[dataHovered]': {
                                            backgroundColor: '#e6e6ff',
                                        },
                                        borderRadius: "var(--mantine-radius-md)"
                                    },
                                }


                            }}
                        />
                    </Box>

                    <Group>
                        <ThemeSelector asIcon />
                        <LocaleSelector />
                        <Box hiddenFrom='md'>
                            <MenuNavigation
                                links={sidebarLinks}
                                containerProps={{
                                    width: "75vw",
                                }}
                            />
                        </Box>
                    </Group>
                </Flex>
            </AppShellHeader>
            <AppShellMain pt={75}>
                {children}
            </AppShellMain>
        </AppShell >
    )
}

export default AltMainLayout