import { ActionIcon, Card, Menu, MenuDropdown, MenuItem, MenuTarget, Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from "@mantine/core";
import { useTranslations } from "next-intl";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CgDetailsMore } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";


type Props = {
  agencies: AgencyType[]
}

const AgenciesTable = ({ agencies }: Props) => {
  const tAAT = useTranslations("admin.agencies.table");
  const tC = useTranslations("common");

  return (
    <Card p={0} radius="md">
      <Table.ScrollContainer minWidth={300} maxHeight={500} >
        <Table
          stickyHeader
          striped
        >
          <TableThead >
            <TableTr>
              <TableTh flex={1}>
                {tAAT("name")}
              </TableTh>
              <TableTh flex={1}>
                {tAAT("location")}
              </TableTh>
              <TableTh flex={1}>
                {tAAT("status")}
              </TableTh>
              <TableTh flex={1}>
                {tAAT("manager")}
              </TableTh>
              <TableTh flex={0}>
              </TableTh>
            </TableTr>
          </TableThead>
          <TableTbody >
            {
              agencies.map((agency) => {

                return (
                  <TableTr
                    key={agency.Id}
                  >
                    <TableTd>
                      {agency.NameAr || agency.NameEn}
                    </TableTd>
                    <TableTd>
                      {agency.LocationAr || agency.LocationEn}
                    </TableTd>
                    <TableTd>
                      {agency.Status === 1 ? tC("agency.status.active") : tC("agency.status.inactive")}
                    </TableTd>
                    <TableTd>
                      {agency.ManagerId}
                    </TableTd>
                    <TableTd>
                      <Menu>
                        <MenuTarget>
                          <ActionIcon>
                            <BsThreeDotsVertical />
                          </ActionIcon>
                        </MenuTarget>
                        <MenuDropdown>
                          <MenuItem
                            leftSection={<FaEdit />}
                          >
                            {tC("edit")}
                          </MenuItem>
                          <MenuItem
                            leftSection={<CgDetailsMore />}
                          >
                            {tC("viewDetails")}
                          </MenuItem>
                        </MenuDropdown>
                      </Menu>
                    </TableTd>
                  </TableTr>
                )
              })
            }
          </TableTbody>
        </Table>
      </Table.ScrollContainer>
    </Card>
  )
}

export default AgenciesTable