import { Button, Card, Flex, Stack, Text } from "@mantine/core"
import { useTranslations } from "next-intl"
import { PiBuildingsFill } from "react-icons/pi"
import { textIcon } from "../../../../../../../lib/context/mantine/styles"
import DeleteSection from "./DeleteSection"

type Props = {
    section: AgencySectionType
}

const SectionCard = ({ section }: Props) => {
    const tC = useTranslations("common")
    return (
        <>
            <Card>
                <Stack>
                    <Text
                        c="emerald"
                        fz={{ base: "lg", md: "xl" }}
                        style={textIcon}
                    >
                        <PiBuildingsFill />
                        {section.NameAr || section.NameEn}
                    </Text>
                    <Text
                        fz={{ base: "md", md: "lg" }}
                    >
                        {section.DescriptionAr || section.DescriptionEn}
                    </Text>
                    <Flex gap={25}>
                        <Button
                            fullWidth
                            variant="light"
                        >
                            {tC("viewDetails")}
                        </Button>
                        <DeleteSection
                            id={section.id}
                        />
                    </Flex>
                </Stack>
            </Card>
        </>
    )
}

export default SectionCard