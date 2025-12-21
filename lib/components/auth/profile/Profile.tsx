"use client"
import useAuthContext from "@/app/context/auth/useAuthContext";
import { Divider, Flex, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { useLocale, useTranslations } from "next-intl";
import { FaCalendarDay, FaIdCard, FaMapMarkedAlt, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { RiAccountPinBoxFill } from "react-icons/ri";
import ImageFetcher from "../../../api/ImageFetcher";
import { textIcon } from "../../../context/mantine/styles";
import InfoIcon from "../../view/InfoIcon";

type Props = {
    compact?: boolean,
    noImages?: boolean,
}

const Profile = ({ compact = false, noImages = false }: Props) => {
    const tF = useTranslations("fields");

    const locale = useLocale();

    const { user } = useAuthContext();

    if (user) {

        const fullNameEn = `${user.FirstnameEn} ${user.MiddlenameEn} ${user.LastnameEn}`
        const fullNameAr = `${user.FirstnameAr} ${user.MiddlenameAr} ${user.LastnameAr}`
        return (
            <Stack gap="md">
                {/* Name Section */}
                <Group>
                    <Text fw={600} fz="lg" c="emerald" style={textIcon}>
                        <RiAccountPinBoxFill size={25} />
                        {locale === "ar" ? fullNameAr : fullNameEn}
                    </Text>
                    <Text fz="md" >
                        ({locale === "ar" ? fullNameEn : fullNameAr})
                    </Text>
                </Group>

                <Divider />

                {/* Basic Info */}
                <SimpleGrid cols={{ base: 1, lg: compact ? 1 : 2 }}>
                    <InfoIcon
                        label={tF("email.label") + " : "}
                        icon={<IoIosMail />}
                        color="emerald"
                        row
                        variant="transparent"
                        labelProps={{ fz: "h3" }}
                        valueProps={{ fz: "h4" }}
                    >
                        {user.Email}
                    </InfoIcon>
                    <InfoIcon
                        label={tF("ContactNumber.label") + " : "}
                        icon={<FaPhone />}
                        color="emerald"
                        row
                        variant="transparent"
                        labelProps={{ fz: "h3" }}
                        valueProps={{ fz: "h4" }}
                    >
                        {user.ContactNumber}
                    </InfoIcon>
                    <InfoIcon
                        label={tF("NationalNumber.label") + " : "}
                        icon={<FaIdCard />}
                        color="emerald"
                        row
                        variant="transparent"
                        labelProps={{ fz: "h3" }}
                        valueProps={{ fz: "h4" }}
                    >
                        {user.NationalNumber}
                    </InfoIcon>
                    <InfoIcon
                        label={tF("BirthDate.label") + " : "}
                        icon={<FaCalendarDay />}
                        color="emerald"
                        row
                        variant="transparent"
                        labelProps={{ fz: "h3" }}
                        valueProps={{ fz: "h4" }}
                    >
                        {user.BirthDate}
                    </InfoIcon>
                    <InfoIcon
                        label={tF("BirthPlaceAr.labelAlt") + " : "}
                        icon={<FaMapMarkedAlt />}
                        color="emerald"
                        row
                        variant="transparent"
                        labelProps={{ fz: "h3" }}
                        valueProps={{ fz: "h4" }}
                    >
                        {locale === "ar" ? user.BirthPlaceAr : user.BirthPlaceEn}
                        <Text component="span" c="dimmed" fz="h5">
                            ({locale === "ar" ? user.BirthPlaceEn : user.BirthPlaceAr})
                        </Text>
                    </InfoIcon>
                    <InfoIcon
                        label={tF("CurrentLocationEn.label") + " : "}
                        icon={<FaMapMarkerAlt />}
                        color="emerald"
                        row
                        variant="transparent"
                        labelProps={{ fz: "h3" }}
                        valueProps={{ fz: "h4" }}
                    >
                        {user.CurrentLocationEn}
                    </InfoIcon>
                </SimpleGrid>
                {
                    !noImages &&
                    <>
                        <Divider />

                        <Flex direction={{ base: "column", xl: compact ? "column" : "row" }} gap={15} justify="center" align="center">
                            <Stack align="center" flex={1}>
                                {/* <Text fw={500}>ID Front</Text> */}
                                <ImageFetcher endpoint={user.IdFrontFace} alt="ID Front" h={350} w={"100%"} imageProps={{ radius: "md", fit: "cover" }} />
                            </Stack>
                            <Stack align="center" flex={1}>
                                {/* <Text fw={500}>ID Back</Text> */}
                                <ImageFetcher endpoint={user.IdBackFace} alt="ID back" h={350} w={"100%"} imageProps={{ radius: "md", fit: "cover" }} />

                            </Stack>
                        </Flex>
                    </>
                }
            </Stack>
        )
    }
}

export default Profile