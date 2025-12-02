import { Link } from "@/i18n/navigation";
import PATHS from "@/paths";
import { Button, Container, Flex, Group, Stack, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import { Fade, Zoom } from 'react-awesome-reveal';
import { BsLaptopFill, BsPatchQuestionFill } from "react-icons/bs";
import Logo from "../../../../../lib/components/identity/Logo";


const HeroSection = () => {
    const t = useTranslations("home.hero");
    const tNav = useTranslations("navigation");
    return (
        <>
            <Container
                style={{
                    textAlign: "center",
                }}
                h={"calc(100vh - 80px)"}
            >
                <Flex justify={{ base: "center", md: "space-around" }} align="center" h="100%" direction={{ base: "column", md: "row" }}>
                    <Logo
                        width={500}
                        height={500}
                        responseWidth={{ base: 250, md: 300, lg: 350 }}
                        responseHeight={{ base: 250, md: 300, lg: 350 }}

                    />
                    <Stack justify="center" align="center" gap={0}>
                        <Text
                            fz="h1"
                            fw="bolder"
                            c="emerald"
                            component="h1"
                        >
                            <Fade cascade duration={100} triggerOnce >
                                {t("title")}
                            </Fade>
                        </Text>
                        <Text
                            fz="h1"
                            fw="bold"
                            c="emerald"
                            component="h2"
                        >
                            <Fade cascade duration={100} delay={600} triggerOnce >
                                {t("subTitle")}
                            </Fade>
                        </Text>
                        <Zoom delay={1200} triggerOnce>
                            <Text
                                fz="h2"
                                fw="normal"
                            >
                                {t("content")}
                            </Text>
                        </Zoom>
                        <Group mt={15}>
                            <Link href={PATHS.home.about}>
                                <Button
                                    variant="light"
                                    fw={700}
                                    size="md"
                                    leftSection={<BsPatchQuestionFill />}
                                >
                                    {tNav("aboutUs")}
                                </Button>
                            </Link>
                            <Link href={PATHS.home.services}>
                                <Button
                                    variant="filled"
                                    fw={700}
                                    size="md"
                                    leftSection={<BsLaptopFill />}
                                >
                                    {tNav("ourServices")}
                                </Button>
                            </Link>
                        </Group>
                    </Stack>
                </Flex>
            </Container>
        </>
    );
}

export default HeroSection