import { Stack } from "@mantine/core"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import AgenciesPageContent from "./AgenciesPageContent"

export async function generateMetadata(): Promise<Metadata> {
  const tM = await getTranslations("metadata.auth.login")

  return {
    title: tM("title"),
    description: tM("description"),
  }
}
const AgenciesPage = () => {
  return (
    <Stack p={25}>
      <AgenciesPageContent />
    </Stack>
  )
}

export default AgenciesPage