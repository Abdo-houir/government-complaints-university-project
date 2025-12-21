"use client"
import { Stack } from "@mantine/core";
import CitizenAgencySectionCard from "./CitizenAgencySectionCard";

type Props = {
    sections: AppResponse<AgencySectionType[]>,
    AgencyId: number
}

const CitizenAgencySectionsList = ({ sections, AgencyId }: Props) => {


    return (
        <Stack>
            {
                sections.data.map((section) => (
                    <CitizenAgencySectionCard
                        section={section}
                        key={section.id}
                        AgencyId={AgencyId}
                    />
                ))
            }
        </Stack>
    )
}

export default CitizenAgencySectionsList