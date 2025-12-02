import { Center } from '@mantine/core'
import Logo from '../../lib/components/identity/Logo'
import AppMantineProvider from '../../lib/context/mantine/AppMantineProvider'

const Loading = () => {
    return (
        <AppMantineProvider>
            <Center h="100vh" w="100vw">
                <Logo
                    width={200}
                    height={200}
                    isSmall
                />
            </Center>
        </AppMantineProvider>
    )
}

export default Loading