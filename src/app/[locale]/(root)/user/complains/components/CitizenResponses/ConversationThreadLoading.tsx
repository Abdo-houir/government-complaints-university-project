import { Box, Group, Paper, Skeleton, Stack } from "@mantine/core"


const ConversationThreadLoading = () => {
    return (
        <Stack gap="lg">
            {[1, 2, 3].map((i) => (
                <Paper key={i} p="lg" radius="md">
                    <Group align="flex-start" mb="md">
                        <Skeleton circle height={40} />
                        <Box style={{ flex: 1 }}>
                            <Skeleton height={20} width={120} mb="xs" />
                            <Skeleton height={16} width={80} />
                        </Box>
                    </Group>
                    <Skeleton height={60} mb="md" />
                    <Group justify="space-between">
                        <Skeleton height={30} width={80} />
                        <Skeleton height={16} width={40} />
                    </Group>
                </Paper>
            ))}
        </Stack>
    )
}

export default ConversationThreadLoading