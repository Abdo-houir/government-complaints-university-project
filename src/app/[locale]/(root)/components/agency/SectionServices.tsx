"use client"

import { Flex, List, ListItem, Skeleton, Stack, Text } from "@mantine/core";
import { useLocale, useTranslations } from "next-intl";
import { MdMiscellaneousServices } from "react-icons/md";
import useAxiosQuery from "../../../../../../lib/api/react-query/useAxiosQuery";
import endpoints from "../../../../../../lib/api/setup/ebdpoints";
import { textIcon } from "../../../../../../lib/context/mantine/styles";

type Props = {
    sectionId: number
}

const SectionServices = ({ sectionId }: Props) => {
    const data = useAxiosQuery(endpoints.agencies.getServices(sectionId));
    const tC = useTranslations("common");
    const locale = useLocale();

    if (data.isLoading) {
        return (
            <Stack>
                <Flex align="center" gap={10}>
                    <Skeleton height={15} circle />
                    <Skeleton height={4} radius="xl" width="50%" />
                </Flex>
                <Skeleton height={4} radius="xl" />
                <Skeleton height={4} mt={6} radius="xl" width="90%" />
                <Skeleton height={4} mt={6} width="70%" radius="xl" />
            </Stack>
        )
    } else if (data.isSuccess) {
        const servicesResponse = data.data as AppResponse<ServiceType[]>
        return (
            <Stack>
                <Text
                    c="emerald"
                    style={textIcon}
                >
                    <MdMiscellaneousServices />
                    {tC("agency.services")}
                </Text>
                <List>
                    {
                        servicesResponse.data.map((service) => (
                            <ListItem
                                key={service.id}
                            >
                                <Text>
                                    {locale === "ar" ? service.NameAr : service.NameEn}
                                </Text>
                                <Text
                                    c="dimmed"
                                >
                                    {locale === "ar" ? service.DescriptionAr : service.DescriptionEn}
                                </Text>
                            </ListItem>
                        ))
                    }
                </List>
            </Stack>
        )
    }
}

export default SectionServices