"use client"
import { EmployeeSchemaType, getEmployeeSchema } from '@/app/validation/manager/employee'
import {
    ActionIcon,
    Box,
    Button,
    Checkbox,
    Grid,
    GridCol,
    Group,
    Modal,
    Stack,
    Text,
    TextInput,
    Tooltip
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useTranslations } from 'next-intl'
import { FaCalendarAlt, FaEdit, FaEnvelope, FaIdCard, FaKey, FaMapMarker, FaPhone, FaUser } from 'react-icons/fa'
import { useMutate } from '../../../../../../../../lib/api/react-query/useMutate'
import endpoints from '../../../../../../../../lib/api/setup/ebdpoints'
import useBoolean from '../../../../../../../../lib/hooks/useBoolean'

type Props = {
    employeeId?: number,
    isEdit?: boolean,
    fields?: EmployeeSchemaType
    iconOnly?: boolean
    sectionId?: number
}

const EmployeeModal = ({ fields, isEdit, iconOnly, employeeId }: Props) => {
    const t = useTranslations("manager.employees");
    const tC = useTranslations("common");
    const Tf = useTranslations("fields.employee");
    const TApi = useTranslations("apiMessages");

    const isOpen = useBoolean({ initialState: false });

    const form = useForm<EmployeeSchemaType>({
        initialValues: {
            FirstnameAr: fields?.FirstnameAr || "",
            FirstnameEn: fields?.FirstnameEn || "",
            MiddlenameAr: fields?.MiddlenameAr || "",
            MiddlenameEn: fields?.MiddlenameEn || "",
            LastnameAr: fields?.LastnameAr || "",
            LastnameEn: fields?.LastnameEn || "",
            BirthPlaceAr: fields?.BirthPlaceAr || "",
            BirthPlaceEn: fields?.BirthPlaceEn || "",
            BirthDate: fields?.BirthDate || "",
            NationalNumber: fields?.NationalNumber || "",
            CurrentLocationAr: fields?.CurrentLocationAr || "",
            CurrentLocationEn: fields?.CurrentLocationEn || "",
            ContactNumber: fields?.ContactNumber || "",
            Email: fields?.Email || "",
            password: "",
            EmploymentStatus: fields?.EmploymentStatus || false,
            EmploymentDate: fields?.EmploymentDate || "",
            CanResponseToComplaint: fields?.CanResponseToComplaint || false,
            CanChangeComplaintStatus: fields?.CanChangeComplaintStatus || false,
        },
        validate: zod4Resolver(getEmployeeSchema(Tf, isEdit)),
        mode: "controlled",
    });

    const { loading, mutate } = useMutate(
        isEdit
            ? endpoints.agencyManager.updateEmployee(employeeId || 0)
            : endpoints.agencyManager.createEmployee,
        [endpoints.agencyManager.listEmployees],
        isEdit ? "put" : "post",
        TApi("success"),
        () => {
            isOpen.onFalse();
            if (!isEdit) {
                form.reset();
            }
        },
    );

    const onClose = () => {
        if (!loading) {
            isOpen.onFalse();
        }
    };

    const handleSubmit = (values: EmployeeSchemaType) => {
        // Prepare data for API
        const apiData = {
            ...values,
            CanResponseToComplaint: values.CanResponseToComplaint ? 1 : 0,
            CanChangeComplaintStatus: values.CanChangeComplaintStatus ? 1 : 0,
            EmploymentStatus: values.EmploymentStatus ? 1 : 0,
            // If editing and password is empty, don't send it
            ...(isEdit && !values.password && { password: undefined })
        };

        mutate(apiData, true);

    };

    return (
        <>
            {
                iconOnly
                    ?
                    <Tooltip label={isEdit ? tC("edit") : tC("add")}>
                        <ActionIcon
                            color={isEdit ? "blue" : "green"}
                            onClick={isOpen.onTrue}
                        >
                            {isEdit ? <FaEdit /> : <FaUser />}
                        </ActionIcon>
                    </Tooltip>
                    :
                    <Button
                        variant="light"
                        onClick={isOpen.onTrue}
                        leftSection={<FaUser />}
                    >
                        {t("add")}
                    </Button>
            }
            <Modal
                onClose={onClose}
                opened={isOpen.value}
                centered
                size={1080}
                title={
                    <Text fz="h3" fw="bold" c="emerald">
                        {isEdit ? t("editEmployee") : t("addEmployee")}
                    </Text>
                }
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
            >
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack gap="md">
                        {/* Personal Information Section */}
                        <Box>
                            <Text fw={600} size="lg" mb="md" c="blue">
                                {t("personalInfo")}
                            </Text>
                            <Grid gutter="md">
                                <GridCol span={{ base: 12, md: 6 }}>
                                    <TextInput
                                        label={Tf("FirstnameAr.label")}
                                        placeholder={Tf("FirstnameAr.placeholder")}
                                        leftSection={<FaUser size={14} />}
                                        radius="md"
                                        {...form.getInputProps("FirstnameAr")}
                                        error={form.errors.FirstnameAr}
                                        disabled={loading}

                                    />
                                </GridCol>
                                <GridCol span={{ base: 12, md: 6 }}>
                                    <TextInput
                                        label={Tf("FirstnameEn.label")}
                                        placeholder={Tf("FirstnameEn.placeholder")}
                                        leftSection={<FaUser size={14} />}
                                        radius="md"
                                        {...form.getInputProps("FirstnameEn")}
                                        error={form.errors.FirstnameEn}
                                        disabled={loading}
                                    />
                                </GridCol>
                                <GridCol span={{ base: 12, md: 6 }}>
                                    <TextInput
                                        label={Tf("MiddlenameAr.label")}
                                        placeholder={Tf("MiddlenameAr.placeholder")}
                                        leftSection={<FaUser size={14} />}
                                        radius="md"
                                        {...form.getInputProps("MiddlenameAr")}
                                        error={form.errors.MiddlenameAr}
                                        disabled={loading}
                                    />
                                </GridCol>
                                <GridCol span={{ base: 12, md: 6 }}>
                                    <TextInput
                                        label={Tf("MiddlenameEn.label")}
                                        placeholder={Tf("MiddlenameEn.placeholder")}
                                        leftSection={<FaUser size={14} />}
                                        radius="md"
                                        {...form.getInputProps("MiddlenameEn")}
                                        error={form.errors.MiddlenameEn}
                                        disabled={loading}
                                    />
                                </GridCol>
                                <GridCol span={{ base: 12, md: 6 }}>
                                    <TextInput
                                        label={Tf("LastnameAr.label")}
                                        placeholder={Tf("LastnameAr.placeholder")}
                                        leftSection={<FaUser size={14} />}
                                        radius="md"
                                        {...form.getInputProps("LastnameAr")}
                                        error={form.errors.LastnameAr}
                                        disabled={loading}

                                    />
                                </GridCol>
                                <GridCol span={{ base: 12, md: 6 }}>
                                    <TextInput
                                        label={Tf("LastnameEn.label")}
                                        placeholder={Tf("LastnameEn.placeholder")}
                                        leftSection={<FaUser size={14} />}
                                        radius="md"
                                        {...form.getInputProps("LastnameEn")}
                                        error={form.errors.LastnameEn}
                                        disabled={loading}
                                    />
                                </GridCol>
                            </Grid>
                        </Box>

                        {/* Birth Information */}
                        <Box>
                            <Text fw={600} size="lg" mb="md" c="blue">
                                {t("birthInfo")}
                            </Text>
                            <Grid gutter="md">
                                <GridCol span={{ base: 12, md: 6 }}>
                                    <TextInput
                                        label={Tf("BirthPlaceAr.label")}
                                        placeholder={Tf("BirthPlaceAr.placeholder")}
                                        leftSection={<FaMapMarker size={14} />}
                                        radius="md"
                                        {...form.getInputProps("BirthPlaceAr")}
                                        error={form.errors.BirthPlaceAr}
                                        disabled={loading}

                                    />
                                </GridCol>
                                <GridCol span={{ base: 12, md: 6 }}>
                                    <TextInput
                                        label={Tf("BirthPlaceEn.label")}
                                        placeholder={Tf("BirthPlaceEn.placeholder")}
                                        leftSection={<FaMapMarker size={14} />}
                                        radius="md"
                                        {...form.getInputProps("BirthPlaceEn")}
                                        error={form.errors.BirthPlaceEn}
                                        disabled={loading}
                                    />
                                </GridCol>
                                <GridCol span={{ base: 12, md: 6 }}>
                                    <DateInput
                                        label={Tf("BirthDate.label")}
                                        placeholder={Tf("BirthDate.placeholder")}
                                        leftSection={<FaCalendarAlt size={14} />}
                                        radius="md"
                                        value={form.values.BirthDate ? new Date(form.values.BirthDate) : null}
                                        onChange={(date) => form.setFieldValue("BirthDate", date ? date : "")}
                                        error={form.errors.BirthDate}
                                        disabled={loading}

                                    />
                                </GridCol>
                                <GridCol span={{ base: 12, md: 6 }}>
                                    <TextInput
                                        label={Tf("NationalNumber.label")}
                                        placeholder={Tf("NationalNumber.placeholder")}
                                        leftSection={<FaIdCard size={14} />}
                                        radius="md"
                                        {...form.getInputProps("NationalNumber")}
                                        error={form.errors.NationalNumber}
                                        disabled={loading}

                                    />
                                </GridCol>
                            </Grid>
                        </Box>

                        {/* Contact Information */}
                        <Box>
                            <Text fw={600} size="lg" mb="md" c="blue">
                                {t("contactInfo")}
                            </Text>
                            <Grid gutter="md">
                                <GridCol span={{ base: 12, md: 6 }}>
                                    <TextInput
                                        label={Tf("CurrentLocationAr.label")}
                                        placeholder={Tf("CurrentLocationAr.placeholder")}
                                        leftSection={<FaMapMarker size={14} />}
                                        radius="md"
                                        {...form.getInputProps("CurrentLocationAr")}
                                        error={form.errors.CurrentLocationAr}
                                        disabled={loading}

                                    />
                                </GridCol>
                                <GridCol span={{ base: 12, md: 6 }}>
                                    <TextInput
                                        label={Tf("CurrentLocationEn.label")}
                                        placeholder={Tf("CurrentLocationEn.placeholder")}
                                        leftSection={<FaMapMarker size={14} />}
                                        radius="md"
                                        {...form.getInputProps("CurrentLocationEn")}
                                        error={form.errors.CurrentLocationEn}
                                        disabled={loading}
                                    />
                                </GridCol>
                                <GridCol span={{ base: 12, md: 6 }}>
                                    <TextInput
                                        label={Tf("ContactNumber.label")}
                                        placeholder={Tf("ContactNumber.placeholder")}
                                        leftSection={<FaPhone size={14} />}
                                        radius="md"
                                        {...form.getInputProps("ContactNumber")}
                                        error={form.errors.ContactNumber}
                                        disabled={loading}

                                    />
                                </GridCol>
                                <GridCol span={{ base: 12, md: 6 }}>
                                    <TextInput
                                        label={Tf("Email.label")}
                                        placeholder={Tf("Email.placeholder")}
                                        leftSection={<FaEnvelope size={14} />}
                                        radius="md"
                                        {...form.getInputProps("Email")}
                                        error={form.errors.Email}
                                        disabled={loading}

                                    />
                                </GridCol>
                            </Grid>
                        </Box>

                        {/* Password (only show for create or optionally for edit) */}
                        {(!isEdit || form.values.password) && (
                            <Box>
                                <Text fw={600} size="lg" mb="md" c="blue">
                                    {t("passwordSection")}
                                </Text>
                                <Grid gutter="md">
                                    <GridCol span={{ base: 12 }}>
                                        <TextInput
                                            label={Tf("password.label")}
                                            placeholder={Tf("password.placeholder")}
                                            leftSection={<FaKey size={14} />}
                                            radius="md"
                                            type="password"
                                            {...form.getInputProps("password")}
                                            error={form.errors.password}
                                            disabled={loading}
                                        />
                                    </GridCol>
                                </Grid>
                            </Box>
                        )}

                        {/* Employment & Permissions */}
                        <Box>
                            <Text fw={600} size="lg" mb="md" c="blue">
                                {t("employmentPermissions")}
                            </Text>
                            <Grid gutter="md">
                                <GridCol span={{ base: 12 }}>
                                    <DateInput
                                        label={Tf("EmploymentDate.label")}
                                        placeholder={Tf("EmploymentDate.placeholder")}
                                        leftSection={<FaCalendarAlt size={14} />}
                                        radius="md"
                                        value={form.values.EmploymentDate ? new Date(form.values.EmploymentDate) : null}
                                        onChange={(date) => form.setFieldValue("EmploymentDate", date ? date : "")}
                                        error={form.errors.EmploymentDate}
                                        disabled={loading}
                                    />
                                </GridCol>
                                <GridCol span={{ base: 12 }}>
                                    <Group>
                                        <Checkbox
                                            label={Tf("EmploymentStatus.label")}
                                            checked={form.values.EmploymentStatus}
                                            onChange={(e) => form.setFieldValue("EmploymentStatus", e.currentTarget.checked)}
                                            disabled={loading}
                                        />
                                        <Checkbox
                                            label={Tf("CanResponseToComplaint.label")}
                                            checked={form.values.CanResponseToComplaint}
                                            onChange={(e) => form.setFieldValue("CanResponseToComplaint", e.currentTarget.checked)}
                                            disabled={loading}
                                        />
                                        <Checkbox
                                            label={Tf("CanChangeComplaintStatus.label")}
                                            checked={form.values.CanChangeComplaintStatus}
                                            onChange={(e) => form.setFieldValue("CanChangeComplaintStatus", e.currentTarget.checked)}
                                            disabled={loading}
                                        />
                                    </Group>
                                </GridCol>
                            </Grid>
                        </Box>

                        {/* Submit Button */}
                        <Button
                            fullWidth
                            radius="md"
                            variant="light"
                            type="submit"
                            loading={loading}
                            size="lg"
                        >
                            {isEdit ? tC("edit") : tC("create")}
                        </Button>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}

export default EmployeeModal