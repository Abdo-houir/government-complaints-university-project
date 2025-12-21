"use client"

import { ScrollAreaAutosize, Stack } from "@mantine/core";
import SectionCard from "./SectionCard";

type Props = {
  sectionsResponse: AppResponse<AgencySectionType[]>
}

const AgencySectionsList = ({ sectionsResponse }: Props) => {
  console.log(sectionsResponse);

  return (
    <ScrollAreaAutosize mah={"70vh"} mt={20}>
      <Stack>
        {
          sectionsResponse.data.map((section) => <SectionCard key={section.id} section={section} />)
        }
      </Stack>
    </ScrollAreaAutosize>
  )
}

export default AgencySectionsList