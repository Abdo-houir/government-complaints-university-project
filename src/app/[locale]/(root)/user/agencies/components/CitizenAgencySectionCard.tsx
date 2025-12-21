import { Box, Divider } from "@mantine/core"
import AgencySectionCard from "../../../components/agency/AgencySectionCard"
import ComplainFormModal from "../../../components/complain/form/ComplainFormModal"

type Props = {
    section: AgencySectionType,
    AgencyId: number
}

const CitizenAgencySectionCard = ({ section, AgencyId }: Props) => {
    return (
        <AgencySectionCard section={section}>
            <Box p="xs" >
                <Divider my={5} size="sm" />
                <ComplainFormModal
                    AgencyId={AgencyId}
                    SectionId={section.id}
                />
            </Box>
        </AgencySectionCard>
    )
}

export default CitizenAgencySectionCard