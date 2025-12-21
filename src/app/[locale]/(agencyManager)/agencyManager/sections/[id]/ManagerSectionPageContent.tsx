"use client"
import { Card, Skeleton, Stack } from '@mantine/core'
import { useLocale } from 'next-intl'
import useAxiosQuery from '../../../../../../../lib/api/react-query/useAxiosQuery'
import endpoints from '../../../../../../../lib/api/setup/ebdpoints'
import PageHeader from '../../../../../../../lib/components/pages/PageHeader'
import ServiceModal from '../components/ServiceModal'
import ServicesTable from '../components/ServicesTable'

type Props = {
    id: string
}

const ManagerSectionPageContent = ({ id }: Props) => {
    const locale = useLocale()
    const servicesRequest = useAxiosQuery(endpoints.agencies.getServices(parseInt(id)));
    const sectionRequest = useAxiosQuery(endpoints.agencyManager.findSection(parseInt(id)));

    if (servicesRequest.isLoading || sectionRequest.isLoading) {
        return (
            <Card>
                <Skeleton height={50} circle mb="xl" />
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
            </Card>
        )
    } else if (servicesRequest.isSuccess && sectionRequest.isSuccess) {
        const section = sectionRequest.data as AppResponse<AgencySectionType>;
        const services = servicesRequest.data as AppResponse<ServiceType[]>;
        return (
            <Stack
                p={25}
                gap="xl"
            >
                <PageHeader
                    title={locale === "ar" ? section.data.NameAr : section.data.NameEn}
                    subTitle={locale === "ar" ? section.data.DescriptionAr : section.data.DescriptionEn}
                    action={<ServiceModal sectionId={section.data.id} />}
                />
                <ServicesTable
                    services={services}
                    sectionId={section.data.id}
                />
            </Stack>
        )
    }

}

export default ManagerSectionPageContent