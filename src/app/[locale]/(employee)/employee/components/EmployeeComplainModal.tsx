"use client"
import ConversationThreadLoading from "@/app/[locale]/(root)/user/complains/components/CitizenResponses/ConversationThreadLoading";
import { Badge, Box, Button, Card, Flex, Group, Modal, Progress, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { FaCalendar } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import useAxiosQuery from "../../../../../../lib/api/react-query/useAxiosQuery";
import endpoints from "../../../../../../lib/api/setup/ebdpoints";
import useBoolean from "../../../../../../lib/hooks/useBoolean";
import { getComplainStatusColor } from "./EmployeeComplainCard";
import EmployeeThreads from "./EmployeeThreads";

type Props = {
    complaint: complaintType
}

const EmployeeComplainModal = ({ complaint }: Props) => {
    const tCommon = useTranslations("common");
    const isOpen = useBoolean({ initialState: false });
    const complainsRequest = useAxiosQuery(endpoints.employee.getComplaintRespons(complaint.id), isOpen.value);
    const tComplains = useTranslations("complains");


    return (
        <>
            <Button
                size='compact-md'
                variant='light'
                onClick={isOpen.onTrue}
            >
                {tCommon("viewDetails")}
            </Button>
            <Modal
                opened={isOpen.value}
                onClose={isOpen.onFalse}
                centered
                size={1080}
                // withCloseButton={false}
                radius="lg"
                fullScreen
                styles={{
                    body: { backgroundColor: "var(--color-background-primary)" },
                    header: { backgroundColor: "var(--color-background-primary)" },
                    content: { backgroundColor: "var(--color-background-primary)" },
                }}
            >
                <Stack gap="lg">
                    <Card
                        radius="lg"
                        shadow="lg"
                    >
                        <Stack gap="xs">
                            {/* Header with Type Badge */}
                            <Group justify="space-between" align="center">
                                <Text
                                    fw={700}
                                    size="xl"
                                    c="emerald"
                                >
                                    {complaint.Title}
                                </Text>
                                <Badge
                                    variant="light"
                                    color={getComplainStatusColor(complaint.status)}
                                    size="lg"
                                    radius="xl"
                                >
                                    {tComplains(`status.${complaint.status}`)}
                                </Badge>
                            </Group>
                            {/* Content Section */}
                            <Box
                                p="xs"
                            >
                                <Group>
                                    <FaMessage size={18} />
                                    <Text fw={600} size="sm" display="inline-block">
                                        {tComplains("details")} :
                                    </Text>
                                </Group>
                                <Text
                                    size="md"
                                    c="dimmed"
                                    display="inline-block"
                                >
                                    {complaint.Content}
                                </Text>
                            </Box>
                            {/* Footer with Metadata */}
                            <Flex gap="xl" wrap="wrap">
                                <Group gap="xs" align="center" c="dimmed">
                                    <FaCalendar size={16} />
                                    <Text size="sm" fw={500} >
                                        {tComplains("sendDate")} :
                                    </Text>
                                    <Text size="sm" >
                                        {dayjs(complaint.complaint_created_at).format('D MMMM YYYY')}
                                    </Text>
                                </Group>
                                <Group gap="xs" align="center">
                                    <Badge
                                        variant="outline"
                                        color="gray"
                                        size="sm"
                                        style={{
                                            borderWidth: 1,
                                            fontWeight: 500
                                        }}
                                    >
                                        {tComplains("id")}: #{complaint.id}
                                    </Badge>
                                </Group>
                            </Flex>
                            {/* Status Indicator Bar */}
                            <Box mt="xs">
                                <Text size="sm" fw={500} mb="xs">
                                    {tComplains("progress")}:
                                </Text>
                                <Progress
                                    value={complaint.status === 'جديدة' ? 10 :
                                        complaint.status === 'قيد المعالجة' ? 40 :
                                            complaint.status === 'بانتظار الرد من المواطن' ? 60 :
                                                complaint.status === 'منجزة' ? 100 : 30}
                                    color={getComplainStatusColor(complaint.status)}
                                    animated
                                />
                                <Group justify="space-between" mt={4}>
                                    {['جديدة', 'قيد المعالجة', 'بانتظار الرد من المواطن', 'منجزة'].map((status) => (
                                        <Text
                                            key={status}
                                            size="xs"
                                            c={complaint.status === status ? getComplainStatusColor(status) : 'dimmed'}
                                            fw={complaint.status === status ? 600 : 400}
                                        >
                                            {tComplains(`status.${status}`)}
                                        </Text>
                                    ))}
                                </Group>
                            </Box>
                        </Stack>
                    </Card >
                    {
                        complainsRequest.isLoading
                            ? <ConversationThreadLoading />
                            : <EmployeeThreads
                                responserData={complainsRequest.data as AppResponse<complainResponseType[]>}
                                complainId={complaint.id}
                            />

                    }
                </Stack>
            </Modal>
        </>
    )
}

export default EmployeeComplainModal