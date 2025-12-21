import { Stack } from "@mantine/core";
import EmployeeComplainPageContent from "./CitizenComplainPageContent";

type Props = {
    params: Promise<{ id: string }>
}
const EmployeeComplainPage = async ({ params }: Props) => {
    const { id } = await params;

    
    return (
        <Stack
            p={25}
        >
            <EmployeeComplainPageContent
                id={id}
            />
        </Stack>
    )
}

export default EmployeeComplainPage