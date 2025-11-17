import { sidebarLinks } from '@/config-nav';
import { breakpoints } from '@/constants';
import PATHS from '@/paths';
import { AppShell, AppShellAside, AppShellHeader, AppShellMain, AppShellNavbar, AppShellSection, Flex, Group } from '@mantine/core';
import { ReactNode } from 'react';
import LocaleSelector from '../../action/LocaleSelector';
import ThemeSelector from '../../action/ThemeSelector';
import Logo from '../../identity/Logo';
import SidebarNavigation from '../../navigation/SidebarNavigation/SidebarNavigation';
import "./x-layout.css";
type props = {
    children: ReactNode
}
const XLayout = ({ children }: props) => {

    return (
        <AppShell
            header={{ height: 65 }}
            navbar={{
                width: { base: 50, sm: 225, xl: 400 },
                breakpoint: 'null',
            }}
            aside={{
                width: { base: 0, lg: 225, xl: 400 },
                breakpoint: 'xl',
                collapsed: { mobile: true },
            }}
            layout='alt'
            withBorder={true}
            styles={{
                header: { backgroundColor: "var(--color-background-primary)" },
                navbar: { backgroundColor: "var(--color-background-primary)" },
                footer: { backgroundColor: "var(--color-background-primary)" },
                aside: { backgroundColor: "var(--color-background-primary)" },
                main: { backgroundColor: "var(--color-background-primary)" },
            }}
        >
            <AppShellHeader>
                <Flex justify="space-between" align="center" h={"100%"}>
                    <Group px={15}>
                        <LocaleSelector />
                        <ThemeSelector asIcon />
                    </Group>
                </Flex>
            </AppShellHeader>
            <AppShellNavbar ps={{ base: 0, xl: 150 }} style={{ overflow: "scroll" }}>
                <AppShellSection p={{ base: 5, sm: 10 }}>
                    <Logo
                        height={50}
                        width={50}
                        isLink
                        href={PATHS.home.index}
                    />
                </AppShellSection>
                <AppShellSection grow px={"5%"} h={"100%"}>
                    <SidebarNavigation
                        links={sidebarLinks}

                        navLinkProps={{
                            className: "x-navLink",
                            variant: "light",
                        }}
                        isIconOnlyProp={breakpoints.down.sm}
                    />
                    {/*   <SigninSwapAction
                        action={
                            <Center>
                                <Button fullWidth variant="filled" radius="lg" visibleFrom="sm">
                                    Post
                                </Button>
                                <ActionIcon variant="filled" radius="md" hiddenFrom="sm">
                                    <GiFeather /> +
                                </ActionIcon>
                            </Center>
                        }
                    /> */}
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
            <AppShellAside ps={20} py={20} pe={{ base: 0, xl: 150 }}>
                <AppShellSection>
                </AppShellSection>
            </AppShellAside >
            <AppShellMain>
                {children}
            </AppShellMain>
        </AppShell >
    )
}

export default XLayout