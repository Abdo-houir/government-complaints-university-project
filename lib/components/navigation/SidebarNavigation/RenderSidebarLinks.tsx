"use client";

import useAuthContext from "@/app/context/auth/useAuthContext";
import { employeeLinks, managerLinks, questLinks } from "@/config-nav";
import { usePathname } from "@/i18n/navigation";
import { List, NavLink, NavLinkProps, Popover, Tooltip } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useTranslations } from "next-intl";
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';

type Props = {
    items: LinkType[],
    isIconOnlyProp?: string,
    invertIcon?: boolean;
    navLinkProps?: NavLinkProps;
    full: boolean
}

const RenderSidebarLinks = ({ isIconOnlyProp, invertIcon, navLinkProps, full = false }: Props) => {
    const pathname = usePathname();
    const isIconOnly = useMediaQuery(isIconOnlyProp || "none");
    const t = useTranslations("navigation");

    const {role} = useAuthContext();

    const [links,setLinks] = useState<LinkType[]>(questLinks);


    useEffect(() => {
        if (role && role.length > 0) {
            const firstRole:AvailableRolesType = role[0].name;
            
            if (firstRole === "agencyManager") {
                setLinks(managerLinks)
            }

            if (firstRole === "employee") {
                setLinks(employeeLinks)
            }
        }
    },[role]);

    const renderLinks = (items: LinkType[], full: boolean = false): ReactNode =>
        items.map((link) => {
            const isActive = (pathname === link.href) || (window.location.hash === link.href);

            // ✅ Collapsed sidebar (icon-only)
            if (isIconOnly && !full) {
                // if link has children → use Popover to show submenu
                if (link.children?.length) {
                    return (
                        <Popover key={link.href} position="right-start" withArrow shadow="md">
                            <Popover.Target>
                                <Tooltip label={t(link.label)}>
                                    <NavLink
                                        label={link.icon}
                                        active={isActive}
                                        {...navLinkProps}
                                    />
                                </Tooltip>
                            </Popover.Target>
                            <Popover.Dropdown p={4}>
                                <List >
                                    {renderLinks(link.children, true)}
                                </List>
                            </Popover.Dropdown>
                        </Popover>
                    );
                }

                // simple link → tooltip only
                return (
                    <Tooltip label={t(link.label)} key={link.href}>
                        <NavLink
                            component={Link}
                            href={link.href}
                            label={link.icon}
                            active={isActive}
                            {...navLinkProps}
                        />
                    </Tooltip>
                );
            }
            // ✅ Expanded sidebar
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
                        {/* <Divider mb={2}/> */}
                        {renderLinks(link.children, full)}
                        {/* <Divider mt={2}/> */}
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

    return renderLinks(links, full);
}

export default RenderSidebarLinks