"use client"
import {
    Box,
    Button,
    Card,
    Flex,
    Group,
    Select,
    Table,
    TableScrollContainer,
    TableTbody,
    TableTd,
    TableTh,
    TableThead,
    TableTr,
    Text,
    TextInput
} from "@mantine/core"
import { useLocale, useTranslations } from "next-intl"
import { SetStateAction, useState } from "react"
import { FaFilter, FaSearch } from "react-icons/fa"
import DeleteService from "./DeleteService"
import ServiceModal from "./ServiceModal"

type Props = {
    services: AppResponse<ServiceType[]>,
    sectionId: number
}

const ServicesTable = ({ services, sectionId }: Props) => {
    const locale = useLocale()
    const tST = useTranslations("manager.services.table");
    const tC = useTranslations("common");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterField, setFilterField] = useState<"all" | "name" | "description">("all");

    // Filter sections based on search term and selected field
    const filteredServices = services.data.filter((service) => {
        if (!searchTerm.trim()) return true;

        const searchLower = searchTerm.toLowerCase();

        switch (filterField) {
            case "name":
                return (
                    (service.NameAr && service.NameAr.toLowerCase().includes(searchLower)) ||
                    (service.NameEn && service.NameEn.toLowerCase().includes(searchLower))
                );
            case "description":
                return (
                    (service.DescriptionAr && service.DescriptionAr.toLowerCase().includes(searchLower)) ||
                    (service.DescriptionEn && service.DescriptionEn.toLowerCase().includes(searchLower))
                );
            case "all":
            default:
                return (
                    (service.NameAr && service.NameAr.toLowerCase().includes(searchLower)) ||
                    (service.NameEn && service.NameEn.toLowerCase().includes(searchLower)) ||
                    (service.DescriptionAr && service.DescriptionAr.toLowerCase().includes(searchLower)) ||
                    (service.DescriptionEn && service.DescriptionEn.toLowerCase().includes(searchLower))
                );
        }
    });

    // Clear all filters
    const clearFilters = () => {
        setSearchTerm("");
        setFilterField("all");
    };

    return (
        <>
            <Card p={0} radius="md">
                {/* Filter Controls */}
                <Box p="md" style={{ borderBottom: "1px solid var(--mantine-color-gray-3)" }}>
                    <Flex gap="md" align="flex-end">
                        <TextInput
                            placeholder={tST("searchPlaceholder")}
                            leftSection={<FaSearch size={14} />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ flex: 1 }}
                        />

                        <Select
                            placeholder={tST("filterBy")}
                            leftSection={<FaFilter size={14} />}
                            data={[
                                { value: "all", label: tST("allFields") },
                                { value: "name", label: tST("byName") },
                                { value: "description", label: tST("byDescription") },
                            ]}
                            value={filterField}
                            onChange={(value) => setFilterField(value as SetStateAction<"all" | "name" | "description">)}
                            style={{ width: 200 }}
                        />

                        {(searchTerm || filterField !== "all") && (
                            <Button
                                variant="subtle"
                                size="sm"
                                onClick={clearFilters}
                            >
                                {tC("clearFilters")}
                            </Button>
                        )}
                    </Flex>

                    {/* Results count */}
                    {searchTerm && (
                        <Text size="sm" c="dimmed" mt="xs">
                            {tST("resultsCount", { count: filteredServices.length, total: services.data.length })}
                        </Text>
                    )}
                </Box>

                <TableScrollContainer minWidth={300} maxHeight={"65dvh"} h={"65dvh"}>
                    <Table
                        stickyHeader
                        striped
                    >
                        <TableThead >
                            <TableTr>
                                <TableTh >
                                    {tST("name")}
                                </TableTh>
                                <TableTh >
                                    {tST("description")}
                                </TableTh>
                                <TableTh >
                                    {tST("actions")}
                                </TableTh>
                            </TableTr>
                        </TableThead>
                        <TableTbody >
                            {filteredServices.length > 0 ? (
                                filteredServices.map((service) => (
                                    <TableTr key={service.id}>
                                        <TableTd>
                                            <Text>
                                                {locale === "ar" ? service.NameAr : service.NameEn}
                                            </Text>
                                        </TableTd>
                                        <TableTd>
                                            <Text>
                                                {locale === "ar" ? service.DescriptionAr : service.DescriptionEn}
                                            </Text>
                                        </TableTd>
                                        <TableTd >
                                            <Group>

                                                <ServiceModal
                                                    fields={{
                                                        DescriptionAr: service.DescriptionAr,
                                                        DescriptionEn: service.DescriptionEn,
                                                        NameAr: service.NameAr,
                                                        NameEn: service.NameEn,
                                                    }}
                                                    sectionId={sectionId}
                                                    serviceId={service.id}
                                                    isEdit
                                                    iconOnly
                                                />
                                                <DeleteService
                                                    serviceId={service.id}
                                                    sectionId={sectionId}
                                                />
                                            </Group>
                                        </TableTd>
                                    </TableTr>
                                ))
                            ) : (
                                <TableTr>
                                    <TableTd colSpan={3} style={{ textAlign: "center", padding: "2rem" }}>
                                        {searchTerm ? tST("noResults") : tST("noData")}
                                    </TableTd>
                                </TableTr>
                            )}
                        </TableTbody>
                    </Table>
                </TableScrollContainer>
            </Card>
        </>
    )
}

export default ServicesTable