"use client"
import { Skeleton, Stack } from '@mantine/core'
import { useTranslations } from 'next-intl'
import useAxiosQuery from '../../../../../../lib/api/react-query/useAxiosQuery'
import endpoints from '../../../../../../lib/api/setup/ebdpoints'
import PageHeader from '../../../../../../lib/components/pages/PageHeader'
import AgencyModal from './components/modal/AgencyModal'
import AgenciesTable from './components/table/AgenciesTable'


const AgenciesPageContent = () => {

    const data = useAxiosQuery(endpoints.agencies.getAgencies);
    const managers = useAxiosQuery(endpoints.admin.managers);
    const tAdmin = useTranslations("admin.agencies")

    if (data.isLoading || managers.isLoading) {
        return (
            <Stack gap={20}>
                <Skeleton w={"100%"} h={50} radius="lg" />
                <Skeleton w={"100%"} h={300} radius="lg" />
                <Skeleton w={"100%"} h={50} radius="lg" />
            </Stack>
        )
    } else if (data.isSuccess && managers.isSuccess) {
        const response = data.data as AppResponse<AgencyType[]>

        return (
            <>
                <PageHeader
                    title={tAdmin("title")}
                    subTitle={tAdmin("subtitle")}
                    action={
                        <AgencyModal 
                        />
                    }
                />
                <AgenciesTable
                    agencies={response.data}
                />
            </>
        )
    }
}

export default AgenciesPageContent