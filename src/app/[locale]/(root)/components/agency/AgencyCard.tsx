"use client"
import { Badge, Card, CardSection, Flex, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'
import { FaStopwatch } from 'react-icons/fa'
import { FaBuildingColumns } from 'react-icons/fa6'
import InfoIcon from '../../../../../../lib/components/view/InfoIcon'
import { textIcon } from '../../../../../../lib/context/mantine/styles'

type Props = {
    agency: AgencyType,
    children?: ReactNode
}

const AgencyCard = ({ agency, children }: Props) => {
    const tAS = useTranslations("common.agency")

    return (
        <Card>
            <Flex
                justify="space-between"
                align="center"
            >
                <Text
                    c="emerald"
                    fz={{ base: "lg", md: "xl" }}
                    fw="bold"
                    style={textIcon}
                >
                    <FaBuildingColumns />
                    {agency.NameAr || agency.NameEn}
                </Text>
                <Badge
                    variant='dot'
                    color={agency.Status === 1 ? 'green' : "red"}
                >
                    {agency.Status === 1 ? tAS("status.active") : tAS("status.inactive")}
                </Badge>
            </Flex>
            <Text
                fz={{ base: "md", md: "lg" }}
                mb={10}
            >
                {agency.DescriptionAr || agency.DescriptionEn}
            </Text>
            <InfoIcon
                label={tAS("workingHours") + " : "}
                color='indigo'
                icon={<FaStopwatch />}
                variant='light'
                row
                labelProps={{
                    fz: { base: "md", md: "lg" },
                }}
            >
                {`${agency.WorkingStartTime} / ${agency.WorkingEndTime}`}
            </InfoIcon>
            {
                children &&
                <CardSection>
                    {children}
                </CardSection>
            }
        </Card>
    )
}

export default AgencyCard