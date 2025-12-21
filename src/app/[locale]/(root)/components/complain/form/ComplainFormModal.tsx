"use client"
import { Button, Modal } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { FaClipboardList } from 'react-icons/fa';
import useBoolean from '../../../../../../../lib/hooks/useBoolean';
import ComplaintForm from './ComplainForm';

type Props = {
    AgencyId: number
    SectionId: number
}

const ComplainFormModal = ({ AgencyId, SectionId }: Props) => {
    const tCC = useTranslations("common.complain")
    const isOpen = useBoolean({ initialState: false });

    return (
        <>
            <Button
                variant="light"
                fullWidth
                color="red"
                leftSection={<FaClipboardList />}
                onClick={isOpen.onTrue}
            >
                {tCC("submit")}
            </Button>
            <Modal
                opened={isOpen.value}
                onClose={isOpen.onFalse}
                size={2000}
                radius="md"
                centered
            >
                <ComplaintForm
                    AgencyId={AgencyId}
                    SectionId={SectionId}
                />
            </Modal>
        </>)
}

export default ComplainFormModal