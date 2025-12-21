import { Container, Flex, Group, Skeleton, Stack } from "@mantine/core";

const HeroSectionSkeleton = () => {
  return (
    <Container
      style={{ textAlign: "center" }}
      h={"calc(100vh - 80px)"}
    >
      <Flex
        justify={{ base: "center", md: "space-around" }}
        align="center"
        h="100%"
        direction={{ base: "column", md: "row" }}
        gap="xl"
      >
        {/* Logo placeholder */}
        <Skeleton
          w={{ base: 250, md: 300, lg: 350 }}
          h={{ base: 250, md: 300, lg: 350 }}
          radius="xl"
        />

        {/* Text + Buttons placeholders */}
        <Stack justify="center" align="center" gap="md" w="100%">
          <Skeleton height={40} width="60%" radius="sm" />
          <Skeleton height={30} width="50%" radius="sm" />
          <Skeleton height={20} width="100%" radius="sm" />

          <Group mt={15} gap="md">
            <Skeleton height={40} width={120} radius="sm" />
            <Skeleton height={40} width={120} radius="sm" />
          </Group>
        </Stack>
      </Flex>
    </Container>
  );
};

export default HeroSectionSkeleton;
