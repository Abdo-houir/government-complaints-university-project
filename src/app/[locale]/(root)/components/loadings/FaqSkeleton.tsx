import { Accordion, AccordionControl, AccordionItem, AccordionPanel, Box, Container, Skeleton, Stack } from "@mantine/core";

const FaqSkeleton = () => {
  return (
    <Container id="faq" w="100%" fluid mt={20}>
      <Stack gap="sm" mb="md">
        {/* Title placeholder */}
        <Skeleton height={40} width="40%" radius="sm" />
      </Stack>

      <Accordion variant="separated" radius="md" chevronIconSize={20} mt={15} defaultValue={"faq-0"}>
        {Array.from({ length: 7 }).map((_, index) => (
          <AccordionItem key={index} value={`faq-${index}`} >
            <AccordionControl
              icon={
                <Box visibleFrom="sm">
                  <Skeleton circle height={40} width={40} />
                </Box>
              }
              c="emerald"
              fw="bold"
              fz="h3"
            >
              <Skeleton height={25} width="70%" radius="sm" />
            </AccordionControl>
            <AccordionPanel fz="h4">
              <Stack gap="xs">
                <Skeleton height={15} width="90%" radius="sm" />
                <Skeleton height={15} width="80%" radius="sm" />
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
};

export default FaqSkeleton;
