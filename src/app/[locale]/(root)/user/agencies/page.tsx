import { Container, Stack, Text } from "@mantine/core";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { FaBuildingColumns } from "react-icons/fa6";
import { textIcon } from "../../../../../../lib/context/mantine/styles";
import CitizenAgenciesPageContent from "./CitizenAgenciesPageContent";

export async function generateMetadata(): Promise<Metadata> {
  const tM = await getTranslations("metadata.citizen.agencies");

  return {
    title: tM("title"),
    description: tM("description"),
  }
}
const CitizenAgenciesPage = async () => {
  const t = await getTranslations("citizenPages.agencies");

  return (
    <Container p={20} fluid>
      <Stack >
        <Stack gap={0}>
          <Text
            fw={900}
            fz={{ base: 'h2', xl: 'h1' }}
            c="emerald"
            style={textIcon}
          >
            <FaBuildingColumns />
            {t("title")}
          </Text>
          <Text
            variant="text"
            fw="bold"
            fz={{ base: 'h3', xl: 'h2' }}
          >
            {t("subtitle")}
          </Text>
        </Stack>
        <CitizenAgenciesPageContent />
      </Stack>
    </Container>
  )
}

export default CitizenAgenciesPage