import { Stack } from "@mantine/core"
import { Metadata } from "next"
import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"
import PageHeader from "../../../../../../lib/components/pages/PageHeader"
import EmployeesPageContent from "./EmployeesPageContent"
import EmployeeModal from "./components/modal/EmployeeModal"

export async function generateMetadata(): Promise<Metadata> {
  const tM = await getTranslations("metadata.auth.login")

  return {
    title: tM("title"),
    description: tM("description"),
  }
}
const AgenciesPage = () => {
  const tME = useTranslations("manager.employees")
  return (
    <Stack p={25}>
      <PageHeader
        title={tME("title")}
        subTitle={tME("subtitle")}
        action={
          <EmployeeModal />
        }
      />
      <EmployeesPageContent />
    </Stack>
  )
}

export default AgenciesPage