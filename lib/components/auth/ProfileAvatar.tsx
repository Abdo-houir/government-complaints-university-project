"use client"

import useAuthContext from "@/app/context/auth/useAuthContext";
import { Avatar, Flex, Group, Stack, Text } from "@mantine/core";
import { useLocale } from "next-intl";

const ProfileAvatar = () => {
    const locale = useLocale();

    const { user } = useAuthContext();
    const FLName = locale === "ar" ? `${user?.FirstnameAr} ${user?.LastnameAr}` : `${user?.FirstnameEn || user?.FirstnameAr} ${user?.LastnameEn || user?.FirstnameAr}`

    return (
        <Flex justify="space-between" align="center">
            <Group >
                <Avatar
                    name={FLName}
                    size={45}
                    color="initials"
                />
                <Stack gap={0}>
                    <Text fz="md">
                        {FLName}
                    </Text>
                    <Text fz="sm" c="dimmed">
                        {user?.Email}
                    </Text>
                </Stack>
            </Group>
        </Flex>
    )
}

export default ProfileAvatar