"use client"
import MessageBar from "@/app/[locale]/(root)/components/MessageBar";
import { ActionIcon, Avatar, Badge, Box, Card, Divider, Flex, Group, ScrollArea, ScrollAreaAutosize, Stack, Text } from "@mantine/core";
import { IconBuilding, IconClock, IconUser } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaReply } from "react-icons/fa";
import { useMutate } from "../../../../../../../../lib/api/react-query/useMutate";
import endpoints from "../../../../../../../../lib/api/setup/ebdpoints";

type Props = {
    responses: complainResponseType[]
    currentUserId: number,
    maxHight: string | number
    auto?: boolean
    complainId: number
}


const ConversationThread = ({ responses, currentUserId, maxHight, auto, complainId }: Props) => {
    const [selectedMessage, setSelectedMessage] = useState<null | number>(null);


    const ResponseView = ({ response, currentUserId }: { response: complainResponseType, currentUserId: number }) => {
        const tComplain = useTranslations("complains")
        const isEmployee = response.EmployeeId !== null && response.EmployeeId !== 0;
        const isOwnResponse = currentUserId === response.UserId;

        return (
            <Card
                withBorder
                radius="md"
                p="md"
                shadow="sm"
            // ms={level * 30}
            >
                <Group justify="space-between" mb="md">
                    <Group gap="sm">
                        <Avatar
                            size="md"
                            color={isEmployee ? 'blue' : 'teal'}
                            radius="xl"
                        >
                            {isEmployee ? <IconBuilding size={18} /> : <IconUser size={18} />}
                        </Avatar>

                        <Box>
                            <Group gap="xs">
                                <Badge
                                    size="sm"
                                    color={isEmployee ? 'blue' : 'teal'}
                                    variant="light"
                                >
                                    {isEmployee ? tComplain("employee") : tComplain("citizen")}
                                </Badge>

                                {isOwnResponse && (
                                    <Badge size="xs" variant="filled" color="gray">
                                        {tComplain("you")}
                                    </Badge>
                                )}

                                {response.ParentId && (
                                    <Badge size="xs" variant="outline" color="gray">
                                        {tComplain("response")}
                                    </Badge>
                                )}
                            </Group>

                            <Group gap="xs" mt={4}>
                                <IconClock size={14} />
                                <Text size="sm" c="dimmed">
                                    {dayjs(response.created_at).format('D MMM YYYY - HH:mm')}
                                </Text>
                            </Group>
                        </Box>
                    </Group>
                    <Stack
                        justify="space-between"
                        align="center"
                    >
                        <Text size="xs" c="dimmed">
                            #{response.id}
                        </Text>
                        <ActionIcon
                            variant="light"
                            onClick={() => setSelectedMessage(response.id)}
                        >
                            <FaReply />
                        </ActionIcon>
                    </Stack>
                </Group>

                <Text size="md">
                    {response.Response}
                </Text>
            </Card>
        );
    }

    const RenderResponse = ({ response }: { response: complainResponseType }) => {

        if (response.children.length > 0) {
            return (
                <Stack gap={0}>
                    <ResponseView
                        currentUserId={currentUserId}
                        response={response}
                    />
                    <Flex ms={5} gap={"md"}>
                        <Divider
                            orientation="vertical"
                            size="xl"
                            color="emerald"
                            bdrs="md"
                        />
                        <Stack
                            // ms={30}
                            w={"100%"}
                            pt="md"
                        >
                            {
                                response.children.map(subResponse => (
                                    <RenderResponse
                                        response={subResponse}
                                        key={subResponse.id}
                                    />
                                ))
                            }
                        </Stack>
                    </Flex>
                </Stack>
            )
        } else {
            return (
                <>
                    <ResponseView
                        currentUserId={currentUserId}
                        response={response}
                    />
                </>
            )
        }
    }
    const TApi = useTranslations("apiMessages");

    const { loading, mutate } = useMutate(
        selectedMessage ? endpoints.complains.createRespons() : endpoints.complains.createComplaintRespons(),
        [endpoints.employee.employeeComplaints(1), endpoints.employee.getComplaintRespons(complainId)],
        "post",
        TApi("success"),
        () => { },
        () => { },
        true,
        false
    )

    if (auto) {
        return (
            <Stack>
                <ScrollAreaAutosize
                    mah={maxHight}
                >
                    <Stack>
                        {
                            responses.map(response => (
                                <RenderResponse response={response} key={response.id} />
                            ))
                        }
                    </Stack>
                </ScrollAreaAutosize>
                <MessageBar
                    onSubmit={(data) => {
                        const apiData = {
                            ComplaintId: complainId,
                            ParentId: selectedMessage,
                            ...data
                        }
                        mutate(apiData, true)
                    }}
                    isLoading={loading}

                />
            </Stack>
        )
    } else {
        return (
            <Stack>

                <ScrollArea
                    h={maxHight}
                >
                    <Stack>
                        {
                            responses.map(response => (
                                <RenderResponse response={response} key={response.id} />
                            ))
                        }
                    </Stack>
                </ScrollArea>
                <MessageBar
                    onSubmit={(data) => {
                        const apiData = {
                            ComplaintId: complainId,
                            ParentId: selectedMessage,
                            ...data
                        }
                        mutate(apiData, true)
                    }}
                    isLoading={loading}

                />
            </Stack>
        )
    }
}

export default ConversationThread