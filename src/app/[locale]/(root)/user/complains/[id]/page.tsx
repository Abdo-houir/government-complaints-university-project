import CitizenComplainPageContent from "./CitizenComplainPageContent";

type Props = {
    params: Promise<{ id: string }>
}

const CitizenComplainPage = async ({ params }: Props) => {
    const { id } = await params;
    return <CitizenComplainPageContent
        id={id}
    />
}

export default CitizenComplainPage