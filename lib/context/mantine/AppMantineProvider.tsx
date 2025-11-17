import { createTheme, DirectionProvider, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ReactNode } from 'react';


type Props = {
    children: ReactNode
}

const theme = createTheme({
    focusRing: 'auto',
    white: '#F6F6F6',
    black: '#000000',
    primaryColor: 'emerald',
    autoContrast: true,
    // activeClassName: activeClasses.cozy,
    // focusClassName: activeClasses.focus,
    breakpoints: {
        sm: "640px",
        md: '768px',
        lg: '1024px',
        xl: '1280px',
    },
    colors: {
        emerald: [
            "#E6F7F4", // 50 - very light tint
            "#CFF0EB", // 100 - soft pastel
            "#A8E2D9", // 200 - light
            "#7FD3C6", // 300 - mid-light
            "#55C4B3", // 400 - base
            "#3AA99A", // 500 - slightly darker
            "#2F8C80", // 600 - medium dark
            "#257066", // 700 - dark
            "#1B544D", // 800 - very dark
            "#123833"  // 900 - deep shade
        ]
    },
    components: {
        PasswordInput: {
            defaultProps: {
                visibilityToggleButtonProps: {
                    radius: "xl",
                },
            },
        },
        Input: {
            styles: {
                input: { backgroundColor: "var(--color-background-primary)" },
                label: { color: "var(--color-primary-main)" }
            },
        },
        ScrollArea: {
            defaultProps: {
                scrollbarSize: 5,
            },
        },
        Paper: {
            styles: {
                root: {
                    backgroundColor: "var(--color-background-card)",
                    color: "var(--color-text-primary)",
                },
            },
        },
        AppShell: {
            styles: {
                header: { backgroundColor: "var(--color-background-card)" },
                navbar: { backgroundColor: "var(--color-background-card)" },
                footer: { backgroundColor: "var(--color-background-card)" },
                aside: { backgroundColor: "var(--color-background-card)" },
                main: { backgroundColor: "var(--color-background-primary)" },
            },
        },
        Menu: {
            styles: {
                dropdown: { backgroundColor: "var(--color-background-card)" },
            },
            defaultProps: {
                withArrow: true,
            },
        },

        Modal: {
            styles: {
                body: { backgroundColor: "var(--color-background-card)" },
                header: { backgroundColor: "var(--color-background-card)" },
            },
        },
        Popover: {
            styles: {
                dropdown: { backgroundColor: "var(--color-background-card)" },
            },
        },

        Blockquote: {
            styles: {
                icon: { backgroundColor: "var(--color-background-primary)" },
            },
        },
        Notification: {
            styles: {
                root: {
                    backgroundColor: "var(--color-background-card)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                },
            },
        },
        Drawer: {
            styles: {
                header: { backgroundColor: "var(--color-background-card)" },
            },
        },
        Tooltip: {
            defaultProps: {
                withArrow: true,
            },
            // styles: {
            //     tooltip: {
            //         backgroundColor: "var(--color-background-card)",
            //         color: "var(--color-text-primary)",
            //     },
            // },
        },
        ActionIcon: {
            defaultProps: {
                variant: "subtle",
                radius: "xl"
            }
        },
        Table: {
            styles: {
                thead: { backgroundColor: "var(--color-background-card)" },
                th: { backgroundColor: "var(--color-background-card)" },
            },
            defaultProps: {
                stickyHeader: true,
                striped: true,
                highlightOnHover: true,
            },
        },
        TableThead: {
            defaultProps: {
                c: "indigo",
            },
        },
    },
});

const AppMantineProvider = ({ children }: Props) => {
    return (
        <DirectionProvider detectDirection >
            <MantineProvider theme={theme} defaultColorScheme='auto'>
                {children}
                <Notifications />
            </MantineProvider>
        </DirectionProvider>
    )
}

export default AppMantineProvider