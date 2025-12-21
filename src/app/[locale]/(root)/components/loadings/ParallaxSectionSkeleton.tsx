import { Blockquote, Box, Container, Skeleton, Stack } from "@mantine/core";

const ParallaxSectionSkeleton = () => {
  return (
    <Box
      className="parallax"
      style={{
        backgroundColor: "#333", // neutral background instead of image
        height: "70vh",
      }}
    >
      <Container className="parallax-content" w="100%">
        <Blockquote color="emerald" radius="lg">
          <Stack gap="sm">
            {/* Content placeholder */}
            <Skeleton height={40} width="70%" radius="sm" />
            <Skeleton height={30} width="50%" radius="sm" />
          </Stack>
        </Blockquote>
      </Container>
    </Box>
  );
};

export default ParallaxSectionSkeleton;
