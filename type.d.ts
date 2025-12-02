//# navigation
interface LinkType {
    href: string
    label: string
    icon?: ReactNode
    children?: LinkType[]
}

type MethodType = 'get' | 'post' | 'put' | 'patch' | 'delete'