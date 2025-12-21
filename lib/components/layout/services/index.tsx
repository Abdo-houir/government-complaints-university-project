import { questLinks } from '@/config-nav';
import { Link } from '@/i18n/navigation';
import PATHS from '@/paths';
import { AppShell, AppShellHeader, AppShellMain, AppShellNavbar, AppShellSection, Box, Button, Flex, Group, Stack } from '@mantine/core';
import { ReactNode } from 'react';
import { SiSimplelogin } from 'react-icons/si';
import LocaleSelector from '../../action/LocaleSelector';
import ThemeSelector from '../../action/ThemeSelector';
import AuthBoundary from '../../auth/AuthBoundary';
import ProfileAvatar from '../../auth/ProfileAvatar/ProfileAvatar';
import ProfileAvatarSkeleton from '../../auth/ProfileAvatar/ProfileAvatarSkeleton';
import ProfileMenu from '../../auth/ProfileMenu';
import ProfileDropdown from '../../auth/profile/ProfileDropdown';
import Logo from '../../identity/Logo';
import SidebarNavigation from '../../navigation/SidebarNavigation/SidebarNavigation';
import MyDrawer from '../drawers/MyDrawer';

type props = {
    children: ReactNode
}
const ServicesLayout = ({ children }: props) => {

    return (
        <AppShell
            header={{ height: 65 }}
            navbar={{
                width: { base: 250, lg: 300, xl: 325 },
                breakpoint: 'md',
                collapsed: { mobile: true },
            }}

            layout='alt'
            withBorder={false}
        >
            <AppShellHeader
                style={{
                    boxShadow: "var(--mantine-shadow-xl)",
                    borderBottomRightRadius: "var(--mantine-radius-lg)",
                    backdropFilter: "blur(5px)",          // <-- blur effect
                    WebkitBackdropFilter: "blur(5px)",    // <-- Safari support
                    backgroundColor: "color-mix(in srgb, var(--color-background-card) 80%, transparent)",
                }}
            >
                <Flex h={"100%"} align="center" justify="space-between" px={15}>
                    <Flex h={"100%"} align="center" justify="center" gap={15}>
                        <Box hiddenFrom='md'>
                            <MyDrawer>
                                <Stack gap={15} px={5}>
                                    <Logo
                                        width={75}
                                        height={75}
                                        isSmall={false}
                                    />
                                    <SidebarNavigation
                                        links={questLinks}
                                        navLinkProps={{
                                            style: {
                                                borderRadius: "var(--mantine-radius-sm)",
                                                textTransform: "uppercase",
                                                width: "100%",
                                                fontWeight: 600,
                                            },
                                            variant: "light",
                                        }}
                                    />
                                </Stack>
                            </MyDrawer>
                        </Box>
                        <ThemeSelector asIcon />
                        <LocaleSelector />
                    </Flex>
                    <Group>
                        <Logo
                            width={50}
                            height={50}
                            isLink
                            href={PATHS.home.index}
                        />
                        <AuthBoundary
                            authenticatedComponent={
                                <ProfileMenu
                                    target={
                                        <ProfileAvatar
                                            emailNameArrowFlexProps={{
                                                visibleFrom: "md"
                                            }}
                                        />
                                    }
                                    content={<ProfileDropdown />}
                                />
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
                                            remove
                                        </Link>
                                    </Button>
                                </>
                            }
                            loadingComponent={
                                <ProfileAvatarSkeleton />
                            }
                        />
                    </Group>
                </Flex>
            </AppShellHeader>
            <AppShellNavbar
                style={{
                    overflow: "scroll",
                    boxShadow: "var(--mantine-shadow-xl)",
                }}
            >
                <AppShellSection p={{ base: 5, sm: 10 }}>
                    <Logo
                        width={75}
                        height={75}
                        isSmall={false}
                    />
                </AppShellSection>
                <AppShellSection grow px={"5%"} h={"100%"}>
                    <SidebarNavigation
                        links={questLinks}

                        navLinkProps={{
                            style: {
                                borderRadius: "var(--mantine-radius-sm)",
                                textTransform: "uppercase",
                                width: "100%",
                                fontWeight: 600,
                            },
                            variant: "light",
                        }}
                    />
                </AppShellSection>
                <AppShellSection py={20} p={{ base: 1, sm: 20 }}>
                    <Flex justify={{ base: "center", sm: "normal" }}>
                        {/* <AuthenticatedDisplay
                            authenticatedElement={
                                <User
                                    size={45}
                                    breakpoint="sm"
                                    fz="xs"
                                />
                            }

                        /> */}
                    </Flex>
                </AppShellSection>
            </AppShellNavbar>
            <AppShellMain >
                {children}
            </AppShellMain>
        </AppShell >
    )
}

export default ServicesLayout