"use client"
import { Link } from "@/i18n/navigation"
import PATHS from "@/paths"
import {
    ActionIcon,
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
    TextInput,
    Tooltip
} from "@mantine/core"
import { useTranslations } from "next-intl"
import { SetStateAction, useState } from "react"
import { CgDetailsMore } from "react-icons/cg"
import { FaFilter, FaSearch } from "react-icons/fa"
import SectionModal from "../SectionModal"
import DeleteSection from "./DeleteSection"

type Props = {
    sectionsResponse: AppResponse<AgencySectionType[]>
}

const SectionsTable = ({ sectionsResponse }: Props) => {
    const tST = useTranslations("manager.sections.table");
    const tC = useTranslations("common");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterField, setFilterField] = useState<"all" | "name" | "description">("all");

    // Filter sections based on search term and selected field
    const filteredSections = sectionsResponse.data.filter((section) => {
        if (!searchTerm.trim()) return true;

        const searchLower = searchTerm.toLowerCase();

        switch (filterField) {
            case "name":
                return (
                    (section.NameAr && section.NameAr.toLowerCase().includes(searchLower)) ||
                    (section.NameEn && section.NameEn.toLowerCase().includes(searchLower))
                );
            case "description":
                return (
                    (section.DescriptionAr && section.DescriptionAr.toLowerCase().includes(searchLower)) ||
                    (section.DescriptionEn && section.DescriptionEn.toLowerCase().includes(searchLower))
                );
            case "all":
            default:
                return (
                    (section.NameAr && section.NameAr.toLowerCase().includes(searchLower)) ||
                    (section.NameEn && section.NameEn.toLowerCase().includes(searchLower)) ||
                    (section.DescriptionAr && section.DescriptionAr.toLowerCase().includes(searchLower)) ||
                    (section.DescriptionEn && section.DescriptionEn.toLowerCase().includes(searchLower))
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
                            {tST("resultsCount", { count: filteredSections.length, total: sectionsResponse.data.length })}
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
                            {filteredSections.length > 0 ? (
                                filteredSections.map((section) => (
                                    <TableTr key={section.id}>
                                        <TableTd>
                                            {section.NameAr || section.NameEn}
                                            {searchTerm && (
                                                <div style={{ fontSize: "0.75rem", color: "var(--mantine-color-blue-6)" }}>
                                                    {section.NameAr && section.NameEn ?
                                                        `${section.NameAr} / ${section.NameEn}` :
                                                        section.NameAr || section.NameEn
                                                    }
                                                </div>
                                            )}
                                        </TableTd>
                                        <TableTd>
                                            {section.DescriptionAr || section.DescriptionEn}
                                            {searchTerm && section.DescriptionAr && section.DescriptionEn && (
                                                <div style={{ fontSize: "0.75rem", color: "var(--mantine-color-gray-6)" }}>
                                                    {section.DescriptionAr && section.DescriptionEn ?
                                                        `${section.DescriptionAr.substring(0, 100)}...` :
                                                        section.DescriptionAr || section.DescriptionEn
                                                    }
                                                </div>
                                            )}
                                        </TableTd>
                                        <TableTd >
                                            <Group>

                                                <SectionModal
                                                    fields={{
                                                        DescriptionAr: "",
                                                        DescriptionEn: "",
                                                        NameAr: '',
                                                        NameEn: '',
                                                    }}
                                                    id={section.id}
                                                    isEdit
                                                    iconOnly
                                                />
                                                <Tooltip
                                                    label={tC("viewDetails")}
                                                >
                                                    <ActionIcon
                                                        color="emerald"
                                                        component={Link}
                                                        href={PATHS.agencyManager.sections.details(section.id)}

                                                    >
                                                        <CgDetailsMore />
                                                    </ActionIcon>
                                                </Tooltip>
                                                <DeleteSection
                                                    id={section.id}
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

export default SectionsTable