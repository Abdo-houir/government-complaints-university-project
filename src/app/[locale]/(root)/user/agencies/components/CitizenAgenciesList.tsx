import { ScrollAreaAutosize, Stack } from "@mantine/core";
import CitizenAgencyCard from "./CitizenAgencyCard";

type Props = {
    agencies: AppResponse<AgencyType[]>
}

const CitizenAgenciesList = ({ agencies }: Props) => {

    return (
        <ScrollAreaAutosize
            mah={"75.5dvh"}
        >
            <Stack>
                {
                    agencies.data.map(agency => (
                        <CitizenAgencyCard
                            key={agency.Id}
                            agency={agency}
                        />
                    ))
                }
            </Stack>
        </ScrollAreaAutosize>
    )
}

export default CitizenAgenciesList