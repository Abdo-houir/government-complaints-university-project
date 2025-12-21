
import { Flex, FlexProps, Group, GroupProps, Skeleton, Stack, StackProps } from "@mantine/core";

type Props = {
    emailNameStackProps?: StackProps
    avatarDetailsGroupProps?: GroupProps
    mainContainerFlexProps?: FlexProps
};

const ProfileAvatarSkeleton = ({
    emailNameStackProps,
    avatarDetailsGroupProps,
    mainContainerFlexProps,
}: Props) => {

    return (
        <Flex justify="space-between" align="center" {...mainContainerFlexProps}>
            <Group {...avatarDetailsGroupProps}>
                {/* Avatar placeholder */}
                <Skeleton circle height={45} width={45} />
                <Stack
                    gap={5}
                    {...emailNameStackProps}
                    style={{ textAlign: "start" }}
                >
                    {/* Name placeholder */}
                    <Skeleton height={20} width={120} radius="sm" />
                    {/* Email placeholder */}
                    <Skeleton height={15} width={180} radius="sm" />
                </Stack>
            </Group>
        </Flex>
    );
};

export default ProfileAvatarSkeleton;
