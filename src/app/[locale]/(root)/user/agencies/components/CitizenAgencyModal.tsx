"use client";

import { Badge, Button, Flex, Modal, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { FaStopwatch } from 'react-icons/fa';
import { FaBuildingColumns } from 'react-icons/fa6';
import { PiTreeViewFill } from 'react-icons/pi';
import InfoIcon from '../../../../../../../lib/components/view/InfoIcon';
import { textIcon } from '../../../../../../../lib/context/mantine/styles';
import useBoolean from '../../../../../../../lib/hooks/useBoolean';
import CitizenAgencySections from './CitizenAgencySections';
type Props = {
    agency: AgencyType
}

const CitizenAgencyModal = ({ agency }: Props) => {
    const tC = useTranslations("common");
    const tAS = useTranslations("common.agency")
    const isOpen = useBoolean({ initialState: false });

    return (
        <>
            <Button
                variant="subtle"
                leftSection={<PiTreeViewFill />}
                radius="md"
                onClick={isOpen.onTrue}
            >
                {tC("viewDetails")}
            </Button>
            <Modal
                opened={isOpen.value}
                onClose={isOpen.onFalse}
                size="xl"
                centered
                radius="md"
            >
                <Flex
                    justify="space-between"
                    align="center"
                    mb={10}
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
                <Text
                    fz={{ base: "md", md: "lg" }}
                >
                    {agency.DescriptionAr || agency.DescriptionEn}
                </Text>
                {
                    isOpen.value &&
                    <CitizenAgencySections
                        id={agency.Id}
                    />
                }
            </Modal>
        </>
    )
}

export default CitizenAgencyModal