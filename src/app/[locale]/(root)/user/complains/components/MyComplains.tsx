"use client"
import { Divider, Skeleton, Stack } from "@mantine/core"
import { Fragment } from "react"
import useAxiosQuery from "../../../../../../../lib/api/react-query/useAxiosQuery"
import endpoints from "../../../../../../../lib/api/setup/ebdpoints"
import ComplaintCard from "./ComplainCard"


const MyComplains = () => {
    const data = useAxiosQuery(endpoints.complains.myComplaints);

    if (data.isLoading) {

        return (
            <Stack gap="lg">
                {
                    Array.from({ length: 4 }).map((_, index) => (
                        <Stack gap="sm" key={index}>
                            <Skeleton circle h={25} />
                            <Skeleton circle h={25} />
                            <Skeleton circle h={25} />
                            <Skeleton circle h={25} />
                        </Stack>
                    ))
                }
            </Stack>
        )
    } else if (data.isSuccess) {
        const MyComplainsResponse = data.data as AppResponse<complaintType[]>
        return (
            <Stack>
                {
                    MyComplainsResponse.data.map(complain => (
                        <Fragment
                            key={complain.id}
                        >
                            <ComplaintCard
                                complaint={complain}
                            />
                            <Divider size="sm" my={5} />
                        </Fragment>
                    ))
                }
            </Stack>
        )
    }
}

export default MyComplains