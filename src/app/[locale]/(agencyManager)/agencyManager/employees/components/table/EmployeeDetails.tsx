// components/employees/EmployeeDetails.tsx
"use client"

import {
    Avatar,
    Badge,
    Box,
    Card,
    Divider,
    Grid,
    Group,
    Modal,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    ThemeIcon,
    Title
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useLocale, useTranslations } from "next-intl"
import {
    FaBuilding,
    FaCalendarAlt,
    FaCheck,
    FaEnvelope,
    FaExternalLinkAlt,
    FaIdCard,
    FaMapMarkerAlt,
    FaTimes,
    FaUserTie
} from "react-icons/fa"
import { IoIosBusiness } from "react-icons/io"
import { MdDateRange, MdEmail, MdLocationOn, MdPerson, MdPhone, MdWork } from "react-icons/md"
import ImageFetcher from "../../../../../../../../lib/api/ImageFetcher"
import InfoIcon from "../../../../../../../../lib/components/view/InfoIcon"

type Props = {
    employee: EmployeeType
}

const EmployeeDetails = ({ employee }: Props) => {
    const locale = useLocale()
    const t = useTranslations("manager.employees.details")
    const [idFrontOpened, { open: openIdFront, close: closeIdFront }] = useDisclosure(false)
    const [idBackOpened, { open: openIdBack, close: closeIdBack }] = useDisclosure(false)

    const getFullName = () => {
        return `${employee.FirstnameAr} ${employee.MiddlenameAr} ${employee.LastnameAr}`
    }

    const getFullNameEn = () => {
        return `${employee.FirstnameEn} ${employee.MiddlenameEn} ${employee.LastnameEn}`
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const calculateAge = (birthDate: string) => {
        const today = new Date()
        const birth = new Date(birthDate)
        let age = today.getFullYear() - birth.getFullYear()
        const monthDiff = today.getMonth() - birth.getMonth()

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--
        }

        return age
    }

    const InfoCard = ({
        title,
        icon: Icon,
        children
    }: {
        title: string,
        icon: React.ElementType,
        children: React.ReactNode
    }) => (
        <Paper withBorder p="md" radius="md">
            <Group mb="sm">
                <ThemeIcon size="lg" variant="light" color="blue">
                    <Icon size={18} />
                </ThemeIcon>
                <Text fw={600} size="lg">{title}</Text>
            </Group>
            {children}
        </Paper>
    )


    return (
        <Stack gap="lg">
            {/* Header with basic info */}
            <Card withBorder radius="lg" p="xl">
                <Group align="flex-start" wrap="nowrap">
                    <Avatar
                        size={120}
                        radius={60}
                        color={employee.EmploymentStatus ? "blue" : "gray"}
                        style={{
                            border: `4px solid ${employee.EmploymentStatus ? 'var(--mantine-color-blue-6)' : 'var(--mantine-color-gray-6)'}`
                        }}
                    >
                        <Text size="xl" fw={700}>
                            {employee.FirstnameAr[0]}{employee.LastnameAr[0]}
                        </Text>
                    </Avatar>

                    <Box style={{ flex: 1 }}>
                        <Group justify="space-between" align="flex-start" mb="md">
                            <Box>
                                <Title order={2} mb="xs">
                                    {locale === "ar" ? getFullName() : getFullNameEn()}
                                </Title>
                                <Group gap="sm" mb="xs">
                                    <Badge
                                        size="lg"
                                        color={employee.EmploymentStatus ? "green" : "red"}
                                        variant="light"
                                    >
                                        {employee.EmploymentStatus ? t("status.active") : t("status.inactive")}
                                    </Badge>
                                    <Badge size="lg" variant="outline" color="gray">
                                        #{employee.id}
                                    </Badge>
                                </Group>

                                <Group gap="lg" mt="md">
                                    <Group gap="xs">
                                        <FaCalendarAlt size={14} color="var(--mantine-color-gray-6)" />
                                        <Text size="sm">
                                            {calculateAge(employee.BirthDate)} {t("yearsOld")}
                                        </Text>
                                    </Group>
                                    <Group gap="xs">
                                        <FaBuilding size={14} color="var(--mantine-color-gray-6)" />
                                        <Text size="sm">
                                            {locale === "ar" ? employee.agency_name_ar : employee.agency_name_en}
                                        </Text>
                                    </Group>
                                </Group>
                            </Box>
                        </Group>
                    </Box>
                </Group>
            </Card>

            {/* Main Information Grid */}
            <Grid gutter="lg">
                {/* Personal Information */}
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <InfoCard title={t("personalInfo.title")} icon={FaUserTie}>
                        <Stack gap="md">
                            <SimpleGrid cols={1}>
                                <InfoIcon
                                    color="emerald"
                                    labelProps={{
                                        fz: "lg",
                                        fw: 900
                                    }}
                                    variant="light"
                                    row
                                    valueProps={{
                                        fz: "lg"
                                    }}
                                    label={t("personalInfo.firstName")}
                                    icon={<MdPerson />}
                                >
                                    {locale === "ar" ? employee.FirstnameAr : employee.FirstnameEn}
                                </InfoIcon>
                                <InfoIcon
                                    color="emerald"
                                    labelProps={{
                                        fz: "lg",
                                        fw: 900
                                    }}
                                    variant="light"
                                    row
                                    valueProps={{
                                        fz: "lg"
                                    }}
                                    label={t("personalInfo.lastName")}
                                    icon={<MdPerson />}
                                >
                                    {locale === "ar" ? employee.LastnameAr : employee.LastnameEn}
                                </InfoIcon>
                                <InfoIcon
                                    color="emerald"
                                    labelProps={{
                                        fz: "lg",
                                        fw: 900
                                    }}
                                    variant="light"
                                    row
                                    valueProps={{
                                        fz: "lg"
                                    }}
                                    label={t("personalInfo.middleName")}
                                    icon={<MdPerson />}
                                >
                                    {locale === "ar" ? employee.MiddlenameAr : employee.MiddlenameEn}
                                </InfoIcon>
                                <InfoIcon
                                    color="emerald"
                                    labelProps={{
                                        fz: "lg",
                                        fw: 900
                                    }}
                                    variant="light"
                                    row
                                    valueProps={{
                                        fz: "lg"
                                    }}
                                    label={t("personalInfo.nationalNumber")}
                                >
                                    {employee.NationalNumber}
                                </InfoIcon>
                            </SimpleGrid>

                            <Divider />

                            <SimpleGrid cols={1}>
                                <InfoIcon
                                    color="emerald"
                                    labelProps={{
                                        fz: "lg",
                                        fw: 900
                                    }}
                                    variant="light"
                                    row
                                    valueProps={{
                                        fz: "lg"
                                    }}
                                    label={t("personalInfo.birthDate")}
                                    icon={<MdDateRange />}
                                >
                                    {formatDate(employee.BirthDate)}
                                </InfoIcon>
                                <InfoIcon
                                    color="emerald"
                                    labelProps={{
                                        fz: "lg",
                                        fw: 900
                                    }}
                                    variant="light"
                                    row
                                    valueProps={{
                                        fz: "lg"
                                    }}
                                    label={t("personalInfo.age")}
                                    icon={<FaCalendarAlt />}
                                >
                                    {`${calculateAge(employee.BirthDate)} ${t("years")}`}
                                </InfoIcon>
                                <InfoIcon
                                    color="emerald"
                                    labelProps={{
                                        fz: "lg",
                                        fw: 900
                                    }}
                                    variant="light"
                                    row
                                    valueProps={{
                                        fz: "lg"
                                    }}
                                    label={t("personalInfo.birthPlace")}
                                    icon={<FaMapMarkerAlt />}
                                >
                                    {locale === "ar" ? employee.BirthPlaceAr : employee.BirthPlaceEn}
                                </InfoIcon>
                            </SimpleGrid>
                        </Stack>
                    </InfoCard>
                </Grid.Col>

                {/* Contact Information */}
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <InfoCard title={t("contactInfo.title")} icon={FaEnvelope}>
                        <Stack gap="md">
                            <InfoIcon
                                color="emerald"
                                labelProps={{
                                    fz: "lg",
                                    fw: 900
                                }}
                                variant="light"
                                row
                                valueProps={{
                                    fz: "lg"
                                }}
                                label={t("contactInfo.email")}
                                icon={<MdEmail />}
                            >
                                {employee.Email}
                            </InfoIcon>
                            <InfoIcon
                                color="emerald"
                                labelProps={{
                                    fz: "lg",
                                    fw: 900
                                }}
                                variant="light"
                                row
                                valueProps={{
                                    fz: "lg"
                                }}
                                label={t("contactInfo.phone")}
                                icon={<MdPhone />}
                            >
                                {employee.ContactNumber}
                            </InfoIcon>
                            <InfoIcon
                                color="emerald"
                                labelProps={{
                                    fz: "lg",
                                    fw: 900
                                }}
                                variant="light"
                                row
                                valueProps={{
                                    fz: "lg"
                                }}
                                label={t("contactInfo.location")}
                                icon={<MdLocationOn />}
                            >
                                {locale === "ar" ? employee.CurrentLocationAr : employee.CurrentLocationEn}
                            </InfoIcon>
                        </Stack>
                    </InfoCard>
                </Grid.Col>

                {/* Employment Information */}
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <InfoCard title={t("employmentInfo.title")} icon={FaBuilding}>
                        <Stack gap="md">
                            <InfoIcon
                                color="emerald"
                                labelProps={{
                                    fz: "lg",
                                    fw: 900
                                }}
                                variant="light"
                                row
                                valueProps={{
                                    fz: "lg"
                                }}
                                label={t("employmentInfo.agency")}
                                icon={<IoIosBusiness />}
                            >
                                {locale === "ar" ? employee.agency_name_ar : employee.agency_name_en}
                            </InfoIcon>
                            <InfoIcon
                                color="emerald"
                                labelProps={{
                                    fz: "lg",
                                    fw: 900
                                }}
                                variant="light"
                                row
                                valueProps={{
                                    fz: "lg"
                                }}
                                label={t("employmentInfo.section")}
                                icon={<MdWork />}
                            >
                                {locale === "ar" ? employee.section_name_ar : employee.section_name_en}
                            </InfoIcon>
                            <InfoIcon
                                color="emerald"
                                labelProps={{
                                    fz: "lg",
                                    fw: 900
                                }}
                                variant="light"
                                row
                                valueProps={{
                                    fz: "lg"
                                }}
                                label={t("employmentInfo.employmentDate")}
                                icon={<MdDateRange />}
                            >
                                {formatDate(employee.EmploymentDate)}
                            </InfoIcon>

                            <InfoIcon
                                color="emerald"
                                labelProps={{
                                    fz: "lg",
                                    fw: 900
                                }}
                                variant="light"
                                row
                                valueProps={{
                                    fz: "lg"
                                }}
                                label={t("employmentInfo.employmentDuration")}
                                icon={<FaCalendarAlt />}
                            >
                                {(() => {
                                    const startDate = new Date(employee.EmploymentDate)
                                    const today = new Date()
                                    const years = today.getFullYear() - startDate.getFullYear()
                                    const months = today.getMonth() - startDate.getMonth()
                                    return `${years} ${t("years")} ${months} ${t("months")}`
                                })()}
                            </InfoIcon>
                        </Stack>
                    </InfoCard>
                </Grid.Col>

                {/* Permissions */}
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <InfoCard title={t("permissions.title")} icon={FaCheck}>
                        <Stack gap="lg">
                            <Box>
                                <Text fw={600} mb="sm">{t("permissions.complaintPermissions")}</Text>
                                <SimpleGrid cols={{ base: 1, xl: 1 }}>
                                    <Badge
                                        size="xl"
                                        leftSection={employee.CanResponseToComplaint ? (
                                            <FaCheck color="var(--mantine-color-teal-6)" />
                                        ) : (
                                            <FaTimes color="var(--mantine-color-red-6)" />
                                        )}
                                        color={employee.CanResponseToComplaint ? "teal" : "red"}
                                        variant="light"
                                        radius="md"
                                    >
                                        <Text fw={500}>{t("permissions.canRespond")}</Text>
                                    </Badge>
                                    <Badge
                                        size="xl"
                                        leftSection={employee.CanChangeComplaintStatus ? (
                                            <FaCheck color="var(--mantine-color-teal-6)" />
                                        ) : (
                                            <FaTimes color="var(--mantine-color-red-6)" />
                                        )}
                                        color={employee.CanChangeComplaintStatus ? "blue" : "gray"}
                                        variant="light"
                                        radius="md"
                                    >
                                        <Text fw={500}>{t("permissions.canChangeStatus")}</Text>
                                    </Badge>

                                </SimpleGrid>
                            </Box>

                            <Box>
                                <Text fw={600} mb="sm">{t("permissions.currentStatus")}</Text>
                                <Badge
                                    size="xl"
                                    variant="light"
                                    color={employee.EmploymentStatus ? "emerald" : "red"}
                                    leftSection={employee.EmploymentStatus ? <FaCheck /> : <FaTimes />}
                                >
                                    {employee.EmploymentStatus ? t("permissions.active") : t("permissions.inactive")}
                                </Badge>
                            </Box>
                        </Stack>
                    </InfoCard>
                </Grid.Col>

                {/* ID Card Images */}
                <Grid.Col span={12}>
                    <InfoCard title={t("idCards.title")} icon={FaIdCard}>
                        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                            <Box>
                                <Text fw={600} mb="sm">{t("idCards.front")}</Text>
                                <Paper
                                    withBorder
                                    radius="md"
                                    style={{ overflow: 'hidden', cursor: 'pointer' }}
                                    onClick={openIdFront}
                                >
                                    <ImageFetcher
                                        endpoint={employee.IdFrontFace}
                                        h={300}
                                        w={500}
                                        alt="front face"
                                        imageProps={{
                                            style: {
                                                objectFit: "cover"
                                            }
                                        }}
                                    />
                                    <Group justify="center" p="sm">
                                        <FaExternalLinkAlt size={14} />
                                        <Text size="sm">{t("idCards.clickToView")}</Text>
                                    </Group>
                                </Paper>
                            </Box>

                            <Box>
                                <Text fw={600} mb="sm">{t("idCards.back")}</Text>
                                <Paper
                                    withBorder
                                    radius="md"
                                    style={{ overflow: 'hidden', cursor: 'pointer' }}
                                    onClick={openIdBack}
                                >
                                    <ImageFetcher
                                        endpoint={employee.IdBackFace}
                                        h={300}
                                        w={500}
                                        alt="front face"
                                        imageProps={{
                                            style: {
                                                objectFit: "cover"
                                            }
                                        }}
                                    />
                                    <Group justify="center" p="sm">
                                        <FaExternalLinkAlt size={14} />
                                        <Text size="sm">{t("idCards.clickToView")}</Text>
                                    </Group>
                                </Paper>
                            </Box>
                        </SimpleGrid>
                    </InfoCard>
                </Grid.Col>
            </Grid>

            {/* ID Card Modals */}
            <Modal
                opened={idFrontOpened}
                onClose={closeIdFront}
                title={t("idCards.front")}
                size={1080}
                centered
            >
                <ImageFetcher
                    endpoint={employee.IdFrontFace}
                    h={"100%"}
                    w={"100%"}
                    alt="front face"
                    imageProps={{
                        style: {
                            objectFit: "cover",
                            width: "100%",
                            height: "100%"
                        }
                    }}
                />
            </Modal>

            <Modal
                opened={idBackOpened}
                onClose={closeIdBack}
                title={t("idCards.back")}
                size={1080}
                centered
            >
                <ImageFetcher
                    endpoint={employee.IdBackFace}
                    h={"100%"}
                    w={"100%"}
                    alt="back face"
                    imageProps={{
                        style: {
                            objectFit: "cover",
                            width: "100%",
                            height: "100%"
                        }
                    }}
                />
            </Modal>
        </Stack>
    )
}

export default EmployeeDetails