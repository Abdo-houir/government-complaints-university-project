"use client"

import useAxiosQuery from "../../../../../../../lib/api/react-query/useAxiosQuery"
import endpoints from "../../../../../../../lib/api/setup/ebdpoints"
import ComplainDetails from "../components/ComplainDetails"

type Props = {
    id: string
}

const CitizenComplainPageContent = ({ id }: Props) => {
    const data = useAxiosQuery(endpoints.complains.getComplaintDetails(id));
    if (data.isLoading) {
        return ("loading...")
    } else if (data.isSuccess) {
        const complainData = data.data as AppResponse<complaintDetailsType>


        return (

            <ComplainDetails
                complaint={complainData.data}
            />
        )
    }
}

export default CitizenComplainPageContent