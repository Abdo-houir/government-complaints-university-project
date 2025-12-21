"use client"

import ReactQueyStateWrapper from "@/app/[locale]/(root)/components/query/ReactQueyStateWrapper"
import { Stack } from "@mantine/core"
import { useLocale, useTranslations } from "next-intl"
import useAxiosQuery from "../../../../../../lib/api/react-query/useAxiosQuery"
import PageHeader from "../../../../../../lib/components/pages/PageHeader"
import SectionsTable from "./components/SectionsTable"
import SectionModal from "./SectionModal"

const ManagerSectionsPageContent = () => {
    const locale = useLocale();

    // const data = useAxiosQuery(endpoints.agencyManager.listSection(locale === "ar" ? "Ar" : "En"));
    const data = useAxiosQuery( `/api/listSection?lang=${locale === "ar" ? "Ar" : "En"}`);
   

    const t = useTranslations("manager.sections")
    return (
        <ReactQueyStateWrapper data={data}>
            <Stack
                p={25}
            >
                <PageHeader
                    title={t("title")}
                    subTitle={t("subtitle")}
                    action={
                      <SectionModal />
                    }
                />
                <SectionsTable
                    sectionsResponse={data.data as AppResponse<AgencySectionType[]>}
                />
            </Stack>
        </ReactQueyStateWrapper>
    )
}

export default ManagerSectionsPageContent