"use client"
import {
  Avatar,
  Badge,
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
import { IoBusiness, IoPerson } from "react-icons/io5"
import { MdEmail, MdPhone } from "react-icons/md"
import EmployeeModal from "../modal/EmployeeModal"
import EmployeeDetailsModal from "./EmployeeDetailsModal"

type Props = {
  employees: AppResponse<EmployeeType[]>,
}

const EmployeesTable = ({ employees }: Props) => {
  const locale = useLocale()
  const tST = useTranslations("manager.employees.table");
  const tC = useTranslations("common");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState<"all" | "name" | "email" | "nationalNumber">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  // Filter employees based on search term and selected field
  const filteredEmployees = employees.data.filter((employee) => {
    // Apply status filter
    if (statusFilter !== "all") {
      if (statusFilter === "active" && employee.EmploymentStatus !== 1) return false;
      if (statusFilter === "inactive" && employee.EmploymentStatus !== 0) return false;
    }

    // Apply search filter
    if (!searchTerm.trim()) return true;

    const searchLower = searchTerm.toLowerCase();

    switch (filterField) {
      case "name":
        return (
          (employee.FirstnameAr && employee.FirstnameAr.toLowerCase().includes(searchLower)) ||
          (employee.FirstnameEn && employee.FirstnameEn.toLowerCase().includes(searchLower)) ||
          (employee.LastnameAr && employee.LastnameAr.toLowerCase().includes(searchLower)) ||
          (employee.LastnameEn && employee.LastnameEn.toLowerCase().includes(searchLower)) ||
          (employee.MiddlenameAr && employee.MiddlenameAr.toLowerCase().includes(searchLower)) ||
          (employee.MiddlenameEn && employee.MiddlenameEn.toLowerCase().includes(searchLower))
        );
      case "email":
        return employee.Email.toLowerCase().includes(searchLower);
      case "nationalNumber":
        return employee.NationalNumber.includes(searchTerm);
      case "all":
      default:
        return (
          (employee.FirstnameAr && employee.FirstnameAr.toLowerCase().includes(searchLower)) ||
          (employee.FirstnameEn && employee.FirstnameEn.toLowerCase().includes(searchLower)) ||
          (employee.LastnameAr && employee.LastnameAr.toLowerCase().includes(searchLower)) ||
          (employee.LastnameEn && employee.LastnameEn.toLowerCase().includes(searchLower)) ||
          (employee.MiddlenameAr && employee.MiddlenameAr.toLowerCase().includes(searchLower)) ||
          (employee.MiddlenameEn && employee.MiddlenameEn.toLowerCase().includes(searchLower)) ||
          employee.Email.toLowerCase().includes(searchLower) ||
          employee.NationalNumber.includes(searchTerm) ||
          (employee.section_name_ar && employee.section_name_ar.toLowerCase().includes(searchLower)) ||
          (employee.section_name_en && employee.section_name_en.toLowerCase().includes(searchLower)) ||
          (employee.agency_name_ar && employee.agency_name_ar.toLowerCase().includes(searchLower)) ||
          (employee.agency_name_en && employee.agency_name_en.toLowerCase().includes(searchLower))
        );
    }
  });

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setFilterField("all");
    setStatusFilter("all");
  };

  // Get full name
  const getFullName = (employee: EmployeeType) => {
    return `${employee.FirstnameAr} ${employee.MiddlenameAr} ${employee.LastnameAr}`;
  };

  // Get full name in English
  const getFullNameEn = (employee: EmployeeType) => {
    return `${employee.FirstnameEn} ${employee.MiddlenameEn} ${employee.LastnameEn}`;
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
                { value: "email", label: tST("byEmail") },
                { value: "nationalNumber", label: tST("byNationalNumber") },
              ]}
              value={filterField}
              onChange={(value) => setFilterField(value as SetStateAction<"all" | "name" | "email" | "nationalNumber">)}
              style={{ width: 180 }}
            />

            <Select
              placeholder={tST("filterByStatus")}
              leftSection={<IoPerson size={14} />}
              data={[
                { value: "all", label: tST("allStatuses") },
                { value: "active", label: tST("active") },
                { value: "inactive", label: tST("inactive") },
              ]}
              value={statusFilter}
              onChange={(value) => setStatusFilter(value as SetStateAction<"all" | "active" | "inactive">)}
              style={{ width: 150 }}
            />

            {(searchTerm || filterField !== "all" || statusFilter !== "all") && (
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
              {tST("resultsCount", { count: filteredEmployees.length, total: employees.data.length })}
            </Text>
          )}
        </Box>

        <TableScrollContainer minWidth={300} maxHeight={"65dvh"} h={"65dvh"}>
          <Table
            stickyHeader
            striped
          >
            <TableThead>
              <TableTr>
                <TableTh>{tST("employee")}</TableTh>
                <TableTh>{tST("contact")}</TableTh>
                <TableTh>{tST("sectionAgency")}</TableTh>
                <TableTh>{tST("status")}</TableTh>
                <TableTh>{tST("permissions")}</TableTh>
                <TableTh>{tST("actions")}</TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <TableTr key={employee.id}>
                    <TableTd>
                      <Group gap="sm">
                        <Avatar
                          size="md"
                          color={employee.EmploymentStatus === 1 ? "blue" : "gray"}
                          radius="xl"
                        >
                          {employee.FirstnameAr?.[0] || "E"}
                        </Avatar>
                        <Box>
                          <Text fw={500}>
                            {locale === "ar" ? getFullName(employee) : getFullNameEn(employee)}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {employee.NationalNumber}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {new Date(employee.BirthDate).toLocaleDateString(locale)}
                          </Text>
                        </Box>
                      </Group>
                    </TableTd>
                    <TableTd>
                      <Box>
                        <Group gap="xs" mb={4}>
                          <MdEmail size={14} />
                          <Text size="sm" truncate>
                            {employee.Email}
                          </Text>
                        </Group>
                        <Group gap="xs">
                          <MdPhone size={14} />
                          <Text size="sm">
                            {employee.ContactNumber}
                          </Text>
                        </Group>
                      </Box>
                    </TableTd>
                    <TableTd>
                      <Box>
                        <Text size="sm" fw={500}>
                          {locale === "ar" ? employee.section_name_ar : employee.section_name_en}
                        </Text>
                        <Group gap="xs" mt={2}>
                          <IoBusiness size={12} />
                          <Text size="xs" c="dimmed">
                            {locale === "ar" ? employee.agency_name_ar : employee.agency_name_en}
                          </Text>
                        </Group>
                        <Text size="xs" c="dimmed" mt={4}>
                          {new Date(employee.EmploymentDate).toLocaleDateString(locale)}
                        </Text>
                      </Box>
                    </TableTd>
                    <TableTd>
                      <Badge
                        color={employee.EmploymentStatus === 1 ? "green" : "red"}
                        variant="light"
                      >
                        {employee.EmploymentStatus === 1 ? tST("active") : tST("inactive")}
                      </Badge>
                    </TableTd>
                    <TableTd>
                      <Group gap="xs">
                        <Badge
                          size="sm"
                          color={employee.CanResponseToComplaint === 1 ? "teal" : "gray"}
                          variant="light"
                        >
                          {employee.CanResponseToComplaint === 1 ? tST("canRespond") : tST("cannotRespond")}
                        </Badge>
                        <Badge
                          size="sm"
                          color={employee.CanChangeComplaintStatus === 1 ? "blue" : "gray"}
                          variant="light"
                        >
                          {employee.CanChangeComplaintStatus === 1 ? tST("canChangeStatus") : tST("cannotChangeStatus")}
                        </Badge>
                      </Group>
                    </TableTd>
                    <TableTd>
                      <Group>
                        <EmployeeDetailsModal
                          employee={employee}
                        />
                        <EmployeeModal
                          isEdit
                          employeeId={employee.id}
                          iconOnly
                          fields={{
                            FirstnameAr: employee.FirstnameAr,
                            BirthDate: employee.BirthDate,
                            BirthPlaceAr: employee.BirthPlaceAr,
                            BirthPlaceEn: employee.BirthPlaceEn,
                            CanChangeComplaintStatus: employee.CanChangeComplaintStatus=== 1 ? true : false,
                            CanResponseToComplaint: employee.CanResponseToComplaint=== 1 ? true : false,
                            ContactNumber: employee.ContactNumber,
                            CurrentLocationAr: employee.CurrentLocationAr,
                            CurrentLocationEn: employee.CurrentLocationEn,
                            Email: employee.Email,
                            EmploymentDate: employee.EmploymentDate,
                            EmploymentStatus: employee.EmploymentStatus === 1 ? true : false,
                            FirstnameEn: employee.FirstnameEn,
                            LastnameAr: employee.LastnameAr,
                            LastnameEn: employee.LastnameEn,
                            MiddlenameAr: employee.MiddlenameAr,
                            MiddlenameEn: employee.MiddlenameEn,
                            NationalNumber: employee.NationalNumber,
                            password: ""
                          }}
                        />
                        {/* Add DeleteEmployee component here if needed */}
                      </Group>
                    </TableTd>
                  </TableTr>
                ))
              ) : (
                <TableTr>
                  <TableTd colSpan={6} style={{ textAlign: "center", padding: "2rem" }}>
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

export default EmployeesTable