import { Blockquote, Box, Container, Text } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import { Fade } from "react-awesome-reveal";

export default async function ParallaxSection() {
    const t = await getTranslations("home.parallax")
    return (
        <Box className="parallax" style={{
            backgroundImage: "url('/bg/freeSyria.jpg')",
            height: "70vh"
        }}
        >
            <Container
                className="parallax-content"
                w={"100%"}
            >
                <Blockquote color="emerald" radius="lg">
                    <Text
                        fz={{ base: "h3", sm: "h2", md: "h1" }}
                        c="white"
                        fw="bolder"
                        style={{
                            textShadow: "3px 3px 3px black"
                        }}
                        component="h1"                    >
                        <Fade
                            direction="up"
                            triggerOnce
                            damping={0.15}
                            duration={200}
                            cascade
                        >
                            {t("content")}
                        </Fade>
                    </Text>
                    <Text
                        fz={{ base: "h4", sm: "h3", md: "h2" }}
                        c="emerald"
                        fw="bold"
                        style={{
                            textShadow: "3px 3px 3px black"
                        }}
                    >
                        {"- " + t("author")}

                    </Text>
                </Blockquote>
            </Container>
        </Box >
    );
}
