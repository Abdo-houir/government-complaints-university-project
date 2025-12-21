"use client"
import { getSectionSchema, SectionSchemaType } from '@/app/validation/manager/sections'
import { ActionIcon, Button, Grid, GridCol, Modal, Text, Textarea, TextInput, Tooltip } from '@mantine/core'
import { useForm } from '@mantine/form'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { FaEdit } from 'react-icons/fa'
import { PiNewspaperFill } from 'react-icons/pi'
import useAxiosQuery from '../../../../../../lib/api/react-query/useAxiosQuery'
import { useMutate } from '../../../../../../lib/api/react-query/useMutate'
import endpoints from '../../../../../../lib/api/setup/ebdpoints'
import useBoolean from '../../../../../../lib/hooks/useBoolean'

type Props = {
    isEdit?: boolean,
    id?: number,
    fields?: SectionSchemaType
    iconOnly?: boolean
}

const SectionModal = ({  id, isEdit, iconOnly }: Props) => {
    const data = useAxiosQuery(endpoints.agencyManager.findSection(id || 0), !!id);

    const locale = useLocale();
    const t = useTranslations("manager.sections");
    const tC = useTranslations("common");
    const Tf = useTranslations("fields");
    const TApi = useTranslations("apiMessages");

    const isOpen = useBoolean({ initialState: false });

    const form = useForm<SectionSchemaType>({
        initialValues: {
            NameAr: "",
            NameEn: "",
            DescriptionAr: "",
            DescriptionEn: ""
        },
        validate: zod4Resolver(getSectionSchema(Tf)), // Fixed: changed from zod4Resolver to zodResolver
    });

    useEffect(() => {
        if (data.isSuccess) {
            const fields = data.data as AppResponse<AgencySectionType>
            form.setValues({
                NameAr: fields.data.NameAr || "",
                NameEn: fields.data.NameEn || "",
                DescriptionAr: fields.data.DescriptionAr || "",
                DescriptionEn: fields.data.DescriptionEn || "",
            })
        }
    }, [data.status])

    const { loading, mutate } = useMutate(
        isEdit ? endpoints.agencyManager.updateSection(id || 0) : endpoints.agencyManager.createSection,
        [`/api/listSection?lang=${locale === "ar" ? "Ar" : "En"}`],
        isEdit ? "put" : "post",
        TApi("success"),
        isOpen.onFalse
    );

    const onClose = () => {
        if (!loading && !data.isLoading) {
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
                                disabled={loading || data.isLoading}
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
                                disabled={loading || data.isLoading}
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
                                disabled={loading || data.isLoading}
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
                                disabled={loading || data.isLoading}
                            />
                        </GridCol>
                        <GridCol span={{ base: 12, md: 12 }}>
                            <Button
                                fullWidth
                                radius="md"
                                variant='light'
                                type='submit'
                                loading={loading || data.isLoading}
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

export default SectionModal