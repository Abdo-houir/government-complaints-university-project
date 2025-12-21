"use client"
import useAuthContext from "@/app/context/auth/useAuthContext";
import { citizenLinks, employeeLinks, managerLinks, questLinks } from "@/config-nav";
import { usePathname } from "@/i18n/navigation";
import { List, Menu, NavLink, NavLinkProps } from "@mantine/core";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { textIcon } from "../../../context/mantine/styles";

type Props = {
    items: LinkType[],
    invertIcon?: boolean;
    navLinkProps?: NavLinkProps;
}

const RenderAppLinks = ({ invertIcon, navLinkProps }: Props) => {
    const pathname = usePathname();
    const t = useTranslations("navigation");
    const { role } = useAuthContext();

    const [links, setLinks] = useState<LinkType[]>(questLinks);


    useEffect(() => {
        if (role && role.length > 0) {
            const firstRole: AvailableRolesType = role[0].name;

            if (firstRole === "user") {
                setLinks(citizenLinks)
            }

            if (firstRole === "agencyManager") {
                setLinks(managerLinks)
            }

            if (firstRole === "employee") {
                setLinks(employeeLinks)
            }
        }
    }, [role]);


    const renderLinks = (items: LinkType[], full: boolean): ReactNode =>
        items.map((link) => {
            const isActive = (pathname === link.href) || (window.location.hash === link.href);

            if (link.children?.length && !full) {
                return (
                    <Menu key={link.href} withArrow shadow="md" trigger="click">
                        <Menu.Target>
                            <NavLink
                                key={link.href}
                                label={t(link.label)}
                                leftSection={!invertIcon ? link.icon : undefined}
                                rightSection={invertIcon ? link.icon : undefined}
                                // childrenOffset={28}
                                active={isActive}
                                {...navLinkProps}
                            >
                                <div style={{ display: "none" }}></div>
                            </NavLink>
                        </Menu.Target>
                        <Menu.Dropdown >
                            <Menu.Label style={textIcon}>
                                {link.icon}
                                {t(link.label)}
                            </Menu.Label>
                            <Menu.Divider />
                            <List >
                                {renderLinks(link.children, true)}
                            </List>
                        </Menu.Dropdown>
                    </Menu>
                )
            }

            if (link.children?.length) {
                return (
                    <NavLink
                        key={link.href}
                        label={t(link.label)}
                        leftSection={!invertIcon ? link.icon : undefined}
                        rightSection={invertIcon ? link.icon : undefined}
                        // childrenOffset={28}
                        active={isActive}
                        {...navLinkProps}
                    >
                        {renderLinks(link.children, true)}
                    </NavLink>
                );
            }

            // ✅ Regular item
            return (
                <NavLink
                    key={link.href}
                    component={Link}
                    href={link.href}
                    label={t(link.label)}
                    leftSection={!invertIcon ? link.icon : undefined}
                    rightSection={invertIcon ? link.icon : undefined}
                    active={isActive}
                    {...navLinkProps}
                />
            );
        });

    return renderLinks(links, false);

}

export default RenderAppLinks