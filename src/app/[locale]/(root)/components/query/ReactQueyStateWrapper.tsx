"use client"
import { Alert, Center, Loader } from '@mantine/core'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'
import { MdError } from 'react-icons/md'
import { handleErrorMessageDecider } from '../../../../../../lib/api/handleErrorMessageDecider'

type Props = {
    data: UseQueryResult<unknown, unknown>,
    children: ReactNode
}

const ReactQueyStateWrapper = ({ data, children }: Props) => {
    const t = useTranslations("apiMessages");

    if (data.isLoading) {
        return <Center
            w={"100%"}
            h={"80vh"}
        >
            <Loader size="xl" type="bars" />
        </Center>
    } else if (data.isError) {
        return (
            <Center
                w={"100%"}
                h={"80vh"}
            >
                <Alert
                    variant="light"
                    color="red"
                    radius="lg"
                    title={t("wrong")}
                    icon={<MdError />}
                >
                    {handleErrorMessageDecider(data.error, t)}
                </Alert>
            </Center>
        )
    } else {
        return <>
            {children}
        </>
    }
}

export default ReactQueyStateWrapper