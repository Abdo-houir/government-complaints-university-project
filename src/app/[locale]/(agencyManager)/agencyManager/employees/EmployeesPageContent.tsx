"use client"
import { Skeleton, Stack } from '@mantine/core'
import useAxiosQuery from '../../../../../../lib/api/react-query/useAxiosQuery'
import endpoints from '../../../../../../lib/api/setup/ebdpoints'
import EmployeesTable from './components/table/EmployeesTable'


const EmployeesPageContent = () => {

    const employeesRequest = useAxiosQuery(endpoints.agencyManager.listEmployees)

    if (employeesRequest.isLoading) {
        return (
            <Stack gap={20}>
                <Skeleton w={"100%"} h={50} radius="lg" />
                <Skeleton w={"100%"} h={300} radius="lg" />
                <Skeleton w={"100%"} h={50} radius="lg" />
            </Stack>
        )
    } else if (employeesRequest.isSuccess) {
        const employees = employeesRequest.data as AppResponse<EmployeeType[]>

        return (
            <>
                <EmployeesTable
                    employees={employees}
                />
            </>
        )
    }
}

export default EmployeesPageContent