import { Card, CardSection, Divider, Text } from "@mantine/core"
import { ReactNode } from "react"
import { FaSitemap } from "react-icons/fa"
import { textIcon } from "../../../../../../lib/context/mantine/styles"
import SectionServices from "./SectionServices"

type Props = {
    section: AgencySectionType,
    children?: ReactNode
}

const AgencySectionCard = ({ section, children }: Props) => {
    return (
        <Card
            shadow="lg"
            bg="var(--color-background-primary)"
            radius="md"
        >
            <Text
                c="emerald"
                fz={{ base: "md", md: "lg" }}
                style={textIcon}
            >
                <FaSitemap />
                {section.NameAr || section.NameEn}
            </Text>
            <Text
                fz={{ base: "sm", md: "md" }}
            >
                {section.DescriptionAr || section.DescriptionEn}
            </Text>
            <Divider mt={15} mb={10} size="sm" />
            <SectionServices
                sectionId={section.id}
            />
            {
                children && <CardSection>
                    {children}
                </CardSection>
            }
        </Card>
    )
}

export default AgencySectionCard