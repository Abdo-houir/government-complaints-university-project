"use client"

import ComplainDetails from "@/app/[locale]/(root)/user/complains/components/ComplainDetails"
import useAxiosQuery from "../../../../../../../lib/api/react-query/useAxiosQuery"
import endpoints from "../../../../../../../lib/api/setup/ebdpoints"

type Props = {
    id: string
}

const EmployeeComplainPageContent = ({ id }: Props) => {

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

export default EmployeeComplainPageContent