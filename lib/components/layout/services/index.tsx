import { sidebarLinks } from '@/config-nav';
import { ActionIcon, AppShell, AppShellHeader, AppShellMain, AppShellNavbar, AppShellSection, Flex, Indicator } from '@mantine/core';
import { ReactNode } from 'react';
import { IoMdNotifications } from 'react-icons/io';
import ThemeToggle from '../../action/ThemeToggle';
import Logo from '../../identity/Logo';
import SidebarNavigation from '../../navigation/SidebarNavigation/SidebarNavigation';

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
                    borderRadius: "var(--mantine-radius-lg)",
                    backdropFilter: "blur(5px)",          // <-- blur effect
                    WebkitBackdropFilter: "blur(5px)",    // <-- Safari support
                    backgroundColor: "color-mix(in srgb, var(--color-background-card) 80%, transparent)",

                }}
                mx={10}
                my={5}
            >
                <Flex h={"100%"} align="center" justify="space-between" px={15}>
                    <Flex h={"100%"} align="center" justify="center" gap={15}>
                        <Indicator inline processing offset={8.5} color='red'>
                            <ActionIcon size="lg" color='cyan'>
                                <IoMdNotifications size={"80%"} />
                            </ActionIcon>
                        </Indicator>
                        <ThemeToggle />
                    </Flex>
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

                    />
                </AppShellSection>
                <AppShellSection grow px={"5%"} h={"100%"}>
                    <SidebarNavigation
                        links={sidebarLinks}

                        navLinkProps={{
                            style: {
                                borderRadius: " calc(infinity * 1px)",
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
            <AppShellMain mt={5}>
                {children}
            </AppShellMain>
        </AppShell >
    )
}

export default ServicesLayout