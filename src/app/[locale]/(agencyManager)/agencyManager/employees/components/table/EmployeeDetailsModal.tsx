"use client"
import { ActionIcon, Modal, Tooltip } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { FaEye } from 'react-icons/fa'
import useBoolean from '../../../../../../../../lib/hooks/useBoolean'
import EmployeeDetails from './EmployeeDetails'

type Props = {
  employee: EmployeeType
}

const EmployeeDetailsModal = ({ employee }: Props) => {
  const tC = useTranslations("common");
  const isOpen = useBoolean({ initialState: false });

  return (
    <>
      <Tooltip label={tC("viewDetails")}>
        <ActionIcon
          onClick={isOpen.onTrue}
          color="emerald"
        >
          <FaEye />
        </ActionIcon>
      </Tooltip>
      <Modal
        size={1080}
        opened={isOpen.value}
        onClose={isOpen.onFalse}
        bg={"var(--color-background-primary)"}
        radius="lg"
        styles={{
          body: { backgroundColor: "var(--color-background-primary)" },
          header: { backgroundColor: "var(--color-background-primary)" }
        }}
      >
        <EmployeeDetails
          employee={employee}
        />
      </Modal>
    </>
  )
}

export default EmployeeDetailsModal