import { Box, Card, Flex, Group, Skeleton, Stack } from "@mantine/core";

const AccessAppNowSkeleton = () => {
  return (
    <Card id="registerNow">
      <Flex
        justify="space-around"
        align="center"
        w="100%"
        direction={{ base: "column", md: "row" }}
        gap="xl"
      >
        {/* Left side: text + buttons */}
        <Stack maw={500} style={{ textAlign: "center" }} align="center" gap="md">
          <Skeleton height={40} width="70%" radius="sm" /> {/* Title */}
          <Box w={300} h={300} hiddenFrom="lg">
            <Skeleton width="100%" height="100%" radius="lg" /> {/* Mobile image */}
          </Box>
          <Skeleton height={25} width="80%" radius="sm" /> {/* Description */}
          <Group justify="center" gap="md">
            <Skeleton height={45} width={120} radius="md" /> {/* Login button */}
            <Skeleton height={45} width={120} radius="md" /> {/* Register button */}
          </Group>
        </Stack>

        {/* Right side: large image */}
        <Box w={450} h={450} visibleFrom="lg">
          <Skeleton width="100%" height="100%" radius="lg" />
        </Box>
      </Flex>
    </Card>
  );
};

export default AccessAppNowSkeleton;
