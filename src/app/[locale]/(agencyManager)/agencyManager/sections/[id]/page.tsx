import ManagerSectionPageContent from "./ManagerSectionPageContent";

type Props = {
    params: Promise<{ id: string }>
}
const ManagerSectionPage = async ({ params }: Props) => {
    const { id } = await params;

    return (
        <>
            <ManagerSectionPageContent
                id={id}
            />
        </>
    )
}

export default ManagerSectionPage