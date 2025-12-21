import { Stack } from "@mantine/core"
import AgencyCard from "../../../components/agency/AgencyCard"
import CitizenAgencyModal from "./CitizenAgencyModal"

type Props = {
    agency: AgencyType
}

const CitizenAgencyCard = ({ agency }: Props) => {
    return (
        <AgencyCard
            agency={agency}
        >
            <Stack p="md">
                <CitizenAgencyModal
                    agency={agency}
                />
            </Stack>
        </AgencyCard>
    )
}

export default CitizenAgencyCard