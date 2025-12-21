"use client"

import { Divider, ScrollAreaAutosize, Stack } from "@mantine/core"
import { Fragment } from "react"
import ConversationThreadLoading from "../../(root)/user/complains/components/CitizenResponses/ConversationThreadLoading"
import useAxiosQuery from "../../../../../lib/api/react-query/useAxiosQuery"
import endpoints from "../../../../../lib/api/setup/ebdpoints"
import EmployeeComplainCard from "./components/EmployeeComplainCard"


const EmployeeHomePageContent = () => {
  const complainsRequest = useAxiosQuery(endpoints.employee.employeeComplaints(1));

  if (complainsRequest.isLoading) {
    return (
      <ConversationThreadLoading />
    )
  } else if (complainsRequest.isSuccess) {
    const complains = complainsRequest.data as AppResponse<complaintType[]>

    return (
      <ScrollAreaAutosize mah={"80dvh"}>
        <Stack>
          {
            complains.data.map(complain => (
              <Fragment
                key={complain.id}
              >
                <EmployeeComplainCard
                  complaint={complain}
                />
                <Divider size="sm" my={5} />
              </Fragment>
            ))
          }
        </Stack>
      </ScrollAreaAutosize>
    )
  }
}

export default EmployeeHomePageContent