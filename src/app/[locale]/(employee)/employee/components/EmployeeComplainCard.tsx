"use client"
import { Badge, Box, Card, Group, Stack, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { FaCalendar } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import dayjs from '../../../../../../lib/dayjs';
import EmployeeComplainModal from './EmployeeComplainModal';


type Props = {
    complaint: complaintType
}

/* 
"status": {
            "new": "new",
            "processing": "Under processing",
            "awaitingCitizen": "Awaiting citizen response",
            "Completed": "Completed",
            "rejected": "rejected",
            "repliedBytCitizen": "The citizen responded"
        }
*/

export const getComplainStatusColor = (status: ComplainStatusType) => {
    const statusColors: Record<string, string> = {
        'جديدة': 'cyan',
        'قيد المعالجة': 'yellow',
        'بانتظار الرد من المواطن': 'orange',
        'منجزة': 'green',
        'مرفوضة': 'red',
        'تم الرد من قبل المواطن': 'teal'
    };
    return statusColors[status] || 'gray';
};

const EmployeeComplainCard = ({ complaint }: Props) => {
    const tComplains = useTranslations("complains");

    return (
        <Card
            radius="lg"
            shadow="lg"
        >
            <Stack gap="lg">
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
                    p="md"
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
                <Box
                    p="md"
                    style={{
                        borderRadius: 'var(--mantine-radius-md)',
                        border: '1px solid var(--mantine-color-gray-5)'
                    }}
                >
                    <Stack gap="xs">

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
                    </Stack>
                </Box>

                {/* Status Indicator Bar */}
                <Box
                    style={{
                        height: 4,
                        backgroundColor: 'var(--mantine-color-gray-2)',
                        borderRadius: 'var(--mantine-radius-xl)',
                        overflow: 'hidden',
                        position: 'relative'
                    }}
                >
                    <Box
                        style={{
                            width: complaint.status === 'جديدة' ? '10%' :
                                complaint.status === 'قيد المعالجة' ? '40%' :
                                    complaint.status === 'بانتظار الرد من المواطن' ? '60%' :
                                        complaint.status === 'منجزة' ? '100%' : '30%',
                            height: '100%',
                            backgroundColor: getComplainStatusColor(complaint.status),
                            transition: 'width 0.3s ease'
                        }}
                    />
                </Box>
                <EmployeeComplainModal 
                    complaint={complaint}
                />
            </Stack>
        </Card >
    );
};

export default EmployeeComplainCard;