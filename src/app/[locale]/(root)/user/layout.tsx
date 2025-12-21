import AuthGuard from '@/app/context/guards/AuthGuard'
import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const AgenciesLayout = ({ children }: Props) => {
    return (
        <AuthGuard roles={[{name: "user"}]}>
            {children}
        </AuthGuard>
    )
}

export default AgenciesLayout;