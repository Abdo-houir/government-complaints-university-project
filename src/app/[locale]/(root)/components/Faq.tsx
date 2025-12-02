import { Accordion, AccordionControl, AccordionItem, AccordionPanel, Box, Container, Text } from "@mantine/core"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { Fade, Zoom } from "react-awesome-reveal"
import { BsFillQuestionOctagonFill } from "react-icons/bs"
import { textIcon } from "../../../../../lib/context/mantine/styles"


const Faq = () => {
    const t = useTranslations("home.faq")

    const faqs: FaqElement[] = t.raw("questions");

    return (
        <Container id="faq" w={"100%"} fluid mt={20}>
            <Fade cascade big duration={1000} triggerOnce>
                <Text fz="h1" component="h2" c="var(--mantine-primary-color-5)" fw="bold" ps={"xl"} style={textIcon}>
                    <BsFillQuestionOctagonFill />
                    {t("title")}
                </Text>
                <Accordion  variant="separated" radius="md" chevronIconSize={20} mt={15}>
                    {
                        faqs.map((faq, index) => (
                            <AccordionItem
                                key={faq.q}
                                value={faq.q}
                            >
                                <AccordionControl
                                    icon={
                                        <Box visibleFrom="sm">
                                            <Image
                                                src={index % 2 !== 0 ? "/svg-icons/faq.svg" : "/svg-icons/questions.svg"}
                                                alt="faq"
                                                width={75}
                                                height={75}
                                            />
                                        </Box>
                                    }
                                    c={"emerald"}
                                    fw="bold"
                                    fz="h3"
                                >
                                    <Zoom delay={(index * 100) + 1000} triggerOnce>
                                        {faq.q}
                                    </Zoom>
                                </AccordionControl>
                                <AccordionPanel fz="h4">
                                    <Fade
                                        direction="up"
                                        triggerOnce
                                        damping={0.15}
                                        duration={200}
                                        cascade
                                    >
                                        {faq.a}
                                    </Fade>
                                </AccordionPanel>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </Fade>
        </Container>
    )
}

export default Faq