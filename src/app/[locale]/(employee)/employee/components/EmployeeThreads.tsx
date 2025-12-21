"use client"
import ConversationThread from "@/app/[locale]/(root)/user/complains/components/CitizenResponses/ConversationThread"
import useAuthContext from "@/app/context/auth/useAuthContext"

type Props = {
  responserData: AppResponse<complainResponseType[]>,
  complainId: number
}

const EmployeeThreads = ({ responserData,complainId }: Props) => {
  const { user } = useAuthContext();

  return (
      <ConversationThread
        responses={responserData.data}
        currentUserId={user?.Id || 0}
        complainId={complainId}
        maxHight={"48dvh"}
      />
  )
}

export default EmployeeThreads