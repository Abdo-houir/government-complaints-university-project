"use client"
import DeleteModal from '@/app/[locale]/(root)/components/query/DeleteModal'
import { ActionIcon, Tooltip } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { FaTrash } from 'react-icons/fa'
import endpoints from '../../../../../../../lib/api/setup/ebdpoints'
import useBoolean from '../../../../../../../lib/hooks/useBoolean'

type Props = {
    serviceId: number,
    sectionId: number,
}

const DeleteService = ({ serviceId, sectionId }: Props) => {
    const tC = useTranslations("common");
    const isOpen = useBoolean({ initialState: false });

    return (
        <>
            <Tooltip
                label={tC("delete")}
            >
                <ActionIcon
                    onClick={isOpen.onTrue}
                    color="red"

                >
                    <FaTrash />
                </ActionIcon>
            </Tooltip>
            <DeleteModal
                endpoint={endpoints.agencyManager.deleteService(serviceId)}
                validateEndpoint={[endpoints.agencies.getServices(parseInt(sectionId.toString()))]}
                isOpen={isOpen}
            />
        </>
    )
}

export default DeleteService