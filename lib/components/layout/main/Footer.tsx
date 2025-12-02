import { footerLinks } from "@/config-nav"
import { Link } from "@/i18n/navigation"
import { Card, Flex, Stack, Text } from "@mantine/core"
import { useTranslations } from "next-intl"
import Logo from "../../identity/Logo"


const Footer = () => {
    const t = useTranslations("home.hero");
    const tn = useTranslations("navigation");
    return (
        <Card component="footer">
            <Flex
                w={"100%"}
                justify="space-around"
                align="center"
                px={{ base: "lg", md: "10%" }}
                direction={{base:"column",md:"row"}}
            >
                <Stack gap={0} maw={{ base: "100%", md: 200 }} align="center">
                    <Logo
                        height={75}
                        width={75}
                    // isSmall={false}
                    />
                    <Text
                        fz="md"
                    >
                        {t("title") + " - " + t("subTitle")}
                    </Text>
                    <Text
                        fz="sm"
                    >
                        {t("content")}
                    </Text>
                </Stack>
                <Flex
                    w={"100%"}
                    justify="space-around"
                    align="center"
                >
                    {
                        footerLinks.map((link) => (
                            <Stack gap="6" key={link.href}>
                                <Link href={link.href}>
                                    <Text
                                        size="lg"
                                        td="underline"
                                        style={{
                                            textUnderlineOffset: 6
                                        }}
                                    >
                                        {tn(link.label)}
                                    </Text>
                                </Link>
                                <Stack gap="5" ms="xs">
                                    {link.children?.map((child) => (
                                        <Link href={child.href} key={child.href}>
                                            <Text
                                                size="md"
                                                c="dimmed"
                                                td="underline"
                                                style={{
                                                    textUnderlineOffset: 6
                                                }}
                                            >
                                                {tn(child.label)}
                                            </Text>
                                        </Link>
                                    ))}
                                </Stack>
                            </Stack>
                        ))
                    }
                </Flex>
            </Flex>
        </Card>
    )
}

export default Footer