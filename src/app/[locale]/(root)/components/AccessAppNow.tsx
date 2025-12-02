import { Link } from "@/i18n/navigation";
import PATHS from "@/paths";
import { Box, Button, Card, Flex, Group, Stack, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ReactNode } from "react";
import { Slide } from "react-awesome-reveal";
import { SiSimplelogin } from "react-icons/si";

const AccessImage = (): ReactNode => <Image
    src={"/svg/register.svg"}
    alt={"free syria Coat Of Arms"}
    width={500}
    height={500}
    style={{
        width: "100%",
        height: '100%'
    }}
/>

const AccessAppNow = () => {
    const t = useTranslations("home.accessApp");
    const tC = useTranslations("common");

    return (
        <Card id="registerNow" >
            <Flex justify="space-around" align="center" w={"100%"} direction={{ base: "column", md: "row" }}>
                <Stack maw={500} style={{ textAlign: "center" }} align="center">
                    <Slide direction="right" triggerOnce>
                        <Text fz="h1" component="h2" c="var(--mantine-primary-color-5)" fw="bolder" >
                            {t("title")}
                        </Text>
                        <Box
                            w={300}
                            h={300}
                            hiddenFrom="lg"
                        >
                            <AccessImage />
                        </Box>
                        <Text fz="h3" component="h2" fw="bold">
                            {t("description")}
                        </Text>
                        <Group justify="center">
                            <Link href={PATHS.auth.login}>
                                <Button
                                    leftSection={<SiSimplelogin />}
                                    size="lg"
                                    radius="md"
                                    variant="light"
                                >
                                    {tC("login")}
                                </Button>
                            </Link>
                            <Link href={PATHS.auth.register}>
                                <Button
                                    leftSection={<SiSimplelogin />}
                                    size="lg"
                                    radius="md"
                                    variant="outline"
                                >
                                    {tC("register")}
                                </Button>
                            </Link>
                        </Group>
                    </Slide>
                </Stack>
                <Slide direction="left" triggerOnce>
                    <Box
                        w={450}
                        h={450}
                        visibleFrom="lg"
                    >
                        <AccessImage />
                    </Box>
                </Slide>
            </Flex>
        </Card >
    )
}

export default AccessAppNow