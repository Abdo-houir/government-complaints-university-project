import { Card, Container, Flex, ScrollAreaAutosize } from "@mantine/core"
import Profile from "../../../../../../lib/components/auth/profile/Profile"
import MyComplains from "./components/MyComplains"


const page = () => {
    return (
        <Container py={20} px={{ base: 0, xs: "xs", sm: "sm", md: "md", lg: "lg", xl: "xl" }} fluid>
            <Flex justify="space-between" gap={{ base: 0, lg: 20 }} direction={{ base: "column", lg: "row" }}>
                <Card w={"100%"} h="fit-content">
                    <Profile
                        compact
                        noImages
                    />
                </Card>
                <Card w={"100%"}>
                    <ScrollAreaAutosize mah={"83dvh"}>
                        <MyComplains />
                    </ScrollAreaAutosize>
                </Card>
            </Flex>
        </Container>
    )
}

export default page