import { Card, Container, Skeleton, Stack, Text, Timeline, TimelineItem } from "@mantine/core";

const HowWeWorksSkeleton = () => {
  return (
    <Card mt={20} id="howWeWorks">
      {/* Title + description placeholders */}
      <Stack gap="sm" mb="md">
        <Skeleton height={30} width="40%" radius="sm" />
        <Skeleton height={20} width="60%" radius="sm" />
      </Stack>

      <Container fluid mt={25} w="100%">
        <Timeline active={4} bulletSize={45} lineWidth={2}>
          {Array.from({ length: 5 }).map((_, index) => (
            <TimelineItem
              key={index}
              bullet={<Skeleton circle height={30} width={30} />}
              title={<Skeleton height={20} width="50%" />}
              fw={700}
              fz="lg"
            >
              <Text c="dimmed" maw={800} fw={700} fz="md">
                <Skeleton height={15} width="80%" mb="xs" />
                <Skeleton height={15} width="70%" />
              </Text>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </Card>
  );
};

export default HowWeWorksSkeleton;
