"use client"

import useAuthContext from "@/app/context/auth/useAuthContext";
import { Link } from "@/i18n/navigation";
import PATHS from "@/paths";
import { Group, MenuDivider, MenuItem, Stack, Text } from "@mantine/core";
import { useLocale } from "next-intl";
import { GrDashboard } from "react-icons/gr";
import { IoLogOut } from "react-icons/io5";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { textIcon } from "../../../context/mantine/styles";


const ProfileDropdown = () => {
    const locale = useLocale();

    const { user, logout, role } = useAuthContext();

    if (user) {

        const fullNameEn = `${user.FirstnameEn} ${user.MiddlenameEn} ${user.LastnameEn}`
        const fullNameAr = `${user.FirstnameAr} ${user.MiddlenameAr} ${user.LastnameAr}`
        const firstRole: AvailableRolesType = role ? role[0]?.name : "user"
        return (
            <>
                <Stack gap={0} p={5}>
                    <Group>
                        <Text fw={600} fz="md" style={textIcon}>
                            <RiAccountPinBoxFill size={25} />
                            {locale === "ar" ? fullNameAr : fullNameEn}
                        </Text>
                        <Text fz="sm" c="dimmed">
                            {locale === "ar" ? fullNameEn : fullNameAr}
                        </Text>
                    </Group>
                    <Text fz="sm" c="dimmed">
                        {user.Email}
                    </Text>
                </Stack>
                <MenuDivider />
                {
                    firstRole === "admin" ?
                    <MenuItem
                        leftSection={<GrDashboard />}
                        color="emerald"
                        component={Link}
                        href={firstRole === "admin" ? PATHS.admin.agencies.index : PATHS.home.index}
                    >
                        Dashboard
                    </MenuItem>
                    :  firstRole === "agencyManager" ?
                    <MenuItem
                        leftSection={<GrDashboard />}
                        color="emerald"
                        component={Link}
                        href={firstRole === "agencyManager" ? PATHS.agencyManager.employees.index : PATHS.home.index}
                    >
                        Dashboard
                    </MenuItem>
                    :  firstRole === "employee" &&
                    <MenuItem
                        leftSection={<GrDashboard />}
                        color="emerald"
                        component={Link}
                        href={firstRole === "employee" ? PATHS.employee.complains : PATHS.home.index}
                    >
                        Dashboard
                    </MenuItem>
                }
                <MenuItem
                    leftSection={<IoLogOut />}
                    color="red"
                    onClick={logout}
                >
                    logout
                </MenuItem>

            </>
        )
    }
}

export default ProfileDropdown