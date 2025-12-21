"use client"
import useAuthContext from "@/app/context/auth/useAuthContext";
import useAxiosQuery from "../../../../../../../../lib/api/react-query/useAxiosQuery";
import endpoints from "../../../../../../../../lib/api/setup/ebdpoints";
import ConversationThread from "./ConversationThread";
import ConversationThreadLoading from "./ConversationThreadLoading";

type Props = {
  id: number
}

const CitizenResponses = ({ id }: Props) => {
  const { user } = useAuthContext()
  const data = useAxiosQuery(endpoints.complains.getComplaintRespons(id));


  if (data.isLoading) {
    return (
      <ConversationThreadLoading />
    )
  } else if (data.isSuccess) {
    const complainData = data.data as AppResponse<complainResponseType[]>


    return (

      <>
        <ConversationThread
          complainId={id}
          auto
          maxHight={"48dvh"}
          responses={complainData.data}
          currentUserId={user?.Id || 0}
        />
      </>
    )
  }
}

export default CitizenResponses