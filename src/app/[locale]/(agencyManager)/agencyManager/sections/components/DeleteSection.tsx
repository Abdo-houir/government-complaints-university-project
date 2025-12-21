"use client"
import DeleteModal from '@/app/[locale]/(root)/components/query/DeleteModal'
import { ActionIcon, Tooltip } from '@mantine/core'
import { useLocale, useTranslations } from 'next-intl'
import { FaTrash } from 'react-icons/fa'
import endpoints from '../../../../../../../lib/api/setup/ebdpoints'
import useBoolean from '../../../../../../../lib/hooks/useBoolean'

type Props = {
    id: number
}

const DeleteSection = ({ id }: Props) => {
    const locale = useLocale();
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
                endpoint={endpoints.agencyManager.deleteSection(id)}
                validateEndpoint={[`/api/listSection?lang=${locale === "ar" ? "Ar" : "En"}`]}
                isOpen={isOpen}
            />
        </>
    )
}

export default DeleteSection