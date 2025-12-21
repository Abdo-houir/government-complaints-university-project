"use client"

import useAuthContext from "@/app/context/auth/useAuthContext";
import { Avatar, Flex, FlexProps, Group, GroupProps, Stack, StackProps, Text } from "@mantine/core";
import { useLocale } from "next-intl";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

type Props = {
    emailNameStackProps?: StackProps
    emailNameArrowFlexProps?: FlexProps
    avatarDetailsGroupProps?: GroupProps
    mainContainerFlexProps?: FlexProps
}
const ProfileAvatar = ({ emailNameStackProps, emailNameArrowFlexProps, avatarDetailsGroupProps, mainContainerFlexProps }: Props) => {
    const locale = useLocale();

    const { user } = useAuthContext();
    const FLName = locale === "ar" ? `${user?.FirstnameAr} ${user?.LastnameAr}` : `${user?.FirstnameEn || user?.FirstnameAr} ${user?.LastnameEn || user?.FirstnameAr}`

    return (
        <Flex justify="space-between" align="center" {...mainContainerFlexProps}>
            <Group {...avatarDetailsGroupProps}>
                <Avatar
                    name={FLName}
                    size={45}
                    color="initials"
                />
                <Flex align="center" gap={5} {...emailNameArrowFlexProps} c="var(--color-text-primary)">
                    <Stack gap={0} {...emailNameStackProps} style={{textAlign: "start"}}>
                        <Text fz="md" c="emerald">
                            {FLName}
                        </Text>
                        <Text fz="sm" c="dimmed">
                            {user?.Email}
                        </Text>
                    </Stack>
                    {
                        locale === "ar" ? <MdKeyboardArrowLeft size={25} /> : <MdKeyboardArrowRight size={25} />
                    }
                </Flex>
            </Group>
        </Flex>
    )
}

export default ProfileAvatar