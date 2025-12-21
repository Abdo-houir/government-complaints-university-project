import { Box, Card, Flex, Grid, GridCol, Skeleton, Stack } from "@mantine/core";

const OurServicesSkeleton = () => {
  return (
    <Stack id="services" mt={20}>
      {/* Title placeholder */}
      <Skeleton height={40} width="40%" radius="sm" mb="md" />

      <Grid px={{ base: 0, md: "xl" }} py={0} mt={15}>
        {Array.from({ length: 4 }).map((_, index) => {
          const isReversed = index % 2 === 0;

          return (
            <GridCol span={{ base: 12, lg: 6 }} key={index}>
              <Card shadow="lg" radius="lg" mb="md">
                <Flex
                  justify="space-between"
                  align="center"
                  direction={{ base: "column", md: isReversed ? "row-reverse" : "row" }}
                  gap="md"
                >
                  {/* Image placeholder */}
                  <Box w={{ base: 200, md: 250, lg: 275 }} h={{ base: 200, md: 250, lg: 275 }}>
                    <Skeleton width="100%" height="100%" radius="lg" />
                  </Box>

                  {/* Text placeholders */}
                  <Stack w={{ base: "100%", md: "70%" }} gap="sm">
                    <Skeleton height={30} width="60%" radius="sm" />
                    <Skeleton height={20} width="80%" radius="sm" />
                    <Skeleton height={20} width="70%" radius="sm" />
                  </Stack>
                </Flex>
              </Card>
            </GridCol>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default OurServicesSkeleton;
