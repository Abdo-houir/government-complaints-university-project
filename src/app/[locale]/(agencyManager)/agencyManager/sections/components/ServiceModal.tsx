"use client"
import { getSectionSchema, SectionSchemaType } from '@/app/validation/manager/sections'
import { ActionIcon, Button, Grid, GridCol, Modal, Text, Textarea, TextInput, Tooltip } from '@mantine/core'
import { useForm } from '@mantine/form'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useTranslations } from 'next-intl'
import { FaEdit } from 'react-icons/fa'
import { PiNewspaperFill } from 'react-icons/pi'
import { useMutate } from '../../../../../../../lib/api/react-query/useMutate'
import endpoints from '../../../../../../../lib/api/setup/ebdpoints'
import useBoolean from '../../../../../../../lib/hooks/useBoolean'

type Props = {
    sectionId: number,
    serviceId?: number,
    isEdit?: boolean,
    fields?: SectionSchemaType
    iconOnly?: boolean
}

const ServiceModal = ({ fields, sectionId, isEdit, iconOnly, serviceId }: Props) => {

    const t = useTranslations("manager.services");
    const tC = useTranslations("common");
    const Tf = useTranslations("fields");
    const TApi = useTranslations("apiMessages");

    const isOpen = useBoolean({ initialState: false });

    const form = useForm<SectionSchemaType>({
        initialValues: {
            NameAr: fields?.NameAr || "",
            NameEn: fields?.NameEn || "",
            DescriptionAr: fields?.DescriptionAr || "",
            DescriptionEn: fields?.DescriptionEn || ""
        },
        validate: zod4Resolver(getSectionSchema(Tf)), // Fixed: changed from zod4Resolver to zodResolver
    });


    const { loading, mutate } = useMutate(
        isEdit ? endpoints.agencyManager.updateService(serviceId || 0) : endpoints.agencyManager.createService(sectionId),
        [endpoints.agencies.getServices(parseInt(sectionId.toString()))],
        isEdit ? "put" : "post",
        TApi("success"),
        isOpen.onFalse
    );

    const onClose = () => {
        if (!loading) {
            isOpen.onFalse()
        }
    }
    const handleSubmit = (values: SectionSchemaType) => {
        mutate(values, true);
    };

    return (
        <>
            {
                iconOnly
                    ?
                    <Tooltip
                        label={tC("edit")}
                    >
                        <ActionIcon
                            color="blue"
                            onClick={isOpen.onTrue}
                        >
                            <FaEdit />
                        </ActionIcon>
                    </Tooltip>
                    :
                    <Button
                        variant="light"
                        onClick={isOpen.onTrue}
                    >
                        {t("add")}
                    </Button>
            }
            <Modal
                onClose={onClose}
                opened={isOpen.value}
                centered
                size="xl"
                title={
                    <Text
                        fz="h3"
                        fw="bold"
                        c="emerald"
                    >
                        {t("add")}
                    </Text>
                }
            >
                <form
                    onSubmit={form.onSubmit(handleSubmit)}

                >

                    <Grid >
                        <GridCol span={{ base: 12, md: 6 }}>
                            <TextInput
                                label={Tf("NameAr.label")}
                                description={Tf("NameAr.description")}
                                rightSection={<PiNewspaperFill />}
                                radius="md"
                                {...form.getInputProps("NameAr")}
                                error={form.errors.NameAr}
                                disabled={loading}
                            />
                        </GridCol>
                        <GridCol span={{ base: 12, md: 6 }}>
                            <TextInput
                                label={Tf("NameEn.label")}
                                description={Tf("NameEn.description")}
                                rightSection={<PiNewspaperFill />}
                                radius="md"
                                {...form.getInputProps("NameEn")}
                                error={form.errors.NameEn}
                                disabled={loading}
                            />
                        </GridCol>
                        <GridCol span={{ base: 12, md: 12 }}>
                            <Textarea
                                autosize
                                minRows={2}
                                maxRows={5}
                                label={Tf("DescriptionAr.label")}
                                description={Tf("DescriptionAr.description")}
                                radius="md"
                                {...form.getInputProps("DescriptionAr")}
                                error={form.errors.DescriptionAr}
                                disabled={loading}
                            />
                        </GridCol>
                        <GridCol span={{ base: 12, md: 12 }}>
                            <Textarea
                                autosize
                                minRows={2}
                                maxRows={5}
                                label={Tf("DescriptionEn.label")}
                                description={Tf("DescriptionEn.description")}
                                radius="md"
                                {...form.getInputProps("DescriptionEn")}
                                error={form.errors.DescriptionEn}
                                disabled={loading}
                            />
                        </GridCol>
                        <GridCol span={{ base: 12, md: 12 }}>
                            <Button
                                fullWidth
                                radius="md"
                                variant='light'
                                type='submit'
                                loading={loading}
                            >
                                {tC("confirm")}
                            </Button>
                        </GridCol>
                    </Grid>
                </form>
            </Modal>
        </>
    )
}

export default ServiceModal