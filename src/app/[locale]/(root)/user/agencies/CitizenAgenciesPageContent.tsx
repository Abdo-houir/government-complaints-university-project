"use client"

import useAxiosQuery from "../../../../../../lib/api/react-query/useAxiosQuery";
import endpoints from "../../../../../../lib/api/setup/ebdpoints";
import ReactQueyStateWrapper from "../../components/query/ReactQueyStateWrapper";
import CitizenAgenciesList from "./components/CitizenAgenciesList";

const CitizenAgenciesPageContent = () => {
  const data = useAxiosQuery(endpoints.agencies.getAgencies);

  return (
    <ReactQueyStateWrapper data={data}>
      <CitizenAgenciesList agencies={data.data as AppResponse<AgencyType[]>}/>
    </ReactQueyStateWrapper>
  )
}

export default CitizenAgenciesPageContent