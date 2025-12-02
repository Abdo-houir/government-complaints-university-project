import { Box, Card, Flex, Grid, GridCol, Stack, Text } from "@mantine/core"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { Slide, Zoom } from "react-awesome-reveal"



const OurServices = () => {
    const t = useTranslations("home.ourServices");

    const OUR_SERVICES: OurService[] = [
        {
            title: t("submit.title"),
            content: t("submit.content"),
            image: "/svg/submit.svg"
        },
        {
            title: t("notifications.title"),
            content: t("notifications.content"),
            image: "/svg/notification.svg"
        },
        {
            title: t("secure.title"),
            content: t("secure.content"),
            image: "/svg/secure.svg"
        },
        {
            title: t("accessible.title"),
            content: t("accessible.content"),
            image: "/svg/accessible.svg"
        },
    ]
    return (
        <Stack id="services" mt={20}>
            <Slide direction="right" triggerOnce>
                <Text fz="h1" component="h2" c="var(--mantine-primary-color-5)" fw="bold" ps={"xl"}>
                    {t("title")}
                </Text>
            </Slide>
            <Grid
                px={{ base: 0, md: "xl" }}
                py={0}
                mt={15}
            >
                {
                    OUR_SERVICES.map((service, index) => {
                        const isReversed = index % 2 === 0;

                        return (
                            <GridCol span={{ base: 12, lg: 6 }} key={service.title}>
                                <Zoom delay={index * 500} triggerOnce>
                                    <Card shadow="lg" radius="lg">
                                        <Flex justify="space-between" align="center" direction={{ base: "column", md: isReversed ? "row-reverse" : "row" }}>
                                            <Box
                                                w={{ base: 200, md: 250, lg: 275 }}
                                                h={{ base: 200, md: 250, lg: 275 }}
                                            >
                                                <Image
                                                    src={service.image}
                                                    alt={service.title}
                                                    width={500}
                                                    height={500}
                                                    style={{
                                                        width: "100%",
                                                        height: '100%'
                                                    }}
                                                />
                                            </Box>
                                            <Stack
                                                w={{ base: "100%", md: "70%" }}
                                            >
                                                <Text
                                                    fw="bold"
                                                    c="emerald"
                                                    fz="h2"
                                                >
                                                    {service.title}
                                                </Text>
                                                <Text
                                                    fz="h4"
                                                >
                                                    {service.content}
                                                </Text>
                                            </Stack>
                                        </Flex>
                                    </Card>
                                </Zoom>
                            </GridCol>
                        );
                    })
                }
            </Grid >
        </Stack>
    )
}

export default OurServices