"use client"
import { Card, ScrollAreaAutosize, Skeleton, Stack } from "@mantine/core"
import useAxiosQuery from "../../../../../../../lib/api/react-query/useAxiosQuery"
import endpoints from "../../../../../../../lib/api/setup/ebdpoints"
import CitizenAgencySectionsList from "./CitizenAgencySectionsList"

type Props = {
    id: number
}

const CitizenAgencySections = ({ id }: Props) => {
    const data = useAxiosQuery(endpoints.agencies.getAgencySections(id));

    if (data.isLoading) {
        return (
            <Stack py={5}>
                {
                    Array.from({ length: 2 }).map((_, index) => (
                        <Card key={index}>
                            <Skeleton height={50} circle mb="xl" />
                            <Skeleton height={8} radius="xl" />
                            <Skeleton height={8} mt={6} radius="xl" />
                            <Skeleton height={8} mt={6} width="70%" radius="xl" />
                        </Card>
                    ))
                }
            </Stack>
        )
    } else if (data.isSuccess) {
        return (
            <ScrollAreaAutosize mah={"50dvh"} py={5}>
                <CitizenAgencySectionsList
                    sections={data.data as AppResponse<AgencySectionType[]>}
                    AgencyId={id}
                />
            </ScrollAreaAutosize>
        )
    }
}

export default CitizenAgencySections