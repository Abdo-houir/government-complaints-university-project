"use client"
import { AgencySchemaType, getAgencySchema } from '@/app/validation/admin/agency'
import {
    ActionIcon,
    Button,
    Grid,
    GridCol,
    Group,
    Modal,
    Select,
    Stack,
    Switch,
    Text,
    Textarea,
    TextInput,
    Tooltip
} from '@mantine/core'
import { TimeInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useTranslations } from 'next-intl'
import { FaBuilding, FaClock, FaEdit, FaMapMarkerAlt } from 'react-icons/fa'
import useBoolean from '../../../../../../../../lib/hooks/useBoolean'

type Props = {
    isEdit?: boolean,
    fields?: AgencySchemaType,
    agencyId?: number,
    iconOnly?: boolean
}

const AgencyModal = ({ fields, isEdit, iconOnly }: Props) => {
    const t = useTranslations("admin.agencies");
    const tC = useTranslations("common");
    const Tf = useTranslations("fields.agency");

    const form = useForm<AgencySchemaType>({
        initialValues: {
            NameAr: fields?.NameAr || "",
            NameEn: fields?.NameEn || "",
            DescriptionAr: fields?.DescriptionAr || "",
            DescriptionEn: fields?.DescriptionEn || "",
            LocationAr: fields?.LocationAr || "",
            LocationEn: fields?.LocationEn || "",
            WorkingStartTime: fields?.WorkingStartTime || "08:00",
            WorkingEndTime: fields?.WorkingEndTime || "16:00",
            Status: fields?.Status ?? true,
            ParentId: fields?.ParentId || null,
            ManagerId: fields?.ManagerId || 1,
        },
        validate: zod4Resolver(getAgencySchema(Tf)),
    });

    // Mock data for selects (replace with real API calls)
    const parentAgencies = [
        { value: "1", label: "الوكالة الرئيسية" },
        { value: "2", label: "وكالة فرعية 1" },
    ];

    const managers = [
        { value: "1", label: "أحمد محمد" },
        { value: "2", label: "سامي العلي" },
    ];

    const handleSubmit = (values: AgencySchemaType) => {
        console.log("Agency data:", values);
        // Handle API call here
    };
    const isOpen = useBoolean({ initialState: false });

    const onclose = () => {
        isOpen.onFalse()
    }
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
                opened={isOpen.value} // You would control this with state
                onClose={onclose} // Close function
                centered
                size={1080}
                title={
                    <Text fz="h3" fw="bold" c="emerald">
                        {isEdit ? t("edit") : t("add")}
                    </Text>
                }
            >
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack gap="md">
                        {/* Basic Information */}
                        <Grid gutter="md">
                            <GridCol span={{ base: 12, md: 6 }}>
                                <TextInput
                                    label={Tf("NameAr.label")}
                                    placeholder={Tf("NameAr.placeholder")}
                                    leftSection={<FaBuilding size={14} />}
                                    radius="md"
                                    {...form.getInputProps("NameAr")}
                                    error={form.errors.NameAr}
                                />
                            </GridCol>
                            <GridCol span={{ base: 12, md: 6 }}>
                                <TextInput
                                    label={Tf("NameEn.label")}
                                    placeholder={Tf("NameEn.placeholder")}
                                    leftSection={<FaBuilding size={14} />}
                                    radius="md"
                                    {...form.getInputProps("NameEn")}
                                    error={form.errors.NameEn}
                                />
                            </GridCol>
                        </Grid>

                        {/* Location */}
                        <Grid gutter="md">
                            <GridCol span={{ base: 12, md: 6 }}>
                                <TextInput
                                    label={Tf("LocationAr.label")}
                                    placeholder={Tf("LocationAr.placeholder")}
                                    leftSection={<FaMapMarkerAlt size={14} />}
                                    radius="md"
                                    {...form.getInputProps("LocationAr")}
                                    error={form.errors.LocationAr}
                                />
                            </GridCol>
                            <GridCol span={{ base: 12, md: 6 }}>
                                <TextInput
                                    label={Tf("LocationEn.label")}
                                    placeholder={Tf("LocationEn.placeholder")}
                                    leftSection={<FaMapMarkerAlt size={14} />}
                                    radius="md"
                                    {...form.getInputProps("LocationEn")}
                                    error={form.errors.LocationEn}
                                />
                            </GridCol>
                        </Grid>

                        {/* Working Hours */}
                        <Grid gutter="md">
                            <GridCol span={{ base: 12, md: 6 }}>
                                <TimeInput
                                    label={Tf("WorkingStartTime.label")}
                                    placeholder={Tf("WorkingStartTime.placeholder")}
                                    leftSection={<FaClock size={14} />}
                                    radius="md"
                                    {...form.getInputProps("WorkingStartTime")}
                                    error={form.errors.WorkingStartTime}
                                />
                            </GridCol>
                            <GridCol span={{ base: 12, md: 6 }}>
                                <TimeInput
                                    label={Tf("WorkingEndTime.label")}
                                    placeholder={Tf("WorkingEndTime.placeholder")}
                                    leftSection={<FaClock size={14} />}
                                    radius="md"
                                    {...form.getInputProps("WorkingEndTime")}
                                    error={form.errors.WorkingEndTime}
                                />
                            </GridCol>
                        </Grid>

                        {/* Description */}
                        <Grid gutter="md">
                            <GridCol span={{ base: 12, md: 6 }}>
                                <Textarea
                                    label={Tf("DescriptionAr.label")}
                                    placeholder={Tf("DescriptionAr.placeholder")}
                                    radius="md"
                                    autosize
                                    minRows={3}
                                    maxRows={5}
                                    {...form.getInputProps("DescriptionAr")}
                                    error={form.errors.DescriptionAr}
                                />
                            </GridCol>
                            <GridCol span={{ base: 12, md: 6 }}>
                                <Textarea
                                    label={Tf("DescriptionEn.label")}
                                    placeholder={Tf("DescriptionEn.placeholder")}
                                    radius="md"
                                    autosize
                                    minRows={3}
                                    maxRows={5}
                                    {...form.getInputProps("DescriptionEn")}
                                    error={form.errors.DescriptionEn}
                                />
                            </GridCol>
                        </Grid>

                        {/* Parent Agency and Manager */}
                        <Grid gutter="md">
                            <GridCol span={{ base: 12, md: 6 }}>
                                <Select
                                    label={Tf("ParentId.label")}
                                    placeholder={Tf("ParentId.placeholder")}
                                    data={parentAgencies}
                                    clearable
                                    {...form.getInputProps("ParentId")}
                                    error={form.errors.ParentId}
                                />
                            </GridCol>
                            <GridCol span={{ base: 12, md: 6 }}>
                                <Select
                                    label={Tf("ManagerId.label")}
                                    placeholder={Tf("ManagerId.placeholder")}
                                    data={managers}
                                    clearable
                                    {...form.getInputProps("ManagerId")}
                                    error={form.errors.ManagerId}
                                />
                            </GridCol>
                        </Grid>

                        {/* Status */}
                        <Group>
                            <Switch
                                label={Tf("Status.label")}
                                checked={form.values.Status}
                                onChange={(e) => form.setFieldValue("Status", e.currentTarget.checked)}
                            />
                        </Group>

                        {/* Submit Button */}
                        <Button
                            fullWidth
                            radius="md"
                            variant="light"
                            type="submit"
                            size="lg"
                        >
                            {isEdit ? tC("update") : tC("create")}
                        </Button>
                    </Stack>
                </form>
            </Modal>
        </>
    );
}

export default AgencyModal;