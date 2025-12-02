import { sidebarLinks } from '@/config-nav';
import { Link } from '@/i18n/navigation';
import PATHS from '@/paths';
import { AppShell, AppShellHeader, AppShellMain, Box, Button, Flex, Group, Loader } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';
import { SiSimplelogin } from 'react-icons/si';
import LocaleSelector from '../../../action/LocaleSelector';
import ThemeSelector from '../../../action/ThemeSelector';
import AuthSwitcher from '../../../auth/AuthSwitcher';
import ProfileAvatar from '../../../auth/ProfileAvatar';
import Logo from '../../../identity/Logo';
import AppNavigation from '../../../navigation/AppNavigation/AppNavigation';
import MenuNavigation from '../../../navigation/menuNavigation/MenuNavigation';

type props = {
    children: ReactNode
}
const AltMainLayout = ({ children }: props) => {
    const tC = useTranslations("common");


    return (
        <AppShell
            header={{ height: 65, offset: true }}
            layout='alt'
            padding={0}
            mih={"100vh"}
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
                    <Group>
                        <Logo
                            width={50}
                            height={50}
                            isLink
                            href={PATHS.home.index}
                        />
                        <AuthSwitcher
                            authenticatedComponent={
                                <ProfileAvatar />
                            }
                            unauthenticatedComponent={
                                <>
                                    <Button
                                        leftSection={<SiSimplelogin />}
                                        size="sm"
                                        radius="md"
                                        variant="filled"
                                        visibleFrom='xs'
                                    >
                                        <Link href={PATHS.auth.login}>
                                            {tC("login")}
                                        </Link>
                                    </Button>
                                </>
                            }
                            loadingComponent={
                                <Loader type='dots' />
                            }
                        />
                    </Group>
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
            <AppShellMain pt={75} >
                {children}
            </AppShellMain>
        </AppShell >
    )
}

export default AltMainLayout